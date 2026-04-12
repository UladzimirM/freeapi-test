import {test, expect} from '../../fixtures/apiFixture';
import {endpoints} from "../../config/url";
import {User} from "../../interfaces/user";
import {UserFactory} from "../../model/user-factory";

test.describe.serial('User API', () => {
  const validUser: User = UserFactory.getRandomValidUser();
  let accessToken:string;

  test('Create user ', async ({apiClient}) => {
    const response = await apiClient.sendRequest(endpoints.user.register, {method: 'POST', data: validUser});
    expect(response.status).toBe(201);
    expect(response.body.message).toContain('Users registered successfully');
  });

  test('Login user ', async ({apiClient}) => {
    const loginData = {password: validUser.password, username: validUser.username};
    const response = await apiClient.sendRequest(endpoints.user.login, {method: 'POST', data: loginData});
    expect(response.status).toBe(200);
    expect(response.body.message).toBe('User logged in successfully');
    accessToken = response.body.data.accessToken;
  });

  test('Get user data', async ({apiClient}) => {
    const headerData = {'Authorization': `Bearer ${accessToken}`};
    const response = await apiClient.sendRequest(endpoints.ecommerce.profile, {method: 'GET', headers: headerData});
    expect(response.status).toBe(200);
    expect(response.body.message).toBe('User profile fetched successfully');
  })
})

