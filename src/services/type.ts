import { makeApi, Zodios, type ZodiosOptions } from '@zodios/core';
import { z } from 'zod';

const HealthCheckOutput = z
  .object({ health: z.union([z.string(), z.null()]).default('ok') })
  .partial()
  .passthrough();
const Response_HealthCheckOutput_ = z
  .object({ data: z.union([HealthCheckOutput, z.null()]), error: z.union([z.string(), z.null()]) })
  .partial()
  .passthrough();
const LoginInput = z.object({ email: z.string().email(), password: z.string() }).passthrough();
const LoginOutput = z.object({ account_id: z.number().int(), token: z.string() }).passthrough();
const Response_LoginOutput_ = z
  .object({ data: z.union([LoginOutput, z.null()]), error: z.union([z.string(), z.null()]) })
  .partial()
  .passthrough();
const EmailVerificationOutput = z
  .object({ success: z.boolean().default(true) })
  .partial()
  .passthrough();
const Response_EmailVerificationOutput_ = z
  .object({
    data: z.union([EmailVerificationOutput, z.null()]),
    error: z.union([z.string(), z.null()]),
  })
  .partial()
  .passthrough();
const GenderType = z.enum(['MALE', 'FEMALE', 'UNREVEALED']);
const RoleType = z.enum(['PROVIDER', 'NORMAL']);
const AddAccountInput = z
  .object({
    email: z.string().email(),
    password: z.string(),
    nickname: z.string(),
    gender: GenderType,
    role: RoleType,
  })
  .passthrough();
const AddAccountOutput = z.object({ id: z.number().int() }).passthrough();
const Response_AddAccountOutput_ = z
  .object({ data: z.union([AddAccountOutput, z.null()]), error: z.union([z.string(), z.null()]) })
  .partial()
  .passthrough();
const ResendEmailVerificationInput = z.object({ email: z.string().email() }).passthrough();
const ForgetPasswordInput = z.object({ email: z.string().email() }).passthrough();
const Response = z
  .object({ data: z.union([z.unknown(), z.null()]), error: z.union([z.string(), z.null()]) })
  .partial()
  .passthrough();
const ResetPasswordInput = z.object({ code: z.string(), password: z.string() }).passthrough();
const Account = z
  .object({
    id: z.number().int(),
    email: z.string().email(),
    nickname: z.string(),
    gender: GenderType,
    image_uuid: z.union([z.string(), z.null()]),
    role: RoleType,
    is_verified: z.boolean(),
    is_google_login: z.boolean(),
  })
  .passthrough();
const Response_Account_ = z
  .object({ data: z.union([Account, z.null()]), error: z.union([z.string(), z.null()]) })
  .partial()
  .passthrough();

export const schemas = {
  HealthCheckOutput,
  Response_HealthCheckOutput_,
  LoginInput,
  LoginOutput,
  Response_LoginOutput_,
  EmailVerificationOutput,
  Response_EmailVerificationOutput_,
  GenderType,
  RoleType,
  AddAccountInput,
  AddAccountOutput,
  Response_AddAccountOutput_,
  ResendEmailVerificationInput,
  ForgetPasswordInput,
  Response,
  ResetPasswordInput,
  Account,
  Response_Account_,
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
    ],
    response: Response_AddAccountOutput_,
  },
  {
    method: 'get',
    path: '/account/:account_id',
    alias: 'read_account_account__account_id__get',
    requestFormat: 'json',
    parameters: [
      {
        name: 'account_id',
        type: 'Path',
        schema: z.number().int(),
      },
      {
        name: 'auth-token',
        type: 'Header',
        schema: z.string().optional(),
      },
    ],
    response: Response_Account_,
  },
  {
    method: 'post',
    path: '/email-verification',
    alias: 'email_verification_email_verification_post',
    requestFormat: 'json',
    parameters: [
      {
        name: 'code',
        type: 'Query',
        schema: z.string().uuid(),
      },
    ],
    response: Response_EmailVerificationOutput_,
  },
  {
    method: 'get',
    path: '/email-verification',
    alias: 'email_verification_email_verification_get',
    requestFormat: 'json',
    parameters: [
      {
        name: 'code',
        type: 'Query',
        schema: z.string().uuid(),
      },
    ],
    response: Response_EmailVerificationOutput_,
  },
  {
    method: 'post',
    path: '/email-verification/resend',
    alias: 'resend_email_verification_email_verification_resend_post',
    requestFormat: 'json',
    parameters: [
      {
        name: 'body',
        type: 'Body',
        schema: z.object({ email: z.string().email() }).passthrough(),
      },
    ],
    response: z.unknown(),
  },
  {
    method: 'post',
    path: '/forget-password',
    alias: 'forget_password_forget_password_post',
    requestFormat: 'json',
    parameters: [
      {
        name: 'body',
        type: 'Body',
        schema: z.object({ email: z.string().email() }).passthrough(),
      },
    ],
    response: Response,
  },
  {
    method: 'get',
    path: '/health',
    alias: 'health_check_health_get',
    requestFormat: 'json',
    response: Response_HealthCheckOutput_,
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
    ],
    response: Response_LoginOutput_,
  },
  {
    method: 'post',
    path: '/reset-password',
    alias: 'reset_password_reset_password_post',
    requestFormat: 'json',
    parameters: [
      {
        name: 'body',
        type: 'Body',
        schema: ResetPasswordInput,
      },
    ],
    response: Response,
  },
]);

export const api = new Zodios(endpoints);

export function createApiClient(baseUrl: string, options?: ZodiosOptions) {
  return new Zodios(baseUrl, endpoints, options);
}
