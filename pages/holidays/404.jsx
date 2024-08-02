// import Nav from "../components/Nav"

import dynamic from "next/dynamic";
// import Meta from "@/components/meta";
const Nav = dynamic(() => import("@/components/Nav"));

export async function getServerSideProps({ res }) {
  // res.statusCode = 310;
  // res.redirect("/")

  // return { props: {} };
  return {
    redirect: {
      permanent: false,
      destination: "/",
    },
    props:{},
  };
}



export default function Error404() {
  // useEffect(() => {
  //   router.replace("/")
  // })  
  return null
  
  (
    <>
      <Nav />
      <title>404 | Gone</title>
      <div className={`h-screen`}>
        <div className={`flex items-center h-full`}>
          <h1 className={`text-3xl text-center w-full c_gray`}>Gone | 404</h1>
        </div>
      </div>
    </>
  );
}
