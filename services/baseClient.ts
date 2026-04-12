import { APIRequestContext } from '@playwright/test';
import { Response } from '../interfaces/response';
import { RequestOptions } from '../interfaces/requestOptions';

export class BaseClient {
  readonly request: APIRequestContext;

  constructor(request: APIRequestContext) {
    this.request = request;
  }

  async sendRequest(endpoint: string, options: RequestOptions) {
    console.info(`Sending request ${endpoint} with  ${JSON.stringify(options)}`);
    const apiResponse = await this.request.fetch(endpoint, options);
    const headers = apiResponse.headers();
    const contentType = headers['content-type'] || '';

    let body: unknown;
    if (contentType.includes('application/json')) {
      try {
        body = await apiResponse.json();
      } catch {
        body = '';
      }
    } else {
      body = await apiResponse.text();
    }

    const response: Response = {
      status: apiResponse.status(),
      statusText: apiResponse.statusText(),
      headers,
      body: body as Response['body'],
    };
    return response;
  }
}
