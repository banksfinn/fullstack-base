import { baseGatewayClient as api } from "./baseGatewayClient";
const injectedRtkApi = api.injectEndpoints({
  endpoints: (build) => ({
    handleExampleWebhookSyncWebhookExamplePost: build.mutation<
      HandleExampleWebhookSyncWebhookExamplePostApiResponse,
      HandleExampleWebhookSyncWebhookExamplePostApiArg
    >({
      query: (queryArg) => ({
        url: `/webhook/example`,
        method: "POST",
        body: queryArg.exampleSyncUpdate,
      }),
    }),
    getUsersUsersGet: build.query<
      GetUsersUsersGetApiResponse,
      GetUsersUsersGetApiArg
    >({
      query: (queryArg) => ({ url: `/users`, body: queryArg.getUsersQuery }),
    }),
    getCurrentUserMeGet: build.query<
      GetCurrentUserMeGetApiResponse,
      GetCurrentUserMeGetApiArg
    >({
      query: () => ({ url: `/me` }),
    }),
    getItemsItemsGet: build.query<
      GetItemsItemsGetApiResponse,
      GetItemsItemsGetApiArg
    >({
      query: (queryArg) => ({
        url: `/items`,
        params: {
          offset: queryArg.offset,
          limit: queryArg.limit,
          user_id: queryArg.userId,
        },
      }),
    }),
    createItemItemsPost: build.mutation<
      CreateItemItemsPostApiResponse,
      CreateItemItemsPostApiArg
    >({
      query: (queryArg) => ({
        url: `/items`,
        method: "POST",
        body: queryArg.createItemRequest,
      }),
    }),
    updateItemItemsPatch: build.mutation<
      UpdateItemItemsPatchApiResponse,
      UpdateItemItemsPatchApiArg
    >({
      query: (queryArg) => ({
        url: `/items`,
        method: "PATCH",
        body: queryArg.updateItemRequest,
      }),
    }),
    handleUserLoginLoginTokenPost: build.mutation<
      HandleUserLoginLoginTokenPostApiResponse,
      HandleUserLoginLoginTokenPostApiArg
    >({
      query: (queryArg) => ({
        url: `/login/token`,
        method: "POST",
        body: queryArg.userLoginRequest,
      }),
    }),
    handleRegisterUserRegisterPost: build.mutation<
      HandleRegisterUserRegisterPostApiResponse,
      HandleRegisterUserRegisterPostApiArg
    >({
      query: (queryArg) => ({
        url: `/register`,
        method: "POST",
        body: queryArg.createUserRequest,
      }),
    }),
  }),
  overrideExisting: false,
});
export { injectedRtkApi as gatewayClientEndpoints };
export type HandleExampleWebhookSyncWebhookExamplePostApiResponse =
  /** status 200 Successful Response */ any;
export type HandleExampleWebhookSyncWebhookExamplePostApiArg = {
  exampleSyncUpdate: ExampleSyncUpdate;
};
export type GetUsersUsersGetApiResponse =
  /** status 200 Successful Response */ User[];
export type GetUsersUsersGetApiArg = {
  getUsersQuery: GetUsersQuery;
};
export type GetCurrentUserMeGetApiResponse =
  /** status 200 Successful Response */ User;
export type GetCurrentUserMeGetApiArg = void;
export type GetItemsItemsGetApiResponse =
  /** status 200 Successful Response */ Item[];
export type GetItemsItemsGetApiArg = {
  offset?: number;
  limit?: number;
  userId: string;
};
export type CreateItemItemsPostApiResponse =
  /** status 200 Successful Response */ Item;
export type CreateItemItemsPostApiArg = {
  createItemRequest: CreateItemRequest;
};
export type UpdateItemItemsPatchApiResponse =
  /** status 200 Successful Response */ Item;
export type UpdateItemItemsPatchApiArg = {
  updateItemRequest: UpdateItemRequest;
};
export type HandleUserLoginLoginTokenPostApiResponse =
  /** status 200 Successful Response */ SuccessfulLoginResponse;
export type HandleUserLoginLoginTokenPostApiArg = {
  userLoginRequest: UserLoginRequest;
};
export type HandleRegisterUserRegisterPostApiResponse =
  /** status 200 Successful Response */ SuccessfulLoginResponse;
export type HandleRegisterUserRegisterPostApiArg = {
  createUserRequest: CreateUserRequest;
};
export type ValidationError = {
  loc: (string | number)[];
  msg: string;
  type: string;
};
export type HttpValidationError = {
  detail?: ValidationError[];
};
export type ExampleSyncUpdate = {
  /** The type of webhook */
  webhook_type: string;
  /** The code of the webhook */
  webhook_code: string;
};
export type User = {
  /** The ID of the entity */
  id: string;
  /** The user id who owns this entity */
  user_id: string;
  /** The email of the user */
  email: string;
  /** The refresh rate of transactions */
  transaction_refresh_interval_minutes: number;
  /** The refresh rate of accounts */
  account_refresh_interval_minutes: number;
};
export type GetUsersQuery = {
  /** How many offset items from the beginning to skip */
  offset?: number;
  /** The number of items to return with the response */
  limit?: number;
  /** Filter by this user ID */
  user_id: string;
};
export type Item = {
  /** The ID of the entity */
  id: string;
  /** The user id who owns this entity */
  user_id: string;
  /** The label of the item */
  label: string;
};
export type CreateItemRequest = {
  /** The original label */
  raw_label: string;
};
export type UpdateItemRequest = {
  /** The ID of the entity to update */
  id: string;
};
export type SuccessfulLoginResponse = {
  access_token: string;
  token_type: string;
  /** The user who has just logged in */
  user: User;
};
export type UserLoginRequest = {
  /** The email for login */
  user_email: string;
  /** The password for the user */
  password: string;
};
export type CreateUserRequest = {};
export const {
  useHandleExampleWebhookSyncWebhookExamplePostMutation,
  useGetUsersUsersGetQuery,
  useGetCurrentUserMeGetQuery,
  useGetItemsItemsGetQuery,
  useCreateItemItemsPostMutation,
  useUpdateItemItemsPatchMutation,
  useHandleUserLoginLoginTokenPostMutation,
  useHandleRegisterUserRegisterPostMutation,
} = injectedRtkApi;
