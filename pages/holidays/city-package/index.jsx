import { useRouter } from "next/router";
import {
  getallpackages,
  getStateByCityQuery,
  getMetaQuery,
  getTravelGuideQuery,
  getStatereArticleQuery,
} from "../../../components/Graphql/Queries";
import client from "../../../components/Graphql/service";
// import Nav from "../../../components/Nav"
import { useEffect, useState } from "react";
import dynamic from "next/dynamic";

const Nav = dynamic(() => import("../../../components/Nav"));

const MobileList = dynamic(
  () => import("../../../components/list_page.mobile"),
  {
    ssr: true,
  },
);

const DeskList = dynamic(() => import("../../../components/list_page.mobile"), {
  ssr: true,
});

const CityPackages = ({
  data,
  headers,
  region,
  places,
  city,
  meta,
  related,
  travel,
  faqs,
  reviews,
  articles,
  pthemes
}) => {
  console.log(region);
  const [isMobile, setIsMobile] = useState(
    headers["user-agent"].includes("android") ||
      headers["user-agent"].includes("iphone"),
  );

  useEffect(() => {
    if (
      headers["user-agent"].includes("android") == true ||
      headers["user-agent"].includes("iphone") == true
    ) {
      setIsMobile(true);
    } else {
      setIsMobile(false);
      // return <ListPage data = {data}/>
    }
  }, [isMobile]);

  if (isMobile == true) {
    // return <ListPageMobile data = {data}/>
    return (
      <>
        <Nav />{" "}
        <MobileList
          meta={meta}
          page_type={"CITY"}
          data={data ?? []}
          region={region}
          places={places}
          isMobile={isMobile}
          city={city}
          related={related}
          travel={travel}
          faqs={faqs}
          reviews={reviews}
          articles={articles}
          pthemes={pthemes}
        />
      </>
    );
  } else {
    return (
      <>
        <Nav />
        <DeskList
          meta={meta}
          page_type={"CITY"}
          data={data ?? []}
          region={region}
          places={places}
          isMobile={isMobile}
          city={city}
          related={related}
          travel={travel}
          faqs={faqs}
          reviews={reviews}
          articles={articles}
          pthemes={pthemes}
        />
      </>
    );
  }

  // const router = useRouter()

  // console.log(router)

  // return <Nav />
};

export async function getServerSideProps(context) {
  context.res.setHeader("Cache-Control", "s-maxage=10");
  // console.log(context.query)
  const headers = context.req.headers;
  // getStateByCityQuery
  // const rs = await client.query({query:getStateByCityQuery,variables:{input:{av:'1.3',id:'',pt:'WEBSITE',text:context.query.city}}})

  // console.log(rs.data.state.output)
  // const r = await axios.post("",)

  // let payload = {
  //     av:'1.3',
  //     id:`${rs.data.state.output.id}`,
  //     name:rs.data.state.output.name,
  //     pt:'WEBSITE',
  //     type:'State'
  // }
  console.log(context.query)
  let payload = {
    av: "1.3",
    id: context.query.id,
    name: context.query.city.replace(/-/g, " "),
    pt: "WEBSITE",
    type: "CITY",
  };
  // console.log(context.query)
  // console.log(payload)
  const res = await client.query({
    query: getallpackages,
    variables: { input: payload },
  });
  // console.log(res.data)
  const data = res.data.allpackage.output?.packages ?? [];
  const region = res.data.allpackage.output?.region ?? [];
  const places = res.data.allpackage.output?.fcities ?? [];

  payload = {
    av: "1.3",
    id: region.sid,
    name: region?.sname?.replace(/-/g, " "),
    pt: "WEBSITE",
    type: "STATE",
  };

  const rel_res = await client.query({
    query: getallpackages,
    variables: { input: payload },
  });
  const rel_package = rel_res.data.allpackage.output;

  // console.log(rel_package)

  payload = {
    av: "",
    geoid: context.query.id,
    home: "",
    id: "",
    pagenum: 0,
    pid: 0,
    pt: "",
    size: 0,
    type: "City",
  };
  const res_travel = await client.query({
    query: getTravelGuideQuery,
    variables: { input: payload },
  });
  payload = {
    av: "",
    geoid: region.sid,
    home: "",
    id: region.sid,
    pagenum: 0,
    pid: 0,
    pt: "",
    size: 0,
    type: "STATE",
  };
  const articles =
    (
      await client.query({
        query: getStatereArticleQuery,
        variables: { input: payload },
      })
    ).data.articles.output?.articles ?? [];
  //   const res_travel = []

  const meta = await client.query({
    query: getMetaQuery,
    variables: {
      input: {
        av: "",
        id: context.query.id,
        key: "CITY_HOLIDAYS",
        name: "",
        pt: "WEBSITE",
        type: "CITY",
      },
    },
  });
  let { finalprice, images } = meta.data.meta.output.package;
  finalprice = `₹${finalprice} `;
  const metas = {
    title:
      region.metaTitle ??
      meta.data.meta.output.tags.title
        .replace(/<CITY>/g, context.query.city)
        .replace(/<PRICE>/g, finalprice),
    longDesc:
      region.metaDesc ??
      meta.data.meta.output.tags.longDesc.replace(
        /<CITY>/g,
        context.query.city,
      ),
    keywords:
      region.metaKeywords ??
      meta.data.meta.output.tags.longDesc.replace(
        /<CITY>/g,
        context.query.city,
      ),
    image: images,
  };

  // data = []
  // // headers = []
  // region = []
  // places = []
  headers["user-agent"] = headers["user-agent"].toLocaleLowerCase();
  return {
    props: {
      data,
      headers,
      region,
      places,
      city: context.query.city,
      meta: metas,
      related: rel_package,
      travel: res_travel?.data?.travel?.output,
      faqs: res.data.allpackage.output?.faqs ?? [],
      reviews: res.data.allpackage.output?.reviews ?? [],
      articles,
      pthemes: res.data.allpackage.output.pthemes ?? [],      
    },
  };
}

export default CityPackages;
