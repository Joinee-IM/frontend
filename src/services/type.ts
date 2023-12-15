import { makeApi, Zodios, type ZodiosOptions } from '@zodios/core';
import { z } from 'zod';

const HealthCheckOutput = z
  .object({ health: z.union([z.string(), z.null()]).default('ok') })
  .partial()
  .passthrough();
const ErrorMessage = z.enum([
  'AckException',
  'NotFound',
  'UniqueViolationError',
  'LoginExpired',
  'LoginFailed',
  'NoPermission',
  'EmailExists',
  'IllegalInput',
  'CourtReserved',
  'ReservationFull',
  'WrongPassword',
  'VenueUnreservable',
  'CourtUnreservable',
]);
const Response_HealthCheckOutput_ = z
  .object({
    data: z.union([HealthCheckOutput, z.null()]),
    error: z.union([ErrorMessage, z.null()]),
  })
  .partial()
  .passthrough();
const LoginInput = z.object({ email: z.string().email(), password: z.string() }).passthrough();
const RoleType = z.enum(['PROVIDER', 'NORMAL']);
const LoginOutput = z
  .object({ account_id: z.number().int(), token: z.string(), role: RoleType })
  .passthrough();
const Response_LoginOutput_ = z
  .object({ data: z.union([LoginOutput, z.null()]), error: z.union([ErrorMessage, z.null()]) })
  .partial()
  .passthrough();
const ValidationError = z
  .object({ loc: z.array(z.union([z.string(), z.number()])), msg: z.string(), type: z.string() })
  .passthrough();
const HTTPValidationError = z
  .object({ detail: z.array(ValidationError) })
  .partial()
  .passthrough();
const Response = z
  .object({ data: z.union([z.unknown(), z.null()]), error: z.union([ErrorMessage, z.null()]) })
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
    error: z.union([ErrorMessage, z.null()]),
  })
  .partial()
  .passthrough();
const GenderType = z.enum(['MALE', 'FEMALE', 'UNREVEALED']);
const AddAccountInput = z
  .object({
    email: z.string().email(),
    password: z.string(),
    gender: z.union([GenderType, z.null()]).optional(),
    role: RoleType,
  })
  .passthrough();
const AddAccountOutput = z.object({ id: z.number().int() }).passthrough();
const Response_AddAccountOutput_ = z
  .object({ data: z.union([AddAccountOutput, z.null()]), error: z.union([ErrorMessage, z.null()]) })
  .partial()
  .passthrough();
const ResendEmailVerificationInput = z.object({ email: z.string().email() }).passthrough();
const ForgetPasswordInput = z.object({ email: z.string().email() }).passthrough();
const ResetPasswordInput = z.object({ code: z.string(), password: z.string() }).passthrough();
const auth_token = z.union([z.string(), z.null()]).optional();
const ReadAccountOutput = z
  .object({
    id: z.number().int(),
    email: z.string().email(),
    nickname: z.string(),
    gender: z.union([GenderType, z.null()]),
    image_uuid: z.union([z.string(), z.null()]),
    role: RoleType,
    is_verified: z.boolean(),
    is_google_login: z.boolean(),
    image_url: z.union([z.string(), z.null()]),
  })
  .passthrough();
const Response_ReadAccountOutput_ = z
  .object({
    data: z.union([ReadAccountOutput, z.null()]),
    error: z.union([ErrorMessage, z.null()]),
  })
  .partial()
  .passthrough();
const EditAccountInput = z
  .object({
    nickname: z.union([z.string(), z.null()]),
    gender: z.union([GenderType, z.null()]),
    role: z.union([RoleType, z.null()]),
  })
  .partial()
  .passthrough();
const Response_bool_ = z
  .object({ data: z.union([z.boolean(), z.null()]), error: z.union([ErrorMessage, z.null()]) })
  .partial()
  .passthrough();
const Body_upload_account_image_api_account__account_id__upload_patch = z
  .object({ image: z.instanceof(File) })
  .passthrough();
const SearchAccountInput = z.object({ query: z.string() }).passthrough();
const Account = z
  .object({
    id: z.number().int(),
    email: z.string().email(),
    nickname: z.string(),
    gender: z.union([GenderType, z.null()]),
    image_uuid: z.union([z.string(), z.null()]),
    role: RoleType,
    is_verified: z.boolean(),
    is_google_login: z.boolean(),
  })
  .passthrough();
const Response_Sequence_Account__ = z
  .object({ data: z.union([z.array(Account), z.null()]), error: z.union([ErrorMessage, z.null()]) })
  .partial()
  .passthrough();
const EditPasswordInput = z
  .object({ old_password: z.string(), new_password: z.string() })
  .passthrough();
const role = z.union([RoleType, z.null()]).optional();
const Response_str_ = z
  .object({ data: z.union([z.string(), z.null()]), error: z.union([ErrorMessage, z.null()]) })
  .partial()
  .passthrough();
const BatchDownloadInput = z.object({ file_uuids: z.array(z.string()) }).passthrough();
const BatchDownloadOutput = z
  .object({ file_uuid: z.string().uuid(), sign_url: z.string() })
  .passthrough();
const Response_Sequence_BatchDownloadOutput__ = z
  .object({
    data: z.union([z.array(BatchDownloadOutput), z.null()]),
    error: z.union([ErrorMessage, z.null()]),
  })
  .partial()
  .passthrough();
