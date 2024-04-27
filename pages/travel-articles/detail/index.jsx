// import Nav from "../../../components/Nav"
import client from "../../../components/Graphql/service";
import {
  getArticle,
  getarticleQuery,
  getMetaQuery,
} from "../../../components/Graphql/Queries";
// import BreadCrumbs from "../../../components/breadcrumbs"

// import Articles from "../../../components/home/articles"
import { toTitleCase } from "../../../components/fun";
import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import Head from "next/head";
// import ArticleContent from "@/components/article/article_content";
// import Meta from "../../../components/meta"

const ArticleContent = dynamic(() =>
  import("@/components/article/article_content"),
);
const Nav = dynamic(() => import("../../../components/Nav"));
const BreadCrumbs = dynamic(() => import("../../../components/breadcrumbs"));
const Articles = dynamic(() => import("../../../components/home/articles"));
const Meta = dynamic(() => import("../../../components/meta"));

const TravelArticle = ({ data, article, meta }) => {
  const {asPath} = useRouter()
  const bread = {
    disabled: {
      item: `${data.article.heading}`,
    },
    enabled: [
      {
        item: "Home",
        href: "/",
      },
      {
        item: "Travel Stories",
        href: "/travel-articles/",
      },
    ],
  };

  const jsonP = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": `https://www.kiomoi.com${asPath}`
    },
    "headline": data.article.heading,
    "description": `Introduction: ${data.article.desc}`,
    "image": meta?.image,  
    "author": {
      "@type": "Person",
      "name": "Sharry"
    },  
    "publisher": {
      "@type": "Organization",
      "@id":`https://www.kiomoi.com${asPath}#organization`,
      "name": "Kiomoi",
         "logo": {
        "@type": "ImageObject",
        "url": "https://www.kiomoi.com/icons/kiomoi%20logo.svg"
      }
     
    },
    "datePublished": "2024-03-25",
    "dateModified": "2024-03-25"
    
  }

  return (
    <>
      {/* <Head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonP) }}
        />        
      </Head> */}
      <Meta meta={meta} />
      <Nav />
      <BreadCrumbs bread={bread} />
      <section className="container" itemScope itemType="https://schema.org/BlogPosting">
      <a itemProp="mainEntityOfPage" href={`https://www.kiomoi.com/${asPath}`}/>
      <meta itemProp="image" content={meta?.image}/>
      <span itemProp="author" itemScope itemType="https://schema.org/Person">
        <meta itemProp="name" content="Sharry" />
      </span>
      <span itemProp="publisher" itemScope itemType="https://schema.org/Organization">
        <meta itemProp="name" content="Kiomoi"/>
        <span itemProp="logo" itemScope itemType="https://schema.org/ImageObject">
          <span itemProp="url" content="https://www.kiomoi.com/icons/kiomoi%20logo.svg"/>
        </span>
      </span>
        {/* <span itemProp="mainEntityOfPage" itemScope itemType="https://schema.org/WebPage">
        

        "publisher": {
          "@type": "Organization",
          "@id":`https://www.kiomoi.com${asPath}#organization`,
          "name": "Kiomoi",
            "logo": {
            "@type": "ImageObject",
            "url": "https://www.kiomoi.com/icons/kiomoi%20logo.svg"
          }
        
        },
        "datePublished": "2024-03-25",
        "dateModified": "2024-03-25"


        </span> */}
        <h1 className={`text-2xl font-bold`} itemProp="headline">{data.article.heading}</h1>
        <div className={`w-full lg:w-2/3`}>
          <div className={`mt-6`}>
            <div className={`flex flex-wrap services_listing`}>
              {data.article.tags?.split(",").map((item, index) => {
                return (
                  <div className="btn_view_more mr-[10px]" key={index + 1}>
                    {item}
                  </div>
                );
              })}
            </div>
          </div>
          <div className={`mt-6`}>
            <ArticleContent data={data} />
            {/* <div className="article-det">
                        {ReactHtmlParser(data.article.desc)}
                    </div> */}
          </div>
        </div>
        <Articles data={article} />
      </section>
    </>
  );
};

export async function getServerSideProps(context) {
  let _id = context.query.id;
  const res = await client.query({
    query: getArticle,
    variables: { input: { id: _id } },
  });
  // console.log(res.data.travelArticle.output);

  let article_data = {
    av: "1.3",
    pt: "WEBSITE",
    geoid: 0,
    id: "string",
    pagenum: 1,
    pid: _id,
    size: 20,
    type: 0,
  };

  // getQnaQuery

  const article_res = await client.query({
    query: getarticleQuery,
    variables: { input: article_data },
  });
  const article = article_res.data.articles.output.articles;

  const meta = await client.query({
    query: getMetaQuery,
    variables: {
      input: {
        av: "",
        id: 0,
        key: "ARTICLE",
        name: "",
        pt: "WEBSITE",
        type: "CITY_TRAVELGUIDE",
      },
    },
  });
  // let {finalprice,images} = meta.data.meta.output.package
  let name = toTitleCase(context.query.slug);
  // finalprice = `₹${finalprice} `

  const metas = {
    title: res.data.travelArticle.output.article.metaTitle,
    longDesc: res.data.travelArticle.output.article.metaDesc,
    keywords: res.data.travelArticle.output.article.metaKeywords,
  };
  return {
    props: { data: res.data.travelArticle.output, article, meta: metas },
  };
}

export default TravelArticle;
