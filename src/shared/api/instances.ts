import ky, { type AfterResponseHook, type BeforeRequestHook } from "ky";
import { API_BASE_URL, BASE_URL } from "../config";
import { useAuthStore } from "../../entites/auth/model/store";

const DEFAULT_API_TIMEOUT = 15 * 1000;
let isRefreshing = false;
let refreshSubscribers: ((token: string) => void)[] = [];

const subscribeTokenRefresh = (cb: (token: string) => void) => {
  refreshSubscribers.push(cb);
};

const onRrefreshed = (token: string) => {
  refreshSubscribers.forEach((cb) => cb(token));
  refreshSubscribers = [];
};

const setAuthorizationHeader: BeforeRequestHook = (request) => {
  const accessToken = useAuthStore.getState().token;
  if (!accessToken) return;
  request.headers.set("Authorization", `Bearer ${accessToken}`);
};

const refreshAccessToken: () => Promise<string | null> = async () => {
  try {
    const { data }: any = await ky
      .post(`${API_BASE_URL}auth/v1/extend`, {
        headers: {
          "content-Type": "application/json",
          Authorization: `Bearer ${useAuthStore.getState().token}`,
        },
        credentials: "include",
      })
      .json();

    return data?.accessToken;
  } catch (error) {
    console.error(error);
    return null;
  }
};

function resetAndRedirect() {
  refreshSubscribers = [];
  useAuthStore.getState().resetAuthStore();
  window.location.href = BASE_URL || "/";
}

const handleRefreshAccessToken: AfterResponseHook = async (
  request,
  _options,
  response
) => {
  if (response.status === 401 && !request.url.includes("/login")) {
    if (!isRefreshing) {
      isRefreshing = true;
      try {
        const newAccessToken = await refreshAccessToken();
        if (newAccessToken) {
          useAuthStore.getState().updateToken(newAccessToken);
          onRrefreshed(newAccessToken);
          request.headers.set("Authorization", `Bearer ${newAccessToken}`);
          return ky(request);
        } else {
          resetAndRedirect();
        }
      } catch (error) {
        resetAndRedirect();
        console.error("Error refreshing token:", error);
      } finally {
        isRefreshing = false;
      }
    }

    return new Promise((resolve) => {
      subscribeTokenRefresh((token: string) => {
        request.headers.set("Authorization", `Bearer ${token}`);
        resolve(ky(request));
      });
    });
  }
};

const instance = ky.create({
  prefixUrl: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
  credentials: "include",
});

const ApiClient = instance.extend({
  timeout: DEFAULT_API_TIMEOUT,
  hooks: {
    beforeRequest: [setAuthorizationHeader],
    afterResponse: [handleRefreshAccessToken],
  },
});

export { ApiClient };
