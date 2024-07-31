// import Nav from "../components/Nav";
import axios from "axios";
import * as Constants from "../components/Constants";
import swalr from "@sweetalert/with-react";
import {
  AiFillCheckCircle,
  AiOutlineMinus,
  AiOutlinePlus,
} from "react-icons/ai";
import { BsXLg } from "react-icons/bs";

import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/router";
import dynamic from "next/dynamic";
import Link from "next/link";

const Nav = dynamic(() => import("../components/Nav"));
const Modal = dynamic(() => import("../components/modal"));

const BookingDetail = () => {
  const router = useRouter();

  const [showModal, setShowModal] = useState(false);

  const [paynowclick, setPaynowclick] = useState(true);

  const [bookingDetails, setBookingDetails] = useState({
    bookingid: "",
    output: {},
    lead: {},
    nm: "",
    itn: [],
    policy2: [],
    email: "",
    mobileNo: "",
  });

  const [paymentDetails, setPaymentDetails] = useState({
    bookingid: "",
    orderid: "",
    callbackurl: "",
    amount: "",
    currency: "",
    key: "",
  });
  const pymt = useRef({
    bookingid: "",
    orderid: "",
    callbackurl: "",
    amount: "",
    currency: "",
    key: "",
  });

  const [collapse, setCollapse] = useState(true);

  const [collapse2, setCollapse2] = useState(true);

  useEffect(() => {
    setShowModal(
      new URLSearchParams(window.location.search).get("bookingid")
        ? false
        : true,
    );
    setBookingDetails({
      ...bookingDetails,
      bookingid:
        new URLSearchParams(window.location.search).get("bookingid") || "",
    });
    setPaymentDetails({
      ...paymentDetails,
      bookingid:
        new URLSearchParams(window.location.search).get("bookingid") || "",
    });
  }, []);

  // const loadScript = (src) => {
  //     return new Promise((resolve) => {
  //         const script = document.createElement("script");
  //         script.src = src;
  //         script.onload = () => {
  //             resolve(true);
  //         };
  //         script.onerror = () => {
  //             resolve(false);
  //         };
  //         document.body.appendChild(script);
  //     });
  // }

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

  const displayRazorpay = async (paymentDetails1) => {
    // const res = loadScript("https://checkout.razorpay.com/v1/checkout.js");
    const res = await initializeRazorpay();

    if (!res) {
      alert("Razorpay SDK failed to load. Are you online?");
      return;
    }
    console.log(paymentDetails1);

    const options = {
      key: paymentDetails1?.key,
      amount: paymentDetails1?.amount,
      currency: paymentDetails1?.currency,
      name: bookingDetails?.lead?.name,
      description: bookingDetails?.lead?.pname,
      image: `${Constants.assets_api}/public/icons/logo.png`,
      order_id: paymentDetails1?.orderid,
      prefill: {
        name: bookingDetails?.nm,
        email: bookingDetails?.email,
        contact: `+91${bookingDetails?.mobileNo}`,
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

        const result = await axios
          .post(Constants.api + "/api/v1/payment/razorpay/status", data)
          .then((resp) => {
            let msg =
              "A payment of  Rs. " +
              resp.data.output.amount +
              " for Booking ID " +
              resp.data.output.pid +
              " on " +
              resp.data.output.bt;
            swalr(
              <>
                <div className="text-center mb-[15px]">
                  <p className="pt-[10px] text-center text-[17px]">
                    Thank you for the payment. Your payment summary as below:{" "}
                  </p>
                  <div>
                    <div>
                      <span className="font-bold">Booking ID : </span>
                      <span>{resp.data.output.bid}</span>
                    </div>
                    <div>
                      <span className="font-bold">Trasection ID : </span>
                      <span>{resp.data.output.pid}</span>
                    </div>
                    <div>
                      <span className="font-bold">Trasection Date : </span>
                      <span>{resp.data.output.bt} </span>
                    </div>
                    <div>
                      <span className="font-bold">Amount : </span>
                      <span>&#8377;&nbsp;{resp.data.output.amount}/-</span>
                    </div>
                  </div>
                </div>
              </>,
              { icon: "success" },
            ).then((value) => {
              window.location.href = "/";
            });
          })
          .catch((er) => {
            console.log(er);
            swal("Error", "Transaction Fail", "error");
          });
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
  };

  const mybookingSubmit = async (e) => {
    e?.preventDefault();
    const response = await axios.post(
      Constants.api + "/api/v1/lead/get/" + paymentDetails.bookingid,
      {
        id: paymentDetails.bookingid,
      },
    );
    if (response?.data?.result == "success") {
      setShowModal(false);
      setBookingDetails({
        bookingid: response.data.output.lid,
        output: response.data.output,
        lead: response.data.output,
        nm: response.data.output.nm,
        itn: response.data.output.itn,
        policy2: response.data.output.pp,
        email: response.data.output.email,
        mobileNo: response.data.output.mobile,
      });
    }
  };

  const paymentSubmit = (event) => {
    event.preventDefault();
    if (paynowclick === true) {
      setPaynowclick(false);
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
            let myDataNew = {
              ...paymentDetails,
              bookingid: res.data.output.bookingid,
              orderid: res.data.output.orderid,
              callbackurl: res.data.output.callbackurl,
              amount: res.data.output.amount,
              currency: res.data.output.currency,
              key: res.data.output.key,
            };

            // setPaymentDetails(prev => ({...prev, ...myDataNew}))
            pymt.current = myDataNew;
            setPaymentDetails(pymt.current);
            // setPaymentDetails(myDataNew)
            console.log(paymentDetails);
            // setPaymentDetails({
            //     bookingid: res.data.output.bookingid,
            //     orderid: res.data.output.orderid,
            //     callbackurl: res.data.output.callbackurl,
            //     amount: res.data.output.amount,
            //     currency: res.data.output.currency,
            //     key: res.data.output.key,
            // });
            displayRazorpay(myDataNew);
            setPaynowclick(true);
          } else {
            swal("", res.data.msg, "info");
          }
        });
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      if (router.query.bookingid) {
        const response = await axios.post(
          Constants.api + "/api/v1/lead/get/" + paymentDetails.bookingid,
          {
            id: router.query.bookingid,
          },
        );
        // console.log(response)
        if (response?.data?.result == "success") {
          setShowModal(false);
          setBookingDetails({
            bookingid: response.data.output.lid,
            output: response.data.output,
            lead: response.data.output,
            nm: response.data.output.nm,
            itn: response.data.output.itn,
            policy2: response.data.output.pp,
            email: response.data.output.email,
            mobileNo: response.data.output.mobile,
          });
        }
      }
    };
    fetchData();
    console.log(bookingDetails);
  }, [router.query.bookingid]);

  console.log(router.query);
  // console.log(new URLSearchParams(window.location.search))

  return (
    <>
      <Nav />
      <section
        className={`_booking-detail ${
          showModal == true ? "blur-[5px]" : "blur-[0px]"
        }`}
      >
        <section className="about_place">
          <div className="container">
            <div className="row">
              <div className="col-sm-8 col-xs-6">
                <div className="title_listing_">
                  <h2 className={`text-xl font-bold my-3 text-orange`}>
                    Booking Details ({bookingDetails?.bookingid})
                  </h2>
                </div>
              </div>
            </div>
          </div>
          <div className="container">
            <div className={`row flex flex-wrap`}>
              <div className={`w-full lg:w-2/3 _details_`}>
                <div className={`flex flex-wrap Shape_42`}>
                  <div
                    className={`w-full lg:w-1/3 ${
                      !bookingDetails?.lead?.i ? "border" : null
                    } flex justify-center`}
                  >
                    <div
                      className={`card_item ${
                        !bookingDetails?.lead?.i ? "py-14" : null
                      }`}
                    >
                      <div className={`card_img`}>
                        <img
                          className="rounded"
                          src={
                            bookingDetails?.lead?.i &&
                            bookingDetails?.lead?.i.length > 0
                              ? bookingDetails?.lead?.i
                              : `${Constants.assets_api}/public/icons/logo-icon.png`
                          }
                          alt="kiomoi logo"
                        />
                      </div>
                    </div>
                  </div>
                  <div
                    className={`w-full lg:w-2/3 lg:pl-2 flex flex-col justify-between pt-2 lg:pt-0`}
                  >
                    <div className="package-name _pn_package">
                      <div className="_pn_">
                        <div className="_pn_left">
                          <h3 className={`font-semibold text-xl`}>
                            {bookingDetails?.lead?.pname ?? bookingDetails?.lead?.hotel?.name}
                          </h3>
                        </div>
                        <div className="_pn_right">
                          <div className="row"></div>
                          <div className="row"></div>
                        </div>
                      </div>
                      
                      {bookingDetails?.lead?.type != "HOTEL"?
                        <div
                          className={`location package-location text-[12.5px]`}
                        >
                          <span>
                            {" "}
                            {bookingDetails?.lead?.nights + 1} Days /{" "}
                            {bookingDetails?.lead?.nights} Nights
                          </span>
                        </div>
                        :
                      ""}
                      <div className="location package-location">
                        {/* <i className="fa fa-map-marker"></i> */}
                        <span> {bookingDetails?.lead?.type != "HOTEL"? bookingDetails?.lead?.ocity:""}</span>
                      </div>
                      {
                        bookingDetails?.lead?.type == "HOTEL"
                        ?<div className={`pt-2`}>
                          <div className={``}>{bookingDetails?.lead?.hotel?.address}</div>
                        </div>
                      :""
                      }
                      
                    </div>
                    <div
                      className={`row flex justify-around info-booking py-3 px-2 Shape_42 m-0 border bg-[#f5f4f4]`}
                    >
                      <div
                        className={`col-4 info-booking-details flex justify-center items-center`}
                      >
                        <div>
                          <p className={`text-xs`}>{bookingDetails?.lead?.type == "HOTEL"?"Check in":"Trip Start"}</p>
                          <p className={`text-xs`}>
                            <strong className={`flex`}>
                              <span>{bookingDetails?.lead?.checkin}</span>
                            </strong>
                          </p>
                        </div>
                      </div>
                      <div
                        className={`col-4 info-booking-details flex justify-center items-center`}
                      >
                        <div>
                          <p className={`text-xs`}>{bookingDetails?.lead?.type == "HOTEL"?"Check out":"Trip End"}</p>
                          <p className={`text-xs`}>
                            <strong className={`flex`}>
                              <span>{bookingDetails?.lead?.checkout}</span>
                            </strong>
                          </p>
                        </div>
                      </div>
                      <div
                        className={`col-4 info-booking-details flex justify-center items-center`}
                      >
                        <div>
                          <p className={`text-xs`}>Travellers</p>
                          <p className={`text-xs`}>
                            <strong className={`flex`}>
                              <span>
                                {bookingDetails?.lead?.adults} Adults,{" "}
                              </span>
                              <span>{bookingDetails?.lead?.kids} Kids</span>
                            </strong>
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>


                {
                  bookingDetails?.lead?.type == "HOTEL"?
                  <div className={`flex_ flex-wrap_ Shape_42`}>
                  
                  <div className={`flex justify-between`}>
                    <div>Adult : {bookingDetails?.lead?.adults}</div>
                    <div>Child : {bookingDetails?.lead?.kids}</div>
                  </div>

                  <div className={`flex justify-between`}>
                    <div>Room Type : {bookingDetails?.lead?.hotel?.roominfo?.split('(')[0]}</div>
                    <div>No. of Rooms : {bookingDetails?.lead?.hotel?.roominfo?.split('(')[1]}</div>
                  </div>

                  {/* <div className={`flex justify-between`}> */}
                  <div className={`mt-4 text-xl font-semibold`}>Inclusions : </div>
                  {/* </div> */}

                  <div className={`flex justify-between`}>
                    <div>Accomodation </div>
                  </div>

                  {bookingDetails?.lead?.hotel?.roominfo?
                  <div className={`flex justify-between`}>
                    <div>{/\(Room.*?\)/?.exec(bookingDetails?.lead?.hotel?.roominfo)[0]} </div>
                  </div>
                  :""
                  }

                  
                  <div className={`flex justify-between`}>
                    <div>All Taxes </div>
                  </div>           
                  <div className={`flex justify-between mt-4`}>
                    <div>Cancellation Policy </div>
                  </div>                                    



                </div>
                :""
                }


                <div className={`${bookingDetails?.output?.type=='HOTEL'?'hidden':''} row package-inclusions`}>
                  <h3 className={`text-xl font-semibold my-3`}>Inclusions</h3>
                  <div className="border Shape_42">
                    <div className={`flex flex-wrap gap-2`}>
                      {bookingDetails?.output?.inclusions
                        ?.split("#")
                        .map((inclusion, index) => {
                          return (
                            <span key={index} className="tag">
                              {inclusion}
                            </span>
                          );
                        })}
                    </div>
                    <div className="package-cancellation">
                      <div className={`row gy-1 mt-3 md:p-4`}>
                        <div className="col-sm-8 cancel-left mb-2">
                          <p className="font-bold text-[13px]">
                            Cancellation charges
                          </p>
                        </div>
                        <div className="col-sm-4 cancel-right">
                          <p className="font-bold text-[13px]">
                            *Same Day cancellation No refund
                          </p>
                        </div>
                        <div
                          className={`col-sm-8 cancel-left flex items-center gap-2`}
                        >
                          <AiFillCheckCircle color="green" size={15} />
                          {bookingDetails?.policy2?.day > 0 ? (
                            <p>
                              {" "}
                              Up to {bookingDetails?.policy2?.day} Days before
                              travel: {bookingDetails?.policy2?.amount}%
                              deduction of the package cost.
                            </p>
                          ) : (
                            ""
                          )}
                        </div>
                        <div className="col-sm-4 cancel-right"></div>
                        <div
                          className={`col-sm-8 cancel-left  flex items-center gap-2`}
                        >
                          <AiFillCheckCircle color="green" size={15} />
                          {bookingDetails?.policy2?.dayFrom1 > 0 ? (
                            <p>
                              {" "}
                              Between {bookingDetails?.policy2?.dayFrom1} -{" "}
                              {bookingDetails?.policy2?.dayTo1} days before
                              travel : {bookingDetails?.policy2?.amt1}%
                              deduction{" "}
                            </p>
                          ) : (
                            ""
                          )}
                        </div>
                        <div className="col-sm-4 cancel-right"></div>
                        <div
                          className={`col-sm-8 cancel-left flex items-center gap-2`}
                        >
                          <AiFillCheckCircle color="green" size={15} />
                          {bookingDetails?.policy2?.dayFrom2 > 0 ? (
                            <p>
                              {" "}
                              Between {bookingDetails?.policy2?.dayFrom2} -{" "}
                              {bookingDetails?.policy2?.dayTo2} days before
                              travel : {bookingDetails?.policy2?.amt2}%
                              deduction{" "}
                            </p>
                          ) : (
                            ""
                          )}
                        </div>
                        <div className="col-sm-4 cancel-right text-right">
                          <a
                            href="/terms-and-conditions"
                            className="text-[#0072ff]"
                            target="_blank"
                          >
                            Term & Condition
                            <br />
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <section className={`${bookingDetails?.output?.type=='HOTEL'?'hidden':''} inclusions` }>
                  <div className="container_">
                    <div className="row">
                      <div className="col-md-8 accordions-list p-0">
                        <div className="faq-acc">
                          <div
                            aria-multiselectable="true"
                            className="panel-group"
                            id="accordion"
                            role="tablist"
                          >
                            <div className="panel panel-default">
                              <div
                                className="panel-heading"
                                id="howtoreach"
                                role="tab"
                              >
                                <h3 className="panel-title">
                                  <a
                                    aria-controls="headingOne"
                                    aria-expanded="false"
                                    className="collapsed"
                                    role={"button"}
                                    data-toggle="collapse"
                                    onClick={() =>
                                      collapse === null
                                        ? setCollapse(true)
                                        : setCollapse(null)
                                    }
                                  >
                                    <div className={`flex justify-between`}>
                                      <div>Itinerary</div>
                                      {collapse ? (
                                        <AiOutlinePlus />
                                      ) : (
                                        <AiOutlineMinus />
                                      )}
                                    </div>
                                  </a>
                                </h3>
                              </div>

                              <div className={`${collapse ? "hidden" : ""}`}>
                                <div className="panel-collapse">
                                  <div className="panel-body">
                                    <div>
                                      {bookingDetails?.itn?.map(
                                        function (item, i) {
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
                                        },
                                      )}
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="faq-acc">
                          <div
                            aria-multiselectable="true"
                            className="panel-group"
                            id="accordion"
                            role="tablist"
                          >
                            <div className="panel panel-default">
                              <div
                                className="panel-heading"
                                id="howtoreach"
                                role="tab"
                              >
                                <h3 className="panel-title">
                                  <a
                                    aria-controls="headingOne"
                                    aria-expanded="false"
                                    className="collapsed"
                                    role={"button"}
                                    data-toggle="collapse"
                                    onClick={() =>
                                      collapse2 === null
                                        ? setCollapse2(true)
                                        : setCollapse2(null)
                                    }
                                  >
                                    <div className={`flex justify-between`}>
                                      <div>Terms & Conditions and policy</div>
                                      {collapse2 ? (
                                        <AiOutlinePlus />
                                      ) : (
                                        <AiOutlineMinus />
                                      )}
                                    </div>
                                  </a>
                                </h3>
                              </div>
                              <div className={`${collapse2 ? "hidden" : ""}`}>
                                <div className="panel-collapse2">
                                  <hr />
                                  <div className="panel-body">
                                    <div>
                                      {bookingDetails?.output?.tnc
                                        ?.split("<br/>")
                                        .map(function (item, i) {
                                          return (
                                            <p key={i} className="mx-2 my-3">
                                              {item}
                                            </p>
                                          );
                                        })}
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>

                        {/* NOT ACTIVATED */}
                        <div className="panel panel-default hidden">
                          <div
                            className="panel-heading"
                            id="headingc"
                            role="tab"
                          >
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

                <div className="row guest-traveller">
                  <div className="col-md-8 col-xs-12 p-0">
                    <div className="Shape_42 Guest-treveller-details">
                      <h3 className={`text-xl font-semibold my-3`}>
                        Guests Traveller Details
                      </h3>
                      <form action="">
                        <div className="row">
                          
                          <div className={`flex flex-wrap`}>
                            <div className={`w-full col-md-2 mob-view-2 lg:w-1/5 lg:pr-2`}>
                              <label className={`my-2`}>Title</label>
                              <br />
                              <select
                                defaultValue={"Mr"}
                                className="form-control"
                              >
                                <option value="Mr">Mr.</option>
                                <option value="Mrs">Mrs.</option>
                              </select>
                            </div>

                            <div className="col-md-5 lg:w-2/5 lg:pr-2">
                              <label className={`my-2`}>
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
                            
                            <div className={`w-full col-md-5 lg:w-2/5`}>
                              <label className={`my-2`}>
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
                          



                        </div>
                        <div className="row pt-4">
                          <div className="col-xs-12">
                            <label className={`my-2`}>
                              Email Address (Your booking voucher will be sent
                              to the address)
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

                        <div className="row form-inline pt-4">
                          <div className={`flex flex-wrap`}>
                            <div className={`w-full col-md-2 mob-view lg:w-1/5 lg:pr-2`}>
                              <label className={`my-2`}>Mobile Number</label>
                              <br />
                              <select
                                defaultValue={"91"}
                                className="form-control mb-3"
                              >
                                <option value="91">+91</option>
                              </select>
                            </div>
                            <div className={`w-full col-md-4 phn-no lg:w-4/5`}>
                              <label className={`my-2`}>Mobile Number</label>
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
                        </div>
                        <div className="row">
                          <div className="col-xs-12"></div>
                        </div>
                      </form>
                    </div>
                  </div>
                </div>
              </div>

              <div className={`w-full lg:w-1/3 mt-2 custom-payment`}>
                <div className="b_right h_sticky">
                  <div className="_b_right_list_1">
                    <div className="payment-summary">
                      <div className="flex justify-between payment-heading p-3 bg-[#e4e4e4] pl-[10px] pr-[10px]">
                        <div className="col-sm-8 payment-head">
                          <h4>Payment Summary</h4>
                        </div>
                        <div className="text-[#0072f]">Full Breakup</div>
                      </div>
                      <div className="row total-amt">
                        <div className={`flex justify-between my-2 px-4`}>
                          <div className="col-xs-8 cost-left">Base Price</div>
                          <div className="col-xs-4 cost-right">
                            &#8377;{bookingDetails?.lead?.price}
                          </div>
                        </div>
                        <div className={`flex justify-between my-2 px-4`}>
                          <div className="col-xs-8 cost-left">
                            <p>Discount</p>
                          </div>
                          <div className="col-xs-4 cost-right">
                            <p>&#8377; {bookingDetails?.lead?.discount}</p>
                          </div>
                        </div>
                        <div className={`flex justify-between my-2 px-4`}>
                          <div className="col-xs-8 cost-left">
                            <p>Taxes & Fee</p>
                          </div>
                          <div className="col-xs-4 cost-right">
                            <p>&#8377; {bookingDetails?.lead?.gst}</p>
                          </div>
                        </div>
                      </div>
                      <div className="_border_right hr-line"></div>
                      <div className={`flex justify-between my-2 px-3`}>
                        <div className="col-xs-8 cost-left">
                          Total Package cost
                        </div>
                        <div className="col-xs-4 cost-right">
                          &#8377; {bookingDetails?.lead?.fprice}
                        </div>
                      </div>
                      <div className="_border_right hr-line"></div>
                      <div className={`flex justify-between my-2 px-3`}>
                        <div className="col-xs-8 cost-left price-left">
                          <p className="py-2">Paid Amount</p>
                          <p className="py-2">Balance Amount</p>
                          <p className="pt-2">
                            Current Payable<sup>*</sup>
                          </p>
                          <p className={`text-xs price-sub`}>(to be paid)</p>
                        </div>
                        <div className="col-xs-4 cost-right price-right">
                          <p className="py-2 text-right">
                            &#8377;{bookingDetails?.lead?.paidamt}/-
                          </p>
                          <p className="py-2 text-right">
                            &#8377;{bookingDetails?.lead?.pndamt}/-
                          </p>
                          <p className="py-2 text-right">
                            &#8377; {bookingDetails?.output?.payamt}/-
                          </p>
                        </div>
                      </div>
                      <div className="_border_right hr-line"></div>
                      <div className="row total-final flex justify-between my-2 px-3">
                        {bookingDetails?.output?.payamt > 0 ? (
                          <>
                            <div className="col-xs-6 cost-left total-pay"></div>
                            <div
                              className={`text-right _price_clip total-value-cost`}
                            >
                              ₹ {bookingDetails?.output?.payamt} /-
                            </div>
                            {/* <div className="col-xs-6 cost-right total-value" style={{ padding: "0px", marginLeft: '-25px' }}>

                                                            <span className="_price_clip total-value-cost">
                                                                &#8377;&nbsp;{bookingDetails?.output?.payamt}/-
                                                            </span>
                                                        </div> */}
                          </>
                        ) : (
                          ""
                        )}
                      </div>
                      <div>
                        <div className="row_">
                          <div className="_mx-2 pay-now-btn">
                            <div className="text-center">
                              {bookingDetails?.output?.payamt > 0 ? (
                                <button
                                  className={`p-0 text-xl w-full form-control _w_100 btn_anchor pay-btn`}
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
                      </div>
                    </div>
                  </div>
                </div>
                <div className="b_right hidden">
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
          </div>
        </section>

        <section className="pay-now hidden">
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
      <Modal show={showModal}>
        {/* <div show={showModal} animation={false}> */}
        <div>
          <Link href="/">
            {" "}
            <span className="float-right text-black" aria-hidden="true">
              <BsXLg />
              {/* <i className="fa fa-close"></i> */}
            </span>
          </Link>
          <form onSubmit={mybookingSubmit}>
            <div className="wrapper-box">
              <div className="wrapper_login">
                <div className="body_login">
                  <div className={`login_header flex justify-center`}>
                    <img
                      src={`${Constants.assets_api}/public/icons/logo-icon.png`}
                      height="50"
                      alt="kiomoi logo"
                    />
                  </div>
                  <h4 className={`my-2 mb-4`}>My Bookings</h4>
                  <div className="form-group">
                    <input
                      type="text"
                      className="form-control"
                      name="bookingid"
                      required
                      onChange={(e) =>
                        setPaymentDetails({
                          ...paymentDetails,
                          [e.target.name]: e.target.value,
                        })
                      }
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
                      onChange={(e) =>
                        setBookingDetails({
                          ...bookingDetails,
                          [e.target.name]: e.target.value,
                        })
                      }
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
        </div>
        {/* </div> */}
      </Modal>
    </>
  );
};

export default BookingDetail;
