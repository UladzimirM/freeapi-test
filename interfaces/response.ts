export interface Response {
  status: number;
  statusText: string;
  headers: {[key: string]: string};
  body: {[key: string]: any};
}
