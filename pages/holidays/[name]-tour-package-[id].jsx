import { BsDot, BsStarFill, BsStarHalf } from 'react-icons/bs'
import { getpackage, getrelatedpackage, getreviewsQuery } from '../../components/Graphql/Queries'
import { tw } from 'twind'
import { Carousel } from "react-responsive-carousel";
import { useEffect, useState } from 'react';
import ReactStars from "react-rating-stars-component";
import Image from 'next/image'
import swal from "sweetalert";
import RightBar from '../../components/detail/rightbar';
import Content from '../../components/detail/content';
import Reviews from '../../components/home/reviews';
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

    var userRating = []
    var i = 0
    for (i; i < Math.floor(parseFloat(data.package.sratings)); i++) {
        userRating.push(<BsStarFill key={i} className={tw`d_icon_size inline`} />)
    }
    if (data.package.sratings.length != 1) {
        userRating.push(<BsStarHalf key={i} className={tw`d_icon_size inline`} />)
    }

    const bread = {
        disabled: {
            item: `${data.package.name} Tour package ${data.package.id}`
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
            leaddata.append("pid", data.package.id);
            leaddata.append("pname", data.package.name);
            leaddata.append("mobile", localStorage.getItem("userphone"));
            leaddata.append("userid", localStorage.getItem("userid"));
            leaddata.append("name", localStorage.getItem("username"));
            leaddata.append("review", reviewText);
            leaddata.append("ratings", rating);
            leaddata.append("ptype", "STATE");
            leaddata.append("recommended", true);
            leaddata.append("bdate", moment(new Date()).format("YYYY-M-D"));
            const response = await axios.post(Constants.api + "/api/v1/review/add", leaddata)
            if ('success') {
                swal("", "Thanks for your Valuable Feedback. ", "success");
                setReviewText("")
            }
            return
        } else { setShow(!show) }
    }

    return <>
        {show ? <Guest show={show} setShow={() => setShow(!show)} /> : null}

        <Nav />

        <BreadCrumbs bread={bread} />

        <section className='container'>
            <div className='row'>
                <div className='col-sm-8 col-xs-6'>
                    <h1 className='h1_title'>{data.package.name}</h1>
                    <div>
                        <div className='_inline__'>
                            {userRating}
                        </div>
                        <div className="_inline__ rating d_rating">
                            <span>4.5 <BsDot className={tw`inline`} /> 26 Rating</span>
                        </div>
                    </div>
                </div>
                <div className='col-sm-4 col-xs-6'></div>
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
                    <div class="slider_details">
                        <Carousel
                            showStatus={false}
                            showThumbs={false}
                            showArrows={true}
                            showIndicators={false}
                            infinite={true}
                            autoPlay={true}
                            class="slider_banner slider_overlay"
                        >
                            {data.package.images.split(',').map((e, index) => {
                                return <Image className='img' src={e} layout="fill" key={index} />
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
                    <div className={tw`box_comment_post Shape_42 p-5 mt-4 w-full lg:w-2/3`}>
                        <div className={tw`flex justify-between`}>
                            <div>
                                <p class="your_feed">Your Feedback*</p>
                            </div>
                            <div>
                                <div className={tw`flex items-center`}>
                                    <span class="your_feed fs-6 me-1">Rate your trip : </span>
                                    <ReactStars
                                        count={5}
                                        value={rating}
                                        onChange={rating => setRating(rating)}
                                        size={24}
                                        activeColor="#ffd700"
                                    />
                                </div>
                            </div>
                        </div>

                        <div class="form-group style_form">
                            <textarea
                                class="form-control"
                                name="review"
                                required
                                value={reviewText}
                                style={{ height: '130px' }}
                                onChange={e => setReviewText(e.target.value)}
                                placeholder="Please write at least 100 characters about your experience at this destination."
                            />
                        </div>
                        <div className={tw`flex justify-between`}>
                            <div class="upload-icon"></div>
                            <div>
                                <button
                                    type="submit"
                                    class="btn_anchor submit_btn _btn_post px-5"
                                >
                                    Submit
                                </button>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
            <Reviews data={reviews.reviews} />
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
        "name": res.data.package.output.package.region.split(",")[0],
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

    return {
        props: {
            data: res.data.package.output,
            related: relatedpack.data.package.output,
            reviews: reviews.data.reviews.output
        }
    }
}



export default DetailPage