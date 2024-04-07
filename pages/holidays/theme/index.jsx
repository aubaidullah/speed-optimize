import axios from "axios";
import Image from "next/image";
// import Package from "../components/package"
// import ListPageMobile from '../components/list_page.mobile'
// import ListPage from '../components/list_page.desktop'
import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import {
  getallpackages,
  getMetaQuery,
} from "../../../components/Graphql/Queries";
import client from "../../../components/Graphql/service";
import { getPackages } from "../../../redux_fx/actions";
import { useSelector, useDispatch } from "react-redux";

// import Nav from "../components/Nav";
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

const ThemePackage = ({ data, headers, region, places, meta, theme_desc,overview }) => {
  const [isMobile, setIsMobile] = useState(
    headers["user-agent"].includes("android") ||
      headers["user-agent"].includes("iphone"),
  );

  const dispatch = useDispatch();
  // const data = useSelector(state=>state.packages)

  useEffect(() => {
    dispatch(getPackages(data));
  }, []);
  const pdata = data;

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
          page_type={"THEME"}
          data={pdata ?? []}
          region={region}
          places={places}
          isMobile={isMobile}
          theme_desc = {theme_desc}     
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
          page_type={"THEME"}
          data={pdata ?? []}
          region={region}
          places={places}
          isMobile={isMobile}
          theme_desc = {theme_desc}          
          p_overview={overview}
        />
      </>
    );
  }
};

export async function getServerSideProps(context) {
  // Fetch data from external API
  context.res.setHeader("Cache-Control", "s-maxage=10");
  const headers = context.req.headers;
  const theme_name = context.query.theme.replace(/-and-/g, "-&-").replace(/-/g, " ");
  console.log(theme_name)

  const res = await client.query({
    query: getallpackages,
    variables: {
      input: { av: "1.3", name: theme_name, pt: "WEBSITE", type: "THEME" },
    },
  });
  // const data = res.data.allpackage.output.packages.slice(0, 10)

  const data = res.data.allpackage?.output?.packages;

  const region = res.data.allpackage?.output?.region ?? null;
  const places = res.data.allpackage?.output?.fcities;
  const overview = res.data.allpackage?.output?.theme_description??""

  const meta = {
    "title":res.data.allpackage?.output?.theme_meta?.metaTitle,
    "longDesc":res.data.allpackage?.output?.theme_meta?.metaDesc,
    "keywords":res.data.allpackage?.output?.theme_meta?.metaKeywords
  }
  // const meta = await client.query({
  //   query: getMetaQuery,
  //   variables: {
  //     input: {
  //       av: "1.3",
  //       id: 0,
  //       key: "HOLIDAYS",
  //       name: "",
  //       pt: "WEBSITE",
  //       type: "",
  //     },
  //   },
  // });
  // console.log(places)
  headers["user-agent"] = headers["user-agent"].toLocaleLowerCase();

  let pr = {
    data: data ?? [],
    headers,
    region: region ?? [],
    places: places ?? [],
    meta: meta,
    theme_desc : theme_desc,
    overview
  };

  return { props: pr };
}

export default ThemePackage;