const WeekTimeRange = z
  .object({ weekday: z.number().int(), start_time: z.string(), end_time: z.string() })
  .passthrough();
const StadiumSearchParameters = z
  .object({
    name: z.union([z.string(), z.null()]),
    city_id: z.union([z.number(), z.null()]),
    district_id: z.union([z.number(), z.null()]),
    sport_id: z.union([z.number(), z.null()]),
    time_ranges: z.union([z.array(WeekTimeRange), z.null()]),
    limit: z.number().int().gt(0).lt(50).default(10),
    offset: z.number().int().gte(0),
  })
  .partial()
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
    owner_id: z.number().int(),
    address: z.string(),
    contact_number: z.union([z.string(), z.null()]),
    description: z.union([z.string(), z.null()]),
    long: z.number(),
    lat: z.number(),
    is_published: z.boolean(),
    city: z.string(),
    district: z.string(),
    sports: z.union([z.array(z.string()), z.null()]).optional(),
    business_hours: z.array(BusinessHour),
  })
  .passthrough();
const BrowseStadiumOutput = z
  .object({
    data: z.array(ViewStadium),
    total_count: z.number().int(),
    limit: z.number().int(),
    offset: z.number().int(),
  })
  .passthrough();
const Response_BrowseStadiumOutput_ = z
  .object({
    data: z.union([BrowseStadiumOutput, z.null()]),
    error: z.union([ErrorMessage, z.null()]),
  })
  .partial()
  .passthrough();
const BatchEditStadiumInput = z
  .object({
    stadium_ids: z.array(z.number()),
    is_published: z.union([z.boolean(), z.null()]).optional(),
  })
  .passthrough();
const Response_ViewStadium_ = z
  .object({ data: z.union([ViewStadium, z.null()]), error: z.union([ErrorMessage, z.null()]) })
  .partial()
  .passthrough();
const EditStadiumInput = z
  .object({
    name: z.union([z.string(), z.null()]),
    address: z.union([z.string(), z.null()]),
    contact_number: z.union([z.string(), z.null()]),
    time_ranges: z.union([z.array(WeekTimeRange), z.null()]),
    is_published: z.union([z.boolean(), z.null()]),
  })
  .partial()
  .passthrough();
const AddStadiumInput = z
  .object({
    name: z.string(),
    address: z.string(),
    district_id: z.number().int(),
    business_hours: z.array(WeekTimeRange),
    contact_number: z.union([z.string(), z.null()]).optional(),
    description: z.union([z.string(), z.null()]).optional(),
  })
  .passthrough();
const AddStadiumOutput = z.object({ id: z.number().int() }).passthrough();
const Response_AddStadiumOutput_ = z
  .object({ data: z.union([AddStadiumOutput, z.null()]), error: z.union([ErrorMessage, z.null()]) })
  .partial()
  .passthrough();
const ValidateAddressOutput = z.object({ long: z.number(), lat: z.number() }).passthrough();
const Response_ValidateAddressOutput_ = z
  .object({
    data: z.union([ValidateAddressOutput, z.null()]),
    error: z.union([ErrorMessage, z.null()]),
  })
  .partial()
  .passthrough();
const City = z.object({ id: z.number().int(), name: z.string() }).passthrough();
const Response_Sequence_City__ = z
  .object({ data: z.union([z.array(City), z.null()]), error: z.union([ErrorMessage, z.null()]) })
  .partial()
  .passthrough();
const stadium_id = z.union([z.number(), z.null()]).optional();
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
    capacity: z.number().int(),
    sport_equipments: z.union([z.string(), z.null()]),
    facilities: z.union([z.string(), z.null()]),
    court_count: z.number().int(),
    court_type: z.string(),
    sport_id: z.number().int(),
    is_published: z.boolean(),
  })
  .passthrough();
const BrowseVenueOutput = z
  .object({
    data: z.array(Venue),
    total_count: z.number().int(),
    limit: z.number().int(),
    offset: z.number().int(),
  })
  .passthrough();
const Response_BrowseVenueOutput_ = z
  .object({
    data: z.union([BrowseVenueOutput, z.null()]),
    error: z.union([ErrorMessage, z.null()]),
  })
  .partial()
  .passthrough();
const AddVenueInput = z
  .object({
    stadium_id: z.number().int(),
    name: z.string(),
    floor: z.string(),
    reservation_interval: z.union([z.number(), z.null()]),
    is_reservable: z.boolean(),
    is_chargeable: z.boolean(),
    fee_rate: z.union([z.number(), z.null()]),
    fee_type: z.union([FeeType, z.null()]),
    area: z.number().int(),
    capacity: z.number().int(),
    sport_equipments: z.union([z.string(), z.null()]),
    facilities: z.union([z.string(), z.null()]),
    court_count: z.number().int(),
    court_type: z.string(),
    sport_id: z.number().int(),
    business_hours: z.array(WeekTimeRange),
  })
  .passthrough();
const AddVenueOutput = z.object({ id: z.number().int() }).passthrough();
const Response_AddVenueOutput_ = z
  .object({ data: z.union([AddVenueOutput, z.null()]), error: z.union([ErrorMessage, z.null()]) })
  .partial()
  .passthrough();
const BatchEditVenueInput = z
  .object({ venue_ids: z.array(z.number()), is_published: z.boolean() })
  .passthrough();
