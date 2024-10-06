export type ApiResponseModel<TDataResponseType = any> = {
    data: TDataResponseType[]
    success: boolean;
    errors: string[];
}