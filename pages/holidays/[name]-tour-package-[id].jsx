import { BsDot, BsStarFill, BsStarHalf, BsStar, BsFillCheckCircleFill, BsPlusLg } from 'react-icons/bs'
import { getpackage, getrelatedpackage, getreviewsQuery } from '../../components/Graphql/Queries'
import { tw } from 'twind'
import { Carousel } from "react-responsive-carousel";
import { useState } from 'react';
import ReactStars from "react-rating-stars-component";
import Image from 'next/image'
import swal from "sweetalert";
import RightBar from '../../components/detail/rightbar';
import Content from '../../components/detail/content';
import RelatedTour from '../../components/detail/related_tours'
import client from '../../components/Graphql/service'
import Guest from '../../components/guest';
import moment from "moment";
import axios from 'axios';
import Nav from '../../components/Nav'
import * as Constants from '../../components/Constants'
import BreadCrumbs from '../../components/breadcrumbs';


const DetailPage = ({ data, related, reviews }) => {

    const [rating, setRating] = useState(null);

    const [reviewText, setReviewText] = useState("");

    const [show, setShow] = useState(null);

    const [maxReview, setMaxReview] = useState(5);

    const [images, setImages] = useState([]);

    var userRating = []
    var i = 0
    for (i; i < Math.floor(parseFloat(data?.package.sratings)); i++) {
        userRating.push(<BsStarFill key={i} className={tw`d_icon_size inline`} />)
    }
    if (data?.package.sratings.length != 1) {
        userRating.push(<BsStarHalf key={i} className={tw`d_icon_size inline`} />)
    }

    const bread = {
        disabled: {
            item: `${data?.package.name} Tour package ${data?.package.id}`
        },
        enabled: [
            {
                item: "Kiomoi",
                href: "/"
            },
            {
                item: "Holidays Booking",
                href: "/holidays/"
            },
            {
                item: "India",
                href: "/holidays/"
            },
            {
                item :`${data?.package.region.split(",")[0]}`,
                href:`/holidays/${data?.package.region.split(",")[0].toLowerCase()}-tour-packages/${data?.gid}/`
            }
        ]
    }

    const reviewSubmit = async e => {
        e?.preventDefault();
        if (!rating) {
            swal("Please give stars");
            return
        }
        if (localStorage.getItem('userid')) {

            let leaddata = new FormData();

            images.forEach(image => leaddata.append("files", image))

            leaddata.append("pid", data?.package.id);
            leaddata.append("pname", data?.package.name);
            leaddata.append("mobile", localStorage.getItem("userphone"));
            leaddata.append("userid", localStorage.getItem("userid"));
            leaddata.append("name", localStorage.getItem("username"));
            leaddata.append("review", reviewText);
            leaddata.append("ratings", rating);
            leaddata.append("ptype", "STATE");
            leaddata.append("recommended", true);
            leaddata.append("bdate", moment(new Date()).format("YYYY-M-D"));

            const response = await axios.post(Constants.api + "/api/v1/review/add", leaddata)

            if (response?.data?.result === 'success') {
                swal("", "Thanks for your Valuable Feedback. ", "success");
                setReviewText("")
                setImages([])
            }

            return
        } else { setShow(!show) }
    }

    const reviewRender = reviews?.reviews.slice(0, maxReview).map(function (item, index) {
        return (
            <div className={tw`my-5`}>
                <div className={tw`w-full lg:w-2/3 flex flex-col md:flex-row justify-between items-start md:items-center`}>
                    <div className={tw`flex justify-between items-center gap-3 ms-2`}>
                        <div className="coment_photo">
                            <img src={`/icons/user_photo.png`} className={tw`rounded-full`} alt="" />
                        </div>
                        <div className="coment_title-">
                            <h3 className={tw`h1_title fs-6`}>{item.cName}</h3>
                        </div>
                    </div>
                    <div className={tw`w-full md:w-auto`}>
                        <div>
                            <div className={tw`flex flex-row-reverse`}>
                                {Array.from('12345').reverse().map(i => (Number(i) <= item.ratings) ? <BsStarFill key={i} className={tw`d_icon_size inline`} /> : <BsStar key={i} className={tw`d_icon_size inline`} />)}
                            </div>
                        </div>
                        <div className={tw`flex flex-row-reverse items-center`}>
                            <div>
                                <BsFillCheckCircleFill
                                    size={10}
                                    color='gray'
                                    style={{
                                        display: 'inline',
                                        marginRight: 3
                                    }}
                                />
                                <span className={tw`text-xs`}>Verfied Review</span>
                                <span className={tw`mx-1`}> | </span>
                                <span className={tw`text-xs`}>
                                    {moment(item.modifiedDate).format('DD MMMM YYYY, HH:MM')}
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
                <div className={tw`ms-2 mt-2 w-full lg:w-2/3`}>
                    <details>
                        <summary className={tw`text-xs font-semibold`} style={{ color: '#f06726' }}>
                            <span>
                                Read
                            </span>
                        </summary>
                        <p className={tw`text-md ms-2 mt-2`}>{item.review}</p>
                    </details>
                </div>
            </div>
        );
    });

    const themeRender = data?.package.theme.split('#').map(function (item, i) {
        // try {
        //   const images = require.context("../assets/", true);
        //   var img2 = "Ico_" + item.trim() + ".png";
  
        //   var img = images(`./${img2}`);
        // } catch (err) {
        //   var img = "";
        // }
        

        if (i < 4) {
          return (
            <>
                <div class="_circle_51" title={item}>
                    <img style={{display:'initial'}} src={`/icons/Ico_${item.trim()}.png`} />
                </div>
            </>
          );
        }
      });    

    // Handle Image Change
    const imageChange = e => {
        if (e?.target?.files && e?.target?.files?.length > 0) {
            setImages([...images, e.target.files[0]])
        }
    }

    return <>
        {show ? <Guest show={show} setShow={() => setShow(!show)} /> : null}

        <Nav />

        <BreadCrumbs bread={bread} />

        <section className='container'>
            <div className='row'>
                <div className='col-sm-8 col-xs-6'>
                    <h1 className='h1_title'>{data?.package.name}</h1>
                    <div>
                        <div className='_inline__'>
                            {userRating}
                        </div>
                        <div className="_inline__ rating d_rating">
                            <span>4.5 <BsDot className={tw`inline`} /> 26 Rating</span>
                        </div>
                    </div>
                </div>
                <div className='col-sm-4 col-xs-6'>
                    <div className={tw`text-right thms`}>
                        <span class="_themes">Themes</span>
                            {themeRender}
                    </div>


                </div>
            </div>
            <div className='container'></div>
        </section>

        <section className='container'>
            <div className='row'>
                <div className="col-sm-12 col-xs-12">
                    <div className="detail_slide_nav _30px">
                        <ul>
                            <li>
                                <a href="#photos" className="_c_default">
                                    Photos
                                </a>
                            </li>
                            <li>
                                <a href="#overview">Overview</a>
                            </li>
                            <li>
                                <a href="#itinery">Itinerary</a>
                            </li>
                            <li>
                                <a href="#hotels">Hotels</a>
                            </li>
                            <li>
                                <a href="#inclusions">Inclusions</a>
                            </li>
                            <li>
                                <a href="#tnc">T&C</a>
                            </li>
                        </ul>
                    </div>
                </div>
                <div className='col-sm-8 col-xs-12' id="photos">
                    <div className="slider_details">
                        <Carousel
                            showStatus={false}
                            showThumbs={false}
                            showArrows={true}
                            showIndicators={false}
                            infinite={true}
                            autoPlay={true}
                            className="slider_banner slider_overlay"
                        >
                            {data?.package.images.split(',').map((e, index) => {
                                return e?<Image className='img' src={e} layout="fill" key={index} />:""
                            })}
                        </Carousel>
                    </div>
                </div>
                <div className='col-sm-4 col-xs-12'>
                    <RightBar data={data} />
                </div>
            </div>
        </section>

        <section className='inclusions'>
            <Content data={data} />
            <RelatedTour data={related} />
        </section>

        <section className='container'>
            <div className={tw`title_kiomoi`}>
                <h4>Give Your Review on this Package</h4>
                <form onSubmit={reviewSubmit}>
                    <div className={tw`box_comment_post Shape_42 p-3 p-md-4 p-lg-5 mt-4 w-full lg:w-2/3`}>
                        <div className={tw`flex justify-between items-center`}>
                            <div>
                                <span className={tw`text-xs md:text-lg font-semibold md:font-normal`}>Your Feedback*</span>
                            </div>
                            <div>
                                <div className={tw`flex items-center`}>
                                    <span className={tw`text-xs md:text-base me-1`}>Rate your trip : </span>
                                    <ReactStars
                                        count={5}
                                        value={rating}
                                        onChange={rating => setRating(rating)}
                                        size={20}
                                        activeColor="#ffd700"
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="form-group style_form mt-2">
                            <textarea
                                className={tw`form-control`}
                                name="review"
                                required
                                value={reviewText}
                                style={{ height: '130px' }}
                                onChange={e => setReviewText(e.target.value)}
                                placeholder="Please write at least 100 characters about your experience at this destination."
                            />
                        </div>
                        <div className={tw`flex justify-between`}>
                            <div className={tw`flex items-center text-xs md:text-lg font-semibold md:font-normal`}>
                                <div>
                                    <input
                                        type="file"
                                        accept="image/*"
                                        onChange={imageChange}
                                        style={{ display: 'none' }}
                                        id="contained-button-file"
                                    />
                                    Upload Photos
                                </div>
                                <label htmlFor="contained-button-file">
                                    <div className={tw`border p-2 ms-3 cursor-pointer`}>
                                        <BsPlusLg />
                                    </div>
                                </label>
                            </div>
                            <div>
                                <button
                                    type="submit"
                                    className={`btn_anchor submit_btn _btn_post px-4`}
                                >
                                    Submit
                                </button>
                            </div>
                        </div>

                        <div className="row mt-2 gy-3">
                            {images && (
                                images.map((image, i) => {
                                    return (
                                        <div key={i} className="col-6 col-md-4">
                                            <div>
                                                <img
                                                    src={URL.createObjectURL(image)}
                                                    alt="Image"
                                                    style={{
                                                        width: '100%',
                                                        maxHeight: 300
                                                    }}
                                                />
                                            </div>
                                        </div>
                                    )
                                })
                            )}
                        </div>
                    </div>
                </form>
            </div>
            <div className="review_client_list">
                <div className={tw`title_kiomoi`}>
                    <h4>Reviews</h4>
                    <hr className={tw`w-full lg:w-2/3 mt-3`} />
                </div>
                <div className="_line_review"></div>
                {reviews?.reviews.length > 0 ? reviewRender : "No Reviews yet"}
                {reviews?.reviews.length > 0 && maxReview == 5 ?
                    <div
                        style={{color:'#999'}}
                        className={tw`w-full hover:text-black lg:w-2/3 flex flex-row-reverse text-lg font-bold cursor-pointer`}
                        onClick={() => setMaxReview(reviews.count)}
                    >
                        View All
                    </div>
                    :
                    ""}
            </div>
        </section >

    </>
}


export async function getServerSideProps(context) {

    context.res.setHeader('Cache-Control', 's-maxage=10');
    let query = context.params['name]-tour-package-[id'];

    let name = query.split('-tour-package-')[0];
    let _id = query.split('-tour-package-')[1];

    const res = await client.query({
        query: getpackage,
        variables: {
            input: {
                id: _id
            }
        }
    })

    let postD = {
        "av": "1.3",
        "id": 0,
        "name": res.data?.package.output?.package.region.split(",")[0],
        "pt": "WEBSITE",
        "type": "STATE"
    }

    const relatedpack = await client.query({
        query: getrelatedpackage,
        variables: {
            input: postD
        }
    })

    const reviews = await client.query({
        query: getreviewsQuery,
        variables: {
            input: {
                av: '1.3',
                id: '0',
                pt: 'WEBSITE',
                geoid: 0,
                pagenum: 1,
                pid: _id,
                size: 10,
                'type': 'PACKAGE'
            }
        }
    })
    console.log(res.data?.package.output)

    return {
        props: {
            data: res.data?.package.output,
            related: relatedpack.data?.package.output,
            reviews: reviews.data?.reviews.output
        }
    }
}



export default DetailPage