const ReadVenueOutput = z
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
    capacity: z.number().int(),
    sport_equipments: z.union([z.string(), z.null()]),
    facilities: z.union([z.string(), z.null()]),
    court_count: z.number().int(),
    court_type: z.string(),
    sport_id: z.number().int(),
    is_published: z.boolean(),
    sport_name: z.string(),
  })
  .passthrough();
const Response_ReadVenueOutput_ = z
  .object({ data: z.union([ReadVenueOutput, z.null()]), error: z.union([ErrorMessage, z.null()]) })
  .partial()
  .passthrough();
const EditVenueInput = z
  .object({
    name: z.union([z.string(), z.null()]),
    floor: z.union([z.string(), z.null()]),
    area: z.union([z.number(), z.null()]),
    capacity: z.union([z.number(), z.null()]),
    sport_id: z.union([z.number(), z.null()]),
    is_reservable: z.union([z.boolean(), z.null()]),
    reservation_interval: z.union([z.number(), z.null()]),
    is_chargeable: z.union([z.boolean(), z.null()]),
    fee_rate: z.union([z.number(), z.null()]),
    fee_type: z.union([FeeType, z.null()]),
    sport_equipments: z.union([z.string(), z.null()]),
    facilities: z.union([z.string(), z.null()]),
    court_type: z.union([z.string(), z.null()]),
  })
  .partial()
  .passthrough();
const DateTimeRange = z
  .object({
    start_time: z.string().datetime({ offset: true }),
    end_time: z.string().datetime({ offset: true }),
  })
  .passthrough();
const BrowseCourtByVenueIdParams = z
  .object({ time_ranges: z.union([z.array(DateTimeRange), z.null()]) })
  .partial()
  .passthrough();
const Court = z
  .object({
    id: z.number().int(),
    venue_id: z.number().int(),
    number: z.number().int(),
    is_published: z.boolean(),
  })
  .passthrough();
const Response_Sequence_Court__ = z
  .object({ data: z.union([z.array(Court), z.null()]), error: z.union([ErrorMessage, z.null()]) })
  .partial()
  .passthrough();
const District = z
  .object({ id: z.number().int(), name: z.string(), city_id: z.number().int() })
  .passthrough();
const Response_Sequence_District__ = z
  .object({
    data: z.union([z.array(District), z.null()]),
    error: z.union([ErrorMessage, z.null()]),
  })
  .partial()
  .passthrough();
const BrowseAlbumOutput = z.object({ file_uuid: z.string().uuid(), url: z.string() }).passthrough();
const Response_Sequence_BrowseAlbumOutput__ = z
  .object({
    data: z.union([z.array(BrowseAlbumOutput), z.null()]),
    error: z.union([ErrorMessage, z.null()]),
  })
  .partial()
  .passthrough();
const Body_add_album_api_album_post = z.object({ file: z.instanceof(File) }).passthrough();
const Response_BrowseAlbumOutput_ = z
  .object({
    data: z.union([BrowseAlbumOutput, z.null()]),
    error: z.union([ErrorMessage, z.null()]),
  })
  .partial()
  .passthrough();
const Body_batch_add_album_api_album_batch_post = z
  .object({ files: z.array(z.instanceof(File)) })
  .passthrough();
const BatchDeleteAlbumInput = z
  .object({ place_type: PlaceType, place_id: z.number().int(), uuids: z.array(z.string()) })
  .passthrough();
const Sport = z.object({ id: z.number().int(), name: z.string() }).passthrough();
const Response_Sequence_Sport__ = z
  .object({ data: z.union([z.array(Sport), z.null()]), error: z.union([ErrorMessage, z.null()]) })
  .partial()
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
    google_event_id: z.union([z.string(), z.null()]).optional(),
  })
  .passthrough();
const app__processor__http__reservation__BrowseReservationOutput = z
  .object({
    data: z.array(Reservation),
    total_count: z.number().int(),
    limit: z.number().int(),
    offset: z.number().int(),
  })
  .passthrough();
const app__utils__response__Response_BrowseReservationOutput___1 = z
  .object({
    data: z.union([app__processor__http__reservation__BrowseReservationOutput, z.null()]),
    error: z.union([ErrorMessage, z.null()]),
  })
  .partial()
  .passthrough();
const ReservationMemberStatus = z.enum(['JOINED', 'INVITED', 'REJECTED']);
const ReservationMemberSource = z.enum(['SEARCH', 'INVITATION_CODE']);
const ReservationMember = z
  .object({
    reservation_id: z.number().int(),
    account_id: z.number().int(),
    is_manager: z.boolean(),
    status: ReservationMemberStatus,
    source: ReservationMemberSource,
  })
  .passthrough();
const ReadReservationOutput = z
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
    google_event_id: z.union([z.string(), z.null()]).optional(),
    members: z.array(ReservationMember),
  })
  .passthrough();
const Response_ReadReservationOutput_ = z
  .object({
    data: z.union([ReadReservationOutput, z.null()]),
    error: z.union([ErrorMessage, z.null()]),
  })
  .partial()
  .passthrough();
const EditReservationInput = z
  .object({
    court_id: z.union([z.number(), z.null()]),
    start_time: z.union([z.string(), z.null()]),
    end_time: z.union([z.string(), z.null()]),
    vacancy: z.union([z.number(), z.null()]),
    technical_levels: z.union([z.array(TechnicalType), z.null()]),
    remark: z.union([z.string(), z.null()]),
  })
  .partial()
  .passthrough();
