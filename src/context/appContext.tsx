import React, { useState, createContext, useContext } from "react";
import { RestClient } from "../utils/RestClient";
import { AppContextType, AuthUserData, IAppContext } from "../utils/types";
import { encryptStrData, isUserDesigner } from "../utils/util";

const AppContext = createContext<AppContextType>({} as IAppContext);

export default function DataProvider({ children }: { children: React.ReactNode }) {
    const [user, setUser] = useState<AuthUserData>({} as AuthUserData);
    const [notificationQuantity, setNotificationQuantity] = useState(0);
    const restClient = new RestClient();

    function readNotification() {
        setNotificationQuantity(prev => Math.max(0, prev - 1));
    }

    function getNotifications() {
        restClient.handleFetchNotifications(0)
            .then(res => {
                if (res._embedded) {
                    const notificationActive = res._embedded.notificacaoModelList.filter(not => not.status === "ATIVA");
                    setNotificationQuantity(notificationActive.length);
                } else {
                    setNotificationQuantity(0);
                }
            })
            .catch(err => console.error("Erro ao buscar notificações:", err));
    }

    function updateUserField(fieldName: string, fieldValue: any, changeAll?: boolean) {
        setUser(prevState => changeAll ? fieldValue : { ...prevState, [fieldName]: fieldValue });
    }

    return (
        <AppContext.Provider value={{ user, setUser, updateUserField, notificationQuantity, readNotification, getNotifications }
        }>
            {children}
        </AppContext.Provider>
    );
}

export function useAppContext(): AppContextType {
    return useContext(AppContext);
}