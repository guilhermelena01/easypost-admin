import { useRouter } from "next/navigation";
import { EnumUserType } from "./types";
import { CryptoJS } from "crypto-js"

export function handleLogout(showToast?: boolean) {
    const router = useRouter()

    localStorage.removeItem("token");
    localStorage.removeItem("expiration");

    return router.push("/auth");
}

export async function handleResponseError(res: Response, throws?: boolean) {

    if (res.status == 401) {
        if (res.url.includes("login/auth")) {
            const error = "Erro ao realizar login, verifique suas credenciais.";

            if (throws) {
                throw new Error(error);
            }
        }

        return await handleLogout();
    }

    if (res.status == 403) {
        const error = "Erro ao se comunicar com os serviços Easy.";

        if (throws) {
            throw new Error(error);
        }
    }

    return res.json().then(err => {
        let error = err.userMessage ? err.userMessage : err.detail;
        error = error ? error : "Erro desconhecido ao realizar operação.";

        handleException(error, throws);
    });
}

function handleException(err?: string, throws?: boolean) {
    if (!err) {
        err = "Erro desconhecido ao realizar operação.";
    }
}

export function resolveRequestError(err: any, toastify?: any) {
    if (err instanceof TypeError && err.message == "Failed to fetch") {
        const error = "Serviços EasyPost indisponíveis!";

    }
}

export function isUserDesigner(userType: EnumUserType) {
    return equalsEnum(userType, EnumUserType.FORNECEDOR);
}

export function equalsEnum(firstEnum: any, secondEnum: any) {
    return firstEnum == secondEnum;
}

export function encryptStrData(encodedStr: string | undefined): string {
    if (!encodedStr) {
        return "";
    }

    const key = CryptoJS.enc.Utf8.parse("3ASZY---POSXT&&1");
    const plainText = CryptoJS.AES.encrypt(encodedStr, key, {
        mode: CryptoJS.mode.ECB,
    });

    return plainText.toString();
}

export function validateEmail(email: string): boolean {
    const res =
        /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    return res.test(String(email).toLowerCase());
}

export function isNullOrUndefined(obj: any): boolean {
    return obj == null || obj == undefined;
}

export function isNullOrEmpty(str: any): boolean {
    return isNullOrUndefined(str) || str.trim() == "";
}

export function equalsStr(firstStr: string, secondStr: string) {
    return firstStr === secondStr;
}