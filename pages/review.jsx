

import React,{useState} from 'react'
import axios from 'axios'
import {IoMdStarOutline, IoMdStar} from 'react-icons/io'
import swal from "sweetalert";
import moment from "moment";
import * as Constants from "@/components/Constants";
import {useRouter} from 'next/router';
// import Nav from '@/components/Nav';
import { tw } from 'twind';
import dynamic from 'next/dynamic';
const Nav = dynamic(() => import('@/components/HomeNav'))

const Customer_Review = ({userinfo}) =>{
    const router = useRouter()
    const [reviewstar,setReviewstar] = useState(0)
    const [review,setReview] = useState("")
    const [sendquery,setSendQuery] = useState(false)
    const [file,setFile] = useState([])
    const [open, setOpen] = useState(false);
    const [show, setShow] = useState(false);
    const [clicked,setClicked] = useState(false)

    const postReview = async (e) => {
        // e.preventDefault()

        if (review === "") {
            swal("Please add a review")
            return true
        }
        if (reviewstar === 0) {
            swal("Please give stars");
            return true
        }
        setSendQuery(true)
        setClicked(true)

        let leaddata = new FormData();

        var totalfiles = document.getElementById('file-upload').files.length;
        for (var index = 0; index < totalfiles; index++) {
          leaddata.append("files", document.getElementById('file-upload').files[index]);
        }

        leaddata.append("pid", userinfo.pid);
        leaddata.append("pname", userinfo.pname);
        leaddata.append("mobile", userinfo.mob);
        leaddata.append("userid", userinfo.mob);
        leaddata.append("name", "test name");
        leaddata.append("review", review);
        leaddata.append("ratings", reviewstar);
        leaddata.append("ptype", "PACKAGE");
        leaddata.append("recommended", true);
        leaddata.append("token",router.query.token)
        leaddata.append("bdate", moment(new Date()).format("YYYY-M-D"));
        const response = await axios.post(Constants.api + "/api/v1/review/add", leaddata,{headers:{ 'content-type': 'multipart/form-data' }})
        if (response?.data?.result === 'success') {
            swal("", "Thanks for your Valuable Feedback. ", "success").then((value)=>window.location.href="/");
            setReview("")
            setReviewstar(0)
        } else {
            swal(response?.data?.msg);
        }
        return true
    }

    const handleReviewSubmit = async e => {
        e.preventDefault()
        const result = await postReview()
        if (!result) {
            setOpen(!open)
            setShow(!show)
        }
    }
    const uploadMultipleFiles = (e) =>{
        // file.push(e.target.files)
        console.log(e.target.files)
        // setFileobj(e.target.files)
        var fileobjd = []
        fileobjd.push(e.target.files)
        console.log(fileobjd)
        
        var fary = []
        for (let i = 0; i < fileobjd[0].length; i++) {
            fary.push(URL.createObjectURL(fileobjd[0][i]))
        }
        setFile(fary)
        // this.setState({ file: this.fileArray })
    }

    const getLeadInfo = () =>{
        const leadifo = axios.post(Constants.api+'/api/v1/lead/get-info/'+router.query.token,
        {
            "id":router.query.token
        }).then((resp)=>{
            console.log(resp.data)
            setUserinfo(resp.data.output)
        })
    }
    // console.log(userinfo)

    return <>
            <Nav />
            <div className='_70'>                
                {userinfo==null
                ?
                <div style={{height:'500px',display:'flex',alignItems:'center',justifyContent:'center'}}>
                    <h2 style={{color:'#f06726',textAlign:'center'}}>Feedback has already been submitted. Thank you.</h2>
                </div>
                :<>
                <h2 className={tw`text-2xl _b_active text-center mt-4 font-bold`}>{userinfo.pname}</h2>
                    <div>
                        <form onSubmit={handleReviewSubmit} style={{margin:'30px 0px',padding:'10px'}}>
                        <div class="_box_comment_post" style={{margin:'0 auto',border:'none',background:'transparent',maxWidth:'825px'}}>
                            <div class="row">
                            <div class="col-sm-12 col-xs-12">
                                
                                {/* <h2 style={{color:'#f06726'}}>{userinfo.pname}</h2> */}
                                <div style={{display:'flex'}}>
                                    <div className="coment_photo">
                                        {/* <img src={require("../assets/coment_photo.png")} alt="" /> */}
                                        <img src="/icons/coment_photo.png" />
                                    </div>
                                    <div style={{alignSelf:'center',marginLeft:'10px'}}>
                                        <p class="your_feed" style={{fontWeight:'bolder'}}>{userinfo.nm}</p>
                                        <p style={{color:'grey'}}>Posting publicly</p>
                                    </div>
                                                                    
                                </div>

                                <div class="_col-sm-6 _col-xs-6">
                                    <div class="coment_rating _text-right mt-4 mb-4">

                                    
                                    {reviewstar>=1?<IoMdStar className={tw`inline text-xl _b_active`} onClick={()=>setReviewstar(1)} />:<IoMdStarOutline className={tw`inline text-xl _b_active`} onClick={()=>setReviewstar(1)} />}
                                    {reviewstar>=2?<IoMdStar className={tw`inline text-xl _b_active`} onClick={()=>setReviewstar(2)} />:<IoMdStarOutline className={tw`inline text-xl _b_active`} onClick={()=>setReviewstar(2)} />}
                                    {reviewstar>=3?<IoMdStar className={tw`inline text-xl _b_active`} onClick={()=>setReviewstar(3)} />:<IoMdStarOutline className={tw`inline text-xl _b_active`} onClick={()=>setReviewstar(3)} />}
                                    {reviewstar>=4?<IoMdStar className={tw`inline text-xl _b_active`} onClick={()=>setReviewstar(4)} />:<IoMdStarOutline className={tw`inline text-xl _b_active`} onClick={()=>setReviewstar(4)} />}
                                    {reviewstar>=5?<IoMdStar className={tw`inline text-xl _b_active`} onClick={()=>setReviewstar(5)} />:<IoMdStarOutline className={tw`inline text-xl _b_active`} onClick={()=>setReviewstar(5)} />}
                                
                                    </div>
                                </div>
                            </div>
                            </div>

                            <div class="form-group style_form">
                            <textarea
                                style={{height:'200px'}}
                                class="form-control"
                                defaultValue={review}
                                name="review"
                                onChange={(event)=>setReview(event.target.value)}
                                placeholder="Please write at least 100 characters about your experience at this destination."
                            />
                                {/* {review} */}
                            {/* </textarea> */}
                            </div>
                            <div class="col-sm-8 col-xs-8">
                            <div class="row upload-icon">
                                <div class="upload_post">
                                <div class="upload_box">
                                    <span class="your_feed">Upload Photos</span>
                                </div>
                                <div class="upload_box">
                                    <label
                                    class="custom-file-upload"
                                    for="file-upload"
                                    id="custom-text"
                                    >
                                    +
                                    </label>
                                    <input
                                    id="file-upload"
                                    name="uploaded_file"
                                    type="file"
                                    onChange={uploadMultipleFiles} multiple
                                    />
                                </div>
                                </div>
                            </div>
                            </div>
                            <div class="col-sm-4 text-right col-xs-4">
                            <div class="row">
                                {
                                    clicked==false?
                                        <button
                                        type="submit"
                                        class="btn_anchor submit_btn _btn_post"
                                        >
                                            Submit
                                        </button>
                                    :
                                        <button
                                        type="submit"
                                        class="btn_anchor submit_btn _btn_post"
                                        disabled
                                        >
                                            Please wait..
                                        </button>
                                }


                            </div>
                            </div>
                        </div>
                        </form>
                        <div style={{width:'100%'}}>
                            <div className="multi-preview" style={{maxWidth:'800px',margin:'auto'}}>
                                <div className="in_b" style={{width:'100%'}}>
                                {(file || []).map(url => (
                                    <div className="review_img" style={{background:`url(${url})`,backgroundSize:'cover',backgroundRepeat:'no-repeat',backgroundOrigin:'unset',backgroundPosition:'top'}} />
                                ))}
                                </div>

                            </div>                      
                        </div>   
                    </div>
                </>

                }

            </div>
                
    </>
}


export async function getServerSideProps(context) {
    // console.log(context.query)


    const leadifo = await axios.post(Constants.api+'/api/v1/lead/get-info/'+context.query.token,{"id":context.query.token})
    // console.log(leadifo.data.output)
    return {props:{userinfo:leadifo.data.output}}

}


export default Customer_Review