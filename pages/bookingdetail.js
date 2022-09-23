import Nav from "../components/Nav";
import axios from "axios";
import * as Constants from "../components/Constants";
import swalr from '@sweetalert/with-react'
import { AiFillCheckCircle, AiOutlineMinus, AiOutlinePlus } from 'react-icons/ai'
import { tw } from "twind";
import { useState, useRef, useEffect } from "react";
import { Modal, Collapse } from "react-bootstrap";


const BookingDetail = () => {

    const [showModal, setShowModal] = useState(false)

    const [paynowclick, setPaynowclick] = useState(true)

    const [bookingDetails, setBookingDetails] = useState(
        {
            bookingid: "",
            output: {},
            lead: {},
            nm: "",
            itn: [],
            policy2: [],
            email: "",
            mobileNo: ""
        }
    )

    const [paymentDetails, setPaymentDetails] = useState(
        {
            bookingid: "",
            orderid: "",
            callbackurl: "",
            amount: "",
            currency: "",
            key: "",
        }
    )

    const [collapse, setCollapse] = useState(null);

    const [collapse2, setCollapse2] = useState(null);

    useEffect(() => {
        setShowModal(new URLSearchParams(window.location.search).get("bookingid") ? false : true)
        setBookingDetails(
            {
                ...bookingDetails, bookingid: new URLSearchParams(window.location.search).get("bookingid") || ""
            }
        )
        setPaymentDetails(
            {
                ...paymentDetails, bookingid: new URLSearchParams(window.location.search).get("bookingid") || ""
            }
        )
    }, [])

    const loadScript = (src) => {
        return new Promise((resolve) => {
            const script = document.createElement("script");
            script.src = src;
            script.onload = () => {
                resolve(true);
            };
            script.onerror = () => {
                resolve(false);
            };
            document.body.appendChild(script);
        });
    }

    const initializeRazorpay = () => {
        return new Promise((resolve) => {
          const script = document.createElement("script");
          script.src = "https://checkout.razorpay.com/v1/checkout.js";
    
          script.onload = () => {
            resolve(true);
          };
          script.onerror = () => {
            resolve(false);
          };
    
          document.body.appendChild(script);
        });
      };




    const displayRazorpay = async () => {
        // const res = loadScript("https://checkout.razorpay.com/v1/checkout.js");
        const res = await initializeRazorpay()

        if (!res) {
            alert("Razorpay SDK failed to load. Are you online?");
            return;
        }
        console.log(paymentDetails)

        const options = {
            key: paymentDetails?.key,
            amount: paymentDetails?.amount,
            currency: paymentDetails?.currency,
            name: bookingDetails?.lead?.name,
            description: bookingDetails?.lead?.pname,
            image: "icons/logo.png",
            order_id: paymentDetails?.orderid,
            prefill: {
                name: bookingDetails?.nm,
                email: bookingDetails?.email,
                contact: `+91${bookingDetails?.mobileNo}`
            },
            handler: async function (response) {
                const data = {
                    av: Constants.av,
                    did: Constants.did,
                    pt: Constants.pt,
                    razorpay_payment_id: response.razorpay_payment_id,
                    razorpay_order_id: response.razorpay_order_id,
                    razorpay_signature: response.razorpay_signature,
                };

                const result = await axios.post(
                    Constants.api + "/api/v1/payment/razorpay/status",
                    data
                ).then((resp) => {
                    let msg =
                        "A payment of  Rs. " +
                        resp.data.output.amount +
                        " for Booking ID " +
                        resp.data.output.pid +
                        " on " +
                        resp.data.output.bt;
                    swalr(
                        <>
                            <div style={{ textAlign: 'center', marginBottom: '15px' }}>
                                <p style={{ paddingTop: "10px", textAlign: "center", fontSize: "17px" }}>Thank you for the payment. Your payment summary as below: </p>
                                <div>
                                    <div>
                                        <span style={{ fontWeight: "bold" }}>Booking ID : </span>
                                        <span>{resp.data.output.bid}</span>
                                    </div>
                                    <div>
                                        <span style={{ fontWeight: "bold" }}>Trasection ID : </span>
                                        <span>{resp.data.output.pid}</span>
                                    </div>
                                    <div>
                                        <span style={{ fontWeight: "bold" }}>Trasection Date : </span>
                                        <span>{resp.data.output.bt} </span>
                                    </div>
                                    <div>
                                        <span style={{ fontWeight: "bold" }}>Amount : </span>
                                        <span>&#8377;&nbsp;{resp.data.output.amount}/-</span>
                                    </div>
                                </div>
                            </div>
                        </>,
                        { icon: 'success' }
                    ).then((value) => {
                        window.location.href = "/"
                    });
                }).catch((er) => {
                    console.log(er)
                    swal(
                        "Error",
                        "Transaction Fail",
                        "error"
                    );
                })
            },
            notes: {
                address: "",
            },
            theme: {
                color: "#F05927",
            },
        };
        const paymentObject = new window.Razorpay(options);
        paymentObject.open();
    }

    const mybookingSubmit = async e => {
        e?.preventDefault()
        const response = await axios.post(Constants.api + "/api/v1/lead/get/" + paymentDetails.bookingid, {
            id: paymentDetails.bookingid,
        })
        if (response?.data?.result == "success") {
            setShowModal(false)
            setBookingDetails({
                bookingid: response.data.output.lid,
                output: response.data.output,
                lead: response.data.output,
                nm: response.data.output.nm,
                itn: response.data.output.itn,
                policy2: response.data.output.pp,
                email: response.data.output.email,
                mobileNo: response.data.output.mobile
            });
        }
    }

    const paymentSubmit = (event) => {
        event.preventDefault();
        if (paynowclick === true) {
            setPaynowclick(false)
            axios
                .post(Constants.api + "/api/v1/payment/razorpay/hmac", {
                    lid: parseInt(bookingDetails?.output?.lid),
                    av: Constants.av,
                    did: Constants.did,
                    pt: "Website",
                    paymentid: bookingDetails?.output?.paymentid,
                    email: bookingDetails?.lead?.email,
                })
                .then((res) => {
                    if (res.data.result == "success") {
                        setPaymentDetails({
                            bookingid: res.data.output.bookingid,
                            orderid: res.data.output.orderid,
                            callbackurl: res.data.output.callbackurl,
                            amount: res.data.output.amount,
                            currency: res.data.output.currency,
                            key: res.data.output.key,
                        });
                        displayRazorpay();
                        setPaynowclick(true)
                    } else {
                        swal("", res.data.msg, "info");
                    }
                });
        }
    }



    useEffect(() => {
        const fetchData = async () => {
            if (new URLSearchParams(window.location.search).get("bookingid")) {
                const response = await axios.post(Constants.api + "/api/v1/lead/get/" + paymentDetails.bookingid, {
                    id: paymentDetails.bookingid,
                })
                if (response?.data?.result == "success") {
                    setShowModal(false)
                    setBookingDetails({
                        bookingid: response.data.output.lid,
                        output: response.data.output,
                        lead: response.data.output,
                        nm: response.data.output.nm,
                        itn: response.data.output.itn,
                        policy2: response.data.output.pp,
                        email: response.data.output.email,
                        mobileNo: response.data.output.mobile
                    });
                }
            }
        }
        fetchData()
    }, [])

    return (
        <>
            <Nav />
            <section className={tw`booking-detail`} style={{ filter: showModal == true ? 'blur(5px)' : 'blur(0px)' }}>
                <section className="about_place">
                    <div className="container">
                        <div className="row">
                            <div className="col-sm-8 col-xs-6">
                                <div className="title_listing_">
                                    <h2 className={tw`text-xl font-bold my-3 text-orange`}>Booking Details ({bookingDetails?.bookingid})</h2>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="container">
                        <div className="row">
                            <div className="col-md-8 col-xs-12 Shape_42 _details_">
                                <div className={tw`row md:p-3 pt-2`}>
                                    <div className={tw`col-md-4 ${!bookingDetails?.lead?.i ? "border" : null} flex justify-center items-center`}>
                                        <div className={tw`card_item ${!bookingDetails?.lead?.i ? "py-14" : null}`}>
                                            <div className={tw`card_img`}>
                                                <img
                                                    className="rounded"
                                                    src={
                                                        bookingDetails?.lead?.i && bookingDetails?.lead?.i.length > 0
                                                            ? bookingDetails?.lead?.i
                                                            : "icons/logo-icon.png"
                                                    }
                                                    alt=""
                                                />
                                            </div>
                                        </div>
                                    </div>
                                    <div className={tw`col-md-8 mt-2 flex flex-col justify-between`}>
                                        <div className="package-name _pn_package">
                                            <div className="_pn_">
                                                <div className="_pn_left">
                                                    <h3 className={tw`font-semibold text-xl`}>{bookingDetails?.lead?.pname}</h3>
                                                </div>
                                                <div className="_pn_right">
                                                    <div className="row"></div>
                                                    <div className="row"></div>
                                                </div>
                                            </div>
                                            <div className={tw`location package-location`} style={{ fontSize: 12.5 }}>
                                                <span>
                                                    {" "}
                                                    {bookingDetails?.lead?.nights + 1} Days /{" "}
                                                    {bookingDetails?.lead?.nights} Nights
                                                </span>
                                            </div>
                                            <div className="location package-location">
                                                <i className="fa fa-map-marker"></i>
                                                <span> {bookingDetails?.lead?.ocity}</span>
                                            </div>
                                            <div className="_cities">
                                                <div className="list_city_1">
                                                    <span></span>
                                                </div>
                                            </div>
                                        </div>
                                        <div className={tw`row info-booking py-3 px-2 Shape_42 m-0 border`} style={{ background: '#f5f4f4' }}>
                                            <div className={tw`col-4 info-booking-details flex justify-center items-center`}>
                                                <div>
                                                    <p className={tw`text-xs`}>Trip Start</p>
                                                    <p className={tw`text-xs`}>
                                                        <strong className={tw`flex`}>
                                                            <span>{bookingDetails?.lead?.checkin}</span>
                                                        </strong>
                                                    </p>
                                                </div>
                                            </div>
                                            <div className={tw`col-4 info-booking-details flex justify-center items-center`}>
                                                <div>
                                                    <p className={tw`text-xs`}>Trip End</p>
                                                    <p className={tw`text-xs`}>
                                                        <strong className={tw`flex`}>
                                                            <span>{bookingDetails?.lead?.checkout}</span>
                                                        </strong>
                                                    </p>
                                                </div>
                                            </div>
                                            <div className={tw`col-4 info-booking-details flex justify-center items-center`}>
                                                <div>
                                                    <p className={tw`text-xs`}>Travellers</p>
                                                    <p className={tw`text-xs`}>
                                                        <strong className={tw`flex`}>
                                                            <span>{bookingDetails?.lead?.adults} Adults,{" "}</span>
                                                            <span>{bookingDetails?.lead?.kids} Kids</span>
                                                        </strong>
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className={tw`row package-inclusions md:p-3`}>
                                    <h3 className={tw`text-xl font-semibold my-3`}>Inclusions</h3>
                                    <div className="border Shape_42">
                                        <div className={tw`flex flex-wrap gap-2`}>
                                            {
                                                bookingDetails?.output?.inclusions?.split("#").map((inclusion, index) => {
                                                    return (
                                                        <span key={index} className="tag">{inclusion}</span>
                                                    )
                                                })
                                            }
                                        </div>
                                        <div className="package-cancellation">
                                            <div className={tw`row gy-1 Shape_42 border mt-3 md:p-4`}>
                                                <div className="col-sm-8 cancel-left mb-2">
                                                    <p style={{ 'fontWeight': 'bold', fontSize: 13 }}>Cancellation charges</p>
                                                </div>
                                                <div className="col-sm-4 cancel-right">
                                                    <p style={{ 'fontWeight': 'bold', fontSize: 13 }}>*Same Day cancellation No refund</p>
                                                </div>
                                                <div className={tw`col-sm-8 cancel-left flex items-center gap-2`}>
                                                    <AiFillCheckCircle color="green" size={15} />
                                                    {bookingDetails?.policy2?.day > 0 ? (
                                                        <p>
                                                            {" "}
                                                            Up to {bookingDetails?.policy2?.day} Days before travel:{" "}
                                                            {bookingDetails?.policy2?.amount}% deduction of the package cost.
                                                        </p>
                                                    ) : (
                                                        ""
                                                    )}
                                                </div>
                                                <div className="col-sm-4 cancel-right"></div>
                                                <div className={tw`col-sm-8 cancel-left  flex items-center gap-2`}>
                                                    <AiFillCheckCircle color="green" size={15} />
                                                    {bookingDetails?.policy2?.dayFrom1 > 0 ? (
                                                        <p>
                                                            {" "}
                                                            Between {bookingDetails?.policy2?.dayFrom1} -{" "}
                                                            {bookingDetails?.policy2?.dayTo1} days before travel :{" "}
                                                            {bookingDetails?.policy2?.amt1}% deduction{" "}
                                                        </p>
                                                    ) : (
                                                        ""
                                                    )}
                                                </div>
                                                <div className="col-sm-4 cancel-right"></div>
                                                <div className={tw`col-sm-8 cancel-left flex items-center gap-2`}>
                                                    <AiFillCheckCircle color="green" size={15} />
                                                    {bookingDetails?.policy2?.dayFrom2 > 0 ? (
                                                        <p>
                                                            {" "}
                                                            Between {bookingDetails?.policy2?.dayFrom2} -{" "}
                                                            {bookingDetails?.policy2?.dayTo2} days before travel :{" "}
                                                            {bookingDetails?.policy2?.amt2}% deduction{" "}
                                                        </p>
                                                    ) : (
                                                        ""
                                                    )}
                                                </div>
                                                <div className="col-sm-4 cancel-right text-right">
                                                    <a href="/terms-and-conditions" target="_blank" style={{ color: '#0072ff' }}>
                                                        Term & Condition
                                                        <br />
                                                    </a>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="col-md-4 col-xs-12 mt-2 custom-payment">
                                <div className="b_right">
                                    <div className="_b_right_list_1">
                                        <div className="payment-summary">
                                            <div className="flex justify-between payment-heading p-3" style={{ background: '#e4e4e4', paddingLeft: 10, paddingRight: 10 }}>
                                                <div className="col-sm-8 payment-head">
                                                    <h4>Payment Summary</h4>
                                                </div>
                                                <div style={{ color: '#0072f' }}>Full Breakup</div>
                                            </div>
                                            <div className="row total-amt">
                                                <div className={tw`flex justify-between my-2 px-4`}>
                                                    <div className="col-xs-8 cost-left">Base Price</div>
                                                    <div className="col-xs-4 cost-right">
                                                        &#8377;{bookingDetails?.lead?.price}
                                                    </div>
                                                </div>
                                                <div className={tw`flex justify-between my-2 px-4`}>
                                                    <div className="col-xs-8 cost-left">
                                                        <p>Discount</p>
                                                    </div>
                                                    <div className="col-xs-4 cost-right">
                                                        <p>&#8377; {bookingDetails?.lead?.discount}</p>
                                                    </div>
                                                </div>
                                                <div className={tw`flex justify-between my-2 px-4`}>
                                                    <div className="col-xs-8 cost-left">
                                                        <p>Taxes & Fee</p>
                                                    </div>
                                                    <div className="col-xs-4 cost-right">
                                                        <p>&#8377; {bookingDetails?.lead?.gst}</p>
                                                    </div>
                                                </div>

                                            </div>
                                            <div className="_border_right hr-line"></div>
                                            <div className={tw`flex justify-between my-2 px-3`}>
                                                <div className="col-xs-8 cost-left">
                                                    Total Package cost
                                                </div>
                                                <div className="col-xs-4 cost-right">
                                                    &#8377; {bookingDetails?.lead?.fprice}
                                                </div>
                                            </div>
                                            <div className="_border_right hr-line"></div>
                                            <div className={tw`flex justify-between my-2 px-3`}>
                                                <div className="col-xs-8 cost-left price-left">
                                                    <p className="py-2">Paid Amount</p>
                                                    <p className="py-2">Balance Amount</p>
                                                    <p className="pt-2">
                                                        Current Payable<sup>*</sup>
                                                    </p>
                                                    <p className={tw`text-xs price-sub`}>(to be paid)</p>
                                                </div>
                                                <div className="col-xs-4 cost-right price-right">
                                                    <p className="py-2 text-right">&#8377;{bookingDetails?.lead?.paidamt}/-</p>
                                                    <p className="py-2 text-right">&#8377;{bookingDetails?.lead?.pndamt}/-</p>
                                                    <p className="py-2 text-right">&#8377; {bookingDetails?.output?.payamt}/-</p>
                                                </div>
                                            </div>
                                            <div className="row total-final">
                                                {bookingDetails?.output?.payamt > 0 ? (
                                                    <>
                                                        <div className="col-xs-6 cost-left total-pay"></div>
                                                        <div className="col-xs-6 cost-right total-value" style={{ padding: "0px", marginLeft: '-25px' }}>

                                                            <span className="_price_clip total-value-cost">
                                                                &#8377;&nbsp;{bookingDetails?.output?.payamt}/-
                                                            </span>
                                                        </div>
                                                        <div className="row">
                                                            <div className="mx-2 pay-now-btn">
                                                                <div className="text-center">
                                                                    {bookingDetails?.output?.payamt > 0 ? (
                                                                        <button
                                                                            className="anchore_coment _w_100 btn_anchor pay-btn"
                                                                            onClick={paymentSubmit}
                                                                        >
                                                                            Pay Now
                                                                        </button>
                                                                    ) : (
                                                                        ""
                                                                    )}
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </>
                                                ) : (
                                                    ""
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="b_right" style={{ display: "none" }}>
                                    <div className="_b_right_list_1">
                                        <div className="row">
                                            <div className="col-xs-8 offers-box cost-left">
                                                <h4>Offers</h4>
                                            </div>
                                        </div>
                                        <div className="payment-summary">
                                            <div className="_border_right hr-line"></div>
                                            <div className="row total-final">
                                                <div className="col-xs-8 cost-left offer-left">
                                                    Congratulations you have saved ₹ 1000 on this trip
                                                    value
                                                </div>
                                                <div className="col-xs-4 cost-right offer-right">
                                                    -&#8377; 1,000
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="row guest-traveller">
                            <div className="col-md-8 col-xs-12 p-0">
                                <div className="Shape_42 Guest-treveller-details">
                                    <h3 className={tw`text-xl font-semibold my-3`}>Guests Traveller Details</h3>
                                    <form action="">
                                        <div className="row">
                                            <div className="col-md-2 mob-view-2">
                                                <label className={tw`my-2`}>Title</label>
                                                <br />
                                                <select defaultValue={'Mr'} className="form-control">
                                                    <option value="Mr">
                                                        Mr.
                                                    </option>
                                                    <option value="Mrs">Mrs.</option>
                                                </select>
                                            </div>
                                            <div className="col-md-5">
                                                <label className={tw`my-2`}>
                                                    First Name<sup>*</sup>
                                                </label>
                                                <br />
                                                <input
                                                    type="text"
                                                    className="form-control"
                                                    required
                                                    placeholder="Enter First Name"
                                                    name="first-name"
                                                    readOnly
                                                    value={bookingDetails?.nm.split(" ")[0] || ""}
                                                />
                                            </div>
                                            <div className="col-md-5">
                                                <label className={tw`my-2`}>
                                                    Last Name<sup>*</sup>
                                                </label>
                                                <br />
                                                <input
                                                    type="text"
                                                    className="form-control"
                                                    required
                                                    placeholder="Enter Last Name"
                                                    name="Last-name"
                                                    readOnly
                                                    value={bookingDetails?.nm.split(" ")[1] || ""}
                                                />
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="col-xs-12">
                                                <label className={tw`my-2`}>
                                                    Email Address (Your booking voucher will be sent to
                                                    the address)
                                                </label>
                                                <input
                                                    type="email"
                                                    className="form-control"
                                                    required
                                                    placeholder="Enter Email Address"
                                                    name="email"
                                                    readOnly
                                                    value={bookingDetails?.lead?.email || ""}
                                                />
                                            </div>
                                        </div>
                                        <div className="row form-inline">
                                            <div className="col-md-2 mob-view">
                                                <label className={tw`my-2`}>Mobile Number</label>
                                                <br />
                                                <select defaultValue={'91'} className="form-control mb-3">
                                                    <option value="91">
                                                        +91
                                                    </option>
                                                </select>
                                            </div>
                                            <div className="col-md-4 phn-no">
                                                <label className={tw`my-2`}>Mobile Number</label>
                                                <br />
                                                <input
                                                    type="text"
                                                    required
                                                    className="form-control"
                                                    placeholder="Enter Phone Number"
                                                    name="phone"
                                                    readOnly
                                                    value={bookingDetails?.lead?.mobile || ""}
                                                />
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="col-xs-12"></div>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
                <section className="inclusions ">
                    <div className="container">
                        <div className="row">
                            <div className="col-md-8 accordions-list p-0">
                                <div className="faq-acc">
                                    <div aria-multiselectable="true" className="panel-group" id="accordion" role="tablist">
                                        <div className="panel panel-default">
                                            <div className="panel-heading" id="howtoreach" role="tab" >
                                                <h4 className="panel-title">
                                                    <a
                                                        aria-controls="headingOne"
                                                        aria-expanded="false"
                                                        className="collapsed"
                                                        role={"button"}
                                                        data-toggle="collapse"
                                                        onClick={() => collapse === null ? setCollapse(true) : setCollapse(null)}
                                                    >
                                                        <div className={tw`flex justify-between`}>
                                                            <div>
                                                                Itinerary
                                                            </div>
                                                            {collapse ? <AiOutlineMinus /> : <AiOutlinePlus />}
                                                        </div>
                                                    </a>
                                                </h4>
                                            </div>
                                            <Collapse in={collapse}>
                                                <div
                                                    className="panel-collapse"
                                                >
                                                    <div className="panel-body">
                                                        <div>
                                                            {
                                                                bookingDetails?.itn?.map(function (item, i) {
                                                                    let c = i + 1;
                                                                    let t = "D" + c;
                                                                    return (
                                                                        <div
                                                                            key={i}
                                                                            className="Shape_42 _detail _50m _hover _box_shadow"
                                                                            data-toggle="tooltip"
                                                                            data-placement="left"
                                                                            title={t}
                                                                        >
                                                                            <h4>
                                                                                Day {c}: {item.heading}
                                                                            </h4>
                                                                            <p>{item.description}</p>
                                                                        </div>

                                                                    );
                                                                })
                                                            }
                                                        </div>
                                                    </div>
                                                </div>
                                            </Collapse>
                                        </div>
                                    </div>
                                </div>
                                <div className="faq-acc">
                                    <div aria-multiselectable="true" className="panel-group" id="accordion" role="tablist">
                                        <div className="panel panel-default">
                                            <div
                                                className="panel-heading"
                                                id="howtoreach"
                                                role="tab"
                                            >
                                                <h4 className="panel-title">
                                                    <a
                                                        aria-controls="headingOne"
                                                        aria-expanded="false"
                                                        className="collapsed"
                                                        role={"button"}
                                                        data-toggle="collapse"
                                                        onClick={() => collapse2 === null ? setCollapse2(true) : setCollapse2(null)}
                                                    >

                                                        <div className={tw`flex justify-between`}>
                                                            <div>
                                                                Terms & Conditions and policy
                                                            </div>
                                                            {collapse2 ? <AiOutlineMinus /> : <AiOutlinePlus />}
                                                        </div>
                                                    </a>
                                                </h4>
                                            </div>
                                            <Collapse in={collapse2}>
                                                <div
                                                    className="panel-collapse2"
                                                >
                                                    <hr />
                                                    <div className="panel-body">
                                                        <div>
                                                            {bookingDetails?.output?.tnc?.split("<br/>").map(function (item, i) {
                                                                return <p key={i} className="mx-2 my-3">{item}</p>
                                                            })}
                                                        </div>
                                                    </div>
                                                </div>
                                            </Collapse>
                                        </div>
                                    </div>
                                </div>

                                {/* NOT ACTIVATED */}
                                <div className="panel panel-default" style={{ display: 'none' }}>
                                    <div className="panel-heading" id="headingc" role="tab">
                                        <h4 className="panel-title">
                                            <a
                                                aria-controls="collapseThree"
                                                aria-expanded="false"
                                                className="collapsed"
                                                data-parent="#accordion"
                                                data-toggle="collapse"
                                                href="#collapseThree"
                                                role="button"
                                            >
                                                Special Request
                                            </a>
                                        </h4>
                                    </div>

                                    <div
                                        aria-expanded="false"
                                        aria-labelledby="headingThree"
                                        className="panel-collapse collapse"
                                        id="collapseThree"
                                        role="tabpanel"
                                    >
                                        <div className="panel-body">
                                            <p>{bookingDetails?.lead?.comments}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                <section className="pay-now">
                    <div className="container">
                        <div className="row">
                            <div className="col-md-8 col-xs-12 pay-now-btn">
                                <div>
                                    {bookingDetails?.output?.payamt > 0 ? (
                                        <button
                                            className="anchore_coment _w_100 btn_anchor pay-btn"
                                            onClick={paymentSubmit}
                                        >
                                            Pay Now &#8377;
                                            <span className="price-final">
                                                {" "}
                                                {bookingDetails?.output?.payamt}/-
                                            </span>
                                        </button>
                                    ) : (
                                        ""
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </section>
            <Modal show={showModal} animation={false}>
                <Modal.Body>
                    <a href="/">
                        {" "}
                        <span
                            style={{ float: "right", color: "black" }}
                            aria-hidden="true"
                        >
                            <i className="fa fa-close"></i>
                        </span>
                    </a>
                    <form onSubmit={mybookingSubmit}>
                        <div className="wrapper-box">
                            <div className="wrapper_login">
                                <div className="body_login">
                                    <div className={tw`login_header flex justify-center`}>
                                        <img
                                            src={"icons/logo-icon.png"}
                                            height="50"
                                            alt=""
                                        />
                                    </div>
                                    <h4 className={tw`my-2 mb-4`}>My Bookings</h4>
                                    <div className="form-group">
                                        <input
                                            type="text"
                                            className="form-control"
                                            name="bookingid"
                                            required
                                            onChange={e => setPaymentDetails({ ...paymentDetails, [e.target.name]: e.target.value })}
                                            value={paymentDetails?.bookingid || ""}
                                            placeholder="My Booking ID"
                                        />
                                    </div>
                                    <div className="form-group">
                                        <input
                                            type="email"
                                            className="form-control"
                                            name="email"
                                            required
                                            onChange={e => setBookingDetails({ ...bookingDetails, [e.target.name]: e.target.value })}
                                            value={bookingDetails?.email || ""}
                                            placeholder="Email ID"
                                        />
                                        <div className="Invalid_num"></div>
                                    </div>
                                    <div className="form-group">
                                        <button className="btn btn_login" type="submit">
                                            CONTINUE
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </form>
                </Modal.Body>
            </Modal>
        </>
    );

}

export default BookingDetail