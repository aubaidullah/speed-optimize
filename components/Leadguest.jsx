import React, { useEffect,useRef } from 'react';
import { useState } from 'react';
// import Modal from './modal';
import swal from 'sweetalert'
import axios from 'axios';
import * as Constants from "./Constants";
import SimpleReactValidator from "simple-react-validator";
import Cookie from 'js-cookie'
import dynamic from 'next/dynamic';
const Modal = dynamic(() => import('./modal'))

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
        <Modal className={`body_otp z-10`} changeForm = {setOtpModal} show = {otpModal}>
        {
            opengest==true?
            <div>
                <h4 className={`text-center`}>Sending OTP to {guest.mobile}</h4>
                <p className={`text-center`}>please wait...</p>
            </div>
            :
            <div>
                <div className={`login_header w-[90%]`}>
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
        </Modal>
        </>
    )
}

export default LeadGuest;