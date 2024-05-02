import { createDetailUrl } from "@/components/fun";
import client from "../../../components/Graphql/service";
import {
    getpackage,
  } from "../../../components/Graphql/Queries";



const RedirectToNew = () =>{
    return <></>
}

export async function getServerSideProps(context) {
    let query = context.query
    let _id = context.query.id;
    let name = context.query.slug;

    console.log(query)

    const res = await client.query({
        query: getpackage,
        variables: {
          input: {
            id: _id,
          },
        },
      });

    
    const nurl = createDetailUrl({
    name: res.data?.package.output.package.name,
    id: _id,
    });


    console.log(nurl)
  

  
    // if (!nurl.includes(query['slug'])){
    //     return {
    //         redirect: {
    //           permanent: false,
    //           destination: nurl,
    //         },
    //         props:{},
    //       };
    // }

    // const nurl = createDetailUrl({name:name,id:_id})


    return {
        redirect: {
          permanent: true,
          destination: nurl,
        },
        props:{},
      };
  
    // return {props:{}}
  }


  export default RedirectToNew