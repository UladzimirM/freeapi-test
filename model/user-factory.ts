import { faker } from '@faker-js/faker';
import 'dotenv/config';

import { User } from '../interfaces/user';

export class UserFactory {
  static getRandomValidUser(): User {
    return {
      username: faker.person.fullName().toLowerCase(),
      email: faker.internet.email(),
      password: faker.internet.password(),
      role: 'ADMIN',
    };
  }
}
