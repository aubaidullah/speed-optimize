import client from "../../../components/Graphql/service";
import {
  getTravelGuideDetail,
  getTravelPackage,
  getCountryContent,
  getMetaQuery,
} from "../../../components/Graphql/Queries";
// import TravelGuideDetailComp from "../../../components/trave-guide/details";
import dynamic from "next/dynamic";

const TravelGuideDetailComp = dynamic(() =>
  import("@/components/trave-guide/details"),
);

const CountryTravelGuideDetail = ({
  packages_state,
  data,
  weather,
  packages,
  hotels,
  article,
  qna,
  type,
  state_t,
  meta,
}) => {
  return (
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
      state_t={state_t}
    />
  );
};

export async function getServerSideProps(context) {
  context.res.setHeader("Cache-Control", "s-maxage=10");
  // console.log(context.query)
  let _id = context.query.id;
  const res = await client.query({
    query: getTravelGuideDetail,
    variables: { input: { id: _id } },
  });
  var type = "COUNTRY";

  let json_data = {
    av: "",
    geoid: 0,
    id: "",
    pagenum: 1,
    pid: 0,
    pt: "Website",
    size: 10,
    type: "COUNTRY",
  };

  // console.log(json_data)
  const res1 = await client.query({
    query: getTravelPackage,
    variables: { input: json_data },
  });

  const packages = res1.data.package.output;

  const res2 = await client.query({
    query: getCountryContent,
    variables: { input: { av: "", id: "", pt: "" } },
  });
  console.log(res1.data);
  const content = res2.data.content.output;
  const hotels = content.hotels;
  const states = content.states;

  // console.log(packages_state)

  // const res_travel = await client.query({query:getTravelGuideHome,variables:{input:{'av':'1.3','pt':'WEBSITE','geoid':0,'id':'0','pagenum':0,'pid':0,'type':0}}})
  // let data = res_travel.data.travelguide.output
  // console.log(res.data)

  // getQnaQuery

  const article = [];
  const qna = [];

  const meta = await client.query({
    query: getMetaQuery,
    variables: {
      input: {
        av: "",
        id: 0,
        key: "COUNTRY_TRAVELGUIDE",
        name: "",
        pt: "WEBSITE",
        type: "",
      },
    },
  });
  // let {finalprice,images} = meta.data.meta.output.package
  // finalprice = `₹${finalprice} `

  const title = res.data.travelGuide.output.country.metaTitle;
  const desc = res.data.travelGuide.output.country.metaDesc;
  const keyword = res.data.travelGuide.output.country.metaKeywords;

  const metas = {
    title:
      title ??
      meta.data.meta.output.tags.title.replace(
        /<COUNTRY>/g,
        context.query.city,
      ),
    longDesc:
      desc ??
      meta.data.meta.output.tags.longDesc.replace(
        /<COUNTRY>/g,
        context.query.city,
      ),
    keywords:
      keyword ??
      meta.data.meta.output.tags.keywords.replace(
        /<COUNTRY>/g,
        context.query.city,
      ),
  };

  // console.log(type)
  // console.log(packages)

  return {
    props: {
      packages_state: [],
      data: res.data.travelGuide.output,
      weather: {},
      packages,
      hotels,
      article,
      qna,
      type,
      state_t: states,
      meta: metas,
    },
  };
}

export default CountryTravelGuideDetail;
