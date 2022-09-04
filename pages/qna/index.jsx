import client from "../../components/Graphql/service";
import { getQnaQuery } from "../../components/Graphql/Queries";
import QnaListing from "../../components/Qna";


const Qna=({qna})=>{
    return <QnaListing data={qna} travelGuide={false}/>
}


export async function getServerSideProps(context) {
    context.res.setHeader('Cache-Control', 's-maxage=10'); 
    // console.log(context.query)
    let _id = context.query.id

    let qna_data = {
        'av': '',
        'tgid': `${_id}`,
        'did': '',
        'pagenum': 1,
        'pt': '',
        'size': 1000,
    }

    const qna_res = await client.query({query:getQnaQuery,variables:{input:qna_data}})
    const qna = qna_res.data.qna.output.qna


    return {props:{qna}}
  }



export default Qna