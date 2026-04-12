import {BaseClient} from './baseClient';
import {endpoints} from '../config/url';
import {expect} from '@playwright/test';
import {Product} from '../interfaces/product';

export class EcommerceService {
  private baseClient: BaseClient;

  constructor(baseClient: BaseClient) {
    this.baseClient = baseClient;
  }

  async createCategory(categoryName: string): Promise<string> {
    let response = await this.baseClient.sendRequest(endpoints.ecommerce.categories, {
      method: 'POST',
      data:  {name: categoryName},
      headers: {}
    });
    expect(response.status).toBe(201);
    return response.body.data._id
  }

  async createProduct(product : Product): Promise<string> {
    let response = await this.baseClient.sendRequest(endpoints.ecommerce.categories, {
      method: 'POST',
      data:  product,
      headers: {}
    });
    expect(response.status).toBe(201);
    return response.body.data._id
  }
}