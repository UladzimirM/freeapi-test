export interface RequestOptions {
  data?: Record<string, unknown> | string | undefined;
  headers?: { [key: string]: string };
  method: string;
  params?: { [key: string]: any };
  multipart?: { [key: string]: any } | FormData;
}
