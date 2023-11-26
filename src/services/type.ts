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
const ValidationError = z
  .object({ loc: z.array(z.union([z.string(), z.number()])), msg: z.string(), type: z.string() })
  .passthrough();
const HTTPValidationError = z
  .object({ detail: z.array(ValidationError) })
  .partial()
  .passthrough();
const EmailVerificationInput = z.object({ code: z.string().uuid() }).passthrough();
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
    gender: z.union([GenderType, z.null()]).optional().default('UNREVEALED'),
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
const auth_token = z.union([z.string(), z.null()]).optional();
const ReadAccountOutput = z
  .object({
    id: z.number().int(),
    email: z.string().email(),
    nickname: z.string(),
    gender: GenderType,
    image_uuid: z.union([z.string(), z.null()]),
    role: RoleType,
    is_verified: z.boolean(),
    is_google_login: z.boolean(),
    image_url: z.union([z.string(), z.null()]),
  })
  .passthrough();
const Response_ReadAccountOutput_ = z
  .object({ data: z.union([ReadAccountOutput, z.null()]), error: z.union([z.string(), z.null()]) })
  .partial()
  .passthrough();
const EditAccountInput = z
  .object({ nickname: z.union([z.string(), z.null()]), gender: z.union([GenderType, z.null()]) })
  .partial()
  .passthrough();
const Response_bool_ = z
  .object({ data: z.union([z.boolean(), z.null()]), error: z.union([z.string(), z.null()]) })
  .partial()
  .passthrough();
const Body_upload_account_image_account__account_id__upload_patch = z
  .object({ image: z.instanceof(File) })
  .passthrough();
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
const Response_Sequence_Account__ = z
  .object({ data: z.union([z.array(Account), z.null()]), error: z.union([z.string(), z.null()]) })
  .partial()
  .passthrough();
const role = z.union([RoleType, z.null()]).optional();
const Response_str_ = z
  .object({ data: z.union([z.string(), z.null()]), error: z.union([z.string(), z.null()]) })
  .partial()
  .passthrough();
const BatchDownloadInput = z.object({ file_uuids: z.array(z.string()) }).passthrough();
const BatchDownloadOutput = z
  .object({ file_uuid: z.string().uuid(), sign_url: z.string() })
  .passthrough();
const Response_Sequence_BatchDownloadOutput__ = z
  .object({
    data: z.union([z.array(BatchDownloadOutput), z.null()]),
    error: z.union([z.string(), z.null()]),
  })
  .partial()
  .passthrough();
const WeekTimeRange = z
  .object({ weekday: z.number().int(), start_time: z.string(), end_time: z.string() })
  .passthrough();
const StadiumSearchParameters = z
  .object({
    name: z.union([z.string(), z.null()]).optional(),
    city_id: z.union([z.number(), z.null()]).optional(),
    district_id: z.union([z.number(), z.null()]).optional(),
    sport_id: z.union([z.number(), z.null()]).optional(),
    time_ranges: z.union([z.array(WeekTimeRange), z.null()]),
    limit: z.number().int().gt(0).lt(50).optional().default(10),
    offset: z.number().int().gte(0).optional(),
  })
  .passthrough();
const PlaceType = z.enum(['STADIUM', 'VENUE']);
const BusinessHour = z
  .object({
    id: z.number().int(),
    place_id: z.number().int(),
    type: PlaceType,
    weekday: z.number().int(),
    start_time: z.string(),
    end_time: z.string(),
  })
  .passthrough();
const ViewStadium = z
  .object({
    id: z.number().int(),
    name: z.string(),
    district_id: z.number().int(),
    contact_number: z.union([z.string(), z.null()]),
    description: z.union([z.string(), z.null()]),
    long: z.number(),
    lat: z.number(),
    city: z.string(),
    district: z.string(),
    sports: z.array(z.string()),
    business_hours: z.array(BusinessHour),
  })
  .passthrough();
const Response_Sequence_ViewStadium__ = z
  .object({
    data: z.union([z.array(ViewStadium), z.null()]),
    error: z.union([z.string(), z.null()]),
  })
  .partial()
  .passthrough();
const Response_ViewStadium_ = z
  .object({ data: z.union([ViewStadium, z.null()]), error: z.union([z.string(), z.null()]) })
  .partial()
  .passthrough();
const City = z.object({ id: z.number().int(), name: z.string() }).passthrough();
const Response_Sequence_City__ = z
  .object({ data: z.union([z.array(City), z.null()]), error: z.union([z.string(), z.null()]) })
  .partial()
  .passthrough();
