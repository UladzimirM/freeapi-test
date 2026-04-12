import test from '@playwright/test';
import Ajv, { ErrorObject } from 'ajv';

const ajv = new Ajv();

export const validateSchema = async ({ schema, json }: { schema: object; json: unknown }) => {
  await test.step('Validating json schema', async () => {
    const validate = ajv.compile(schema);

    if (!validate(json)) {
      const prettyJson = JSON.stringify(json, null, 2);
      const prettyError = JSON.stringify(validate.errors, null, 2);
      console.error('Schema validation errors:', validate.errors as ErrorObject[]);
      throw Error(`Schema validation error: ${prettyError}\nJSON: ${prettyJson}`);
    }
  });
};
