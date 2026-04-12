import { test, expect } from '../../../fixtures/apiFixture';
import { endpoints } from '../../../config/url';

const invalidProductId = 'invalidProductId';

test('Get product by invalid id', async ({ apiClientWithToken }) => {
  const response = await apiClientWithToken.sendRequest(endpoints.ecommerce.productById(invalidProductId), {
    method: 'GET',
  });
  expect(response.status).toBe(422);
  expect(response.body.message).toBe('Received data is not valid');
  expect(response.body.errors).toContainEqual({ productId: 'Invalid productId' });
});
