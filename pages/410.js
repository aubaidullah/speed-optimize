import Nav from "../components/Nav"
import { tw } from "twind"

export async function getServerSideProps({ res }) {
    res.statusCode = 410
    return { props: {} }
  }
  
  export default function Error410() {
    return <>
    <Nav />
    <title>410 | Gone</title>
    <div className={tw`h-screen`}>
        <div className={tw`flex items-center h-full`}>
            <h1 className={tw`text-3xl text-center w-full c_gray`}>Gone | 410</h1>
        </div>
    </div>
    </>
  }
  