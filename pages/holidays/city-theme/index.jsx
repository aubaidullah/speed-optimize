import {
  getallpackages,
  getThemeQuery,
  getMetaQuery,
  getTravelGuideQuery,
  getStatereArticleQuery,
  getCityWithThemePackage,
} from "../../../components/Graphql/Queries";
import client from "../../../components/Graphql/service";
// import Nav from "../../../components/Nav"
import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import { toTitleCase } from "@/components/fun";

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

const ThemeStatePackages = ({
  data,
  headers,
  region,
  places,
  theme,
  meta,
  travel,
  reviews,
  faqs,
  articles,
  cities,
  pthemes,
  overview
}) => {
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
          page_type={"STATE"}
          data={data ?? []}
          region={region}
          places={places}
          isMobile={isMobile}
          theme={theme}
          travel={travel}
          reviews={reviews}
          faqs={faqs}
          articles={articles}
          cities={cities}
          pthemes = {pthemes}
          theme_desc={meta.theme.description}
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
          page_type={"STATE"}
          data={data ?? []}
          region={region}
          places={places}
          isMobile={isMobile}
          theme={theme}
          travel={travel}
          reviews={reviews}
          faqs={faqs}
          articles={articles}
          cities={cities}
          pthemes = {pthemes}
          theme_desc={meta.theme.description}
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
  // console.log(context.query)
  const headers = context.req.headers;
  // console.log(context.query);
  let payload = {
    av: "1.3",
    id: context.query.id,
    name: context.query.package.replace(/-/g, " "),
    // name:'west bengal',
    pt: "WEBSITE",
    theme: toTitleCase(context.query.theme.replace(/-/g, " ")),
    type: context.query.pre=="2"?"STATE":"CITY",
  };
  // console.log(payload)
  const res = await client.query({
    query: getCityWithThemePackage,
    variables: { input: payload },
  });
  // console.log(res.data)

  const data = res.data.allpackage.output.packages;

  const region = res.data.allpackage.output.region ?? null;
  const places = res.data.allpackage.output.fcities;
  const cities = res.data.allpackage.output.ncities;
  const theme_meta = res.data.allpackage.output.theme;
  const overview = res.data.allpackage.output.theme.description;
  // const overview = res.data.allpackage.output.
  // console.log(theme_meta)
  // console.log(overview)

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
        key: context.query.pre=="2"?"STATE_HOLIDAYS":"CITY_HOLIDAYS",
        name: "",
        pt: "WEBSITE",
        type: context.query.pre=="2"?"STATE":"CITY",
      },
    },
  });
  let { finalprice, images } = meta.data.meta.output.package;
  finalprice = `₹${finalprice} `;
  const metas = {
    title:
    theme_meta?.metaTitle ??
      meta.data.meta.output.tags.title
        .replace(/<STATE>/g, context.query.package.replace(/-/g, " "))
        .replace(/<PRICE>/g, finalprice)
        .replace(/\[State\ Name\]/g, context.query.package.replace(/-/g, " ")),
    longDesc:
    theme_meta?.metaDesc ??
      meta.data.meta.output.tags.longDesc.replace(
        /<STATE>/g,
        context.query.package.replace(/-/g, " "),
      ),
    keywords:
    theme_meta?.metaKeywords ??
      meta.data.meta.output.tags.longDesc.replace(
        /<STATE>/g,
        context.query.package.replace(/-/g, " "),
      ),
    image: images,
    theme:theme_meta??""
  };
// context.query.pre=="2"?context.query.id:region.sid
  payload = {
    av: "",
    geoid: context.query.pre=="2"?context.query.id:region.sid,
    home: "",
    id: context.query.pre=="2"?context.query.id:region.sid,
    pagenum: 0,
    pid: 0,
    pt: "",
    size: 0,
    type: "STATE",
  };
  const res_travel = await client.query({
    query: getTravelGuideQuery,
    variables: { input: payload },
  });
  payload["geoid"] = context.query.pre=="2"?context.query.id:region.sid
  payload["id"] = context.query.pre=="2"?context.query.id:region.sid

  // console.log(payload)
  const articles =
    (
      await client.query({
        query: getStatereArticleQuery,
        variables: { input: payload },
      })
    ).data.articles.output?.articles ?? [];
    return {
    props: {
      data,
      headers,
      region,
      places,
      theme: res_theme.data.alltheme.output??[],
      meta: metas,
      travel: res_travel.data.travel.output,
      reviews: res.data.allpackage.output.reviews ?? [],
      faqs: res.data.allpackage.output.faqs ?? [],
      pthemes: res.data.allpackage.output.pthemes ?? [],
      articles,
      cities,
      overview
    },
  };
}

export default ThemeStatePackages;
