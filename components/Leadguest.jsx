import React, { useEffect,useRef } from 'react';
import { useState } from 'react';
import { Modal } from 'react-bootstrap';
import swal from 'sweetalert'
import axios from 'axios';
import * as Constants from "./Constants";
import SimpleReactValidator from "simple-react-validator";
import Cookie from 'js-cookie'

const LeadGuest = (props) => {
    // Inital Guest States
    console.log(props)
    const [show, setShow] = useState(!props.show)
    const [otpModal, setOtpModal] = useState(true);
    const [guestOTP, setGuestOTP] = useState('');
    const [opengest,setOpengest] = useState(true);
    const [guest, setGuest] = useState({ name: props.name, email: props.email, mobile: props.mobile });
    const registervalidator = useRef(new SimpleReactValidator())
    const [, forceUpdate] = useState();

    // On Guest Registration
    const handleGuestSubmit = async e => {
        // e.preventDefault()
        const data = {
            email: guest.email,
            mobile: guest.mobile,
            password: '',
            av: '',
            dp: '',
            pt: ''
        }
        const nm = guest.name.split(" ")
        data.fname = nm[0]
        nm.length === 1 ? data.lname = '' : data.lname = nm[1]
        console.log(nm)
        const response = await axios.post(Constants.api+'/api/v1/user/guestlogin', data)
        if (response?.data?.result === 'success') {
            setOpengest(false)
            setShow(!show)
            console.log(response.data)
            // setOtpModal(!otpModal)
            return
        }
        swal(response?.data?.msg)
    }

    // On OTP Submitted
    const handleOTPSubmit = async e => {
        e.preventDefault()
        if(registervalidator.current.allValid()){
        const response = await axios.post(Constants.api+'/api/v1/user/verifyotp', { username: props.mobile??guest.mobile, authcode: guestOTP, av: '', pt: '' })
        if (response?.data?.result === 'success') {
            const { fn, id, em, mob } = { ...response?.data?.output }
            Cookie.set('username', fn)
            Cookie.set('userid', id)
            Cookie.set('useremail', em)
            Cookie.set('userphone', mob)
            setOtpModal(!otpModal)
            setGuest({ fname: '', lname: '', email: '', mobile: '', password: '', av: '', dp: '', pt: '' })
            setGuestOTP('')
            props.setShow()
            return
        }}else{
            registervalidator.current.showMessages()
            forceUpdate(1)
        }
        // swal({ title: "You Entered Wrong OTP ", icon: "warning" })
    }

    // On Change of Guest Registration Form
    useEffect(()=>{
        handleGuestSubmit()
    },[])
    // const handleChange = e => setGuest({ ...guest, [e.target.name]: e.target.value })

    return (
        <>
            {/* <Modal
                className="login_modal"
                show={show}
                animation={false}
                backdrop="static">
                <Modal.Body>
                    <span
                        style={{
                            float: "right",
                            color: "black"
                        }}
                        onClick={() => setShow(!show)}
                        aria-hidden="true">
                        <i className="fa fa-close"></i>
                    </span>
                    <div>
                        <form onSubmit={handleGuestSubmit}>
                            <div className="wrapper-box">
                                <div className="wrapper_login">
                                    <div className="body_login">
                                        <div className="login_header">
                                            <img
                                                src={require("../assets/logo-icon.png")}
                                                height="50"
                                                alt=""
                                            />
                                            <h4>{props.name?"Your Details":"Enter Following Details"}</h4>
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
                                            value={props.name??guest.name}
                                            disabled={props.name?true:false}
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
                                            value={props.email??guest.email}
                                            disabled={props.email?true:false}

                                        />
                                    </div>
                                    <div className="form-group">
                                        <input
                                            type="text"
                                            className="form-control"
                                            name="mobile"
                                            onChange={handleChange}
                                            required
                                            placeholder="Enter your 10 digit Mobile Number "
                                            minLength="10"
                                            maxLength="10"
                                            value={props.mobile??guest.mobile}
                                            disabled={props.mobile?true:false}

                                        />
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
            </Modal> */}
            <Modal
                className="body_otp"
                show={otpModal}
                animation={false}
                backdrop="static">
                <Modal.Body>
                    <span
                        style={{
                            float: "right",
                            color: "black"
                        }}
                        onClick={() => setOtpModal(!otpModal)}
                        aria-hidden="true">
                        {/* <i className="fa fa-close"></i> */}
                    </span>

                    
                    {
                        opengest==true?
                        <div>
                            <h4 style={{textAlign:'center'}}>Sending OTP to {guest.mobile}</h4>
                            <p style={{textAlign:'center'}}>please wait...</p>
                        </div>
                        :
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
                                <a href="/terms-and-conditions/" target='_blank' className="tnc_color">
                                    Terms & Conditions
                                </a>
                            </p>
                        </div>
                    </div>
                    }

                </Modal.Body>
            </Modal>
        </>
    )
}

export default LeadGuest;