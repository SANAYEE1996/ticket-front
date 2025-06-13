export interface AppResponse<T> {
  responseCd: string;
  responseMsg: string;
  requestTs: string;
  traceId: string;
  data: T;
}
