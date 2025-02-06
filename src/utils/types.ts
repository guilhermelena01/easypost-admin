import { RestClient } from "./RestClient";

///TYPES
export type NotificationsResponse = {
    _embedded: {
        notificacaoModelList: Array<NotificationData>;
    };
    page: {
        size: number;
        totalElements: number;
    };
};

export type NotificationData = {
    id: number;
    titulo: string;
    descricao: string;
    tipo: EnumNotificationType;
    dataCriacao: string;
    dataAbertura: string | null;
    status: string;
};

export type AuthUserData = {
    id: number;
    nome: string;
    contaTipo: EnumUserType;
    isUserDesigner: boolean;
    urlFoto: string;
    email?: string;
    senha?: string;
};

export type AuthData = {
    id: number;
    nome: string;
    urlFoto: string;
    contaTipo: EnumUserType;
    token: string;
};

export type CreateUser = {
    nome: string;
    email: string;
    senha: string;
    contaTipo: EnumUserType;
};

export type AppContextType = {
    user: AuthUserData | undefined;
    setUser: (user: AuthUserData) => void;
    updateUserField: (fieldName: string, fieldValue: any, changeAll?: boolean) => void;
    restClient: RestClient;
    notificationQuantity: number;
    readNotification: () => void;
    getNotifications: () => void;
};

///INTERFACE'S
export interface IAppContext {
    user: AuthUserData | undefined;
    setUser: (user: AuthUserData) => void
    updateUserField: (fieldName: string, fieldValue: any, changeAll?: boolean) => void;
    restClient: RestClient;
    notificationQuantity: number;
    readNotification: () => void;
    getNotifications: () => void;
}

///ENUM'S
export enum EnumNotificationType {
    ERRO = "ERRO",
    ALERTA = "ALERTA",
    POSITIVA = "POSITIVA",
}

export enum EnumUserType {
    CLIENTE = "CLIENTE",
    FORNECEDOR = "FORNECEDOR",
}

export enum EnumAuthScreen {
    LOGIN,
    FORGOT_PASSWORD,
    CREATE_USER,
}

export enum EnumScreenStep {
    FIRST_STEP,
    SECOND_STEP,
    THIRD_STEP,
}