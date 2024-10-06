import { HttpClient, HttpStatusCode } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { ApiResponseModel } from "../../models/api-response.model";
import { Observable, throwError } from "rxjs";
import { catchError } from "rxjs/operators";

@Injectable()
export class GitHubApiService {
    apiBaseUrl = '';

    constructor(
        private readonly http: HttpClient
    )
    {

    }

    handleApiError(error: any | null, message: string | string[] | null = null): void {
        const actions: Record<string, () => void> = {
            noErrorWithMessage: () => this.showFeedback(message!),
            apiErrorWithDetails: () => {
                const apiResponse = <ApiResponseModel>error.error;
                this.showFeedback(apiResponse.errors);
            },
            generalError: () => this.showFeedback(error.message),
            unauthorizedError: () => {
                this.showFeedback("Unauthorized access");
            }
        };
    
        const conditionMap: Record<string, boolean> = {
            noErrorWithMessage: !error && !!message,
            apiErrorWithDetails: !!error?.error?.errors,
            generalError: !!error?.message && error.status !== HttpStatusCode.Unauthorized,
            unauthorizedError: parseInt(error?.status) === HttpStatusCode.Unauthorized
        };
    
        for (const condition in conditionMap) {
            if (conditionMap[condition]) {
                actions[condition]();
                return;
            }
        }
    }

    get<TDataResponseType>(): Observable<ApiResponseModel<TDataResponseType>>
    {
        return this.http
            .get<ApiResponseModel<TDataResponseType>>("url")
            .pipe(
                catchError((error) => {
                    return throwError(() => new Error(error));
                })
            )
    }

    private showFeedback(message: string | string[]): void {
        if (Array.isArray(message)) {
            message.forEach(msg => console.log(msg));
        } else {
            console.log(message);
        }
    }
}