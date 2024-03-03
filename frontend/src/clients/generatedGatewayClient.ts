import { baseGatewayClient as api } from "./baseGatewayClient";
export const addTagTypes = ["users", "items"] as const;
const injectedRtkApi = api
  .enhanceEndpoints({
    addTagTypes,
  })
  .injectEndpoints({
    endpoints: (build) => ({
      handleExampleWebhookSync: build.mutation<
        HandleExampleWebhookSyncApiResponse,
        HandleExampleWebhookSyncApiArg
      >({
        query: (queryArg) => ({
          url: `/webhook/example`,
          method: "POST",
          body: queryArg.exampleSyncUpdate,
        }),
      }),
      getUsers: build.query<GetUsersApiResponse, GetUsersApiArg>({
        query: (queryArg) => ({
          url: `/users`,
          params: {
            offset: queryArg.offset,
            limit: queryArg.limit,
            direction: queryArg.direction,
            order_by: queryArg.orderBy,
            user_id: queryArg.userId,
            entity_state: queryArg.entityState,
            display_name: queryArg.displayName,
            user_email: queryArg.userEmail,
          },
        }),
        providesTags: ["users"],
      }),
      updateUser: build.mutation<UpdateUserApiResponse, UpdateUserApiArg>({
        query: (queryArg) => ({
          url: `/users`,
          method: "PATCH",
          body: queryArg.userUpdateRequest,
        }),
        invalidatesTags: ["users"],
      }),
      deleteUser: build.mutation<DeleteUserApiResponse, DeleteUserApiArg>({
        query: (queryArg) => ({
          url: `/users`,
          method: "DELETE",
          body: queryArg.userDeleteRequest,
        }),
        invalidatesTags: ["users"],
      }),
      getCurrentUser: build.query<
        GetCurrentUserApiResponse,
        GetCurrentUserApiArg
      >({
        query: () => ({ url: `/me` }),
        providesTags: ["users"],
      }),
      getItems: build.query<GetItemsApiResponse, GetItemsApiArg>({
        query: (queryArg) => ({
          url: `/items`,
          params: {
            offset: queryArg.offset,
            limit: queryArg.limit,
            direction: queryArg.direction,
            order_by: queryArg.orderBy,
            user_id: queryArg.userId,
            entity_state: queryArg.entityState,
            label: queryArg.label,
            item_type: queryArg.itemType,
          },
        }),
        providesTags: ["items", "items"],
      }),
      createItem: build.mutation<CreateItemApiResponse, CreateItemApiArg>({
        query: (queryArg) => ({
          url: `/items`,
          method: "POST",
          body: queryArg.itemCreateRequest,
        }),
        invalidatesTags: ["items", "items"],
      }),
      updateItem: build.mutation<UpdateItemApiResponse, UpdateItemApiArg>({
        query: (queryArg) => ({
          url: `/items`,
          method: "PATCH",
          body: queryArg.itemUpdateRequest,
        }),
        invalidatesTags: ["items", "items"],
      }),
      deleteItem: build.mutation<DeleteItemApiResponse, DeleteItemApiArg>({
        query: (queryArg) => ({
          url: `/items`,
          method: "DELETE",
          body: queryArg.itemDeleteRequest,
        }),
        invalidatesTags: ["items", "items"],
      }),
      handleUserLogin: build.mutation<
        HandleUserLoginApiResponse,
        HandleUserLoginApiArg
      >({
        query: (queryArg) => ({
          url: `/login/token`,
          method: "POST",
          body: queryArg.userLoginRequest,
        }),
      }),
      handleRegisterUser: build.mutation<
        HandleRegisterUserApiResponse,
        HandleRegisterUserApiArg
      >({
        query: (queryArg) => ({
          url: `/register`,
          method: "POST",
          body: queryArg.userCreateRequest,
        }),
      }),
    }),
    overrideExisting: false,
  });
export { injectedRtkApi as gatewayClientEndpoints };
export type HandleExampleWebhookSyncApiResponse =
  /** status 200 Successful Response */ any;
export type HandleExampleWebhookSyncApiArg = {
  exampleSyncUpdate: ExampleSyncUpdate;
};
export type GetUsersApiResponse =
  /** status 200 Successful Response */ GetEntitiesResponseOutputUser;
export type GetUsersApiArg = {
  offset?: number;
  limit?: number;
  direction?: "asc" | "desc";
  orderBy?: string;
  userId?: string | null;
  entityState?: EntityState | null;
  displayName?: string | null;
  userEmail?: string | null;
};
export type UpdateUserApiResponse =
  /** status 200 Successful Response */ OutputUser;
