
import client from "@/components/Graphql/service";
import {
  getTravelGuideHome,
  getMetaQuery,
} from "@/components/Graphql/Queries";
// import Image from "next/image"
import Link from "next/link";
// import Meta from "../../components/meta"
import {
  createTGCityURL,
  createTGCountryURL,
  createTGStateURL,
} from "@/components/fun";
import dynamic from "next/dynamic";
import { useState } from "react";
// import parseHtml from "@/components/parseToHtml";
// import { country } from "../../components/Constants"

const ParseHtml = dynamic(() => import("@/components/parseToHtml"));
const Meta = dynamic(() => import("@/components/meta"));
const Nav = dynamic(() => import("@/components/Nav"));
const BreadCrumbs = dynamic(() => import("@/components/breadcrumbs"));


const IndexPage = ({data,meta,pageType}) =>{
    const [search, Setsearch] = useState("");

    const bread = {
      disabled: {
        item: `Travel Guide`,
      },
      enabled: [
        {
          item: "Home",
          href: "/",
        },
      ],
    };
  
    return (
      <>
        <Meta meta={meta} />
        <Nav />
        <BreadCrumbs bread={bread} />
        <section className="container">
          <h1 className={`text-2xl font-bold`}>Top {pageType == "STATE"?"State":pageType=="CITY"?"City":"Country"} Travel Guides
          </h1>
          <input
            type="text"
            className={`mt-4 p-4 border-1 border-gray-300 rounded-lg outline-none w-full bg-transparent`}
            placeholder="Search Travel Guide"
            value={search}
            onChange={(e) => Setsearch(e.target.value)}
          />
  
          <section className={`mt-10`}>
            <div className={`flex flex-wrap`}>
              {data.map((e, index) => {
                // search=="" || e.match(search) ?
                if (e.geoType == pageType) {
                    
                    if (e.geoType == "CITY") {
                        var url = createTGCityURL({ city: e.cityName, id: e.id });
                        // var url = `/travel-guide/india/city-${e.cityName.replace(/\s+/g, "-").toLowerCase()}/${e.id}`
                      } else if (e.geoType == "STATE") {
                        var url = createTGStateURL({ city: e.cityName, id: e.id });
                        // var url = `/travel-guide/india/state-${e.cityName.replace(/\s+/g, "-").toLowerCase()}/${e.id}`
                      } else {
                        var url = createTGCountryURL({ country: e.cityName, id: e.id });
                        // var url = `/${e.cityName.replace(/\s+/g, "-").toLowerCase()}/${e.id}`
                      }
                  // var url = `/travel-guide/india/state-${e.cityName.replace(/\s+/g, "-").toLowerCase()}/${e.id}`
                
  
                return search == "" ||
                  e.cityName
                    .toLocaleLowerCase()
                    .includes(search.toLocaleLowerCase()) ? (
                  <div
                    className={`w-full lg:w-1/3 md:w-1/2 px-2 mb-5`}
                    key={index}
                  >
                    <h2 className={`text-xl mb-2 font-bold`}>{e.cityName}</h2>
                    <Link href={url}>
                      <div href={url}>
                        <div className={`bg-white rounded-2xl _box_shadow`}>
                          <div className={`h-56`}>
                            <img
                              className={`rounded-t-2xl h-full w-full`}
                              src={e.images}
                              alt={`${e.cityName} travel guide`}
                            />
                          </div>
                          <div className={`p-4 trvl_box`}>
                            <div className={`pt-4 text-sm text-gray-600`}>
                              <ParseHtml
                                text={e.overviewDesc.substring(0, 150)}
                              />
                              {/* {ReactHtmlParser(e.overviewDesc.substring(0, 150))} */}
                            </div>
                            <div className={`mt-2`}>
                              <div className="_btn_clr w-full text-center text-[12px] pt-[8px] pb-[8px] pl-[15px] pr-[15px] btn_listing">
                                KNOW MORE & GET CUSTOMIZE
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </Link>
                  </div>
                ) : (
                  ""
                );
              }}
              
              
              )}
            </div>
          </section>
        </section>
      </>
    );
  
}


export async function getServerSideProps(context) {
    context.res.setHeader("Cache-Control", "s-maxage=10");
    console.log(context.req.url)
    console.log(context.req.headers.host)

    let pageType = ""
    if (context.req.url.includes("states")){
        pageType = "STATE"
    }
    else if(context.req.url.includes("places")){
        pageType = "CITY"
    }
    else{
        pageType = "COUNTRY"
    }

    const res_travel = await client.query({
      query: getTravelGuideHome,
      variables: {
        input: {
          av: "1.3",
          pt: "WEBSITE",
          geoid: 0,
          id: "0",
          pagenum: 0,
          pid: 0,
          type: 0,
        },
      },
    });
    let data = res_travel.data.travelguide.output;
  
    const meta = await client.query({
      query: getMetaQuery,
      variables: {
        input: {
          av: "",
          id: 0,
          key: "TRAVELGUIDES",
          name: "",
          pt: "WEBSITE",
          type: "",
        },
      },
    });
    // let {finalprice,images} = meta.data.meta.output.package
    // finalprice = `₹${finalprice} `
    // const metas ={
    //     title:meta.data.meta.output.tags.title.replace(/<CITY>/g,context.query.city).replace(/<PRICE>/g,finalprice),
    //     longDesc:meta.data.meta.output.tags.longDesc.replace(/<CITY>/g,context.query.city),
    //     keywords:meta.data.meta.output.tags.longDesc.replace(/<CITY>/g,context.query.city),
    //     image:images
    // }
  
    // console.log(data)
    return { props: { data, meta: meta.data.meta.output.tags,pageType } };
  }
  

export default IndexPage;
