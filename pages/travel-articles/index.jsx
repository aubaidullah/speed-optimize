import { tw } from "twind"
import BreadCrumbs from "../../components/breadcrumbs"
import Nav from "../../components/Nav"
import client from "../../components/Graphql/service"
import { getarticleQuery } from "../../components/Graphql/Queries"
import ReactHtmlParser from "react-html-parser";
import Link from "next/link"

const TravelArticles = ({article}) =>{
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
        <Nav/>
        <BreadCrumbs bread={bread} />
        <div className={"container"}>
            
            <div>
                <div className={tw`mt-6`}>
                    {article.map((item,index)=>{
                        let aurl = "/travel-articles/"+item.heading.trim().replace(/\s+/g,' ').replace(/\s+/g, "-").replace(/--/g,'-').toLowerCase()+"/"+item.id+"/"
                        return <div key={index} className={tw`flex flex-wrap mb-6`}>
                            
                            <div className={tw`w-full lg:w-1/3`}>
                                <div>
                                    <img src={item.images} />
                                </div>
                                
                            </div>

                            <div className={tw`w-full pl-0 lg:w-2/3 lg:pl-4`}>
                                <div>
                                    <h2 className={tw`text-xl font-bold`}>{item.heading}</h2>
                                    {ReactHtmlParser(item.description.substring(0, 450))}
                                    <Link href={aurl}>
                                    <a href={aurl} style={{color:'#f06726'}}>
                                        Read full story
                                    </a>
                                    </Link>
                                </div>
                            </div>

                        </div>
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




    return {props:{article}}

}


export default TravelArticles