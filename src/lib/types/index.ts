
export interface BaseResponse {
  error?: string;
  statusCode?: number;
  data?: any
};

export type SystemVariant = 'success' | 'error' | 'warning' | 'info';
