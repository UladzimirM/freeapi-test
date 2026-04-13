import { faker } from '@faker-js/faker';
import 'dotenv/config';
import * as path from 'path';

import { Product } from '../interfaces/product';

export class ProductFactory {
  static getRandomValidCategory() {
    return faker.commerce.product();
  }

  static getRandomValidProduct(): Product {
    return {
      name: faker.commerce.productName(),
      category: process.env.categoryId ?? '',
      description: faker.commerce.productDescription(),
      price: faker.number.int({ min: 10, max: 100 }).toString(),
      stock: faker.number.int({ min: 1, max: 10 }).toString(),
      mainImage: path.resolve('data/img.png'),
    };
  }
}
