export const url = {
  TEST: {
    baseUrl: 'https://api.freeapi.app/api/v1/',
  },
};

export const endpoints = {
  product: {
    products: 'public/randomproducts',
  },
  user: {
    register: 'users/register',
    login: 'users/login',
  },
  ecommerce: {
    profile: 'ecommerce/profile',
    products: 'ecommerce/products',
    productById: (id: string) => `ecommerce/products/${id}`,

    categories: 'ecommerce/categories',
  },
};
