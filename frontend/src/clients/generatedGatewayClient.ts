import { baseGatewayClient as api } from "./baseGatewayClient";
export const addTagTypes = ["users", "items"] as const;
const injectedRtkApi = api
    .enhanceEndpoints({
        addTagTypes,
    })
    .injectEndpoints({
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
            updateUserUsersPatch: build.mutation<
                UpdateUserUsersPatchApiResponse,
                UpdateUserUsersPatchApiArg
            >({
                query: (queryArg) => ({
                    url: `/users`,
                    method: "PATCH",
                    body: queryArg.userUpdateRequest,
                }),
                invalidatesTags: ["users"],
            }),
            deleteUserUsersDelete: build.mutation<
                DeleteUserUsersDeleteApiResponse,
                DeleteUserUsersDeleteApiArg
            >({
                query: (queryArg) => ({
                    url: `/users`,
                    method: "DELETE",
                    body: queryArg.userDeleteRequest,
                }),
                invalidatesTags: ["users"],
            }),
            getCurrentUserMeGet: build.query<
                GetCurrentUserMeGetApiResponse,
                GetCurrentUserMeGetApiArg
            >({
                query: () => ({ url: `/me` }),
                providesTags: ["users"],
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
                        direction: queryArg.direction,
                        order_by: queryArg.orderBy,
                        user_id: queryArg.userId,
                        entity_state: queryArg.entityState,
                        label: queryArg.label,
                    },
                }),
                providesTags: ["items", "items"],
            }),
            createItemItemsPost: build.mutation<
                CreateItemItemsPostApiResponse,
                CreateItemItemsPostApiArg
            >({
                query: (queryArg) => ({
                    url: `/items`,
                    method: "POST",
                    body: queryArg.itemCreateRequest,
                }),
                invalidatesTags: ["items", "items"],
            }),
            updateItemItemsPatch: build.mutation<
                UpdateItemItemsPatchApiResponse,
                UpdateItemItemsPatchApiArg
            >({
                query: (queryArg) => ({
                    url: `/items`,
                    method: "PATCH",
                    body: queryArg.itemUpdateRequest,
                }),
                invalidatesTags: ["items", "items"],
            }),
            deleteItemItemsDelete: build.mutation<
                DeleteItemItemsDeleteApiResponse,
                DeleteItemItemsDeleteApiArg
            >({
                query: (queryArg) => ({
                    url: `/items`,
                    method: "DELETE",
                    body: queryArg.itemDeleteRequest,
                }),
                invalidatesTags: ["items", "items"],
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
                    body: queryArg.userCreateRequest,
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
    /** status 200 Successful Response */ GetEntitiesResponseOutputUser;
export type GetUsersUsersGetApiArg = {
    offset?: number;
    limit?: number;
    direction?: "asc" | "desc";
    orderBy?: string;
    userId?: string | null;
    entityState?: EntityState | null;
    displayName?: string | null;
    userEmail?: string | null;
};
export type UpdateUserUsersPatchApiResponse =
    /** status 200 Successful Response */ OutputUser;
export type UpdateUserUsersPatchApiArg = {
    userUpdateRequest: UserUpdateRequest;
};
export type DeleteUserUsersDeleteApiResponse =
    /** status 200 Successful Response */ OutputUser;
export type DeleteUserUsersDeleteApiArg = {
    userDeleteRequest: UserDeleteRequest;
};
export type GetCurrentUserMeGetApiResponse =
    /** status 200 Successful Response */ OutputUser;
export type GetCurrentUserMeGetApiArg = void;
export type GetItemsItemsGetApiResponse =
    /** status 200 Successful Response */ GetEntitiesResponseOutputItem;
export type GetItemsItemsGetApiArg = {
    offset?: number;
    limit?: number;
    direction?: "asc" | "desc";
    orderBy?: string;
    userId?: string | null;
    entityState?: EntityState | null;
    label?: string | null;
};
export type CreateItemItemsPostApiResponse =
    /** status 200 Successful Response */ OutputItem;
export type CreateItemItemsPostApiArg = {
    itemCreateRequest: ItemCreateRequest;
};
export type UpdateItemItemsPatchApiResponse =
    /** status 200 Successful Response */ OutputItem;
export type UpdateItemItemsPatchApiArg = {
    itemUpdateRequest: ItemUpdateRequest;
};
export type DeleteItemItemsDeleteApiResponse =
    /** status 200 Successful Response */ OutputItem;
export type DeleteItemItemsDeleteApiArg = {
    itemDeleteRequest: ItemDeleteRequest;
};
export type HandleUserLoginLoginTokenPostApiResponse =
    /** status 200 Successful Response */ SuccessfulLoginResponse;
export type HandleUserLoginLoginTokenPostApiArg = {
    userLoginRequest: UserLoginRequest;
};
export type HandleRegisterUserRegisterPostApiResponse =
    /** status 200 Successful Response */ SuccessfulLoginResponse;
export type HandleRegisterUserRegisterPostApiArg = {
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
export type EntityState = "ACTIVE" | "DELETED";
export type OutputUser = {
    /** The UUID of the entity */
    id: string;
    /** The user who created this entity */
    user_id: string;
    /** The state of the entity */
    entity_state: EntityState;
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
    /** The label of the item */
    label: string;
    /** The original label */
    raw_label: string;
};
export type GetEntitiesResponseOutputItem = {
    /** The list of items requested. */
    items: OutputItem[];
};
export type ItemCreateRequest = {
    /** The original label */
    raw_label: string;
};
export type ItemUpdateRequest = {
    /** The UUID of the entity being updated */
    id: string;
    /** The new label of the item */
    label?: string | null;
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
export const {
    useHandleExampleWebhookSyncWebhookExamplePostMutation,
    useGetUsersUsersGetQuery,
    useUpdateUserUsersPatchMutation,
    useDeleteUserUsersDeleteMutation,
    useGetCurrentUserMeGetQuery,
    useGetItemsItemsGetQuery,
    useCreateItemItemsPostMutation,
    useUpdateItemItemsPatchMutation,
    useDeleteItemItemsDeleteMutation,
    useHandleUserLoginLoginTokenPostMutation,
    useHandleRegisterUserRegisterPostMutation,
} = injectedRtkApi;
