import client from "../../../components/Graphql/service";
import {
  createDetailUrl,
  createStateListURL,
  jpgToWebp,
  randomRating,
} from "../../../components/fun";
import { BsDot, BsStarFill, BsStarHalf } from "react-icons/bs";
import dynamic from "next/dynamic";

import { tw } from "twind";
import { useState } from "react";
import { useRouter } from "next/router";
import Head from "next/head";
// import _Carousel from "@/components/detail/_Carousel";

// import Guest from '../../../components/guest';
import * as Constants from "../../../components/Constants";
// import BreadCrumbs from '../../../components/breadcrumbs';
// import Meta from '../../../components/meta';
// import { createDetailUrl } from '../../components/fun';

const _Carousel = dynamic(() => import("@/components/detail/_Carousel"));
const Guest = dynamic(() => import("../../../components/guest"));
// const Nav = dynamic(() => import('../../../components/Constants'))
const BreadCrumbs = dynamic(() => import("../../../components/breadcrumbs"));
const Meta = dynamic(() => import("../../../components/meta"));

const Nav = dynamic(() => import("../../../components/Nav"));
const RightBar = dynamic(() => import("../../../components/detail/rightbar"));
const Content = dynamic(() => import("../../../components/detail/content"));
const RelatedTour = dynamic(() =>
  import("../../../components/detail/related_tours"),
);

const Review = dynamic(() => import("@/components/detail/review"));

import {
  getpackage,
  getrelatedpackage,
  getreviewsQuery,
  getMetaQuery,
} from "../../../components/Graphql/Queries";
import { createCountryListURL } from "@/components/fun";
// import Reviews from "@/components/home/reviews";
// import ReviewRender from "@/components/detail/review";

const DetailPage = ({ data, related, reviews, meta }) => {
  const router = useRouter();

  const [show, setShow] = useState(null);

  const [images, setImages] = useState([]);

  var userRating = [];
  var i = 0;
  for (i; i < Math.floor(parseFloat(data?.package.sratings)); i++) {
    userRating.push(<BsStarFill key={i} className={tw`d_icon_size inline`} />);
  }
  if (data?.package.sratings.length != 1) {
    userRating.push(<BsStarHalf key={i} className={tw`d_icon_size inline`} />);
  }

  const bread = {
    disabled: {
      item: `${data?.package.name} Tour package ${data?.package.id}`,
    },
    enabled:
      data?.package?.scope === "DOMESTIC"
        ? [
            {
              item: "Kiomoi",
              href: "/",
            },
            {
              item: "Holidays Booking",
              href: "/holidays/",
            },
            {
              item: "India",
              href: "/holidays/",
            },
            {
              item: `${data?.package.region.split(",")[0]}`,
              href: `${createStateListURL({
                statename: data?.package.region.split(",")[0].toLowerCase(),
                id: data?.gid,
              })}`,
              // href:`/holidays/${data?.package.region.split(",")[0].toLowerCase().replace(/ /g,'-')}-tour-packages/${data?.gid}/`
            },
          ]
        : [
            {
              item: "Kiomoi",
              href: "/",
            },
            {
              item: "Holidays Booking",
              href: "/holidays/",
            },
            // {
            //     item: data?.package?.scope === 'INTERNATIONAL'?data?.package?.region:"India",
            //     href: "/holidays/"
            // },
            {
              item: `${data?.package.region.split(",")[0]}`,
              href: createCountryListURL({
                cityname: data?.package.region,
                id: data?.gid,
              }),
              // href:`/holidays-international/${data?.package.region.split(",")[0].toLowerCase().replace(/ /g,'-')}-tour-packages/${data?.gid}/`
            },
          ],
  };

  const themeRender = data?.package.theme.split("#").map(function (item, i) {
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
            <img
              alt="icon"
              className="inline"
              src={`${
                Constants.assets_api
              }/public/icons/Ico_${item.trim()}.png`}
            />
          </div>
        </>
      );
    }
  });

  const jsonData = [
    {
      "@context": "http://schema.org/",
      "@type": "Product",
      name: data?.package.name,
      productId: data?.package.id,
      image: data?.package.images.split(",") ?? [],
      description: data?.package.description,
      url: `https://www.kiomoi.com${router.asPath}`,
      aggregateRating: {
        "@type": "AggregateRating",
        ratingValue:
          data?.package.sratings != "0"
            ? data?.package.sratings
            : randomRating().rating,
        reviewCount:
          data?.package.sratings != "0"
            ? data?.package.susers
            : randomRating().review,
      },
      offers: {
        "@type": "Offer",
        url: `https://www.kiomoi.com${router.asPath}`,
        priceCurrency: "INR",
        price: data?.package.finalprice,
        availability: "http://schema.org/InStock",
        seller: {
          "@type": "Organization",
          name: "Kiomoi Travel",
        },
      },
      additionalProperty: [
        {
          "@type": "PropertyValue",
          propertyID: "custom_label_0",
          value: "tour",
        },
        {
          "@type": "PropertyValue",
          propertyID: "custom_label_1",
          value: `${data?.package.region} tour package`,
        },
        {
          "@type": "PropertyValue",
          propertyID: "custom_label_2",
          value: data?.package.region,
        },
      ],
    },
  ];

  //  console.log(router)

  // Handle Image Change

  return (
    <>
      <Head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonData) }}
        />
      </Head>

      {show ? <Guest show={show} setShow={() => setShow(!show)} /> : null}
      <Meta meta={meta} />

      <Nav />

      <BreadCrumbs bread={bread} />

      <section className="container">
        <div className="flex flex-wrap">
          <div className={tw`w-full lg:w-2/3`}>
            <h1 className="h1_title">{data?.package.name}</h1>
            {data?.package.sratings != "0" ? (
              <div>
                <div className="_inline__">
                  {userRating}
                  {/* {data?.package.sratings!="0"?userRating:randomRating().rating} */}
                </div>
                <div className="_inline__ rating d_rating">
                  <span>
                    {data?.package.sratings} <BsDot className={tw`inline`} />{" "}
                    {data?.package.susers} Rating
                  </span>
                </div>
              </div>
            ) : (
              ""
            )}
          </div>
          <div className={tw`w-full lg:w-1/3`}>
            <div className={tw`text-right thms`}>
              <span class="_themes">Themes</span>
              {themeRender}
            </div>
          </div>
        </div>
        <div className="container"></div>
      </section>

      <section className="container">
        <div className={tw`flex`}>
          <div className={tw`w-full lg:w-2/3`}>
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

            <div className="flex flex-wrap">
              <div className="w-full" id="photos">
                <div className="slider_details">
                  <_Carousel data={data} />
                </div>
              </div>
              <div className={tw`w-full initial lg:hidden`}>
                <RightBar data={data} />
              </div>

              {/* <div className={tw`w-full lg:w-1/3`}>
                            <div className={tw`pl-0 lg:pl-6`}>
                                <RightBar data={data} />
                            </div>

                        </div> */}

              <section className="inclusions">
                <Content data={data} />
              </section>
            </div>
          </div>

          {/* <div>
                    <h1>This is Testing.........................</h1>
                </div> */}

          <div className={tw`w-full hidden lg:w-1/3 lg:block`}>
            <div className={tw`pl-0 lg:pl-6 h_sticky`}>
              <RightBar data={data} />
            </div>
          </div>
        </div>
      </section>

      <RelatedTour data={related} />
      <div className="pt-6">
        <Review reviews={reviews} />
      </div>
    </>
  );
};

