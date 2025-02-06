import { handleResponseError, resolveRequestError } from "./util";

export abstract class AbstractRestClient {
    protected BASE_URL = "https://easypostsys.com.br";
    protected DEFAULT_PORT = ":8889";
    protected AUTH_PATH = "/login/auth";
    protected USER_PATH = "/usuarios";
    protected USER_REGISTER = "/novo";
    protected USER_FORGOT_PASS_PATH = "/forgot";
    protected NOTIFICATIONS_PATH = "/notificacoes";
    protected FRONT_PASS = "e@syFront!END"
    protected FRONT_USER = "frontend@easypost.com.br";

    private getToken() {
        const rawToken = localStorage.getItem("token");

        return rawToken ? rawToken : "";
    }

    protected getRequestPath(path: string, page?: string) {
        if (page) {
            return this.BASE_URL.concat(this.DEFAULT_PORT).concat(path).concat("?page=").concat(page);
        }

        return this.BASE_URL.concat(this.DEFAULT_PORT).concat(path);
    }

    protected getDefaultRequestInitMethodGet() {
        const request: RequestInit = {
            headers: {
                Authorization: "Bearer ".concat(this.getToken()),
            },
            method: "GET",
        };

        return request;
    }

    protected getRequestInitMethodPostWithoutToken(json: string) {
        const requestInit: RequestInit = {
            headers: {
                "Content-Type": "application/json",
            },
            body: json,
            method: "POST",
        };

        return requestInit;
    }

    protected getRequestInitMethodPostWithToken(json: string, token: string) {
        const requestInit: RequestInit = {
            headers: {
                "Content-Type": "application/json",
                Authorization: "Bearer ".concat(token),
            },
            body: json,
            method: "POST",
        };

        return requestInit;
    }

    protected getRequestInitMethodPostNoBody(token?: string) {
        const requestInit: RequestInit = {
            headers: {
                Authorization: "Bearer ".concat(token ?? this.getToken()),
            },
            method: "POST",
        };

        return requestInit;
    }

    protected fetchData(url: RequestInfo | URL, reqInit?: RequestInit | undefined, throws?: boolean) {
        return fetch(url, reqInit)
            .then(res => {
                if (res.ok) {

                    if (res.status == 204) {
                        return;
                    }

                    return res.json();

                }

                return handleResponseError(res, throws);
            })
            .catch(err => resolveRequestError(err));
    }
}