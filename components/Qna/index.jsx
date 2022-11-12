import React, { useEffect, useState } from 'react';
import { AiOutlinePlus } from "react-icons/ai";
import { FiCornerRightDown } from 'react-icons/fi';
import { FaRegQuestionCircle } from 'react-icons/fa';
import { Modal, Collapse } from 'react-bootstrap';
import { GrClose } from 'react-icons/gr';
import swal from 'sweetalert';
import axios from "axios";
import { tw } from 'twind'
import Guest from '../../components/guest';
// import { QNALoading } from '../components/skeleton_l';
// import * as Constants from "../Constants";
import ReactHtmlParser from "react-html-parser";
import BreadCrumbs from '../breadcrumbs';
import Nav from '../Nav';

const QnaListing = ({ data, travelGuide }) => {
    const [qna, setQna] = useState([]);
    const [open, setOpen] = useState(false);
    const [question, setQuestion] = useState(null);
    const [collapse, setCollapse] = useState(null);
    const [reply, setReply] = useState({ qid: 0, question: '' })
    const [replyModal, setReplyModal] = useState(false)
    const [loading, setLoading] = useState(true)

    // guest Show or Hide
    const [show, setShow] = useState(false);

    // post Question 
    const postQuestion = async () => {
        if (localStorage.getItem('userid') && question) {
            const { userid, username } = { ...localStorage }
            const data = { av: '', did: '', pt: '', tgid: props.tgid ?? props.match.params.id, userid, username, question }
            const response = await axios.post(Constants.api + '/api/v1/qna/add', data)
            if (response?.data?.result === 'success') {
                getQNA()
                setOpen(false)
                swal(response?.data?.msg)
                setQuestion(null)
                return true
            }
            swal('Something Went Wrong! ')
        }
        return false
    }

    // On Question Submit
    const handleQuestionSubmit = async e => {
        e.preventDefault()
        const result = await postQuestion()
        if (!result) {
            setOpen(!open)
            setShow(!show)
        }
    }

    // post Reply
    const postReply = async () => {
        if (localStorage.getItem('userid') && reply) {
            const { userid, username } = { ...localStorage }
            const data = { ...reply, av: '', did: '', pt: '', tgid: props.tgid ?? props.match.params.id, userid, username }
            const response = await axios.post(Constants.api + '/api/v1/qna/reply', data)
            if (response?.data?.result === 'success') {
                getQNA()
                setReplyModal(false)
                swal("Thank You for Replying !")
                setReply({ qid: 0, question: '' })
                return true
            }
            swal('Something Went Wrong! ')
        }
        return false
    }

    // on Reply Submit
    const handleReplySubmit = async e => {
        e.preventDefault()
        const result = await postReply()
        if (!result) {
            setReplyModal(!replyModal)
            setShow(!show)
        }
    }

    useEffect(() => {
        if (question && question !== '') {
            postQuestion()
            return
        }
        if (reply && reply?.question !== '') {
            postReply()
            return
        }
    }, [show]
    )

    const getQNA = () => {
        const qna = axios.post(Constants.api + '/api/v1/qna/list',
            {
                "av": "",
                "tgid": props.tgid ?? props.match.params.id,
                "did": "",
                "pagenum": 1,
                "pt": "",
                "size": props.tgid != undefined ? 17 : 1000
            }
        ).then((resp) => {
            console.log(resp)
            setQna(resp.data.output.qna)
            setLoading(false)
        }).catch((err) => {
            console.log(err)
        })
    }

    const bread = {
        disabled: {
            item: `${data[0]?.geoname} QNA`
        },
        enabled: [
            {
                item: "Kiomoi",
                href: "/"
            }
        ]
    }

    return <>
        {show ? <Guest show={show} setShow={() => setShow(!show)} /> : null}
        {travelGuide == false ? <Nav /> : ""}
        <main className={`main _listing_page ${travelGuide == false ? '_70' : ''}`}>
            {/* <main className={`main _listing_page _70`}> */}
            {
                travelGuide == false ?
                    <BreadCrumbs bread={bread} /> : ""
            }
            <div className="container" style={{ textAlign: 'left' }}>

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

                <div className={tw`mt-4 qna-box`}>
                    <div className={tw`flex justify-between`}>
                        <div>
                            <h4 className={tw`text-xl font-bold`}>{data[0]?.geoname} QnA</h4>
                            <p style={{ fontSize: '12px', color: '#999' }}>YOUR QUERIES AND ANSWERS</p>
                        </div>
                        <div>
                            <a className={tw`btn_view_more _logo_clr flex flex-wrap items-center`} onClick={() => setOpen(!open)}>
                                <FaRegQuestionCircle style={{ fontSize: '13px' }} />
                                <div className={tw`ml-2`}> Ask a Question</div>
                            </a>
                        </div>

                    </div>
                </div>

                <br />
                <div>
                    {/* {qna.length !== 0 && loading==false ? qna.map((e, index) => { */}
                    {data.map((e, index) => {
                        return (
                            <div className="qna-collpase">
                                <div>
                                    <div className='question'>
                                        <div style={{ display: 'flex', gap: 10 }}>
                                            <div>
                                                <AiOutlinePlus style={{ cursor: "pointer", fontSize: "17px", color: 'grey' }} onClick={() => collapse === index ? setCollapse(null) : setCollapse(index)} />
                                            </div>
                                            <p style={{ color: '#606060', fontSize: '15px', }}>{ReactHtmlParser(e.question)}</p>
                                        </div>
                                        <div>
                                            <button className="reply-btn" onClick={() => {
                                                setReply({ qid: e.id, question: '' })
                                                setReplyModal(!replyModal)
                                                collapse === index ? setCollapse(null) : setCollapse(index)
                                            }}>
                                                REPLY
                                            </button>
                                        </div>
                                    </div>
                                    <Collapse in={collapse === index ? true : false}>
                                        <div style={{ marginLeft: '40px' }}>
                                            <div style={{ marginTop: '25px' }}>
                                                <div style={{ display: 'flex' }}>
                                                    <div className="coment_photo">
                                                        <div style={{ height: '50px', width: '50px', borderRadius: '50px', background: `#${Math.floor(Math.random() * 16777215).toString(16)}`, display: 'flex' }}>
                                                            <span style={{ display: 'block', textAlign: 'center', alignSelf: 'center', fontSize: '30px', color: 'white', marginLeft: '15px' }}>
                                                                {e.username[0].toUpperCase()}
                                                            </span>
                                                        </div>
                                                        {/* <img src={require("../assets/coment_photo.png")} alt="" /> */}
                                                    </div>
                                                    <div style={{ marginLeft: '10px', alignSelf: 'center' }}>
                                                        <div style={{ color: 'grey', fontSize: '13px', fontWeight: 'bold', textTransform: 'uppercase' }}>{e.username}</div>
                                                        <div style={{ fontSize: '11px', color: '#606060' }}>Asked on {e.createdDate}</div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div style={{ marginLeft: '25px', marginTop: '50px' }}>
                                                <div>
                                                    <div style={{ overflow: 'auto' }}>
                                                        <div style={{ float: 'left' }}>
                                                            <span style={{ fontSize: '13px', color: '#606060' }}>Reply</span>
                                                        </div>
                                                        <div style={{ float: 'left', marginTop: '7px', marginLeft: '5px' }}>
                                                            <span><FiCornerRightDown /></span>
                                                        </div>
                                                    </div>
                                                    <div>
                                                        <div style={{ color: '#606060' }}>
                                                            {e?.replies?.map((rp) => {
                                                                return <>
                                                                    <div style={{ marginBottom: '30px' }}>
                                                                        <div style={{ border: '1px solid #eaeaea', background: 'white', padding: '10px', borderRadius: '5px', textAlign: 'left' }}>
                                                                            {ReactHtmlParser(rp.replyText)}
                                                                        </div>
                                                                        <div>
                                                                            <div style={{ marginTop: '10px' }}>
                                                                                <div style={{ display: 'flex' }}>
                                                                                    {/* <div className="coment_photo">
                                                                                        <img src={require("../assets/coment_photo.png")} alt="" />
                                                                                    </div> */}

                                                                                    <div style={{ height: '50px', width: '50px', borderRadius: '50px', background: `#${Math.floor(Math.random() * 16777215).toString(16)}`, display: 'flex' }}>
                                                                                        <span style={{ display: 'block', textAlign: 'center', alignSelf: 'center', fontSize: '30px', color: 'white', marginLeft: '15px' }}>
                                                                                            {rp.username[0].toUpperCase()}
                                                                                        </span>
                                                                                    </div>


                                                                                    <div style={{ marginLeft: '10px', alignSelf: 'center' }}>
                                                                                        <div style={{ color: 'grey', fontWeight: 'bold', fontSize: '13px', textTransform: 'uppercase' }}>{rp?.username}</div>
                                                                                        <div style={{ fontSize: '11px', color: '#606060' }}>Replied on {e.createdDate}</div>
                                                                                    </div>
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </>
                                                            })}
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </Collapse>
                                </div>
                            </div>
                        )
                    })}
                </div>
            </div>
        </main>
        <Modal
            className="query"
            show={open}
            animation={false}
            backdrop="static">
            <Modal.Body>
                <span
                    style={{ float: "right", color: "black" }}
                    onClick={() => setOpen(!open)}
                    aria-hidden="true"
                >
                    <GrClose style={{ cursor: 'pointer' }} />
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
                                        className="form-control"
                                        style={{ height: '200px' }}
                                        required
                                        value={question ? question : ''}
                                        onChange={e => setQuestion(e.target.value)}
                                        placeholder="Enter your question"
                                        rows="5"
                                    >
                                    </textarea>
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
            </Modal.Body>
        </Modal>
        <Modal
            className="reply"
            show={replyModal}
            animation={false}
            backdrop="static">
            <Modal.Body>
                <span
                    style={{ float: "right", color: "black" }}
                    onClick={() => setReplyModal(!replyModal)}
                    aria-hidden="true"
                >
                    <GrClose style={{ cursor: 'pointer' }} />
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
                                        style={{ height: '200px' }}
                                        name="question"
                                        className="form-control"
                                        required
                                        value={reply?.question !== '' ? reply.question : ''}
                                        onChange={e => setReply({ ...reply, [e.target.name]: e.target.value })}
                                        placeholder="Enter your answer"
                                        rows="5"
                                    >
                                    </textarea>
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
            </Modal.Body>
        </Modal>
    </>
}


export default QnaListing;