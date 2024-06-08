import { getAttractioneHome, getMetaQuery } from "@/components/Graphql/Queries";
import client from "@/components/Graphql/service";
import CustomImage from "@/components/Img";
import dynamic from "next/dynamic";


const Nav = dynamic(() => import("@/components/Nav"));
const BreadCrumbs = dynamic(() => import("@/components/breadcrumbs"));

const Attractions = ({data,meta}) =>{
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

    return <>
    <Nav />
    <BreadCrumbs bread={bread} />
    <div className="container">
        <div>
            <div className="flex flex-wrap">
                {data.attractions.map((e,index)=>{
                    return <div key={index} className="w-1/4">
                            <div>

                              <CustomImage img_url={undefined} />
                              {e.name}

                            </div>
                        </div>
                })}
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
            "size": 30,
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