export enum StatusEnum {
  RUNNING,
  DONE,
}

export interface CheckResponse {
  isDone: boolean;
  message: string;
  data: any;
}

export interface ErrorResponse {
  error: boolean;
  code: string | undefined;
  message: string | undefined;
}
