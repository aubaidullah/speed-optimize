import { getAttractioneHome, getMetaQuery } from "@/components/Graphql/Queries";
import client from "@/components/Graphql/service";
import CustomImage from "@/components/Img";
import { createAttractionsURL } from "@/components/fun";
import dynamic from "next/dynamic";
import Link from "next/link";
import { useEffect, useState } from "react";


const Nav = dynamic(() => import("@/components/Nav"));
const BreadCrumbs = dynamic(() => import("@/components/breadcrumbs"));

const Attractions = ({data,meta}) =>{
    const  [limit,setLimit] = useState(20)
    const  [searchText,setSearchText] = useState("")
    const [attractionList,setAttractionList] = useState(data.attractions)
    const bread = {
        disabled: {
          item: `Travel Blogs`,
        },
        enabled: [
          {
            item: "Home",
            href: "/",
          },
        ],
      };


    const submitSearch = async () =>{
      if (searchText.length>=2 ||searchText.length == 0 ){
        const res_attraction = await client.query({
          query: getAttractioneHome,
          variables: {
            input: {
              "av": "",
              "geoid": 0,
              "home": "",
              "id": "",
              "pagenum": 1,
              "pid": 0,
              "pt": "",
              "size": 200,
              "type": "",
              "searchText":searchText
            }
          },
        });
        let data = res_attraction.data.attraction.output;
        setAttractionList(data?.attractions)
      }
    }

    useEffect(()=>{
      submitSearch()
    },[searchText])



    return <>
    <Nav />
    <BreadCrumbs bread={bread} />
    <div className="container">
        <div>
          <h1 className="text-2xl font-bold">
            Top Attractions
          </h1>
          <>
          <input
            type="text"
            className={`mt-4 p-4 rounded-full outline-none w-full bg-transparent`}
            placeholder="Search Travel Blogs"
            value={searchText}
            style={{border:"1px solid ", borderColor:'gray'}}
            onChange={(e) => setSearchText(e.target.value)}
          />
          </>
            <div className="mt-6 flex flex-wrap">
                {attractionList?.slice(0,limit).map((e,index)=>{
                    return <div key={e.id} className="w-full lg:w-1/4">
                            <div className="px-2 py-4">
                              <Link href={createAttractionsURL({attraction:e.name,city:e.cityName,id:e.id})}>
                                <div>
                                  <div className="relative h-[200px]">
                                    <CustomImage img_url={e?.images} className="rounded-lg" />
                                  </div>
                                  <div className=" font-semibold pt-2">
                                    {e.name}
                                  </div>
                                </div>
                              </Link>
                            </div>
                        </div>
                })}
            </div>
            <div className="flex mt-8">
              <button className="btn_listing _btn_clr m-auto" onClick={()=>setLimit(limit+36)}> Load more</button>
            </div>
        </div>
    </div>
    </>
}




export async function getServerSideProps(context) {
    context.res.setHeader("Cache-Control", "s-maxage=10");

    const res_attraction = await client.query({
      query: getAttractioneHome,
      variables: {
        input: {
            "av": "",
            "geoid": 0,
            "home": "",
            "id": "",
            "pagenum": 1,
            "pid": 0,
            "pt": "",
            "size": 200,
            "type": ""
        },
      },
    });
    let data = res_attraction.data.attraction.output;
  
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
    return { props: { data, meta: meta.data.meta.output.tags } };
  }


export default Attractions