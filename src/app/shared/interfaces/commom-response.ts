export interface ICommonResponse<I = any> {
  message: string;
  success: boolean;
  data: I;
}
