import * as  path from 'path';
import {openAsBlob} from "node:fs";
import {Product} from "../interfaces/product";

export async function productToFormData(product: Product): Promise<FormData>  {
  const formData = new FormData();

  for (const [key, value] of Object.entries(product)) {
    if (key === 'mainImage') {
      const filePath = path.resolve(String(value));
      const file = await openAsBlob(filePath)
      formData.append(key, file, path.basename(filePath));
    } else {
      formData.append(key, String(value));
    }
  }
  return formData;
}