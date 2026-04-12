import { BaseClient } from './baseClient';
import { endpoints } from '../config/url';
import { User } from '../interfaces/user';
import { expect } from '@playwright/test';

export class UserService {
  private baseClient: BaseClient;

  constructor(baseClient: BaseClient) {
    this.baseClient = baseClient;
  }

  async createUserAndLogin(user: User): Promise<string> {
    let response = await this.baseClient.sendRequest(endpoints.user.register, {
      method: 'POST',
      data: user,
    });
    expect(response.status).toBe(201);
    response = await this.baseClient.sendRequest(endpoints.user.login, {
      method: 'POST',
      data: { password: user.password, username: user.username },
    });
    expect(response.status).toBe(200);
    return response.body.data.accessToken;
  }
}
