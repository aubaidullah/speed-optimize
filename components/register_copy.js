import { useState, useRef } from 'react';
import { Modal } from 'react-bootstrap';
import { GrClose } from 'react-icons/gr';
import { tw } from 'twind';
import React from 'react';
import swal from 'sweetalert';
import axios from 'axios';
import * as Constants from "./Constants";
import SimpleReactValidator from "simple-react-validator";

const Login = (props) => {

    const [show, setShow] = useState(props.show);
    const [user, setUser] = useState({
        mobile: '',
        password: '',
        email: '',
        fname: '',
        lname: ''
    });

    const [registerOTP, setRegisterOTP] = useState('');
    const [showOTP, setShowOTP] = useState(false);

    const validator = useRef(new SimpleReactValidator());
    const otpvalidator = useRef(new SimpleReactValidator());

    const handleRegisterSubmit = async e => {
        e.preventDefault();
        if (isNaN(user.email * 1)) {
            if (/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(user.email) == false) {
                swal("Please enter valid email id")
                return
            }
        }
        if (user.mobile.length != 10) {
            swal("Please Enter valid Phone Number")
            return
        }
        if (validator.current.allValid()) {
            const response = await axios.post(Constants.api + "/api/v1/user/register",
                {
                    av: Constants.av,
                    pt: Constants.pt,
                    mobile: user.mobile,
                    password: user.password,
                    email: user.email,
                    fname: user.fname,
                    lname: user.lname,
                }
            )
            if (response.data.result == "success") {
                if (response.data.output.otp_require == "true") {
                    swal("Please Enter OTP Received on your Mobile Number.");
                    setShow(!show)
                    setShowOTP(!showOTP)
                }
            } else {
                swal("", response.data.msg, "info");
            }
        } else validator.current.showMessages();
    };

    // On OTP Submitted
    const handleOTPSubmit = async e => {
        e.preventDefault()
        if (otpvalidator.current.allValid()) {
            const response = await axios.post(Constants.api + "/api/v1/user/verifyotp",
                {
                    av: Constants.av,
                    pt: Constants.pt,
                    username: user.mobile,
                    authcode: registerOTP
                }
            )
            if (response.data.result === "success") {
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


    const handleClose = () => {
        props.setShowLogin(!props.showLogin)
        props.setShowRegister(!props.show)
        setShow(!show)
    }

    const handleChange = e => setUser({ ...user, [e.target.name]: e.target.value })

    return <>
        <Modal
            show={show}
            animation={false}
            className="login_credential"
            backdrop="static"
        >
            <Modal.Body>
                <span
                className={tw`float-right text-black cursor-pointer relative top-[10px] right-[15px]`}
                    // style={{
                    //     float: "right",
                    //     color: "black",
                    //     cursor: 'pointer',
                    //     position: 'relative',
                    //     top: 10,
                    //     right: 15
                    // }}
                    onClick={handleClose}
                    aria-hidden="true"
                >
                    <GrClose />
                </span>
                <div className={tw`mt-3 mb-4 mx-4`}>
                    <form onSubmit={handleRegisterSubmit}>
                        <div className="wrapper-box">
                            <div className="wrapper_login">
                                <div className="body_login">
                                    <div className={tw`login_header`}>
                                        <img
                                            className={tw`m-auto w-[40px]`}
                                            src={`${Constants.assets_api}/public/icons/logo-icon.png`}
                                            alt="kiomoi"
                                            
                                            // style={{ width: '40px' }}
                                        />
                                        <h4 className={tw`text-lg font-semibold text-orange`}>Sign up</h4>
                                    </div>
                                    <div className="form-group">
                                        <input
                                            type="text"
                                            className="form-control"
                                            name="fname"
                                            required
                                            onChange={handleChange}
                                            value={user.fname}
                                            placeholder="Enter your First Name"
                                        />
                                        <div className="Invalid_num">

                                        </div>
                                        <div className="Invalid_num">
                                            {validator.current.message(
                                                "fname",
                                                user.fname,
                                                "required"
                                            )}
                                        </div>
                                    </div>
                                    <div className="form-group">
                                        <input
                                            type="text"
                                            className="form-control"
                                            name="lname"
                                            required
                                            onChange={handleChange}
                                            value={user.lname}
                                            placeholder="Enter your Last Name"
                                        />
                                        <div className="Invalid_num">

                                        </div>
                                        <div className="Invalid_num">
                                            {validator.current.message(
                                                "lname",
                                                user.lname,
                                                "required"
                                            )}
                                        </div>
                                    </div>
                                    <div className="form-group">
                                        <input
                                            type="text"
                                            className="form-control"
                                            name="email"
                                            required
                                            onChange={handleChange}
                                            value={user.email}
                                            placeholder="Enter your Email ID"
                                        />
                                        <div className="Invalid_num">

                                        </div>
                                        <div className="Invalid_num">
                                            {validator.current.message(
                                                "email",
                                                user.email,
                                                "required"
                                            )}
                                        </div>
                                    </div>
                                    <div className="form-group">
                                        <input
                                            type="text"
                                            className="form-control"
                                            name="mobile"
                                            required
                                            onChange={handleChange}
                                            value={user.mobile}
                                            placeholder="Enter your 10 digit Mobile Number"
                                        />
                                        <div className="Invalid_num">

                                        </div>
                                        <div className="Invalid_num">
                                            {validator.current.message(
                                                "mobile",
                                                user.mobile,
                                                "required"
                                            )}
                                        </div>
                                    </div>
                                    <div className="form-group">
                                        <input
                                            type="password"
                                            className="form-control"
                                            name="password"
                                            required
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
                                    </div>

                                    <div className="form-group">
                                        <div className="login_width">
                                            <span>Already signed Up?</span>
                                        </div>
                                    </div>

                                    <div className="form-group">
                                        <button
                                            className="btn btn_facebook"
                                            onClick={() => {
                                                setShow(!show)
                                                props.setShowRegister(!props.show)
                                                props.setShowLogin(!props.showLogin)
                                            }}
                                        >
                                            {" "}
                                            Login
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
            show={showOTP}
            animation={false}
            backdrop="static">
            <Modal.Body>
                <span
                className={tw`float-right text-black cursor-pointer relative top-[10px] right-[15px]`}
                    // style={{
                    //     float: "right",
                    //     color: "black",
                    //     cursor: 'pointer',
                    //     position: 'relative',
                    //     top: 10,
                    //     right: 15
                    // }}
                    onClick={() => setShowOTP(!showOTP)}
                    aria-hidden="true"
                >
                    <GrClose />
                </span>
                <div className={tw`m-3`}>
                    <div className="login_header">
                        <div className="login_header">
                            <p className={tw`text_color`}>We sent an sms with confirmation code to your mobile number</p>
                        </div>
                    </div>
                    <form onSubmit={handleOTPSubmit}>
                        <div className="form-group">
                            <input
                                type="text"
                                className="form-control"
                                value={registerOTP}
                                name="otp"
                                required
                                onChange={e => setRegisterOTP(e.target.value)}
                                placeholder="Enter your OTP"
                                minLength="6"
                                maxLength="6"
                            />
                            <div className="Invalid_num">
                                {otpvalidator.current.message(
                                    "otp",
                                    registerOTP,
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
    </>
}

export default Login;