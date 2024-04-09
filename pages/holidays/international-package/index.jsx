import { useRouter } from "next/router";
import {
  getallpackages,
  getThemeQuery,
  getMetaQuery,
  getTravelGuideQuery,
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

const InternationalPackages = ({
  data,
  headers,
  region,
  places,
  theme,
  meta,
  faqs,
  travel,
  cities,
  reviews,
  overview
}) => {
  const [isMobile, setIsMobile] = useState(
    headers["user-agent"].includes("android") ||
      headers["user-agent"].includes("iphone"),
  );

  // useEffect(()=>{

  // let {finalprice,images} = meta.package
  // finalprice = `₹${finalprice}`

  // var metas = {}
  // metas = meta

  // let metas ={
  //  title:meta.tags.title.replace(/<STATE>/g,'Met').replace(/<PRICE>/g,finalprice).replace(/\[State\ Name\]/g,'Met'),
  //  longDesc:meta.tags.longDesc.replace(/<STATE>/g,name)
  // }

  // })

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
          page_type={"COUNTRY"}
          data={data ?? []}
          region={region}
          places={places}
          isMobile={isMobile}
          theme={theme}
          faqs={faqs}
          travel={travel}
          cities={cities}
          reviews={reviews}
          p_overview={overview}
        />
      </>
    );
  } else {
    return (
      <>
        <Nav />
        <DeskList
          meta={meta}
          page_type={"COUNTRY"}
          data={data ?? []}
          region={region}
          places={places}
          isMobile={isMobile}
          theme={theme}
          faqs={faqs}
          travel={travel}
          cities={cities}
          reviews={reviews}
          p_overview={overview}
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
  console.log(context.query);
  const headers = context.req.headers;

  let payload = {
    av: "1.3",
    id: context.query.id,
    name: context.query.package.replace(/-/g, " "),
    // name:'nepal',
    pt: "WEBSITE",
    type: "COUNTRY",
  };

  console.log(payload);
  // console.log(payload)
  const res = await client.query({
    query: getallpackages,
    variables: { input: payload },
  });
  console.log(res);
  payload = {
    av: "",
    geoid: context.query.id,
    home: "",
    id: context.query.id,
    pagenum: 0,
    pid: 0,
    pt: "",
    size: 0,
    type: "COUNTRY",
  };
  const res_travel = await client.query({
    query: getTravelGuideQuery,
    variables: { input: payload },
  });
  const data = res.data.allpackage?.output?.packages;

  const region = res.data.allpackage.output?.region ?? null;
  const overview = res.data.allpackage.output?.region?.longDesc ?? ""
  const places = res.data.allpackage.output?.fcities;
  const cities = res.data.allpackage.output?.ncities
    .slice(0, 10)
    .sort(() => Math.random() - 0.5);

  headers["user-agent"] = headers["user-agent"].toLocaleLowerCase();

  const res_theme = await client.query({
    query: getThemeQuery,
    variables: { input: { av: "", id: "", pt: "" } },
  });

  const meta = await client.query({
    query: getMetaQuery,
    variables: {
      input: {
        av: "",
        id: 0,
        key: "STATE_HOLIDAYS",
        name: "",
        pt: "WEBSITE",
        type: "STATE",
      },
    },
  });
  let { finalprice, images } = meta.data.meta.output.package;
  finalprice = `₹${finalprice} `;
  const metas = {
    title:
      region?.metaTitle ??
      meta.data.meta.output.tags.title
        .replace(/<STATE>/g, context.query.package.replace(/-/g, " "))
        .replace(/<PRICE>/g, finalprice)
        .replace(/\[State\ Name\]/g, context.query.package.replace(/-/g, " ")),
    longDesc:
      region?.metaDesc ??
      meta.data.meta.output.tags.longDesc.replace(
        /<STATE>/g,
        context.query.package.replace(/-/g, " "),
      ),
    keywords:
      region?.metaKeywords ??
      meta.data.meta.output.tags.longDesc.replace(
        /<STATE>/g,
        context.query.package.replace(/-/g, " "),
      ),
    image: images,
  };

  // finalprice = `₹${finalprice}`

  // meta.data.meta.output.tags.title = meta.data.meta.output.tags.title.replace(/<STATE>/g,context.query.package.replace(/-/g,' ')).replace(/<PRICE>/g,finalprice).replace(/\[State\ Name\]/g,context.query.package.replace(/-/g,' '))

  // meta.data.meta.output.tags.title = meta.data.meta.output.package

  let pr = {
    data: data ?? [],
    headers,
    region,
    places: places ?? [],
    theme: res_theme.data.alltheme.output,
    meta: metas,
    faqs: res.data.allpackage.output?.faqs ?? [],
    travel: res_travel.data.travel.output,
    cities: cities ?? [],
    reviews: res.data.allpackage?.output?.reviews ?? [],
    overview
  };
  // console.log(pr)
  return { props: pr };
}

export default InternationalPackages;
