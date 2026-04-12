import { test, expect } from '../../../fixtures/apiFixture';
import { endpoints } from '../../../config/url';
import { Product } from '../../../interfaces/product';
import { ProductFactory } from '../../../model/product-factory';
import { productToFormData } from '../../../utils/convertProductToFormData';

const originalProduct: Product = ProductFactory.getRandomValidProduct();

test.describe('Negative create product test with invalid data', () => {
  const productsSet = [
    {
      name: 'zero price',
      product: { ...originalProduct, price: '0' },
      code: 201,
      message: 'Product created successfully',
    },
    {
      name: 'negative price',
      product: { ...originalProduct, price: '-1' },
      code: 201,
      message: 'Product created successfully',
    },
    {
      name: 'very big price',
      product: { ...originalProduct, price: '999999999999' },
      code: 201,
      message: 'Product created successfully',
    },
    {
      name: 'minimal positive price',
      product: { ...originalProduct, price: '0.01' },
      code: 201,
      message: 'Product created successfully',
    },
    {
      name: 'string price',
      product: { ...originalProduct, price: 'abc' },
      code: 422,
      message: 'Received data is not valid',
    },
  ];

  productsSet.forEach((testParameters) => {
    test(`Create product with ${testParameters.name}`, async ({ apiClientWithToken }) => {
      const formData = await productToFormData(testParameters.product);
      const response = await apiClientWithToken.sendRequest(endpoints.ecommerce.products, {
        method: 'POST',
        multipart: formData,
      });
      expect(response.status).toBe(testParameters.code);
      expect(response.body.message).toBe(testParameters.message);
    });
  });
});

test.describe('Negative create product test without token', () => {
  test('Create product', async ({ apiClient }) => {
    const formData = await productToFormData(originalProduct);
    const response = await apiClient.sendRequest(endpoints.ecommerce.products, {
      method: 'POST',
      multipart: formData,
    });
    expect(response.status).toBe(401);
    expect(response.body.message).toBe('Unauthorized request');
  });
});
