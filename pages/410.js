// import Nav from "../components/Nav"
import { tw } from "twind";
import dynamic from "next/dynamic";

const Nav = dynamic(() => import("../components/Nav"));

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



export default function Error410() {
  // useEffect(() => {
  //   router.replace("/")
  // })  
  return null
  
  (
    <>
      <Nav />
      <title>410 | Gone</title>
      <div className={tw`h-screen`}>
        <div className={tw`flex items-center h-full`}>
          <h1 className={tw`text-3xl text-center w-full c_gray`}>Gone | 410</h1>
        </div>
      </div>
    </>
  );
}
