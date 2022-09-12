import { useState, useRef } from 'react';
import { Modal } from 'react-bootstrap';
import { GrClose } from 'react-icons/gr';
import { tw } from 'twind';
import React from 'react';
import dynamic from 'next/dynamic';
import swal from 'sweetalert';
import axios from 'axios';
import * as Constants from "./Constants";
import SimpleReactValidator from "simple-react-validator";

const Register = dynamic(import('./register'));

const Login = (props) => {

    const [show, setShow] = useState(props.show);
    const [user, setUser] = useState({ username: '', password: '' });

    const [loginOTP, setLoginOTP] = useState('');
    const [showOTP, setShowOTP] = useState(false);

    const [showRegister, setShowRegister] = useState(false);

    const [showForgotPass, setShowForgotPass] = useState(false);
    const [showResetPass, setShowResetPass] = useState(false);
    const [forgetCredentials, setForgetCredentials] = useState({ otp: '', password: '', confirmpassword: '' })


    const validator = useRef(new SimpleReactValidator());
    const otpvalidator = useRef(new SimpleReactValidator());
    const forgotvalidator = useRef(new SimpleReactValidator());
    const resetpassvalidator = useRef(new SimpleReactValidator());

    const handleForgotpassSubmit = async e => {
        e.preventDefault();
        if (forgotvalidator.current.allValid()) {
            const response = await axios.post(Constants.api + "/api/v1/user/fp",
                {
                    av: Constants.av,
                    pt: Constants.pt,
                    username: user.username,
                }
            )
            if (response.data.result == "success") {
                if (response.data.output.otp_require == "true") {
                    swal("Please Enter OTP Received on your Mobile Number.");
                    setShowForgotPass(!showForgotPass)
                    setShowResetPass(!showResetPass)
                }
            } else {
                swal(response.data.msg);
            }
        } else forgotvalidator.current.showMessages();
    };

    const handleLoginSubmit = async e => {
        e.preventDefault();
        if (isNaN(user.username * 1)) {
            if (/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(user.username) == false) {
                swal("Please enter valid email id")
            }
        }
        else if (user.username.length != 10) {
            swal("Please Enter valid Phone Number")
        }
        else {
            if (validator.current.allValid()) {
                const response = await axios.post(Constants.api + "/api/v1/user/login",
                    {
                        av: Constants.av,
                        pt: Constants.pt,
                        username: user.username,
                        password: user.password,
                    }
                )
                if (response?.data?.result == "success") {
                    if (response.data.output.otp_require == "true") {
                        showShow(!show)
                        setShowOTP(!showOTP)
                    }
                    else {
                        localStorage.setItem("useremail", response.data.output.em);
                        localStorage.setItem("userid", response.data.output.id);
                        localStorage.setItem("userphone", response.data.output.mob);
                        localStorage.setItem("username", response.data.output.fn);
                        setShow(!show)
                        swal("", "You Have Succesfully Logged In.", "success");
                    }
                } else {
                    swal(response.data.msg);
                }
            }
            else validator.current.showMessages();
        }
    };

    const handleOTPSubmit = async e => {
        e.preventDefault()
        if (otpvalidator.current.allValid()) {
            const response = await axios.post(Constants.api + "/api/v1/user/verifyotp",
                {
                    av: Constants.av,
                    pt: Constants.pt,
                    username: user.username,
                    authcode: loginOTP
                }
            )
            if (response?.data?.result == "success") {
                localStorage.setItem("useremail", response.data.output.em);
                localStorage.setItem("userid", response.data.output.id);
                localStorage.setItem("userphone", response.data.output.mob);
                localStorage.setItem("username", response.data.output.fn);
                setShowOTP(!showOTP)
                swal("", "You have logged in!", "success");
            } else {
                swal({ title: "You Entered Wrong OTP ", icon: "warning" })
            }
        } else {
            otpvalidator.current.showMessages()
        }
    }

    const handleresetpassSubmit = async e => {
        e.preventDefault();
        if (resetpassvalidator.current.allValid()) {
            if (forgetCredentials.password != forgetCredentials.confirmpassword) {
                swal("", "Passwords do not match.", "info");
                return
            }
            const response = await axios.post(Constants.api + "/api/v1/user/reset",
                {
                    av: Constants.av,
                    pt: Constants.pt,
                    username: user.username,
                    password: forgetCredentials.password,
                    authcode: forgetCredentials.otp,
                }
            )
            if (response?.data?.result == "success") {
                localStorage.setItem("useremail", response.data.output.em);
                localStorage.setItem("userid", response.data.output.id);
                localStorage.setItem("userphone", response.data.output.ph);
                localStorage.setItem("username", response.data.output.fn);
                setShowResetPass(!showResetPass)
                swal("", "You have logged in!", "success");
            } else {
                swal("", response.data.msg, "info");
            }
        } else resetpassvalidator.current.showMessages();
    };

    const handleClose = () => {
        props.setShowLogin(!props.show)
        setShow(!show)
    }

    const handleChange = e => setUser({ ...user, [e.target.name]: e.target.value })

    const handleForgetCredentials = e => setForgetCredentials({ ...forgetCredentials, [e.target.name]: e.target.value })

    return <>
        {showRegister ? <Register show={showRegister} setShowRegister={setShowRegister} showLogin={show} setShowLogin={setShow} /> : null}
        <Modal
            show={show}
            animation={false}
            className="login_credential login-form"
            backdrop="static"
        >
            <Modal.Body>
                <span
                    style={{
                        float: "right",
                        color: "black",
                        cursor: 'pointer',
                        position: 'relative',
                        top: 10,
                        right: 15
                    }}
                    onClick={handleClose}
                    aria-hidden="true"
                >
                    <GrClose />
                </span>
                <div className={tw`mt-3 mb-5 mx-4`}>
                    <form onSubmit={handleLoginSubmit}>
                        <div className="wrapper-box">
                            <div className="wrapper_login">
                                <div className="body_login">
                                    <div className={tw`login_header`}>
                                        <img
                                            className={tw`m-auto`}
                                            src={"/icons/logo-icon.png"}
                                            alt=""
                                            style={{ width: '40px' }}
                                        />
                                        <h4 className={tw`text-lg font-semibold text-orange`}>Login or Sign up</h4>
                                    </div>

                                    <div className="form-group">
                                        <input
                                            type="text"
                                            className="form-control"
                                            name="username"
                                            onChange={handleChange}
                                            value={user.username}
                                            placeholder="Enter your 10 digit Mobile Number or Email ID"
                                        />
                                        <div className="Invalid_num">

                                        </div>
                                        <div className="Invalid_num">
                                            {validator.current.message(
                                                "username",
                                                user.username,
                                                "required"
                                            )}
                                        </div>
                                    </div>
                                    <div className="form-group">
                                        <input
                                            type="password"
                                            className="form-control"
                                            name="password"
                                            onChange={handleChange}
                                            value={user.password}
                                            placeholder="Enter your Password"
                                        />
                                        <div className="Invalid_num">
                                            {validator.current.message(
                                                "password",
                                                user.password,
                                                "required"
                                            )}
                                        </div>
                                    </div>

                                    <div className="form-group">
                                        <button className="btn btn_login" type="submit">
                                            CONTINUE
                                        </button>
                                        <p className="proceed_clr mt-2">
                                            {" "}
                                            <span
                                                onClick={() => {
                                                    setShow(!show)
                                                    setShowForgotPass(!showForgotPass)
                                                }}
                                                className={tw`text-orange font-semibold cursor-pointer`}
                                            >
                                                Forgot Password?
                                            </span>
                                        </p>
                                    </div>

                                    <div className="form-group">
                                        <div className="login_width">
                                            <span>Not signed up yet?</span>
                                        </div>
                                    </div>

                                    <div className="form-group">
                                        <button
                                            className="btn btn_facebook"
                                            onClick={() => {
                                                setShow(!show)
                                                setShowRegister(!showRegister)
                                            }}
                                        >
                                            {" "}
                                            Register
                                        </button>
                                    </div>

                                    <div className="form-group">
                                        <p className={tw`proceed_clr`}>
                                            BY proceeding, you agree to the{" "}
                                            <a href="/terms-and-conditions" className={tw`text-orange font-semibold`}>
                                                Terms & Conditions
                                            </a>
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </form>
                </div>
            </Modal.Body>
        </Modal>
        <Modal
            className="body_otp"
            show={showForgotPass}
            animation={false}
            backdrop="static"
        >
            <Modal.Body>
                <span
                    style={{
                        float: "right",
                        color: "black",
                        cursor: 'pointer',
                        position: 'relative',
                        top: 10,
                        right: 15
                    }}
                    onClick={() => setShowForgotPass(!showForgotPass)}
                    aria-hidden="true"
                >
                    <GrClose />
                </span>
                <div className={tw`m-3`}>
                    <div className="login_header">
                        <p className={tw`text_color fw-bold ms-1`}>Enter Your Mobile Number</p>
                    </div>
                    <form onSubmit={handleForgotpassSubmit}>
                        <div className="form-group">
                            <input
                                type="text"
                                className="form-control"
                                name="username"
                                onKeyPress={(event) => {
                                    if (!/[0-9]/.test(event.key)) {
                                        event.preventDefault();
                                    }
                                }}
                                required
                                onChange={handleChange}
                                value={user.username}
                                placeholder="Enter your 10 digit Mobile Number"
                                maxlength="10"
                            />
                            <div className="Invalid_num">
                                {forgotvalidator.current.message(
                                    "username",
                                    user.username,
                                    "required"
                                )}
                            </div>
                        </div>
                        <div className="form-group">
                            <button className="btn btn_login" type="submit">
                                Reset Password
                            </button>
                        </div>
                    </form>
                </div>
            </Modal.Body>
        </Modal>
        <Modal
            className="body_otp"
            show={showOTP}
            animation={false}
            backdrop="static">
            <Modal.Body>
                <span
                    style={{
                        float: "right",
                        color: "black",
                        cursor: 'pointer',
                        position: 'relative',
                        top: 10,
                        right: 15
                    }}
                    onClick={() => setShowOTP(!showOTP)}
                    aria-hidden="true"
                >
                    <GrClose />
                </span>
                <div className={tw`m-3`}>
                    <div className="login_header">
                        <p className={tw`text_color`}>We sent an sms with confirmation code to your mobile number</p>
                    </div>
                    <form onSubmit={handleOTPSubmit}>
                        <div className="form-group">
                            <input
                                type="text"
                                className="form-control"
                                value={loginOTP}
                                name="otp"
                                required
                                onChange={e => setLoginOTP(e.target.value)}
                                placeholder="Enter your OTP"
                                minLength="6"
                                maxLength="6"
                            />
                            <div className="Invalid_num">
                                {otpvalidator.current.message(
                                    "otp",
                                    loginOTP,
                                    "required"
                                )}
                            </div>
                        </div>
                        <div className="form-group">
                            <button className="btn btn_facebook" type="submit">
                                Submit OTP
                            </button>
                        </div>
                    </form>
                    <div className="form-group">
                        <p className={tw`proceed_clr`}>
                            BY proceeding, you agree to the{" "}
                            <a href="/terms-and-conditions" className={tw`text-orange font-semibold`}>
                                Terms & Conditions
                            </a>
                        </p>
                    </div>
                </div>
            </Modal.Body>
        </Modal>
        <Modal
            className="body_otp"
            show={showResetPass}
            animation={false}
            backdrop="static"
        >
            <Modal.Body>
                <span
                    style={{
                        float: "right",
                        color: "black",
                        cursor: 'pointer',
                        position: 'relative',
                        top: 10,
                        right: 15
                    }}
                    onClick={() => setShowResetPass(!showResetPass)}
                    aria-hidden="true"
                >
                    <GrClose />
                </span>
                <div className={tw`mt-3 mb-5 mx-4`}>
                    <div className="wrapper-box">
                        <div className="wrapper_login">
                            <div className="body_login">
                                <div className={tw`login_header`}>
                                    <img
                                        className={tw`m-auto`}
                                        src={"/icons/logo-icon.png"}
                                        alt=""
                                        style={{ width: '40px' }}
                                    />
                                    <h4 className={tw`font-semibold text-orange`}>Enter OTP and New Password</h4>
                                </div>
                                <form onSubmit={handleresetpassSubmit}>
                                    <div className="form-group">
                                        <input
                                            type="text"
                                            className="form-control"
                                            name="otp"
                                            min={6}
                                            max={6}
                                            size={6}
                                            maxLength={6}
                                            required
                                            onKeyPress={(event) => {
                                                if (!/[0-9]/.test(event.key)) {
                                                    event.preventDefault();
                                                }
                                            }}
                                            onChange={handleForgetCredentials}
                                            value={forgetCredentials.otp}
                                            placeholder="Enter your OTP"
                                        />
                                        <div className="Invalid_num">
                                            {resetpassvalidator.current.message(
                                                "otp",
                                                forgetCredentials.otp,
                                                "required|min:6|max:6|numeric"
                                            )}
                                        </div>
                                    </div>
                                    <div className="form-group">
                                        <input
                                            type="password"
                                            className="form-control"
                                            name="password"
                                            required
                                            onChange={handleForgetCredentials}
                                            value={forgetCredentials.password}
                                            placeholder="Enter your Password"
                                        />
                                        <div className="Invalid_num">
                                            {resetpassvalidator.current.message(
                                                "password",
                                                forgetCredentials.password,
                                                "required"
                                            )}
                                        </div>
                                    </div>
                                    <div className="form-group">
                                        <input
                                            type="password"
                                            className="form-control"
                                            name="confirmpassword"
                                            required
                                            onChange={handleForgetCredentials}
                                            value={forgetCredentials.confirmpassword}
                                            placeholder="Confirm your Password"
                                        />
                                        <div className="Invalid_num">
                                            {resetpassvalidator.current.message(
                                                "confirmpassword",
                                                forgetCredentials.confirmpassword,
                                                "required"
                                            )}
                                        </div>
                                    </div>
                                    <div className="form-group">
                                        <button className="btn btn_facebook" type="submit">
                                            Reset Password
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </Modal.Body>
        </Modal>
    </>
}

export default Login;