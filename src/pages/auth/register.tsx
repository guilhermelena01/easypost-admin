import NonLayout from "@layout/NonLayout";
import Image from "next/image";
import Link from "next/link";
import React, { ReactElement } from "react";
import { Card, Row, Col, Form } from "react-bootstrap";

// img
import logoEasy from "@assets/images/logo.webp"
import { useAuth } from "./hooks/useAuth";

const Register = () => {
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
                        <Card className="my-5 mx-3">
                            <Card.Body>
                                <h4 className="f-w-500 mb-1">Registre-se com seu e-mail</h4>
                                <p className="mb-3">Já tem uma conta? <Link href="/auth/login" className="link-primary">Faça login</Link></p>
                                <Row>
                                    <Col sm={12}>
                                        <div className="form-group mb-3">
                                            <Form.Control type="text" placeholder="Nome" id="userName" value={auth.authFormFields.userName} onChange={(e) => auth.handleChange(e)} />
                                        </div>
                                    </Col>
                                </Row>
                                <div className="form-group mb-3">
                                    <Form.Control type="email" placeholder="Email" id="email" value={auth.authFormFields.email} onChange={(e) => auth.handleChange(e)} />
                                </div>
                                <div className="form-group mb-3">
                                    <Form.Control type="password" placeholder="Senha" id="password" value={auth.authFormFields.password} onChange={(e) => auth.handleChange(e)} />
                                </div>
                                <div className="form-group mb-3">
                                    <Form.Control type="password" placeholder="Confirmação de senha" id="userConfirmPassword" value={auth.authFormFields.userConfirmPassword} onChange={(e) => auth.handleChange(e)} />
                                </div>
                                <div className="d-grid mt-4">
                                    <button type="button" className="btn btn-primary" onClick={auth.handleCreateAccount}>Criar conta</button>
                                </div>
                            </Card.Body>
                        </Card>
                    </div>
                </div>
            </div>
        </React.Fragment>
    )
}

Register.getLayout = (page: ReactElement) => {
    return (
        <NonLayout>
            {page}
        </NonLayout>
    )
};

export default Register;