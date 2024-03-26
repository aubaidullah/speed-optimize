import client from "../../../../components/Graphql/service";
import {
  getTravelGuideDetail,
  getTravelPackage,
  getTravelHotel,
  getarticleQuery,
  getQnaQuery,
  getMetaQuery,
  getStatereArticleQuery,
} from "../../../../components/Graphql/Queries";
import axios from "axios";
import dynamic from "next/dynamic";
import Meta from "@/components/meta";
// import TravelGuide from "../../../../components/home/travel_guide";
// import TravelGuideDetailComp from '../../../../components/trave-guide/details'
// import { createCityListURL, createStateListURL } from "../../../../components/fun";

const TravelGuideDetail = ({
  meta,
  packages_state,
  data,
  weather,
  packages,
  hotels,
  article,
  // qna,
  type,
}) => {
  // console.log(article)
  const TravelGuideDetailComp = dynamic(() =>
    import("@/components/trave-guide/details"),{ssr:true}
  );

  return (
    <>
      <Meta meta={data.tg}/>
      <TravelGuideDetailComp
        meta={meta}
        packages_state={packages_state}
        data={data}
        weather={weather}
        packages={packages}
        hotels={hotels}
        article={article}
        // qna={}
        type={type}
      />
    </>
  );
  // return <TravelGuide packages_state={packages_state} data={data} weather={weather} packages={packages} hotels={hotels} article={article} qna={qna} type={type} />
  // console.log(data)
  // return <Nav />
};

export async function getServerSideProps(context) {
  context.res.setHeader("Cache-Control", "s-maxage=10");
  console.log(context.query);
  let _id = context.query.id;
  const res = await client.query({
    query: getTravelGuideDetail,
    variables: { input: { id: _id } },
  });

  // Router.pathname

  var resp = null;
  // console.log(res.data.travelGuide.output)

  var type = "STATE";

  if (res.data.travelGuide.output.tp == "CITY") {
    type = "CITY";
    let lat = res.data.travelGuide.output.city.lat;
    let lng = res.data.travelGuide.output.city.lng;

    resp = await axios.get(
      `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lng}&appid=d6429646ecc55c8a9d2856f91d10ff4f&units=metric`,
    );
    // console.log(resp)
  }

  // console.log(res.data.travelGuide.output.gid)
  let json_data = {
    av: "",
    geoid: res.data.travelGuide.output.gid,
    id: "",
    pagenum: 1,
    pid: 0,
    pt: "Website",
    size: 10,
    type: "CITY",
  };

  // console.log(json_data)
  const res1 = await client.query({
    query: getTravelPackage,
    variables: { input: json_data },
  });
  const packages = res1.data.package.output;

  // console.log(res.data.travelGuide.output.gid)
  let json_data_ = {
    av: "",
    geoid: res.data.travelGuide.output.gid,
    id: "",
    pagenum: 1,
    pid: 0,
    pt: "Website",
    size: 10,
    type: "STATE",
  };
  // console.log(json_data_)

  // console.log(json_data)
  const res_ = await client.query({
    query: getTravelPackage,
    variables: { input: json_data_ },
  });

  // console.log(res_)
  const packages_state = res_.data.package.output ?? [];

  // console.log(packages_state)

  // const res_travel = await client.query({query:getTravelGuideHome,variables:{input:{'av':'1.3','pt':'WEBSITE','geoid':0,'id':'0','pagenum':0,'pid':0,'type':0}}})
  // let data = res_travel.data.travelguide.output
  // console.log(res.data)

  let hotel_data = {
    av: "1.3",
    name: "",
    id: res.data.travelGuide.output.gid,
    pt: "Website",
    type: "City",
  };

  const hotel_res = await client.query({
    query: getTravelHotel,
    variables: { input: hotel_data },
  });
  const hotels = hotel_res.data.hotels.output?.hotels ?? [];

  let article_data = {
    av: "1.3",
    pt: "WEBSITE",
    geoid: res.data.travelGuide.output?.city?.sid??res.data.travelGuide.output?.gid,
    id: res.data.travelGuide.output?.city?.sid??res.data.travelGuide.output?.gid,
    pagenum: 1,
    pid: 0,
    size: 20,
    type: 0,
  };

  // getQnaQuery

  const article_res = await client.query({
    query: getStatereArticleQuery,
    variables: { input: article_data },
  });
  const article = article_res.data.articles?.output?.articles??[];

  // let qna_data = {
  //   av: "",
  //   tgid: `${_id}`,
  //   did: "",
  //   pagenum: 1,
  //   pt: "",
  //   size: 17,
  // };

  // const qna_res = await client.query({
  //   query: getQnaQuery,
  //   variables: { input: qna_data },
  // });
  // const qna = qna_res.data.qna.output.qna;

  const meta = await client.query({
    query: getMetaQuery,
    variables: {
      input: {
        av: "",
        id: 0,
        key: "CITY_TRAVELGUIDE",
        name: "",
        pt: "WEBSITE",
        type: "CITY_TRAVELGUIDE",
      },
    },
  });
  // let {finalprice,images} = meta.data.meta.output.package
  // finalprice = `₹${finalprice} `

  if (res.data.travelGuide.output.tp == "CITY") {
    var title = res.data.travelGuide.output.city.metaTitle;
    var desc = res.data.travelGuide.output.city.metaDesc;
    var keyword = res.data.travelGuide.output.city.metaKeywords;
  } else {
    var title = res.data.travelGuide.output.state?.metaTitle;
    var desc = res.data.travelGuide.output.state?.metaDesc;
    var keyword = res.data.travelGuide.output.state?.metaKeywords;
  }

  const metas = {
    title:
      // title ??
      meta.data.meta.output.tags.title.replace(/<CITY>/g, context.query.city),
    longDesc:
      // desc ??
      meta.data.meta.output.tags.longDesc.replace(
        /<CITY>/g,
        context.query.city,
      ),
    keywords:
      // keyword ??
      meta.data.meta.output.tags.keywords.replace(
        /<CITY>/g,
        context.query.city,
      ),
  };

  // console.log(qna)

  // console.log(type)
  // console.log(packages)
  console.log(metas)
  return {
    props: {
      packages_state: packages_state,
      data: res.data.travelGuide.output,
      weather: resp ? resp.data : {},
      packages,
      hotels,
      article,
      // qna,
      type,
      meta: metas,
    },
  };
}

export default TravelGuideDetail;