const sport_id = z.union([z.number(), z.null()]).optional();
const is_reservable = z.union([z.boolean(), z.null()]).optional();
const VenueAvailableSortBy = z.string();
const sort_by = VenueAvailableSortBy.optional().default('CURRENT_USER_COUNT');
const Sorter = z.enum(['ASC', 'DESC']);
const order = Sorter.optional().default('DESC');
const FeeType = z.enum(['PER_HOUR', 'PER_PERSON', 'PER_PERSON_PER_HOUR']);
const Venue = z
  .object({
    id: z.number().int(),
    stadium_id: z.number().int(),
    name: z.string(),
    floor: z.string(),
    reservation_interval: z.union([z.number(), z.null()]),
    is_reservable: z.boolean(),
    is_chargeable: z.boolean(),
    fee_rate: z.union([z.number(), z.null()]),
    fee_type: z.union([FeeType, z.null()]),
    area: z.number().int(),
    current_user_count: z.number().int(),
    capability: z.number().int(),
    sport_equipments: z.union([z.string(), z.null()]),
    facilities: z.union([z.string(), z.null()]),
    court_count: z.number().int(),
    court_type: z.string(),
    sport_id: z.number().int(),
  })
  .passthrough();
const Response_Sequence_Venue__ = z
  .object({ data: z.union([z.array(Venue), z.null()]), error: z.union([z.string(), z.null()]) })
  .partial()
  .passthrough();
const Response_Venue_ = z
  .object({ data: z.union([Venue, z.null()]), error: z.union([z.string(), z.null()]) })
  .partial()
  .passthrough();
const Court = z.object({ id: z.number().int(), venue_id: z.number().int() }).passthrough();
const Response_Sequence_Court__ = z
  .object({ data: z.union([z.array(Court), z.null()]), error: z.union([z.string(), z.null()]) })
  .partial()
  .passthrough();
const District = z
  .object({ id: z.number().int(), name: z.string(), city_id: z.number().int() })
  .passthrough();
const Response_Sequence_District__ = z
  .object({ data: z.union([z.array(District), z.null()]), error: z.union([z.string(), z.null()]) })
  .partial()
  .passthrough();
const BrowseAlbumInput = z
  .object({ place_id: z.number().int(), place_type: PlaceType })
  .passthrough();
const BrowseAlbumOutput = z.object({ urls: z.array(z.string()) }).passthrough();
const Response_Sequence_BrowseAlbumOutput__ = z
  .object({
    data: z.union([z.array(BrowseAlbumOutput), z.null()]),
    error: z.union([z.string(), z.null()]),
  })
  .partial()
  .passthrough();
const Sport = z.object({ id: z.number().int(), name: z.string() }).passthrough();
const Response_Sequence_Sport__ = z
  .object({ data: z.union([z.array(Sport), z.null()]), error: z.union([z.string(), z.null()]) })
  .partial()
  .passthrough();
const DateTimeRange = z
  .object({
    start_time: z.string().datetime({ offset: true }),
    end_time: z.string().datetime({ offset: true }),
  })
  .passthrough();
const TechnicalType = z.enum(['ENTRY', 'INTERMEDIATE', 'ADVANCED']);
const BrowseReservationSortBy = z.enum(['vacancy', 'time']);
const app__processor__http__reservation__BrowseReservationParameters = z
  .object({
    city_id: z.union([z.number(), z.null()]),
    district_id: z.union([z.number(), z.null()]),
    sport_id: z.union([z.number(), z.null()]),
    stadium_id: z.union([z.number(), z.null()]),
    time_ranges: z.union([z.array(DateTimeRange), z.null()]),
    technical_level: z.union([TechnicalType, z.null()]),
    limit: z.number().int().gt(0).lt(50).default(10),
    offset: z.number().int().gte(0),
    sort_by: BrowseReservationSortBy.default('time'),
    order: Sorter.default('DESC'),
  })
  .partial()
  .passthrough();
const Reservation = z
  .object({
    id: z.number().int(),
    stadium_id: z.number().int(),
    venue_id: z.number().int(),
    court_id: z.number().int(),
    start_time: z.string().datetime({ offset: true }),
    end_time: z.string().datetime({ offset: true }),
    member_count: z.number().int(),
    vacancy: z.number().int(),
    technical_level: z.array(TechnicalType),
    remark: z.union([z.string(), z.null()]),
    invitation_code: z.string(),
    is_cancelled: z.boolean(),
  })
  .passthrough();
