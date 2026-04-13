import { BaseClient } from './baseClient';
import { endpoints } from '../config/url';
import { Product } from '../interfaces/product';
import { productToFormData } from '../utils/convertProductToFormData';

export class EcommerceService {
  private baseClient: BaseClient;

  constructor(baseClient: BaseClient) {
    this.baseClient = baseClient;
  }

  async createCategory(categoryName: string): Promise<string> {
    const response = await this.baseClient.sendRequest(endpoints.ecommerce.categories, {
      method: 'POST',
      data: { name: categoryName },
      headers: {},
    });

    if (response.status !== 201) {
      throw new Error(`Category creation failed with status ${response.status}: ${response.body.message || 'Unknown error'}`);
    }

    if (!response.body.data?._id) {
      throw new Error('Category ID not found in response');
    }

    return response.body.data._id;
  }

  async createProduct(product: Product): Promise<string> {
    const multipart = await productToFormData(product);
    const response = await this.baseClient.sendRequest(endpoints.ecommerce.products, {
      method: 'POST',
      multipart,
      headers: {},
    });

    if (response.status !== 201) {
      throw new Error(`Product creation failed with status ${response.status}: ${response.body.message || 'Unknown error'}`);
    }

    if (!response.body.data?._id) {
      throw new Error('Product ID not found in response');
    }

    return response.body.data._id;
  }
}
