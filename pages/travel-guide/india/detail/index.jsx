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
import { useRouter } from "next/router";
import Head from "next/head";
// import TravelGuide from "../../../../components/home/travel_guide";
import TravelGuideDetailComp from '../../../../components/trave-guide/details'
import { textDecode } from "@/components/fun";
// import { createCityListURL, createStateListURL } from "../../../../components/fun";

const TravelGuideDetail = ({
  meta,
  packages_state,
  data,
  weather,
  packages,
  hotels,
  article,
  qna,
  type,
}) => {
  // console.log(article)
  // const {asPath} = useRouter()
  const {asPath,query} = useRouter()
  // const TravelGuideDetailComp = dynamic(() =>
  //   import("@/components/trave-guide/details")
  // );

  // const jsonP = {
  //   "@context":"http://schema.org",
  //   "@type":"WebPage",
  //   "name":`${data.tg.cityName} tourism and travel guide`,
  //   "url":`https://www.kiomoi.com${asPath}`,
  //   "description":`${data.tg?.overviewDesc} ${data?.tg?.howToReachDesc} ${data?.tg?.eventsDesc} ${data?.tg?.factsDesc} ${data?.tg?.foodDesc} ${data?.tg?.marketDesc}`,
  //   "publisher":
  //     {
  //     "@type":"Organization",
  //     "@id":"https://www.kiomoi.com/",
  //     "name":"Kiomoi Travel",
  //     "url":"https://www.kiomoi.com/",
  //     "logo":"https://www.kiomoi.com/icons/kiomoi%20logo.svg"
  //     }
  //   }

    

  return (
    <>
      {/* <Head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonP) }}
        />
      </Head>     */}
      {/* <Meta meta={data.tg}/> */}

      {
        data.priority.map((e,index)=>{
          return query?.slug?.replace(/-/g," ") == e.heading.toLowerCase() || !query?.slug && e.heading.toLowerCase() == "overview" ? <Meta meta={e} />:""
        })
      }

      <TravelGuideDetailComp
        meta={meta}
        packages_state={packages_state}
        data={data}
        weather={weather}
        packages={packages}
        hotels={hotels}
        article={article}
        qna={qna}
        type={type}
      />
    </>
  );
};

export async function getServerSideProps(context) {
  context.res.setHeader("Cache-Control", "s-maxage=10");
  console.log(context.query);

  if (context.query.slug){
    let slug = textDecode({text:context.query.slug})
  }

  let _id = context.query.id;
  const res = await client.query({
    query: getTravelGuideDetail,
    variables: { input: { id: _id } },
  });


  var resp = null;

  var type = "STATE";

  if (res.data.travelGuide.output.tp == "CITY") {
    type = "CITY";
    let lat = res.data.travelGuide.output.city.lat;
    let lng = res.data.travelGuide.output.city.lng;

    resp = await axios.get(
      `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lng}&appid=d6429646ecc55c8a9d2856f91d10ff4f&units=metric`,
    );
  }

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

  const res1 = await client.query({
    query: getTravelPackage,
    variables: { input: json_data },
  });
  const packages = res1.data.package.output;

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
  const res_ = await client.query({
    query: getTravelPackage,
    variables: { input: json_data_ },
  });

  const packages_state = res_.data.package.output ?? [];

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

  const article_res = await client.query({
    query: getStatereArticleQuery,
    variables: { input: article_data },
  });
  const article = article_res.data.articles?.output?.articles??[];

  let qna_data = {
    av: "",
    tgid: `${_id}`,
    did: "",
    pagenum: 1,
    pt: "",
    size: 17,
  };

  const qna_res = await client.query({
    query: getQnaQuery,
    variables: { input: qna_data },
  });
  const qna = qna_res.data.qna.output.qna;

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
      meta.data.meta.output.tags.title.replace(/<CITY>/g, context.query.city),
    longDesc:
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

  return {
    props: {
      packages_state: packages_state,
      data: res.data.travelGuide.output,
      weather: resp ? resp.data : {},
      packages,
      hotels,
      article,
      qna,
      type,
      meta: metas,
    },
  };
}

export default TravelGuideDetail;
