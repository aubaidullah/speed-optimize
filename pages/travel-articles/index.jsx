// import { tw } from "twind"
// import BreadCrumbs from "../../components/breadcrumbs"
// import Nav from "../../components/Nav"
import client from "../../components/Graphql/service"
import { getarticleQuery,getMetaQuery } from "../../components/Graphql/Queries"
// import ReactHtmlParser from "react-html-parser";
// import Link from "next/link"
// import Meta from "../../components/meta"
import dynamic from "next/dynamic"
// import S_Article from "@/components/article/s_article";

const S_Article = dynamic(() => import('@/components/article/s_article'))
const Nav = dynamic(() => import('../../components/Nav'))
const Meta = dynamic(() => import('../../components/meta'))
const BreadCrumbs = dynamic(() => import('../../components/breadcrumbs'))

const TravelArticles = ({article,meta}) =>{
    const bread = {
        disabled: {
            item: `Travel Stories`
        },
        enabled: [
            {
                item: "Kiomoi",
                href: "/"
            }
        ]
    }
    
    return <>
        <Meta meta={meta} />
        <Nav/>
        <BreadCrumbs bread={bread} />
        <div className={"container"}>
            
            <div>
                <div className={`mt-6`}>
                    {article.map((item,index)=>{
                        let aurl = "/travel-articles/"+item.heading.trim().replace(/\s+/g,' ').replace(/\s+/g, "-").replace(/--/g,'-').toLowerCase()+"/"+item.id+"/"
                        return <S_Article item={item} aurl={aurl} index={index}/>
                        
                    })}
                </div>
            </div>
        </div>
    </>
}


export async function getServerSideProps(context) {
    let article_data = {
        'av': '1.3',
        'pt': 'WEBSITE',
        'geoid': 0,
        'id': 'string',
        'pagenum': 1,
        'pid': 0,
        'size': 100,
        'type': 0,
    }

    // getQnaQuery


    const article_res = await client.query({ query: getarticleQuery, variables: { input: article_data } })
    const article = article_res.data.articles.output.articles

    const meta = await client.query({query:getMetaQuery,variables:{input:{av:"",id:0,key:'ARTICLES',name:"",pt:'WEBSITE',type:""}}})




    return {props:{article,meta:meta.data.meta.output.tags}}

}


export default TravelArticles