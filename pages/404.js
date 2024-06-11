// import Nav from "../components/Nav"

import dynamic from "next/dynamic";
import Link from "next/link";

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
      
      <div className={`container h-screen`}>
        <div className={`flex items-center h-full`}>
          <div style={{marginTop:'-10em'}}>
            <h1 className={`text-3xl font-semibold text-center_ w-full`}>Ohh! You are landed at wrong place</h1>
            <div className="mt-2 text-xl">You may have misstyped the address on the page may have moved</div>
            <div className="mt-6 flex">
              <Link className="btn_listing _btn_clr m-auto lg:m-0" href={"/"}>
               Back to Home Page
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
