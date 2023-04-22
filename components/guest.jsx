import React from 'react';
import { useState, useRef } from 'react';
import { Modal } from 'react-bootstrap';
import { GrClose } from 'react-icons/gr';
import swal from 'sweetalert'
import axios from 'axios';
import * as Constants from "./Constants";
import SimpleReactValidator from "simple-react-validator";

const Guest = (props) => {
    // Inital Guest States
    const [show, setShow] = useState(props.show)
    const [otpModal, setOtpModal] = useState(false);
    const [guestOTP, setGuestOTP] = useState('');
    const [guest, setGuest] = useState({ name: '', email: '', mobile: '' });
    const registervalidator = useRef(new SimpleReactValidator())
    const registervalidatorn = useRef(new SimpleReactValidator())
    const [, forceUpdate] = useState();

    // On Guest Registration
    const handleGuestSubmit = async e => {
        e.preventDefault()
        const data = {
            email: props.email ?? guest.email,
            mobile: props.mobile ?? guest.mobile,
            password: '',
            av: '',
            dp: '',
            pt: ''
        }
        const nm = props.name ? props.name.split(" ") : guest.name.split(" ")
        data.fname = nm[0]
        nm.length === 1 ? data.lname = '' : data.lname = nm[1]


        console.log(registervalidatorn.current.allValid())
        if (registervalidatorn.current.allValid()) {
            const response = await axios.post(Constants.api + '/api/v1/user/guestlogin', data)
            if (response?.data?.result === 'success') {
                setShow(!show)
                setOtpModal(!otpModal)
                return
            }
            swal(response?.data?.msg)
        } else {
            registervalidatorn.current.showMessages()
            forceUpdate(1)
        }

    }

    // On OTP Submitted
    const handleOTPSubmit = async e => {
        e.preventDefault()
        if (registervalidator.current.allValid()) {
            const response = await axios.post(Constants.api + '/api/v1/user/verifyotp', { username: props.mobile ?? guest.mobile, authcode: guestOTP, av: '', pt: '' })
            if (response?.data?.result === 'success') {
                const { fn, id, em, mob } = { ...response?.data?.output }
                localStorage.setItem('username', fn)
                localStorage.setItem('userid', id)
                localStorage.setItem('useremail', em)
                localStorage.setItem('userphone', mob)
                setOtpModal(!otpModal)
                setGuest({ fname: '', lname: '', email: '', mobile: '', password: '', av: '', dp: '', pt: '' })
                setGuestOTP('')
                props.setShow()
                return
            }

        } else {
            registervalidator.current.showMessages()
            forceUpdate(1)
        }

        swal({ title: "You Entered Wrong OTP ", icon: "warning" })
    }

    // On Change of Guest Registration Form
    const handleChange = e => setGuest({ ...guest, [e.target.name]: e.target.value })

    return (
        <>
            <Modal
                className="login_modal"
                show={show}
                animation={false}
                backdrop="static">
                <Modal.Body>
                    <span
                    className={tw`float-right text-black`}
                        // style={{
                        //     float: "right",
                        //     color: "black"
                        // }}
                        onClick={() => setShow(!show)}
                        aria-hidden="true">
                        <GrClose className={tw`cursor-pointer`} />
                    </span>
                    <div>
                        <form onSubmit={handleGuestSubmit}>
                            <div className="wrapper-box">
                                <div className="wrapper_login">
                                    <div className="body_login">
                                        <div className="login_header">
                                            {/* <img
                                                src={require("../assets/logo-icon.png")}
                                                height="50"
                                                alt=""
                                            /> */}
                                            <h4>{props.name ? "Your Details" : "Enter Following Details"}</h4>
                                        </div>
                                    </div>
                                    <div className="form-group ">
                                        <input
                                            type="text"
                                            className="form-control"
                                            name="name"
                                            onChange={handleChange}
                                            required
                                            placeholder="Enter your Name"
                                            value={props.name ?? guest.name}
                                            disabled={props.name ? true : false}
                                        />
                                    </div>
                                    <div className="form-group">
                                        <input
                                            type="email"
                                            className="form-control"
                                            name="email"
                                            onChange={handleChange}
                                            required
                                            placeholder="Enter your Email ID"
                                            value={props.email ?? guest.email}
                                            disabled={props.email ? true : false}

                                        />
                                        <div className="Invalid_num">
                                            {registervalidatorn.current.message(
                                                "email",
                                                props.email ?? guest.email,
                                                "required|email"
                                            )}
                                        </div>
                                    </div>
                                    <div className="form-group">
                                        <input
                                            type="text"
                                            className="form-control"
                                            name="mobile"
                                            onKeyPress={(event) => {
                                                if (!/[0-9]/.test(event.key)) {
                                                    event.preventDefault();
                                                }
                                            }}
                                            onChange={handleChange}
                                            required
                                            placeholder="Enter your 10 digit Mobile Number "
                                            // minLength="10"
                                            pattern="[0-9.]+"
                                            // maxLength="10"
                                            value={props.mobile ?? guest.mobile}
                                            disabled={props.mobile ? true : false}
                                            maxLength={10}
                                            max={10}
                                            size={10}


                                        />
                                        <div className="Invalid_num">
                                            {registervalidatorn.current.message(
                                                "mobile",
                                                props.mobile ?? guest.mobile,
                                                "required|min:10|max:10"
                                            )}
                                        </div>

                                    </div>
                                    <div className="form-group">
                                        <button className="btn btn_login" type="submit">
                                            CONTINUE
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </form>
                    </div>
                </Modal.Body>
            </Modal>
            <Modal
                className="body_otp"
                show={otpModal}
                animation={false}
                backdrop="static">
                <Modal.Body>
                    <span className={tw`float-right text-black`}
                        // style={{
                        //     float: "right",
                        //     color: "black"
                        // }}
                        onClick={() => setOtpModal(!otpModal)}
                        aria-hidden="true">
                        <GrClose className={tw`cursor-pointer`} />
                    </span>

                    <div>
                        <div className="login_header">
                            <p className="text_color">
                                We sent an sms with confirmation code to your mobile number
                            </p>
                        </div>
                        <form onSubmit={handleOTPSubmit}>
                            <div className="form-group">
                                <input
                                    type="text"
                                    className="form-control"
                                    name="otp"
                                    onChange={e => setGuestOTP(e.target.value)}
                                    value={guestOTP}
                                    placeholder="Enter your OTP"
                                    minLength="6"
                                    maxLength="6"
                                />
                                <div className="Invalid_num">
                                    {registervalidator.current.message(
                                        "otp",
                                        guestOTP,
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
                            <p className="proceed_clr">
                                BY proceeding, you agree to the{" "}
                                <a href="" className="tnc_color">
                                    Terms & Conditions
                                </a>
                            </p>
                        </div>
                    </div>
                </Modal.Body>
            </Modal>
        </>
    )
}

export default Guest;