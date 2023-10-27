import { makeApi, Zodios, type ZodiosOptions } from '@zodios/core';
import { z } from 'zod';

const HealthCheckOutput = z
  .object({ health: z.union([z.string(), z.null()]).default('ok') })
  .partial()
  .passthrough();
const AddAccountInput = z
  .object({
    username: z.string(),
    password: z.string(),
    real_name: z.string(),
    student_id: z.string(),
  })
  .passthrough();
const AddAccountOutput = z.object({ id: z.number().int() }).passthrough();
const ValidationError = z
  .object({ loc: z.array(z.union([z.string(), z.number()])), msg: z.string(), type: z.string() })
  .passthrough();
const HTTPValidationError = z
  .object({ detail: z.array(ValidationError) })
  .partial()
  .passthrough();
const LoginInput = z.object({ username: z.string(), password: z.string() }).passthrough();
const LoginOutput = z.object({ account_id: z.number().int(), token: z.string() }).passthrough();

export const schemas = {
  HealthCheckOutput,
  AddAccountInput,
  AddAccountOutput,
  ValidationError,
  HTTPValidationError,
  LoginInput,
  LoginOutput,
};

const endpoints = makeApi([
  {
    method: 'get',
    path: '/',
    alias: 'default_page__get',
    requestFormat: 'json',
    response: z.void(),
  },
  {
    method: 'post',
    path: '/account',
    alias: 'add_account_account_post',
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
    response: z.object({ id: z.number().int() }).passthrough(),
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
    path: '/health',
    alias: 'health_check_health_get',
    requestFormat: 'json',
    response: HealthCheckOutput,
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
]);

export const api = new Zodios(endpoints);

export function createApiClient(baseUrl: string, options?: ZodiosOptions) {
  return new Zodios(baseUrl, endpoints, options);
}
