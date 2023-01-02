export interface APIResponse<T> {
  status: number;
  error?: string;
  data?: T;
}