const Response_Sequence_Reservation__ = z
  .object({
    data: z.union([z.array(Reservation), z.null()]),
    error: z.union([z.string(), z.null()]),
  })
  .partial()
  .passthrough();
const ViewMyReservationSortBy = z.enum([
  'time',
  'stadium_name',
  'venue_name',
  'is_manager',
  'vacancy',
  'status',
]);
const sort_by__2 = ViewMyReservationSortBy.optional().default('time');
const ReservationStatus = z.enum(['IN_PROGRESS', 'CANCELLED', 'FINISHED']);
const ViewMyReservation = z
  .object({
    start_time: z.string().datetime({ offset: true }),
    end_time: z.string().datetime({ offset: true }),
    stadium_name: z.string(),
    venue_name: z.string(),
    is_manager: z.boolean(),
    vacancy: z.number().int(),
    status: ReservationStatus,
  })
  .passthrough();
const Response_Sequence_ViewMyReservation__ = z
  .object({
    data: z.union([z.array(ViewMyReservation), z.null()]),
    error: z.union([z.string(), z.null()]),
  })
  .partial()
  .passthrough();
const Response_Reservation_ = z
  .object({ data: z.union([Reservation, z.null()]), error: z.union([z.string(), z.null()]) })
  .partial()
  .passthrough();
const app__processor__http__court__BrowseReservationParameters = z
  .object({
    time_ranges: z.union([z.array(DateTimeRange), z.null()]),
    start_date: z.union([z.string(), z.null()]),
  })
  .partial()
  .passthrough();
const AddReservationInput = z
  .object({
    start_time: z.string().datetime({ offset: true }),
    end_time: z.string().datetime({ offset: true }),
    technical_level: z.array(TechnicalType).optional().default([]),
    remark: z.union([z.string(), z.null()]),
    member_count: z.number().int(),
    vacancy: z.number().int().optional().default(-1),
    member_ids: z.array(z.number()).optional().default([]),
  })
  .passthrough();
const AddReservationOutput = z.object({ id: z.number().int() }).passthrough();
const Response_AddReservationOutput_ = z
  .object({
    data: z.union([AddReservationOutput, z.null()]),
    error: z.union([z.string(), z.null()]),
  })
  .partial()
  .passthrough();
const Response_Sequence_BusinessHour__ = z
  .object({
    data: z.union([z.array(BusinessHour), z.null()]),
    error: z.union([z.string(), z.null()]),
  })
  .partial()
  .passthrough();