const ReservationMemberWithName = z
  .object({
    reservation_id: z.number().int(),
    account_id: z.number().int(),
    is_manager: z.boolean(),
    status: ReservationMemberStatus,
    source: ReservationMemberSource,
    nickname: z.string(),
  })
  .passthrough();
const Response_Sequence_ReservationMemberWithName__ = z
  .object({
    data: z.union([z.array(ReservationMemberWithName), z.null()]),
    error: z.union([ErrorMessage, z.null()]),
  })
  .partial()
  .passthrough();
const BatchEditCourtInput = z
  .object({ court_ids: z.array(z.number()), is_published: z.union([z.boolean(), z.null()]) })
  .passthrough();
const app__processor__http__court__BrowseReservationParameters = z
  .object({
    time_ranges: z.union([z.array(DateTimeRange), z.null()]),
    start_date: z.union([z.string(), z.null()]),
  })
  .partial()
  .passthrough();
const app__processor__http__court__BrowseReservationOutput = z
  .object({ start_date: z.string(), reservations: z.array(Reservation) })
  .passthrough();
const app__utils__response__Response_BrowseReservationOutput___2 = z
  .object({
    data: z.union([app__processor__http__court__BrowseReservationOutput, z.null()]),
    error: z.union([ErrorMessage, z.null()]),
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
    error: z.union([ErrorMessage, z.null()]),
  })
  .partial()
  .passthrough();
const EditCourtInput = z
  .object({ is_published: z.union([z.boolean(), z.null()]) })
  .partial()
  .passthrough();
const AddCourtInput = z.object({ venue_id: z.number().int(), add: z.number().int() }).passthrough();
const Response_Sequence_BusinessHour__ = z
  .object({
    data: z.union([z.array(BusinessHour), z.null()]),
    error: z.union([ErrorMessage, z.null()]),
  })
  .partial()
  .passthrough();
const ReservationStatus = z.enum(['IN_PROGRESS', 'CANCELLED', 'FINISHED']);
const ViewMyReservationSortBy = z.enum([
  'time',
  'stadium_name',
  'venue_name',
  'is_manager',
  'vacancy',
  'status',
]);
const ViewMyReservationParams = z
  .object({
    account_id: z.number().int(),
    is_manager: z.union([z.boolean(), z.null()]).optional(),
    time_ranges: z.union([z.array(DateTimeRange), z.null()]).optional(),
    has_vacancy: z.union([z.boolean(), z.null()]).optional(),
    member_status: z.union([ReservationMemberStatus, z.null()]).optional(),
    reservation_status: z.union([ReservationStatus, z.null()]).optional(),
    source: z.union([ReservationMemberSource, z.null()]).optional(),
    sort_by: ViewMyReservationSortBy.optional().default('time'),
    order: Sorter.optional().default('DESC'),
    limit: z.number().int().gt(0).lt(50).optional().default(10),
    offset: z.number().int().gte(0).optional(),
  })
  .passthrough();
const ViewMyReservation = z
  .object({
    reservation_id: z.number().int(),
    start_time: z.string().datetime({ offset: true }),
    end_time: z.string().datetime({ offset: true }),
    stadium_name: z.string(),
    venue_name: z.string(),
    is_manager: z.boolean(),
    manager_name: z.string(),
    vacancy: z.number().int(),
    status: ReservationStatus,
  })
  .passthrough();
const ViewMyReservationOutput = z
  .object({
    data: z.array(ViewMyReservation),
    total_count: z.number().int(),
    limit: z.number().int(),
    offset: z.number().int(),
  })
  .passthrough();
const Response_ViewMyReservationOutput_ = z
  .object({
    data: z.union([ViewMyReservationOutput, z.null()]),
    error: z.union([ErrorMessage, z.null()]),
  })
  .partial()
  .passthrough();
const ViewProviderStadiumSortBy = z.enum([
  'district_name',
  'stadium_name',
  'venue_count',
  'is_published',
]);
const sort_by__2 = ViewProviderStadiumSortBy.optional().default('district_name');
const order__2 = Sorter.optional().default('ASC');
const ViewProviderStadium = z
  .object({
    stadium_id: z.number().int(),
    city_name: z.string(),
    district_name: z.string(),
    stadium_name: z.string(),
    venue_count: z.number().int(),
    is_published: z.boolean(),
  })
  .passthrough();
const ViewProviderStadiumOutput = z
  .object({
    data: z.array(ViewProviderStadium),
    total_count: z.number().int(),
    limit: z.union([z.number(), z.null()]),
    offset: z.union([z.number(), z.null()]),
  })
  .passthrough();
const Response_ViewProviderStadiumOutput_ = z
  .object({
    data: z.union([ViewProviderStadiumOutput, z.null()]),
    error: z.union([ErrorMessage, z.null()]),
  })
  .partial()
  .passthrough();
const ViewProviderVenueSortBy = z.enum([
  'stadium_name',
  'venue_name',
  'court_count',
  'area',
  'is_published',
]);
const sort_by__3 = ViewProviderVenueSortBy.optional().default('stadium_name');
const ViewProviderVenue = z
  .object({
    venue_id: z.number().int(),
    stadium_name: z.string(),
    venue_name: z.string(),
    court_count: z.number().int(),
    area: z.number().int(),
    is_published: z.boolean(),
  })
  .passthrough();
const ViewProviderVenueOutput = z
  .object({
    data: z.array(ViewProviderVenue),
    total_count: z.number().int(),
    limit: z.union([z.number(), z.null()]),
    offset: z.union([z.number(), z.null()]),
  })
  .passthrough();
