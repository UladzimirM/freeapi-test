import { BaseClient } from './baseClient';
import { endpoints } from '../config/url';
import { User } from '../interfaces/user';

export class UserService {
  private baseClient: BaseClient;

  constructor(baseClient: BaseClient) {
    this.baseClient = baseClient;
  }

  async createUserAndLogin(user: User): Promise<string> {
    const registerResponse = await this.baseClient.sendRequest(endpoints.user.register, {
      method: 'POST',
      data: user,
    });

    if (registerResponse.status !== 201) {
      throw new Error(
        `User registration failed with status ${registerResponse.status}: ${registerResponse.body.message || 'Unknown error'}`,
      );
    }

    const loginResponse = await this.baseClient.sendRequest(endpoints.user.login, {
      method: 'POST',
      data: { password: user.password, username: user.username },
    });

    if (loginResponse.status !== 200) {
      throw new Error(`User login failed with status ${loginResponse.status}: ${loginResponse.body.message || 'Unknown error'}`);
    }

    if (!loginResponse.body.data?.accessToken) {
      throw new Error('Access token not found in login response');
    }

    return loginResponse.body.data.accessToken;
  }
}
