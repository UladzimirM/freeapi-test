import { test as base, request, APIRequestContext } from '@playwright/test';
import { BaseClient } from '../services/baseClient';
import { url } from '../config/url';
import { UserService } from '../services/userService';
import { User } from '../interfaces/user';
import { UserFactory } from '../model/user-factory';

type Fixtures = {
  apiClient: BaseClient;
  apiContext: APIRequestContext;
  apiClientWithToken: BaseClient;
  apiContextWithToken: APIRequestContext;
  userService: UserService;
  accessToken: string;
};

export const test = base.extend<Fixtures>({
  apiContext: async ({}, use) => {
    const context = await request.newContext({
      baseURL: url[process.env.ENV as keyof typeof url].baseUrl,
    });
    await use(context);
    await context.dispose();
  },

  apiClient: async ({ apiContext }, use) => {
    const client = new BaseClient(apiContext);
    await use(client);
  },

  userService: async ({ apiClient }, use) => {
    const service = new UserService(apiClient);
    await use(service);
  },

  accessToken: async ({ userService }, use) => {
    const user: User = UserFactory.getRandomValidUser();
    const token = await userService.createUserAndLogin(user);
    await use(token);
  },

  apiContextWithToken: async ({ accessToken }, use) => {
    const context = await request.newContext({
      baseURL: url[process.env.ENV as keyof typeof url].baseUrl,
      extraHTTPHeaders: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    await use(context);
    await context.dispose();
  },

  apiClientWithToken: async ({ apiContextWithToken }, use) => {
    const client = new BaseClient(apiContextWithToken);
    await use(client);
  },
});

export { expect } from '@playwright/test';
