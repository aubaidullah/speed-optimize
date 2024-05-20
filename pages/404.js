// import Nav from "../components/Nav"

import dynamic from "next/dynamic";

const Nav = dynamic(() => import("../components/Nav"));

// export async function getServerSideProps({ res }) {
//   // res.statusCode = 310;
//   // res.redirect("/")
//   // console.log(res.req)
//   // localhost:3001/travel-guide/india/attraction-kosi-river/1105
//   var destination
//   if(res.req.url.startsWith("/holidays")){
//     destination = "/holidays"
//   }
//   else if (res.req.url.startsWith("/travel-guide")){
//     destination = "/travel-guide"
//   }
//   else if (res.req.url.startsWith("/travel-guide/india/attraction")){
//     destination = "/travel-articles"
//   }
//   else if (res.req.url.startsWith("/travel-articles/")){
//     destination = "/travel-articles"
//   }

//   else if (res.req.url.startsWith("/places")){
//     destination = "/places"
//   }  

//   else if (res.req.url.startsWith("/states")){
//     destination = "/states"
//   }    

//   else{
//     destination = "/"
//   }
//   // return { props: {} };
//   return {
//     redirect: {
//       permanent: false,
//       destination: destination,
//     },
//     props:{},
//   };
// }



export default function Error404() {
  // useEffect(() => {
  //   router.replace("/")
  // })  
  return (
    <>
      <Nav />
      <title>404 | Not Found</title>
      <div className={`h-screen`}>
        <div className={`flex items-center h-full`}>
          <h1 className={`text-3xl text-center w-full c_gray`}>Not Found | 404</h1>
        </div>
      </div>
    </>
  );
}
