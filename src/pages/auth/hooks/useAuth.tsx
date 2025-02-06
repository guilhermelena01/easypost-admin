import router from "next/router";
import { useState } from "react";
import { useAppContext } from "src/context/appContext";
import { RestClient } from "src/utils/RestClient";
import { CreateUser, EnumAuthScreen, EnumScreenStep, EnumUserType } from "src/utils/types";
import { equalsStr, isNullOrEmpty, isUserDesigner, validateEmail } from "src/utils/util";

export function useAuth() {
    const { setUser } = useAppContext()
    const restClient = new RestClient()

    const [authFormFields, setAuthFormFields] = useState({
        email: "",
        password: "",
        emailForgot: "",
        userName: "",
        userConfirmPassword: "",
        userType: EnumUserType.FORNECEDOR,
    });
    const [authScreen, setAuthScreen] = useState(EnumAuthScreen.LOGIN);
    const [isForgotEmailSent, setForgotEmailSent] = useState(false);
    const [userScreenStep, setUserScreenStep] = useState(EnumScreenStep.FIRST_STEP);
    const [loading, setLoading] = useState(false);

    function handleChange(e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) {
        setAuthFormFields(prevState => {
            return {
                ...prevState,
                [e.target.id]: e.target.value,
            };
        });
    }

    function handleChangeUserType() {
        setAuthFormFields(prevState => {
            return {
                ...prevState,
                userType: isUserDesigner(authFormFields.userType!) ? EnumUserType.CLIENTE : EnumUserType.FORNECEDOR,
            };
        });
    }

    function handleAuth(email: string, password: string): Promise<void> {
        return restClient.handleLogin(email, password)
            .then(data => {
                const newUser = {
                    id: data.id,
                    contaTipo: data.contaTipo,
                    nome: data.nome,
                    isUserDesigner: isUserDesigner(data.contaTipo),
                    urlFoto: data.urlFoto,
                    senha: password
                };

                setUser(newUser);

                localStorage.setItem("token", data.token);
                localStorage.setItem("expiration", (new Date().getTime() + 1200000).toString());
                // localStorage.setItem("userBasicData", encryptStrData(JSON.stringify(newUser)));

                // getNotifications();
            })
            .catch(err => console.error("Erro ao autenticar:", err));
    }

    function handleLogin() {
        if (!enableLogin()) {
            return;
        }

        setLoading(true);

        handleAuth(authFormFields.email, authFormFields.password)
            .then(res => {
                if (res!) {
                    throw Error(res.message);
                }

                setLoading(false);

                router.push("/").then(() => cleanAllFields());
            })
            .catch(() => {
                setLoading(false);
                cleanAllFields();
            });
    }

    function handleSendEmailForgot() {
        if (!validateEmail(authFormFields.emailForgot)) {
            return;
        }

        restClient
            .handleForgotPass(authFormFields.emailForgot)
            .then((res) => {
                if (res) {
                    setForgotEmailSent(true)
                }
            })
            .catch(err => console.error(err));
    }

    function enableLogin(): boolean {
        return authFormFields.password.length >= 6 && validateEmail(authFormFields.email);
    }

    function enableNextStep(userRegistrationStep: EnumScreenStep): boolean {
        switch (userRegistrationStep) {
            case EnumScreenStep.FIRST_STEP:
                return (
                    validateEmail(authFormFields.email) &&
                    !isNullOrEmpty(authFormFields.userName) &&
                    authFormFields.password.length >= 6 &&
                    equalsStr(authFormFields.password, authFormFields.userConfirmPassword)
                );
            case EnumScreenStep.SECOND_STEP:
                return false;
            default:
                return false;
        }
    }

    function handleStartCreateUser() {
        cleanAllFields();

        setAuthScreen(EnumAuthScreen.CREATE_USER);
    }

    async function handleCreateAccount() {
        setLoading(true);

        const newUser: CreateUser = {
            nome: authFormFields.userName,
            email: authFormFields.email,
            senha: authFormFields.password,
            contaTipo: authFormFields.userType,
        };

        await restClient.handleCreateUser(newUser);

        cleanAllFields();

        setLoading(false);
    }

    function cleanAllFields() {
        setAuthFormFields({
            email: "",
            password: "",
            emailForgot: "",
            userName: "",
            userConfirmPassword: "",
            userType: EnumUserType.CLIENTE,
        });
        setUserScreenStep(EnumScreenStep.FIRST_STEP);
        setForgotEmailSent(false);

        setAuthScreen(EnumAuthScreen.LOGIN);
    }

    function goBackLogin() {
        cleanAllFields();

        setAuthScreen(EnumAuthScreen.LOGIN);
    }

    return {
        authScreen,
        isForgotEmailSent,
        userScreenStep,
        authFormFields,
        loading,
        handleChange,
        handleChangeUserType,
        setAuthScreen,
        enableLogin,
        handleLogin,
        handleStartCreateUser,
        handleSendEmailForgot,
        goBackLogin,
        enableNextStep,
        handleCreateAccount,
        setUserScreenStep,
    };
}
