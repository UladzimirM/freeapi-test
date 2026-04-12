const mainImageSchema = {
  type: 'object',
  properties: {
    url: { type: 'string' },
    localPath: { type: 'string' },
    _id: { type: 'string' },
  },
  required: ['url', 'localPath', '_id'],
  additionalProperties: false,
};

const productSchema = {
  type: 'object',
  properties: {
    _id: { type: 'string' },
    category: { type: 'string' },
    description: { type: 'string' },
    mainImage: mainImageSchema,
    name: { type: 'string' },
    owner: { type: 'string' },
    price: { type: 'number' },
    stock: { type: 'number' },
    subImages: {
      type: 'array',
      items: {},
    },
    createdAt: { type: 'string' },
    updatedAt: { type: 'string' },
    __v: { type: 'number' },
  },
  required: [
    '_id',
    'category',
    'description',
    'mainImage',
    'name',
    'owner',
    'price',
    'stock',
    'subImages',
    'createdAt',
    'updatedAt',
    '__v',
  ],
  additionalProperties: false,
};

export const productResponseSchema = {
  type: 'object',
  properties: {
    statusCode: { type: 'number' },
    data: productSchema,
    message: { type: 'string' },
    success: { type: 'boolean' },
  },
  required: ['statusCode', 'data', 'message', 'success'],
  additionalProperties: false,
};

export const productsListResponseSchema = {
  type: 'object',
  properties: {
    statusCode: { type: 'number' },
    data: {
      type: 'object',
      properties: {
        products: {
          type: 'array',
          items: productSchema,
        },
        totalProducts: { type: 'number' },
        limit: { type: 'number' },
        page: { type: 'number' },
        totalPages: { type: 'number' },
        serialNumberStartFrom: { type: 'number' },
        hasPrevPage: { type: 'boolean' },
        hasNextPage: { type: 'boolean' },
        prevPage: { type: ['number', 'null'] },
        nextPage: { type: ['number', 'null'] },
      },
      required: [
        'products',
        'totalProducts',
        'limit',
        'page',
        'totalPages',
        'serialNumberStartFrom',
        'hasPrevPage',
        'hasNextPage',
        'prevPage',
        'nextPage',
      ],
      additionalProperties: false,
    },
    message: { type: 'string' },
    success: { type: 'boolean' },
  },
  required: ['statusCode', 'data', 'message', 'success'],
  additionalProperties: false,
};
