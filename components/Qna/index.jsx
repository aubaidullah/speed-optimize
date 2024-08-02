import React, { useEffect, useState } from "react";
import { AiOutlinePlus } from "react-icons/ai";
import { FiCornerRightDown } from "react-icons/fi";
import { FaRegQuestionCircle } from "react-icons/fa";
// import { Modal, Collapse } from 'react-bootstrap';
import { GrClose } from "react-icons/gr";
import swal from "sweetalert";
import axios from "axios";

import dynamic from "next/dynamic";
// import Guest from '../../components/guest';
// import { QNALoading } from '../components/skeleton_l';
// import * as Constants from "../Constants";
// import BreadCrumbs from '../breadcrumbs';
// import Nav from '../Nav';
// import ParseHtml from '../parseToHtml';

const ParseHtml = dynamic(() => import("../parseToHtml"));
const Nav = dynamic(() => import("../Nav"));
const BreadCrumbs = dynamic(() => import("../breadcrumbs"));
const Guest = dynamic(() => import("../../components/guest"));

const QnaListing = ({ data, travelGuide }) => {
  const [qna, setQna] = useState([]);
  const [open, setOpen] = useState(false);
  const [question, setQuestion] = useState(null);
  const [collapse, setCollapse] = useState(null);
  const [reply, setReply] = useState({ qid: 0, question: "" });
  const [replyModal, setReplyModal] = useState(false);
  const [loading, setLoading] = useState(true);

  // guest Show or Hide
  const [show, setShow] = useState(false);

  // post Question
  const postQuestion = async () => {
    if (localStorage.getItem("userid") && question) {
      const { userid, username } = { ...localStorage };
      const data = {
        av: "",
        did: "",
        pt: "",
        tgid: props.tgid ?? props.match.params.id,
        userid,
        username,
        question,
      };
      const response = await axios.post(
        Constants.api + "/api/v1/qna/add",
        data,
      );
      if (response?.data?.result === "success") {
        getQNA();
        setOpen(false);
        swal(response?.data?.msg);
        setQuestion(null);
        return true;
      }
      swal("Something Went Wrong! ");
    }
    return false;
  };

  // On Question Submit
  const handleQuestionSubmit = async (e) => {
    e.preventDefault();
    const result = await postQuestion();
    if (!result) {
      setOpen(!open);
      setShow(!show);
    }
  };

  // post Reply
  const postReply = async () => {
    if (localStorage.getItem("userid") && reply) {
      const { userid, username } = { ...localStorage };
      const data = {
        ...reply,
        av: "",
        did: "",
        pt: "",
        tgid: props.tgid ?? props.match.params.id,
        userid,
        username,
      };
      const response = await axios.post(
        Constants.api + "/api/v1/qna/reply",
        data,
      );
      if (response?.data?.result === "success") {
        getQNA();
        setReplyModal(false);
        swal("Thank You for Replying !");
        setReply({ qid: 0, question: "" });
        return true;
      }
      swal("Something Went Wrong! ");
    }
    return false;
  };

  // on Reply Submit
  const handleReplySubmit = async (e) => {
    e.preventDefault();
    const result = await postReply();
    if (!result) {
      setReplyModal(!replyModal);
      setShow(!show);
    }
  };

  useEffect(() => {
    if (question && question !== "") {
      postQuestion();
      return;
    }
    if (reply && reply?.question !== "") {
      postReply();
      return;
    }
  }, [show]);

  const getQNA = () => {
    const qna = axios
      .post(Constants.api + "/api/v1/qna/list", {
        av: "",
        tgid: props.tgid ?? props.match.params.id,
        did: "",
        pagenum: 1,
        pt: "",
        size: props.tgid != undefined ? 17 : 1000,
      })
      .then((resp) => {
        console.log(resp);
        setQna(resp.data.output.qna);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const bread = {
    disabled: {
      item: `${data[0]?.geoname} QNA`,
    },
    enabled: [
      {
        item: "Home",
        href: "/",
      },
    ],
  };

  return (
    <>
      {show ? <Guest show={show} setShow={() => setShow(!show)} /> : null}
      {travelGuide == false ? <Nav /> : ""}
      <main
        className={`main _listing_page ${travelGuide == false ? "_70" : ""}`}
      >
        {/* <main className={`main _listing_page _70`}> */}
        {travelGuide == false ? <BreadCrumbs bread={bread} /> : ""}
        <div className={`container text-left`}>
          {/* <div className='qna-box'>
                    <div>
                        <h4>{data[0]?.geoname} QnA</h4>
                        YOUR QUERIES AND ANSWERS
                    </div>
                    <div>
                        <button className="btn btn_login" onClick={() => setOpen(!open)}>
                            <div><FaRegQuestionCircle style={{ marginTop: '4px' }} /></div>
                            <div> Ask a Question</div>
                        </button>
                    </div>
                </div> */}

          <div className={`mt-4 qna-box`}>
            <div className={`flex justify-between`}>
              <div>
                <h4 className={`text-xl font-bold`}>
                  {data[0]?.geoname} QnA
                </h4>
                <p className={`text-[12px] text-[#999]`}>
                  YOUR QUERIES AND ANSWERS
                </p>
              </div>
              <div>
                <a
                  className={`btn_view_more _logo_clr flex flex-wrap items-center`}
                  onClick={() => setOpen(!open)}
                >
                  <FaRegQuestionCircle className={`text-[13px]`} />
                  <div className={`ml-2`}> Ask a Question</div>
                </a>
              </div>
            </div>
          </div>

          <br />
          <div>
            {/* {qna.length !== 0 && loading==false ? qna.map((e, index) => { */}
            {data.map((e, index) => {
              return (
                <div
                  className="qna-collpase"
                  // itemScope
                  // itemType="https://schema.org/QAPage_"
                >
                  <div
                    // itemProp="mainEntity"
                    // itemScope
                    // itemType="https://schema.org/Question_"
                  >
                    <div className="question">
                      <div className={`flex gap-10`}>
                        <div>
                          <AiOutlinePlus
                            className={`cursor-pointer text-[17px] text-grey-500`}
                            onClick={() =>
                              collapse === index
                                ? setCollapse(null)
                                : setCollapse(index)
                            }
                          />
                        </div>
                        <p
                          className={`text-[#606060] text-[15px]`}
                          itemProp="name"
                        >
                          {/* {ReactHtmlParser(e.question)} */}
                          <ParseHtml text={e.question} />
                        </p>
                      </div>
                      <div>
                        <button
                          className="reply-btn"
                          onClick={() => {
                            setReply({ qid: e.id, question: "" });
                            setReplyModal(!replyModal);
                            collapse === index
                              ? setCollapse(null)
                              : setCollapse(index);
                          }}
                        >
                          REPLY
                        </button>
                      </div>
                    </div>
                    <div in={collapse === index ? true : false}>
                      <div className={`ml-[40px]`}>
                        <div className={`mt-[25px]`}>
                          <div className={`flex`}>
                            <div className="coment_photo">
                              <div
                                className={`h-[50px] w-[50px] rounded-[50px] flex bg-[#${Math.floor(
                                  Math.random() * 16777215,
                                ).toString(16)}]`}
                                // style={{ height: '50px', width: '50px', borderRadius: '50px', background: `#${Math.floor(Math.random() * 16777215).toString(16)}`, display: 'flex' }}
                              >
                                <span
                                  className={`block text-center text-[30px] text-white ml-[15px] self-center`}
                                  // style={{ display: 'block', textAlign: 'center', alignSelf: 'center', fontSize: '30px', color: 'white', marginLeft: '15px' }}
                                >
                                  {e.username[0].toUpperCase()}
                                </span>
                              </div>
                              {/* <img src={require("../assets/coment_photo.png")} alt="" /> */}
                            </div>
                            <div className={`ml-10px self-center`}>
                              <div
                                className={`text-grey-500 text-[13px] font-bold uppercase`}
                              >
                                {e.username}
                              </div>
                              <div className={`text-[11px] text-[#606060]`}>
                                Asked on {e.createdDate}
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className={`ml-[25px] mt-[50px]`}>
                          <div>
                            <div className={`overflow-auto`}>
                              <div className={`float-left`}>
                                <span
                                  className={`text-[13px] text-[#606060]`}
                                >
                                  Reply
                                </span>
                              </div>
                              <div className={`float-left mt-[7px] mr-[5px]`}>
                                <span>
                                  <FiCornerRightDown />
                                </span>
                              </div>
                            </div>
                            <div>
                              <div className={`text-[#606060]`}>
                                <meta
                                  // itemProp="answerCount"
                                  content={e?.replies?.length}
                                />
                                {e?.replies?.map((rp) => {
                                  return (
                                    <>
                                      <div
                                        className={`mb-[30px]`}
                                        // itemProp="acceptedAnswer"
                                        // itemScope
                                        // itemType="https://schema.org/Answer"
                                      >
                                        <div
                                          className={`bg-white p-[10px] rounded-[5px] text-left border-1 border-solid border-[#eaeaea]`}
                                          // itemProp="text"
                                        >
                                          {/* {ReactHtmlParser(rp.replyText)} */}
                                          <ParseHtml text={rp.replyText} />
                                        </div>
                                        <div>
                                          <div className={`mt-10px`}>
                                            <div className="flex">
                                              {/* <div className="coment_photo">
                                                                                        <img src={require("../assets/coment_photo.png")} alt="" />
                                                                                    </div> */}

                                              <div
                                                className={`flex h-[50px] w-[50px] rounded-[50px] bg-[#${Math.floor(
                                                  Math.random() * 16777215,
                                                ).toString(16)}]`}
                                              >
                                                <span
                                                  className={`block text-center self-center text-[30px] text-white ml-[15px]`}
                                                >
                                                  {rp.username[0].toUpperCase()}
                                                </span>
                                              </div>

                                              <div
                                                className={`ml-[10px] self-center`}
                                              >
                                                <div
                                                  className={`text-gray-500 font-bold text-[13px] uppercase`}
                                                >
                                                  {rp?.username}
                                                </div>
                                                <div
                                                  className={`text-[11px] text-[#606060]`}
                                                >
                                                  Replied on {e.createdDate}
                                                </div>
                                              </div>
                                            </div>
                                          </div>
                                        </div>
                                      </div>
                                    </>
                                  );
                                })}
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </main>
      <div className="query" show={open} animation={false} backdrop="static">
        <div>
          <span
            className={`float-right text-black`}
            // style={{ float: "right", color: "black" }}
            onClick={() => setOpen(!open)}
            aria-hidden="true"
          >
            <GrClose className={`cursor-pointer`} />
          </span>
          <div>
            <form onSubmit={handleQuestionSubmit}>
              <div className="wrapper-box">
                <div className="wrapper_login">
                  <div className="body_login">
                    <div className="login_header">
                      {/* <img
                                            src={require("../assets/logo-icon.png")}
                                            height="50"
                                            alt=""
                                        /> */}
                      <h4>Ask a Question</h4>
                    </div>
                  </div>
                  <div className="form-group">
                    <textarea
                      name="question"
                      className={`form-control h-[200px]`}
                      required
                      value={question ? question : ""}
                      onChange={(e) => setQuestion(e.target.value)}
                      placeholder="Enter your question"
                      rows="5"
                    ></textarea>
                  </div>
                  <div className="form-group">
                    <button className="btn btn_login" type="submit">
                      Ask your Question
                    </button>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
      <div
        className="reply"
        show={replyModal}
        animation={false}
        backdrop="static"
      >
        <div>
          <span
            className={"float-right text-black"}
            // style={{ float: "right", color: "black" }}
            onClick={() => setReplyModal(!replyModal)}
            aria-hidden="true"
          >
            <GrClose className="cursor-pointer" />
          </span>
          <div>
            <form onSubmit={handleReplySubmit}>
              <div className="wrapper-box">
                <div className="wrapper_login">
                  <div className="body_login">
                    <div className="login_header">
                      {/* <img
                                            src={require("../assets/logo-icon.png")}
                                            height="50"
                                            alt=""
                                        /> */}
                      <h4>YOUR REPLY</h4>
                    </div>
                  </div>
                  <div className="form-group">
                    <textarea
                      // style={{ height: '200px' }}
                      name="question"
                      className="form-control h-[200px]"
                      required
                      value={reply?.question !== "" ? reply.question : ""}
                      onChange={(e) =>
                        setReply({ ...reply, [e.target.name]: e.target.value })
                      }
                      placeholder="Enter your answer"
                      rows="5"
                    ></textarea>
                  </div>
                  <div className="form-group">
                    <button className="btn btn_login" type="submit">
                      Submit
                    </button>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default QnaListing;
