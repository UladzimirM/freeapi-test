import {test, expect} from '../../fixtures/apiFixture';
import {endpoints} from "../../config/url";
import {Product} from "../../interfaces/product";
import {ProductFactory} from "../../model/product-factory";
import {productToFormData} from "../../utils/convertProductToFormData";
import * as fs from "node:fs";
import {validateSchema} from "../../utils/validateSchema";
import {productResponseSchema, productsListResponseSchema} from "../../model/schemas/productSchemas";

test.describe('Products API', () => {
  const productsPath = './data/receivedData/products.json';
  const originalProduct: Product = ProductFactory.getRandomValidProduct();
  let updatedProduct: Product;
  let productId: string;

  test('Get products list', async ({apiClient}) => {
    const response = await apiClient.sendRequest(endpoints.ecommerce.products, {method: 'GET'});
    expect(response.status).toBe(200);
    await validateSchema({
      schema: productsListResponseSchema,
      json: response.body
    })
    const productList = response.body.data.products
    expect(Array.isArray(productList)).toBeTruthy();
    fs.writeFileSync(productsPath, JSON.stringify(productList));
  });

  test('Create product', async ({apiClientWithToken}) => {
    const formData = await productToFormData(originalProduct);
    const response = await apiClientWithToken.sendRequest(endpoints.ecommerce.products, {
      method: 'POST',
      multipart: formData,
    });
    expect(response.status).toBe(201);
    expect(response.body.message).toBe('Product created successfully');
    productId = response.body.data._id
  })

  test('Get product by id', async ({apiClientWithToken}) => {
    const response = await apiClientWithToken.sendRequest(endpoints.ecommerce.productById(productId), {
      method: 'GET',
    });
    expect(response.status).toBe(200);
    expect(response.body.message).toBe('Product fetched successfully');
    expect(response.body.data.name).toBe(originalProduct.name);
    await validateSchema({
      schema: productResponseSchema,
      json: response.body
    })
  })

  test('Update products price', async ({apiClientWithToken}) => {
    updatedProduct = JSON.parse(JSON.stringify(originalProduct));
    updatedProduct.price = updatedProduct.price + 0;
    const response = await apiClientWithToken.sendRequest(endpoints.ecommerce.productById(productId), {
      method: 'PATCH',
      data: updatedProduct
    });
    expect(response.status).toBe(200);
    expect(response.body.message).toBe('Product updated successfully');
    expect(response.body.data.price).toBe(Number(updatedProduct.price));
  })

  test('Delete product', async ({apiClientWithToken}) => {
    const response = await apiClientWithToken.sendRequest(endpoints.ecommerce.productById(productId), {
      method: 'DELETE',
    });
    expect(response.status).toBe(200);
    expect(response.body.message).toBe('Product deleted successfully');

    const checkResponse = await apiClientWithToken.sendRequest(endpoints.ecommerce.productById(productId), {
      method: 'GET',
    });
    expect(checkResponse.status).toBe(404);
    expect(checkResponse.body.message).toBe('Product does not exist');
  })
})