export type UpdateUserApiArg = {
  userUpdateRequest: UserUpdateRequest;
};
export type DeleteUserApiResponse =
  /** status 200 Successful Response */ OutputUser;
export type DeleteUserApiArg = {
  userDeleteRequest: UserDeleteRequest;
};
export type GetCurrentUserApiResponse =
  /** status 200 Successful Response */ OutputUser;
export type GetCurrentUserApiArg = void;
export type GetItemsApiResponse =
  /** status 200 Successful Response */ GetEntitiesResponseOutputItem;
export type GetItemsApiArg = {
  offset?: number;
  limit?: number;
  direction?: "asc" | "desc";
  orderBy?: string;
  userId?: string | null;
  entityState?: EntityState | null;
  label?: string | null;
  itemType?: ItemType | null;
};
export type CreateItemApiResponse =
  /** status 200 Successful Response */ OutputItem;
export type CreateItemApiArg = {
  itemCreateRequest: ItemCreateRequest;
};
export type UpdateItemApiResponse =
  /** status 200 Successful Response */ OutputItem;
export type UpdateItemApiArg = {
  itemUpdateRequest: ItemUpdateRequest;
};
export type DeleteItemApiResponse =
  /** status 200 Successful Response */ OutputItem;
export type DeleteItemApiArg = {
  itemDeleteRequest: ItemDeleteRequest;
};
export type HandleUserLoginApiResponse =
  /** status 200 Successful Response */ SuccessfulLoginResponse;
export type HandleUserLoginApiArg = {
  userLoginRequest: UserLoginRequest;
};
export type HandleRegisterUserApiResponse =
  /** status 200 Successful Response */ SuccessfulLoginResponse;
export type HandleRegisterUserApiArg = {
  userCreateRequest: UserCreateRequest;
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
export type OutputUser = {
  /** The UUID of the entity */
  id: string;
  /** The user who created this entity */
  user_id: string;
  /** The state of the entity */
  entity_state: EntityState;
  /** The time that this article was created */
  created_at: string;
  /** The time that this article was last updated */
  updated_at: string;
  /** The display name of the user */
  display_name: string;
  /** The email of the user */
  user_email: string;
  /** The stored and hashed password of the user */
  hashed_password: string;
};
export type GetEntitiesResponseOutputUser = {
  /** The list of items requested. */
  items: OutputUser[];
};
export type UserUpdateRequest = {
  /** The UUID of the entity being updated */
  id: string;
  /** The display name of the user */
  display_name?: string | null;
  /** The new password of the user */
  password?: string | null;
};
export type UserDeleteRequest = {
  /** The UUID of the entity being updated */
  id: string;
};
export type OutputItem = {
  /** The UUID of the entity */
  id: string;
  /** The user who created this entity */
  user_id: string;
  /** The state of the entity */
  entity_state: EntityState;
  /** The time that this article was created */
  created_at: string;
  /** The time that this article was last updated */
  updated_at: string;
  /** The label of the item */
  label: string;
  /** The original label */
  raw_label: string;
  /** The type of the item */
  item_type: ItemType;
};
export type GetEntitiesResponseOutputItem = {
  /** The list of items requested. */
  items: OutputItem[];
};
export type ItemCreateRequest = {
  /** The original label */
  raw_label: string;
  /** The type of the item */
  item_type: ItemType;
};
export type ItemUpdateRequest = {
  /** The UUID of the entity being updated */
  id: string;
  /** The new label of the item */
  label?: string | null;
  /** The type of the item */
  item_type?: ItemType | null;
};
export type ItemDeleteRequest = {
  /** The UUID of the entity being updated */
  id: string;
};
export type SuccessfulLoginResponse = {
  access_token: string;
  token_type: string;
  /** The user who has just logged in */
  user: OutputUser;
};
export type UserLoginRequest = {
  /** The email for login */
  user_email: string;
  /** The password for the user */
  password: string;
};
export type UserCreateRequest = {
  /** The display name of the user */
  display_name: string;
  /** The email of the user */
  user_email: string;
  /** The password (to be hashed and stored) */
  password: string;
};
export enum EntityState {
  Active = "ACTIVE",
  Deleted = "DELETED",
}
export enum ItemType {
  TypeA = "TYPE_A",
  TypeB = "TYPE_B",
  TypeC = "TYPE_C",
}
export const {
  useHandleExampleWebhookSyncMutation,
  useGetUsersQuery,
  useUpdateUserMutation,
  useDeleteUserMutation,
  useGetCurrentUserQuery,
  useGetItemsQuery,
  useCreateItemMutation,
  useUpdateItemMutation,
  useDeleteItemMutation,
  useHandleUserLoginMutation,
  useHandleRegisterUserMutation,
} = injectedRtkApi;
