import Nav from "../../../components/Nav"
import client from "../../../components/Graphql/service"
import { getArticle, getarticleQuery } from "../../../components/Graphql/Queries"
import BreadCrumbs from "../../../components/breadcrumbs"
import {tw} from 'twind'
import ReactHtmlParser from "react-html-parser";
import Articles from "../../../components/home/articles"

const TravelArticle = ({data,article}) =>{
    
    const bread = {
        disabled: {
            item: `${data.article.heading}`
        },
        enabled: [
            {
                item: "Kiomoi",
                href: "/"
            },
            {
                item: "Travel Stories",
                href: "/travel-articles/"
            },
        ]
    }    
    
    
    return <>
        <Nav />
        <BreadCrumbs bread={bread} />
        <section className="container">
            <h1 className={tw`text-2xl font-bold`}>{data.article.heading}</h1>
            <div className={tw`w-full lg:w-2/3`}>
                <div className={tw`mt-6`}>
                    <div className={tw`flex flex-wrap services_listing`}>
                        {data.article.tags.split(',').map((item,index)=>{
                            return <div className="btn_view_more" style={{marginRight:'10px'}}>{item}</div>
                        })}
                    </div>
                </div>
                <div className={tw`mt-6`}>
                    <div className="article-det">
                        {ReactHtmlParser(data.article.desc)}
                    </div>
                </div>
                
            </div>
            <Articles data={article}/>
        </section>
        

    </>
}



export async function getServerSideProps(context) {
    let _id = context.query.id
    const res = await client.query({ query: getArticle, variables: { input: { id: _id } } })
    console.log(res.data.travelArticle.output)

    let article_data = {
        'av': '1.3',
        'pt': 'WEBSITE',
        'geoid': 0,
        'id': 'string',
        'pagenum': 1,
        'pid': _id,
        'size': 20,
        'type': 0,
    }

    // getQnaQuery


    const article_res = await client.query({ query: getarticleQuery, variables: { input: article_data } })
    const article = article_res.data.articles.output.articles




    return {props:{data:res.data.travelArticle.output,article}}

}

export default TravelArticle