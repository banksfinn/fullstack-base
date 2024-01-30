import { baseGatewayClient as api } from "./baseGatewayClient";
const injectedRtkApi = api.injectEndpoints({
  endpoints: (build) => ({
    handleTransactionWebhookSyncWebhookTransactionsPost: build.mutation<
      HandleTransactionWebhookSyncWebhookTransactionsPostApiResponse,
      HandleTransactionWebhookSyncWebhookTransactionsPostApiArg
    >({
      query: (queryArg) => ({
        url: `/webhook/transactions`,
        method: "POST",
        body: queryArg.transactionSyncUpdate,
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
    getTransactionsTransactionsGet: build.query<
      GetTransactionsTransactionsGetApiResponse,
      GetTransactionsTransactionsGetApiArg
    >({
      query: (queryArg) => ({
        url: `/transactions`,
        params: {
          offset: queryArg.offset,
          limit: queryArg.limit,
          user_id: queryArg.userId,
        },
      }),
    }),
    createTransactionTransactionsPost: build.mutation<
      CreateTransactionTransactionsPostApiResponse,
      CreateTransactionTransactionsPostApiArg
    >({
      query: (queryArg) => ({
        url: `/transactions`,
        method: "POST",
        body: queryArg.createTransactionRequest,
      }),
    }),
    updateTransactionTransactionsPatch: build.mutation<
      UpdateTransactionTransactionsPatchApiResponse,
      UpdateTransactionTransactionsPatchApiArg
    >({
      query: (queryArg) => ({
        url: `/transactions`,
        method: "PATCH",
        body: queryArg.updateTransactionRequest,
      }),
    }),
    refreshTransactionsTransactionsRefreshPost: build.mutation<
      RefreshTransactionsTransactionsRefreshPostApiResponse,
      RefreshTransactionsTransactionsRefreshPostApiArg
    >({
      query: () => ({ url: `/transactions/refresh`, method: "POST" }),
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
export type HandleTransactionWebhookSyncWebhookTransactionsPostApiResponse =
  /** status 200 Successful Response */ any;
export type HandleTransactionWebhookSyncWebhookTransactionsPostApiArg = {
  transactionSyncUpdate: TransactionSyncUpdate;
};
export type GetUsersUsersGetApiResponse =
  /** status 200 Successful Response */ User[];
export type GetUsersUsersGetApiArg = {
  getUsersQuery: GetUsersQuery;
};
export type GetCurrentUserMeGetApiResponse =
  /** status 200 Successful Response */ User;
export type GetCurrentUserMeGetApiArg = void;
export type GetTransactionsTransactionsGetApiResponse =
  /** status 200 Successful Response */ Transaction[];
export type GetTransactionsTransactionsGetApiArg = {
  offset?: number;
  limit?: number;
  userId: string;
};
export type CreateTransactionTransactionsPostApiResponse =
  /** status 200 Successful Response */ Transaction;
export type CreateTransactionTransactionsPostApiArg = {
  createTransactionRequest: CreateTransactionRequest;
};
export type UpdateTransactionTransactionsPatchApiResponse =
  /** status 200 Successful Response */ Transaction;
export type UpdateTransactionTransactionsPatchApiArg = {
  updateTransactionRequest: UpdateTransactionRequest;
};
export type RefreshTransactionsTransactionsRefreshPostApiResponse =
  /** status 200 Successful Response */ any;
export type RefreshTransactionsTransactionsRefreshPostApiArg = void;
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
export type TransactionSyncUpdate = {
  /** The type of webhook */
  webhook_type: string;
  /** The code of the webhook */
  webhook_code: string;
  /** The item that has been updated */
  item_id: string;
  /** If the initial update has finished */
  initial_update_complete: boolean;
  /** If the historical update has completed */
  historical_update_complete: boolean;
  /** The environment of the sync */
  environment: string;
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
export type Transaction = {
  /** The ID of the entity */
  id: string;
  /** The user id who owns this entity */
  user_id: string;
  /** The ID of the transaction in Plaid */
  plaid_transaction_id: string | null;
  /** The original description from Plaid */
  raw_label: string;
  /** The label of the transaction */
  label: string;
  /** The amount of the transaction (in USD) */
  amount: number | null;
  /** The code of the currency type */
  currency_code: string;
  /** The source account for this transaction */
  source_account: string;
  /** The destination account for this transaction */
  destination_account: string;
  /** The tags applied to the transaction */
  tags: string[];
  /** If the transaction has been reviewed */
  reviewed: boolean;
};
export type CreateTransactionRequest = {
  /** The code of the currency type */
  currency_code?: string;
  /** The original description from Plaid */
  raw_label: string;
};
export type UpdateTransactionRequest = {
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
  useHandleTransactionWebhookSyncWebhookTransactionsPostMutation,
  useGetUsersUsersGetQuery,
  useGetCurrentUserMeGetQuery,
  useGetTransactionsTransactionsGetQuery,
  useCreateTransactionTransactionsPostMutation,
  useUpdateTransactionTransactionsPatchMutation,
  useRefreshTransactionsTransactionsRefreshPostMutation,
  useHandleUserLoginLoginTokenPostMutation,
  useHandleRegisterUserRegisterPostMutation,
} = injectedRtkApi;
