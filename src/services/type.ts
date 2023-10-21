import { makeApi, Zodios, type ZodiosOptions } from '@zodios/core';
import { z } from 'zod';

const LoginInput = z.object({ username: z.string(), password: z.string() }).passthrough();
const LoginOutput = z.object({ username: z.string(), token: z.string() }).passthrough();
const ValidationError = z
  .object({ loc: z.array(z.string()), msg: z.string(), type: z.string() })
  .passthrough();
const HTTPValidationError = z
  .object({ detail: z.array(ValidationError) })
  .partial()
  .passthrough();
const AddAccountInput = z
  .object({ username: z.string(), password: z.string(), email: z.string() })
  .passthrough();
const GetUserInfoOutput = z
  .object({ id: z.number().int(), username: z.string(), email: z.string(), photo: z.string() })
  .passthrough();
const EditUserInput = z
  .object({ old_password: z.string(), new_password: z.string() })
  .partial()
  .passthrough();
const Body_edit_photo_account_edit_photo_put = z.object({ file: z.instanceof(File) }).passthrough();
const AddLogoInput = z.object({ folder_id: z.number().int(), appl_no: z.string() }).passthrough();
const ReadAllOutput = z.object({ id: z.number().int(), folder_name: z.string() }).passthrough();

export const schemas = {
  LoginInput,
  LoginOutput,
  ValidationError,
  HTTPValidationError,
  AddAccountInput,
  GetUserInfoOutput,
  EditUserInput,
  Body_edit_photo_account_edit_photo_put,
  AddLogoInput,
  ReadAllOutput,
};

export const endpoints = makeApi([
  {
    method: 'get',
    path: '/account',
    alias: 'get_user_info_account_get',
    requestFormat: 'json',
    parameters: [
      {
        name: 'auth-token',
        type: 'Header',
        schema: z.string().optional(),
      },
    ],
    response: GetUserInfoOutput,
    errors: [
      {
        status: 422,
        description: `Validation Error`,
        schema: HTTPValidationError,
      },
    ],
  },
  {
    method: 'patch',
    path: '/account/edit-info',
    alias: 'edit_account_account_edit_info_patch',
    requestFormat: 'json',
    parameters: [
      {
        name: 'body',
        type: 'Body',
        schema: EditUserInput,
      },
      {
        name: 'auth-token',
        type: 'Header',
        schema: z.string().optional(),
      },
    ],
    response: z.unknown(),
    errors: [
      {
        status: 422,
        description: `Validation Error`,
        schema: HTTPValidationError,
      },
    ],
  },
  {
    method: 'put',
    path: '/account/edit-photo',
    alias: 'edit_photo_account_edit_photo_put',
    requestFormat: 'form-data',
    parameters: [
      {
        name: 'body',
        type: 'Body',
        schema: z.object({ file: z.instanceof(File) }).passthrough(),
      },
      {
        name: 'auth-token',
        type: 'Header',
        schema: z.string().optional(),
      },
    ],
    response: z.unknown(),
    errors: [
      {
        status: 422,
        description: `Validation Error`,
        schema: HTTPValidationError,
      },
    ],
  },
  {
    method: 'post',
    path: '/add-logo',
    alias: 'add_logo_add_logo_post',
    requestFormat: 'json',
    parameters: [
      {
        name: 'body',
        type: 'Body',
        schema: AddLogoInput,
      },
      {
        name: 'auth-token',
        type: 'Header',
        schema: z.string().optional(),
      },
    ],
    response: z.unknown(),
    errors: [
      {
        status: 422,
        description: `Validation Error`,
        schema: HTTPValidationError,
      },
    ],
  },
  {
    method: 'post',
    path: '/login',
    alias: 'login_login_post',
    requestFormat: 'json',
    parameters: [
      {
        name: 'body',
        type: 'Body',
        schema: LoginInput,
      },
      {
        name: 'auth-token',
        type: 'Header',
        schema: z.string().optional(),
      },
    ],
    response: LoginOutput,
    errors: [
      {
        status: 422,
        description: `Validation Error`,
        schema: HTTPValidationError,
      },
    ],
  },
  {
    method: 'post',
    path: '/new-folder',
    alias: 'new_folder_new_folder_post',
    requestFormat: 'json',
    parameters: [
      {
        name: 'folder_name',
        type: 'Query',
        schema: z.string(),
      },
      {
        name: 'auth-token',
        type: 'Header',
        schema: z.string().optional(),
      },
    ],
    response: z.unknown(),
    errors: [
      {
        status: 422,
        description: `Validation Error`,
        schema: HTTPValidationError,
      },
    ],
  },
  {
    method: 'get',
    path: '/read-all',
    alias: 'read_all_folders_read_all_get',
    requestFormat: 'json',
    parameters: [
      {
        name: 'auth-token',
        type: 'Header',
        schema: z.string().optional(),
      },
    ],
    response: z.array(ReadAllOutput),
    errors: [
      {
        status: 422,
        description: `Validation Error`,
        schema: HTTPValidationError,
      },
    ],
  },
  {
    method: 'post',
    path: '/signin',
    alias: 'add_account_signin_post',
    requestFormat: 'json',
    parameters: [
      {
        name: 'body',
        type: 'Body',
        schema: AddAccountInput,
      },
      {
        name: 'auth-token',
        type: 'Header',
        schema: z.string().optional(),
      },
    ],
    response: z.number().int(),
    errors: [
      {
        status: 422,
        description: `Validation Error`,
        schema: HTTPValidationError,
      },
    ],
  },
]);

export const api = new Zodios(endpoints);

export function createApiClient(baseUrl: string, options?: ZodiosOptions) {
  return new Zodios(baseUrl, endpoints, options);
}
