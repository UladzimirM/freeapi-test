import { request } from '@playwright/test';
import { EcommerceService } from '../services/ecommerceService';
import { BaseClient } from '../services/baseClient';
import { ProductFactory } from '../model/product-factory';
import { url } from './url';
import { UserService } from '../services/userService';
import { UserFactory } from '../model/user-factory';
import { User } from '../interfaces/user';
import { Product } from '../interfaces/product';

async function globalSetup() {
  console.log('Start Playwright global setup');
  const apiContext = await request.newContext({
    baseURL: url[process.env.ENV].baseUrl,
  });
  const baseClient = new BaseClient(apiContext);

  const user: User = UserFactory.getRandomValidUser();
  const userService = new UserService(baseClient);
  process.env.token = await userService.createUserAndLogin(user);

  const apiContextWithToken = await request.newContext({
    baseURL: url[process.env.ENV].baseUrl,
    extraHTTPHeaders: {
      Authorization: `Bearer ${process.env.token}`,
    },
  });

  const baseClientWithToken = new BaseClient(apiContextWithToken);
  const ecommerceService = new EcommerceService(baseClientWithToken);

  const categoryName = ProductFactory.getRandomValidCategory();
  const product: Product = ProductFactory.getRandomValidProduct();
  process.env.categoryId = await ecommerceService.createCategory(categoryName);
  await ecommerceService.createProduct(product);
  console.log('End Playwright global setup');
}

export default globalSetup;