export const schemas = {
  HealthCheckOutput,
  Response_HealthCheckOutput_,
  LoginInput,
  LoginOutput,
  Response_LoginOutput_,
  ValidationError,
  HTTPValidationError,
  EmailVerificationInput,
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
  auth_token,
  ReadAccountOutput,
  Response_ReadAccountOutput_,
  EditAccountInput,
  Response_bool_,
  Body_upload_account_image_account__account_id__upload_patch,
  Account,
  Response_Sequence_Account__,
  role,
  Response_str_,
  BatchDownloadInput,
  BatchDownloadOutput,
  Response_Sequence_BatchDownloadOutput__,
  WeekTimeRange,
  StadiumSearchParameters,
  PlaceType,
  BusinessHour,
  ViewStadium,
  Response_Sequence_ViewStadium__,
  Response_ViewStadium_,
  City,
  Response_Sequence_City__,
  sport_id,
  is_reservable,
  VenueAvailableSortBy,
  sort_by,
  Sorter,
  order,
  FeeType,
  Venue,
  Response_Sequence_Venue__,
  Response_Venue_,
  Court,
  Response_Sequence_Court__,
  District,
  Response_Sequence_District__,
  BrowseAlbumInput,
  BrowseAlbumOutput,
  Response_Sequence_BrowseAlbumOutput__,
  Sport,
  Response_Sequence_Sport__,
  DateTimeRange,
  TechnicalType,
  BrowseReservationSortBy,
  app__processor__http__reservation__BrowseReservationParameters,
  Reservation,
  Response_Sequence_Reservation__,
  ViewMyReservationSortBy,
  sort_by__2,
  ReservationStatus,
  ViewMyReservation,
  Response_Sequence_ViewMyReservation__,
  Response_Reservation_,
  app__processor__http__court__BrowseReservationParameters,
  AddReservationInput,
  AddReservationOutput,
  Response_AddReservationOutput_,
  Response_Sequence_BusinessHour__,
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
        schema: auth_token,
      },
    ],
    response: Response_ReadAccountOutput_,
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
    path: '/account/:account_id',
    alias: 'edit_account_account__account_id__patch',
    requestFormat: 'json',
    parameters: [
      {
        name: 'body',
        type: 'Body',
        schema: EditAccountInput,
      },
      {
        name: 'account_id',
        type: 'Path',
        schema: z.number().int(),
      },
      {
        name: 'auth-token',
        type: 'Header',
        schema: auth_token,
      },
    ],
    response: Response_bool_,
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
    path: '/account/:account_id/upload',
    alias: 'upload_account_image_account__account_id__upload_patch',
    requestFormat: 'form-data',
    parameters: [
      {
        name: 'body',
        type: 'Body',
        schema: z.object({ image: z.instanceof(File) }).passthrough(),
      },
      {
        name: 'account_id',
        type: 'Path',
        schema: z.number().int(),
      },
      {
        name: 'auth-token',
        type: 'Header',
        schema: auth_token,
      },
    ],
    response: Response_bool_,
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
    path: '/account/search',
    alias: 'search_account_account_search_get',
    requestFormat: 'json',
    parameters: [
      {
        name: 'query',
        type: 'Query',
        schema: z.string(),
      },
      {
        name: 'auth-token',
        type: 'Header',
        schema: auth_token,
      },
    ],
    response: Response_Sequence_Account__,
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
    path: '/album',
    alias: 'browse_album_album_get',
    requestFormat: 'json',
    parameters: [
      {
        name: 'body',
        type: 'Body',
        schema: BrowseAlbumInput,
      },
    ],
    response: Response_Sequence_BrowseAlbumOutput__,
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
    path: '/auth',
    alias: 'auth_auth_get',
    requestFormat: 'json',
    response: z.unknown(),
  },
  {
    method: 'get',
    path: '/business-hour',
    alias: 'browse_business_hour_business_hour_get',
    requestFormat: 'json',
    parameters: [
      {
        name: 'place_type',
        type: 'Query',
        schema: z.enum(['STADIUM', 'VENUE']),
      },
      {
        name: 'place_id',
        type: 'Query',
        schema: z.number().int(),
      },
    ],
    response: Response_Sequence_BusinessHour__,
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
    path: '/city',
    alias: 'browse_city_city_get',
    requestFormat: 'json',
    response: Response_Sequence_City__,
  },
  {
    method: 'post',
    path: '/court/:court_id/reservation',
    alias: 'add_reservation_court__court_id__reservation_post',
    requestFormat: 'json',
    parameters: [
      {
        name: 'body',
        type: 'Body',
        schema: AddReservationInput,
      },
      {
        name: 'court_id',
        type: 'Path',
        schema: z.number().int(),
      },
      {
        name: 'auth-token',
        type: 'Header',
        schema: auth_token,
      },
    ],
    response: Response_AddReservationOutput_,
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
    path: '/court/:court_id/reservation/browse',
    alias: 'browse_reservation_by_court_id_court__court_id__reservation_browse_post',
    description: `這隻 func 如果給了 start_date 會直接 return start_date ~ start_date + 7 的資料，
要透過 time range 搜尋的話要給 start_date &#x3D; null

time format 要給 naive datetime, e.g. &#x60;2023-11-11T11:11:11&#x60;`,
    requestFormat: 'json',
    parameters: [
      {
        name: 'body',
        type: 'Body',
        schema: app__processor__http__court__BrowseReservationParameters,
      },
      {
        name: 'court_id',
        type: 'Path',
        schema: z.number().int(),
      },
    ],
    response: Response,
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
    path: '/district',
    alias: 'browse_district_district_get',
    requestFormat: 'json',
    parameters: [
      {
        name: 'city_id',
        type: 'Query',
        schema: z.number().int(),
      },
    ],
    response: Response_Sequence_District__,
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
    path: '/email-verification',
    alias: 'email_verification_email_verification_get',
    requestFormat: 'json',
    parameters: [
      {
        name: 'body',
        type: 'Body',
        schema: z.object({ code: z.string().uuid() }).passthrough(),
      },
    ],
    response: Response_EmailVerificationOutput_,
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
    path: '/email-verification',
    alias: 'email_verification_email_verification_post',
    requestFormat: 'json',
    parameters: [
      {
        name: 'body',
        type: 'Body',
        schema: z.object({ code: z.string().uuid() }).passthrough(),
      },
    ],
    response: Response_EmailVerificationOutput_,
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
    path: '/file/download',
    alias: 'read_file_file_download_get',
    requestFormat: 'json',
    parameters: [
      {
        name: 'file_uuid',
        type: 'Query',
        schema: z.string().uuid(),
      },
      {
        name: 'auth-token',
        type: 'Header',
        schema: auth_token,
      },
    ],
    response: Response_str_,
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
    path: '/file/download/batch',
    alias: 'batch_download_files_file_download_batch_get',
    requestFormat: 'json',
    parameters: [
      {
        name: 'body',
        type: 'Body',
        schema: BatchDownloadInput,
      },
      {
        name: 'auth-token',
        type: 'Header',
        schema: auth_token,
      },
    ],
    response: Response_Sequence_BatchDownloadOutput__,
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
    path: '/google-login',
    alias: 'google_login_google_login_get',
    requestFormat: 'json',
    parameters: [
      {
        name: 'role',
        type: 'Query',
        schema: role,
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
    path: '/reservation/:reservation_id',
    alias: 'read_reservation_reservation__reservation_id__get',
    requestFormat: 'json',
    parameters: [
      {
        name: 'reservation_id',
        type: 'Path',
        schema: z.number().int(),
      },
    ],
    response: Response_Reservation_,
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
    path: '/reservation/code/:invitation_code',
    alias: 'join_reservation_reservation_code__invitation_code__post',
    requestFormat: 'json',
    parameters: [
      {
        name: 'invitation_code',
        type: 'Path',
        schema: z.string(),
      },
    ],
    response: Response_bool_,
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
    path: '/sport',
    alias: 'browse_sport_sport_get',
    requestFormat: 'json',
    response: Response_Sequence_Sport__,
  },
  {
    method: 'get',
    path: '/stadium/:stadium_id',
    alias: 'read_stadium_stadium__stadium_id__get',
    requestFormat: 'json',
    parameters: [
      {
        name: 'stadium_id',
        type: 'Path',
        schema: z.number().int(),
      },
    ],
    response: Response_ViewStadium_,
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
    path: '/stadium/browse',
    alias: 'browse_stadium_stadium_browse_post',
    requestFormat: 'json',
    parameters: [
      {
        name: 'body',
        type: 'Body',
        schema: StadiumSearchParameters,
      },
    ],
    response: Response_Sequence_ViewStadium__,
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
    path: '/venue',
    alias: 'browse_venue_venue_get',
    requestFormat: 'json',
    parameters: [
      {
        name: 'name',
        type: 'Query',
        schema: auth_token,
      },
      {
        name: 'sport_id',
        type: 'Query',
        schema: sport_id,
      },
      {
        name: 'is_reservable',
        type: 'Query',
        schema: is_reservable,
      },
      {
        name: 'sort_by',
        type: 'Query',
        schema: sort_by,
      },
      {
        name: 'order',
        type: 'Query',
        schema: order,
      },
      {
        name: 'limit',
        type: 'Query',
        schema: z.number().int().optional().default(10),
      },
      {
        name: 'offset',
        type: 'Query',
        schema: z.number().int().optional(),
      },
    ],
    response: Response_Sequence_Venue__,
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
    path: '/venue/:venue_id',
    alias: 'read_venue_venue__venue_id__get',
    requestFormat: 'json',
    parameters: [
      {
        name: 'venue_id',
        type: 'Path',
        schema: z.number().int(),
      },
    ],
    response: Response_Venue_,
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
    path: '/venue/:venue_id/court',
    alias: 'browse_court_by_venue_id_venue__venue_id__court_get',
    requestFormat: 'json',
    parameters: [
      {
        name: 'venue_id',
        type: 'Path',
        schema: z.number().int(),
      },
    ],
    response: Response_Sequence_Court__,
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
    path: '/view/reservation',
    alias: 'browse_reservation_view_reservation_post',
    requestFormat: 'json',
    parameters: [
      {
        name: 'body',
        type: 'Body',
        schema: app__processor__http__reservation__BrowseReservationParameters,
      },
    ],
    response: Response_Sequence_Reservation__,
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
    path: '/view/reservation',
    alias: 'view_my_reservation_view_reservation_get',
    requestFormat: 'json',
    parameters: [
      {
        name: 'account_id',
        type: 'Query',
        schema: z.number().int(),
      },
      {
        name: 'sort_by',
        type: 'Query',
        schema: sort_by__2,
      },
      {
        name: 'order',
        type: 'Query',
        schema: order,
      },
      {
        name: 'limit',
        type: 'Query',
        schema: z.number().int().optional().default(10),
      },
      {
        name: 'offset',
        type: 'Query',
        schema: z.number().int().optional(),
      },
      {
        name: 'auth-token',
        type: 'Header',
        schema: auth_token,
      },
    ],
    response: Response_Sequence_ViewMyReservation__,
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
