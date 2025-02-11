import NonLayout from "@layout/NonLayout";
import Image from "next/image";
import React, { ReactElement } from "react";

// img
import authlogin from "@assets/images/authentication/img-auth-login.png";
import logodark from "@assets/images/logo-dark.svg";

import Link from "next/link";
import { Card, Row } from "react-bootstrap";

const Loginv1 = () => {
    return (
        <React.Fragment>
            <div className="auth-main v1">
                <div className="auth-wrapper">
                    <div className="auth-form">
                        <Card className="my-5">
                            <Card.Body>
                                <div className="text-center">
                                    <Image src={authlogin} alt="images" className="img-fluid mb-3" />
                                    <h4 className="f-w-500 mb-1">Faça o login</h4>
                                    <p className="mb-3">Não tem uma conta? <a href="/pages/register-v1" className="link-primary ms-1">Crie agora</a></p>
                                </div>
                                <div className="form-group mb-3">
                                    <input type="email" className="form-control" id="floatingInput" placeholder="Email Address" />
                                </div>
                                <div className="form-group mb-3">
                                    <input type="password" className="form-control" id="floatingInput1" placeholder="Password" />
                                </div>
                                <div className="d-flex mt-1 justify-content-between align-items-center">
                                    <div className="form-check">
                                        <input className="form-check-input input-primary" type="checkbox" id="customCheckc1" defaultChecked />
                                        <label className="form-check-label text-muted" htmlFor="customCheckc1">Lembrar minha conta</label>
                                    </div>
                                    <Link href="../pages/forgot-password-v1"><h6 className="f-w-400 mb-0">Esqueceu a senha?</h6></Link>
                                </div>
                                <div className="d-grid mt-4">
                                    <button type="button" className="btn btn-primary">Entrar</button>
                                </div>
                            </Card.Body>
                        </Card>
                    </div>

                    <div className="auth-sidefooter">
                        <Image src={logodark} className="img-brand img-fluid" alt="images" />
                        <hr className="mb-3 mt-4" />
                        <Row>
                            <div className="col my-1">
                                <p className="m-0">Light Able ♥ crafted by Team <a href="https://themeforest.net/user/phoenixcoded" target="_blank"> Phoenixcoded</a></p>
                            </div>
                            <div className="col-auto my-1">
                                <ul className="list-inline footer-link mb-0">
                                    <li className="list-inline-item"><Link href="/">Home</Link></li>
                                    <li className="list-inline-item"><Link href="https://pcoded.gitbook.io/light-able/" target="_blank">Documentation</Link></li>
                                    <li className="list-inline-item"><Link href="https://phoenixcoded.support-hub.io/" target="_blank">Support</Link></li>
                                </ul>
                            </div>
                        </Row>
                    </div>
                </div>
            </div>
        </React.Fragment>
    );
}


Loginv1.getLayout = (page: ReactElement) => {
    return (
        <NonLayout>
            {page}
        </NonLayout>
    )
};
export default Loginv1;