export async function getServerSideProps(context) {
  // let query = context.query
  let _id = context.query.id;
  let name = context.query.slug;

  const res = await client.query({
    query: getpackage,
    variables: {
      input: {
        id: _id,
      },
    },
  });
  // console.log(query)
  const nurl = createDetailUrl({
    name: res.data?.package.output.package.name,
    id: _id,
  });
  // console.log(query)

  // if (`/holidays/${query}/` != nurl){
  //     return {
  //         redirect: {
  //           permanent: false,
  //           destination: nurl,
  //         },
  //         props:{},
  //       };
  // }
  // console.log(createDetailUrl({name,id:_id}))
  // if res.data?.package.output.package.name

  let postD = {
    av: "1.3",
    id: 0,
    name: res.data?.package.output?.package.region.split(",")[0],
    pt: "WEBSITE",
    type: "STATE",
  };

  const relatedpack = await client.query({
    query: getrelatedpackage,
    variables: {
      input: postD,
    },
  });

  const reviews = await client.query({
    query: getreviewsQuery,
    variables: {
      input: {
        av: "1.3",
        id: "0",
        pt: "WEBSITE",
        geoid: 0,
        pagenum: 1,
        pid: _id,
        size: 10,
        type: "PACKAGE",
      },
    },
  });
  // console.log(res.data?.package.output)

  const meta = await client.query({
    query: getMetaQuery,
    variables: {
      input: {
        av: "",
        id: _id,
        key: "PACKAGE",
        name: "",
        pt: "WEBSITE",
        type: "PACKAGE",
      },
    },
  });
  let {
    cities,
    name: pname,
    finalprice,
    images,
  } = meta.data.meta.output.package;

  finalprice = `₹${finalprice} `;
  const metas = {
    title: meta.data.meta.output.tags.title
      .replace(/<PNAME>/g, pname)
      .replace(/<CITIES>/g, cities),
    longDesc: meta.data.meta.output.tags.longDesc
      .replace(/<PNAME>/g, name)
      .replace(/<CITIES>/g, cities)
      .replace(/<PRICE>/g, finalprice),
    keywords: meta.data.meta.output.tags.keywords.replace(/<CITIES>/g, cities),
    image: images,
  };

  return {
    props: {
      data: res.data?.package.output,
      related: relatedpack.data?.package.output,
      reviews: reviews.data?.reviews.output,
      meta: metas,
    },
  };

  // return {props:{}}
}

export default DetailPage;
