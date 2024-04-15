// import { tw } from "twind"
// import BreadCrumbs from "../../components/breadcrumbs"
// import Nav from "../../components/Nav"
import client from "../../components/Graphql/service";
import Head from "next/head";
import {
  getarticleQuery,
  getMetaQuery,
} from "../../components/Graphql/Queries";
// import Link from "next/link"
// import Meta from "../../components/meta"
import dynamic from "next/dynamic";
import { createArticleURL } from "@/components/fun";
import { tw } from "twind";
import { useState } from "react";
// import S_Article from "@/components/article/s_article";

const S_Article = dynamic(() => import("@/components/article/s_article"));
const Nav = dynamic(() => import("../../components/Nav"));
const Meta = dynamic(() => import("../../components/meta"));
const BreadCrumbs = dynamic(() => import("../../components/breadcrumbs"));

const TravelArticles = ({ article, meta }) => {
  // const [search, Setsearch] = useState("");
  const [search,Setsearch] = useState("")
  const bread = {
    disabled: {
      item: `Travel Stories`,
    },
    enabled: [
      {
        item: "Home",
        href: "/",
      },
    ],
  };


  const jsonP = {
    
    "@context":"https://schema.org",
    "@graph":[
        
        {
            "@type":"Webpage",
            "@id":"https://www.kiomoi.com/travel-articles/#website",
            "url":"https://www.kiomoi.com/travel-articles",
            "name":"Kiomoi",
            "publisher":{
                "@type": "Organization",
                "@id":"https://www.kiomoi.com/travel-articles/#organization"
            }
           
        },
        {
            "@type":[
                "CollectionPage"
            ],
            "@id":"https://www.kiomoi.com/travel-articles/#webpage",
            "url":"https://www.kiomoi.com/travel-articles/",
            "inLanguage":"en",
            "name":"Article",
            "isPartOf":{
                "@id":"https://www.kiomoi.com/travel-articles/#website"
            },
            
            "description":"Get all the latest updates about domestic and International holiday tour packages, adventure trips, best places to Do Paragliding in India , best places to visit in India, weekend getaway trips, top religious places in India, best adventure places in India, top culture and heritage of India, top honeymoon destinations in India, top wildlife sanctuaries in India and top beaches in India related knowledge at Kiomoi website!",
            // "breadcrumb":{
            //     "@id":"https://www.kiomoi.com/travel-articles/#breadcrumb"
            // }
        }]}




  return (
    <>
    
      <Head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonP) }}
        />        
      </Head>    
      <Meta meta={meta} />
      <Nav />
      <BreadCrumbs bread={bread} />
      <div className={"container"}>
      <input
          type="text"
          className={tw`mt-4 p-4 border-1 border-gray-300 rounded-lg outline-none w-full bg-transparent`}
          placeholder="Search Travel Article"
          value={search}
          onChange={(e) => Setsearch(e.target.value)}
        />        
        <div>
          <div className={`mt-6`}>
            {article.map((item, index) => {


              let aurl = createArticleURL({
                heading: item.heading,
                id: item.id,
              });
              // let aurl = "/travel-articles/"+item.heading.trim().replace(/\s+/g,' ').replace(/\s+/g, "-").replace(/--/g,'-').toLowerCase()+"/"+item.id+"/"
              return search == "" || item.heading.toLocaleLowerCase().includes(search.toLocaleLowerCase()) ?
               <S_Article item={item} aurl={aurl} index={index} />
              :""
            }
            
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export async function getServerSideProps(context) {
  let article_data = {
    av: "1.3",
    pt: "WEBSITE",
    geoid: 0,
    id: "string",
    pagenum: 1,
    pid: 0,
    size: 100,
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
        key: "ARTICLES",
        name: "",
        pt: "WEBSITE",
        type: "",
      },
    },
  });

  return { props: { article, meta: meta.data.meta.output.tags } };
}

export default TravelArticles;
