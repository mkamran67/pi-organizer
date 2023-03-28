export interface CheckResponse {
  isDone: boolean;
  error: boolean;
  code: string | undefined;
  message: string | undefined;
  data?: any | undefined;
}
