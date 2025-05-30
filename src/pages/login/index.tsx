import { GOOGLE_CLIENT_ID, GOOGLE_REDIRECT_URI } from "../../shared/config";

const googleAuthUrl =
  `https://accounts.google.com/o/oauth2/v2/auth?` +
  `client_id=${GOOGLE_CLIENT_ID}` +
  `&redirect_uri=${encodeURIComponent(GOOGLE_REDIRECT_URI)}` +
  `&response_type=code` +
  `&scope=${encodeURIComponent("openid profile email")}` +
  `&access_type=offline`;

export const LoginPage = () => {
  return (
    <>
      <div className="login-wrap">
        <div className="login-area">
          <h1>
            <span className="blind">Heaven Ticket For Lucky guys</span>
          </h1>
          <h3 className="title text-center">choose it</h3>
          <section className="login">
            <button
              type="button"
              onClick={() => {
                window.location.href = googleAuthUrl;
              }}
            >
              Google Login
            </button>
          </section>
        </div>
        <div className="footer">
          <span>Copyright(c) Ticket Page</span>
        </div>
      </div>
    </>
  );
};