const Response_ViewProviderVenueOutput_ = z
  .object({
    data: z.union([ViewProviderVenueOutput, z.null()]),
    error: z.union([ErrorMessage, z.null()]),
  })
  .partial()
  .passthrough();
const ViewProviderCourtSortBy = z.enum(['stadium_name', 'venue_name', 'number', 'is_published']);
const sort_by__4 = ViewProviderCourtSortBy.optional().default('stadium_name');
const ViewProviderCourt = z
  .object({
    court_id: z.number().int(),
    stadium_name: z.string(),
    venue_name: z.string(),
    court_number: z.number().int(),
    is_published: z.boolean(),
  })
  .passthrough();
const ViewProviderCourtOutput = z
  .object({
    data: z.array(ViewProviderCourt),
    total_count: z.number().int(),
    limit: z.union([z.number(), z.null()]),
    offset: z.union([z.number(), z.null()]),
  })
  .passthrough();
const Response_ViewProviderCourtOutput_ = z
  .object({
    data: z.union([ViewProviderCourtOutput, z.null()]),
    error: z.union([ErrorMessage, z.null()]),
  })
  .partial()
  .passthrough();

export const schemas = {
  HealthCheckOutput,
  ErrorMessage,
  Response_HealthCheckOutput_,
  LoginInput,
  RoleType,
  LoginOutput,
  Response_LoginOutput_,
  ValidationError,
  HTTPValidationError,
  Response,
  EmailVerificationInput,
  EmailVerificationOutput,
  Response_EmailVerificationOutput_,
  GenderType,
  AddAccountInput,
  AddAccountOutput,
  Response_AddAccountOutput_,
  ResendEmailVerificationInput,
  ForgetPasswordInput,
  ResetPasswordInput,
  auth_token,
  ReadAccountOutput,
  Response_ReadAccountOutput_,
  EditAccountInput,
  Response_bool_,
  Body_upload_account_image_api_account__account_id__upload_patch,
  SearchAccountInput,
  Account,
  Response_Sequence_Account__,
  EditPasswordInput,
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
  BrowseStadiumOutput,
  Response_BrowseStadiumOutput_,
  BatchEditStadiumInput,
  Response_ViewStadium_,
  EditStadiumInput,
  AddStadiumInput,
  AddStadiumOutput,
  Response_AddStadiumOutput_,
  ValidateAddressOutput,
  Response_ValidateAddressOutput_,
  City,
  Response_Sequence_City__,
  stadium_id,
  is_reservable,
  VenueAvailableSortBy,
  sort_by,
  Sorter,
  order,
  FeeType,
  Venue,
  BrowseVenueOutput,
  Response_BrowseVenueOutput_,
  AddVenueInput,
  AddVenueOutput,
  Response_AddVenueOutput_,
  BatchEditVenueInput,
  ReadVenueOutput,
  Response_ReadVenueOutput_,
  EditVenueInput,
  DateTimeRange,
  BrowseCourtByVenueIdParams,
  Court,
  Response_Sequence_Court__,
  District,
  Response_Sequence_District__,
  BrowseAlbumOutput,
  Response_Sequence_BrowseAlbumOutput__,
  Body_add_album_api_album_post,
  Response_BrowseAlbumOutput_,
  Body_batch_add_album_api_album_batch_post,
  BatchDeleteAlbumInput,
  Sport,
  Response_Sequence_Sport__,
  TechnicalType,
  BrowseReservationSortBy,
  app__processor__http__reservation__BrowseReservationParameters,
  Reservation,
  app__processor__http__reservation__BrowseReservationOutput,
  app__utils__response__Response_BrowseReservationOutput___1,
  ReservationMemberStatus,
  ReservationMemberSource,
  ReservationMember,
  ReadReservationOutput,
  Response_ReadReservationOutput_,
  EditReservationInput,
  ReservationMemberWithName,
  Response_Sequence_ReservationMemberWithName__,
  BatchEditCourtInput,
  app__processor__http__court__BrowseReservationParameters,
  app__processor__http__court__BrowseReservationOutput,
  app__utils__response__Response_BrowseReservationOutput___2,
  AddReservationInput,
  AddReservationOutput,
  Response_AddReservationOutput_,
  EditCourtInput,
  AddCourtInput,
  Response_Sequence_BusinessHour__,
  ReservationStatus,
  ViewMyReservationSortBy,
  ViewMyReservationParams,
  ViewMyReservation,
  ViewMyReservationOutput,
  Response_ViewMyReservationOutput_,
  ViewProviderStadiumSortBy,
  sort_by__2,
  order__2,
  ViewProviderStadium,
  ViewProviderStadiumOutput,
  Response_ViewProviderStadiumOutput_,
  ViewProviderVenueSortBy,
  sort_by__3,
  ViewProviderVenue,
  ViewProviderVenueOutput,
  Response_ViewProviderVenueOutput_,
  ViewProviderCourtSortBy,
  sort_by__4,
  ViewProviderCourt,
  ViewProviderCourtOutput,
  Response_ViewProviderCourtOutput_,
};

