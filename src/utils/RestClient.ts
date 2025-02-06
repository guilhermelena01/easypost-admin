import { AbstractRestClient } from "./IRestClient";
import { AuthData, AuthUserData, CreateUser, NotificationsResponse } from "./types";

export class RestClient extends AbstractRestClient {

    handleLogin(username: string, password: string): Promise<AuthData> {
        const url = this.getRequestPath(this.AUTH_PATH);
        const authBody = JSON.stringify({ username, password });
        const requestInit = this.getRequestInitMethodPostWithoutToken(authBody);

        return this.fetchData(url, requestInit, true);
    }

    handleFetchNotifications(page: number): Promise<NotificationsResponse> {
        const requestInit = this.getDefaultRequestInitMethodGet();
        const url = this.getRequestPath(this.NOTIFICATIONS_PATH, page.toString());

        return this.fetchData(url, requestInit);
    }

    async handleForgotPass(email: string) {
        // const toastify = toast.loading("Enviando e-mail...");
        const successMsg = "E-mail enviado com sucesso! Verifique sua caixa de entrada.";
        const url = this.getRequestPath(this.USER_PATH.concat(this.USER_FORGOT_PASS_PATH).concat("?email=").concat(email));
        const authData = await this.handleLogin(this.FRONT_USER, this.FRONT_PASS);
        const requestInit = this.getRequestInitMethodPostNoBody(authData.token);

        return this.fetchData(url, requestInit, false);
    }

    async handleCreateUser(createUser: CreateUser): Promise<AuthUserData> {
        // const toastify = toast.loading("Criando conta...");
        const successMsg = "Cadastro realizado com sucesso!";
        const authData = await this.handleLogin(this.FRONT_USER, this.FRONT_PASS);
        const url = this.getRequestPath(this.USER_PATH.concat(this.USER_REGISTER));
        const authBody = JSON.stringify(createUser);

        const requestInit = this.getRequestInitMethodPostWithToken(authBody, authData.token);

        return this.fetchData(url, requestInit, false);
    }

}