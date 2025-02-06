import NonLayout from "@layout/NonLayout";
import Image from "next/image";
import React, { ReactElement } from "react";

// img
import logoEasy from "@assets/images/logo.webp"
import Link from "next/link";
import { useAuth } from "./hooks/useAuth";

const Loginv2 = () => {
    const auth = useAuth()

    return (
        <React.Fragment>
            <div className="auth-main v2">
                <div className="bg-overlay bg-dark"></div>
                <div className="auth-wrapper">
                    <div className="auth-sidecontent">
                        <div className="auth-sidefooter">
                            <Image src={logoEasy} className="img-brand img-fluid" alt="images" />
                            <hr className="mb-3 mt-4" />
                        </div>
                    </div>
                    <div className="auth-form">
                        <div className="card my-5 mx-3">
                            <div className="card-body">
                                <h4 className="f-w-500 mb-1">Faça o login</h4>
                                <p className="mb-3">Não tem conta? <a href="/auth/register" className="link-primary ms-1">Crie uma agora mesmo.</a></p>
                                <div className="form-group mb-3">
                                    <input
                                        type="email"
                                        className="form-control"
                                        id="email"
                                        placeholder="Email Address"
                                        onChange={auth.handleChange}
                                        value={auth.authFormFields.email}
                                    />
                                </div>
                                <div className="form-group mb-3">
                                    <input
                                        type="password"
                                        className="form-control"
                                        id="password"
                                        placeholder="Password"
                                        onChange={(e) => auth.handleChange(e)}
                                        value={auth.authFormFields.password}
                                    />
                                </div>
                                <div className="d-flex mt-1 justify-content-between align-items-center">
                                    <div className="form-check">
                                        <input className="form-check-input input-primary" type="checkbox" id="customCheckc1" defaultChecked />
                                        <label className="form-check-label text-muted" htmlFor="customCheckc1">Lembrar de mim</label>
                                    </div>
                                    <Link href="/pages/forgot-password-v2">
                                        <h6 className="text-secondary f-w-400 mb-0">Esqueceu a senha?</h6>
                                    </Link>
                                </div>
                                <div className="d-grid mt-4">
                                    <button
                                        type="button"
                                        className="btn btn-primary"
                                        onClick={auth.handleLogin}
                                    >
                                        Entrar
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </React.Fragment>
    );
}


Loginv2.getLayout = (page: ReactElement) => {
    return (
        <NonLayout>
            {page}
        </NonLayout>
    )
};
export default Loginv2;