const endpoints = makeApi([
  {
    method: 'post',
    path: '/api/account',
    alias: 'add_account_api_account_post',
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
    path: '/api/account/:account_id',
    alias: 'read_account_api_account__account_id__get',
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
    path: '/api/account/:account_id',
    alias: 'edit_account_api_account__account_id__patch',
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
    path: '/api/account/:account_id/password',
    alias: 'edit_password_api_account__account_id__password_patch',
    requestFormat: 'json',
    parameters: [
      {
        name: 'body',
        type: 'Body',
        schema: EditPasswordInput,
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
    method: 'patch',
    path: '/api/account/:account_id/upload',
    alias: 'upload_account_image_api_account__account_id__upload_patch',
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
    method: 'post',
    path: '/api/account/search',
    alias: 'search_account_api_account_search_post',
    requestFormat: 'json',
    parameters: [
      {
        name: 'body',
        type: 'Body',
        schema: z.object({ query: z.string() }).passthrough(),
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
    path: '/api/album',
    alias: 'browse_album_api_album_get',
    requestFormat: 'json',
    parameters: [
      {
        name: 'place_id',
        type: 'Query',
        schema: z.number().int(),
      },
      {
        name: 'place_type',
        type: 'Query',
        schema: z.enum(['STADIUM', 'VENUE']),
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
    method: 'post',
    path: '/api/album',
    alias: 'add_album_api_album_post',
    requestFormat: 'form-data',
    parameters: [
      {
        name: 'body',
        type: 'Body',
        schema: z.object({ file: z.instanceof(File) }).passthrough(),
      },
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
      {
        name: 'auth-token',
        type: 'Header',
        schema: auth_token,
      },
    ],
    response: Response_BrowseAlbumOutput_,
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
    path: '/api/album/batch',
    alias: 'batch_add_album_api_album_batch_post',
    requestFormat: 'form-data',
    parameters: [
      {
        name: 'body',
        type: 'Body',
        schema: Body_batch_add_album_api_album_batch_post,
      },
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
      {
        name: 'auth-token',
        type: 'Header',
        schema: auth_token,
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
    method: 'delete',
    path: '/api/album/batch',
    alias: 'batch_delete_album_api_album_batch_delete',
    requestFormat: 'json',
    parameters: [
      {
        name: 'body',
        type: 'Body',
        schema: BatchDeleteAlbumInput,
      },
      {
        name: 'auth-token',
        type: 'Header',
        schema: auth_token,
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
    path: '/api/business-hour',
    alias: 'browse_business_hour_api_business_hour_get',
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
    path: '/api/city',
    alias: 'browse_city_api_city_get',
    requestFormat: 'json',
    response: Response_Sequence_City__,
  },
  {
    method: 'post',
    path: '/api/court',
    alias: 'batch_add_court_api_court_post',
    requestFormat: 'json',
    parameters: [
      {
        name: 'body',
        type: 'Body',
        schema: AddCourtInput,
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
    path: '/api/court/:court_id',
    alias: 'edit_court_api_court__court_id__patch',
    requestFormat: 'json',
    parameters: [
      {
        name: 'body',
        type: 'Body',
        schema: EditCourtInput,
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
    method: 'post',
    path: '/api/court/:court_id/reservation',
    alias: 'add_reservation_api_court__court_id__reservation_post',
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
    path: '/api/court/:court_id/reservation/browse',
    alias: 'browse_reservation_by_court_id_api_court__court_id__reservation_browse_post',
    description: `這隻 func 如果給了 start_date 會直接 return start_date ~ start_date + 7 的資料，
要透過 time range 搜尋的話要給 start_date &#x3D; null`,
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
    response: app__utils__response__Response_BrowseReservationOutput___2,
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
    path: '/api/court/batch',
    alias: 'batch_edit_court_api_court_batch_patch',
    requestFormat: 'json',
    parameters: [
      {
        name: 'body',
        type: 'Body',
        schema: BatchEditCourtInput,
      },
      {
        name: 'auth-token',
        type: 'Header',
        schema: auth_token,
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
    path: '/api/district',
    alias: 'browse_district_api_district_get',
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
    path: '/api/email-verification',
    alias: 'email_verification_api_email_verification_get',
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
    path: '/api/email-verification',
    alias: 'email_verification_api_email_verification_post',
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
    path: '/api/email-verification/resend',
    alias: 'resend_email_verification_api_email_verification_resend_post',
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
    method: 'post',
    path: '/api/forget-password',
    alias: 'forget_password_api_forget_password_post',
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
    path: '/api/health',
    alias: 'health_check_api_health_get',
    requestFormat: 'json',
    response: Response_HealthCheckOutput_,
  },
  {
    method: 'post',
    path: '/api/login',
    alias: 'login_api_login_post',
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
    method: 'post',
    path: '/api/logout',
    alias: 'logout_api_logout_post',
    requestFormat: 'json',
    response: Response,
  },
  {
    method: 'get',
    path: '/api/reservation/:reservation_id',
    alias: 'read_reservation_api_reservation__reservation_id__get',
    requestFormat: 'json',
    parameters: [
      {
        name: 'reservation_id',
        type: 'Path',
        schema: z.number().int(),
      },
    ],
    response: Response_ReadReservationOutput_,
    errors: [
      {
        status: 422,
        description: `Validation Error`,
        schema: HTTPValidationError,
      },
    ],
  },
  {
    method: 'delete',
    path: '/api/reservation/:reservation_id',
    alias: 'delete_reservation_api_reservation__reservation_id__delete',
    requestFormat: 'json',
    parameters: [
      {
        name: 'reservation_id',
        type: 'Path',
        schema: z.number().int(),
      },
      {
        name: 'auth-token',
        type: 'Header',
        schema: auth_token,
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
    method: 'patch',
    path: '/api/reservation/:reservation_id',
    alias: 'edit_reservation_api_reservation__reservation_id__patch',
    requestFormat: 'json',
    parameters: [
      {
        name: 'body',
        type: 'Body',
        schema: EditReservationInput,
      },
      {
        name: 'reservation_id',
        type: 'Path',
        schema: z.number().int(),
      },
      {
        name: 'auth-token',
        type: 'Header',
        schema: auth_token,
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
    method: 'delete',
    path: '/api/reservation/:reservation_id/leave',
    alias: 'leave_reservation_api_reservation__reservation_id__leave_delete',
    requestFormat: 'json',
    parameters: [
      {
        name: 'reservation_id',
        type: 'Path',
        schema: z.number().int(),
      },
      {
        name: 'auth-token',
        type: 'Header',
        schema: auth_token,
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
    path: '/api/reservation/:reservation_id/members',
    alias: 'browse_reservation_members_api_reservation__reservation_id__members_get',
    requestFormat: 'json',
    parameters: [
      {
        name: 'reservation_id',
        type: 'Path',
        schema: z.number().int(),
      },
      {
        name: 'auth-token',
        type: 'Header',
        schema: auth_token,
      },
    ],
    response: Response_Sequence_ReservationMemberWithName__,
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
    path: '/api/reservation/code/:invitation_code',
    alias: 'join_reservation_api_reservation_code__invitation_code__post',
    requestFormat: 'json',
    parameters: [
      {
        name: 'invitation_code',
        type: 'Path',
        schema: z.string(),
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
    method: 'post',
    path: '/api/reservation/reject-invitation',
    alias: 'reject_invitation_api_reservation_reject_invitation_post',
    requestFormat: 'json',
    parameters: [
      {
        name: 'reservation_id',
        type: 'Query',
        schema: z.number().int(),
      },
      {
        name: 'auth-token',
        type: 'Header',
        schema: auth_token,
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
    method: 'post',
    path: '/api/reset-password',
    alias: 'reset_password_api_reset_password_post',
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
    path: '/api/sport',
    alias: 'browse_sport_api_sport_get',
    requestFormat: 'json',
    response: Response_Sequence_Sport__,
  },
  {
    method: 'post',
    path: '/api/stadium',
    alias: 'add_stadium_api_stadium_post',
    requestFormat: 'json',
    parameters: [
      {
        name: 'body',
        type: 'Body',
        schema: AddStadiumInput,
      },
      {
        name: 'auth-token',
        type: 'Header',
        schema: auth_token,
      },
    ],
    response: Response_AddStadiumOutput_,
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
    path: '/api/stadium/:stadium_id',
    alias: 'read_stadium_api_stadium__stadium_id__get',
    requestFormat: 'json',
    parameters: [
      {
        name: 'stadium_id',
        type: 'Path',
        schema: z.number().int(),
      },
      {
        name: 'auth-token',
        type: 'Header',
        schema: auth_token,
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
    method: 'patch',
    path: '/api/stadium/:stadium_id',
    alias: 'edit_stadium_api_stadium__stadium_id__patch',
    requestFormat: 'json',
    parameters: [
      {
        name: 'body',
        type: 'Body',
        schema: EditStadiumInput,
      },
      {
        name: 'stadium_id',
        type: 'Path',
        schema: z.number().int(),
      },
      {
        name: 'auth-token',
        type: 'Header',
        schema: auth_token,
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
    method: 'patch',
    path: '/api/stadium/batch',
    alias: 'batch_edit_stadium_api_stadium_batch_patch',
    requestFormat: 'json',
    parameters: [
      {
        name: 'body',
        type: 'Body',
        schema: BatchEditStadiumInput,
      },
      {
        name: 'auth-token',
        type: 'Header',
        schema: auth_token,
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
    method: 'post',
    path: '/api/stadium/browse',
    alias: 'browse_stadium_api_stadium_browse_post',
    requestFormat: 'json',
    parameters: [
      {
        name: 'body',
        type: 'Body',
        schema: StadiumSearchParameters,
      },
    ],
    response: Response_BrowseStadiumOutput_,
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
    path: '/api/validate_address',
    alias: 'validate_address_api_validate_address_post',
    requestFormat: 'json',
    parameters: [
      {
        name: 'address',
        type: 'Query',
        schema: z.string(),
      },
    ],
    response: Response_ValidateAddressOutput_,
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
    path: '/api/venue',
    alias: 'browse_venue_api_venue_get',
    requestFormat: 'json',
    parameters: [
      {
        name: 'name',
        type: 'Query',
        schema: auth_token,
      },
      {
        name: 'stadium_id',
        type: 'Query',
        schema: stadium_id,
      },
      {
        name: 'sport_id',
        type: 'Query',
        schema: stadium_id,
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
    response: Response_BrowseVenueOutput_,
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
    path: '/api/venue',
    alias: 'add_venue_api_venue_post',
    requestFormat: 'json',
    parameters: [
      {
        name: 'body',
        type: 'Body',
        schema: AddVenueInput,
      },
      {
        name: 'auth-token',
        type: 'Header',
        schema: auth_token,
      },
    ],
    response: Response_AddVenueOutput_,
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
    path: '/api/venue/:venue_id',
    alias: 'read_venue_api_venue__venue_id__get',
    requestFormat: 'json',
    parameters: [
      {
        name: 'venue_id',
        type: 'Path',
        schema: z.number().int(),
      },
      {
        name: 'auth-token',
        type: 'Header',
        schema: auth_token,
      },
    ],
    response: Response_ReadVenueOutput_,
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
    path: '/api/venue/:venue_id',
    alias: 'edit_venue_api_venue__venue_id__patch',
    requestFormat: 'json',
    parameters: [
      {
        name: 'body',
        type: 'Body',
        schema: EditVenueInput,
      },
      {
        name: 'venue_id',
        type: 'Path',
        schema: z.number().int(),
      },
      {
        name: 'auth-token',
        type: 'Header',
        schema: auth_token,
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
    method: 'post',
    path: '/api/venue/:venue_id/court',
    alias: 'browse_court_by_venue_id_api_venue__venue_id__court_post',
    requestFormat: 'json',
    parameters: [
      {
        name: 'body',
        type: 'Body',
        schema: BrowseCourtByVenueIdParams,
      },
      {
        name: 'venue_id',
        type: 'Path',
        schema: z.number().int(),
      },
      {
        name: 'auth-token',
        type: 'Header',
        schema: auth_token,
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
    method: 'patch',
    path: '/api/venue/batch',
    alias: 'batch_edit_venue_api_venue_batch_patch',
    requestFormat: 'json',
    parameters: [
      {
        name: 'body',
        type: 'Body',
        schema: BatchEditVenueInput,
      },
      {
        name: 'auth-token',
        type: 'Header',
        schema: auth_token,
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
    path: '/api/view/court/provider',
    alias: 'view_provider_court_api_view_court_provider_get',
    requestFormat: 'json',
    parameters: [
      {
        name: 'stadium_id',
        type: 'Query',
        schema: stadium_id,
      },
      {
        name: 'venue_id',
        type: 'Query',
        schema: stadium_id,
      },
      {
        name: 'is_published',
        type: 'Query',
        schema: is_reservable,
      },
      {
        name: 'sort_by',
        type: 'Query',
        schema: sort_by__4,
      },
      {
        name: 'order',
        type: 'Query',
        schema: order__2,
      },
      {
        name: 'limit',
        type: 'Query',
        schema: stadium_id,
      },
      {
        name: 'offset',
        type: 'Query',
        schema: stadium_id,
      },
      {
        name: 'auth-token',
        type: 'Header',
        schema: auth_token,
      },
    ],
    response: Response_ViewProviderCourtOutput_,
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
    path: '/api/view/my-reservation',
    alias: 'view_my_reservation_api_view_my_reservation_post',
    requestFormat: 'json',
    parameters: [
      {
        name: 'body',
        type: 'Body',
        schema: ViewMyReservationParams,
      },
      {
        name: 'auth-token',
        type: 'Header',
        schema: auth_token,
      },
    ],
    response: Response_ViewMyReservationOutput_,
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
    path: '/api/view/reservation',
    alias: 'browse_reservation_api_view_reservation_post',
    requestFormat: 'json',
    parameters: [
      {
        name: 'body',
        type: 'Body',
        schema: app__processor__http__reservation__BrowseReservationParameters,
      },
    ],
    response: app__utils__response__Response_BrowseReservationOutput___1,
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
    path: '/api/view/stadium/provider',
    alias: 'view_provider_stadium_api_view_stadium_provider_get',
    requestFormat: 'json',
    parameters: [
      {
        name: 'city_id',
        type: 'Query',
        schema: stadium_id,
      },
      {
        name: 'district_id',
        type: 'Query',
        schema: stadium_id,
      },
      {
        name: 'is_published',
        type: 'Query',
        schema: is_reservable,
      },
      {
        name: 'sort_by',
        type: 'Query',
        schema: sort_by__2,
      },
      {
        name: 'order',
        type: 'Query',
        schema: order__2,
      },
      {
        name: 'limit',
        type: 'Query',
        schema: stadium_id,
      },
      {
        name: 'offset',
        type: 'Query',
        schema: stadium_id,
      },
      {
        name: 'auth-token',
        type: 'Header',
        schema: auth_token,
      },
    ],
    response: Response_ViewProviderStadiumOutput_,
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
    path: '/api/view/venue/provider',
    alias: 'view_provider_venue_api_view_venue_provider_get',
    requestFormat: 'json',
    parameters: [
      {
        name: 'stadium_id',
        type: 'Query',
        schema: stadium_id,
      },
      {
        name: 'is_published',
        type: 'Query',
        schema: is_reservable,
      },
      {
        name: 'sort_by',
        type: 'Query',
        schema: sort_by__3,
      },
      {
        name: 'order',
        type: 'Query',
        schema: order__2,
      },
      {
        name: 'limit',
        type: 'Query',
        schema: stadium_id,
      },
      {
        name: 'offset',
        type: 'Query',
        schema: stadium_id,
      },
      {
        name: 'auth-token',
        type: 'Header',
        schema: auth_token,
      },
    ],
    response: Response_ViewProviderVenueOutput_,
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
    path: '/auth_callback',
    alias: 'auth_auth_callback_get',
    requestFormat: 'json',
    response: z.unknown(),
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
      {
        name: 'next_url',
        type: 'Query',
        schema: auth_token,
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
]);

export const api = new Zodios(endpoints);

export function createApiClient(baseUrl: string, options?: ZodiosOptions) {
  return new Zodios(baseUrl, endpoints, options);
}
