import Link from "next/link";
import { tw } from "twind";
import { TiChevronRight } from "react-icons/ti";
import { useRouter } from "next/router";
const BreadCrumbs = ({ bread }) => {
  const { asPath, pathname, basePath } = useRouter();
  const router = useRouter()
  // const bread = {
  //     disabled:{
  //         "item":"Tour package"
  //     },
  //     enabled :[
  //         {
  //             item:"Kiomoi",
  //             href:"/"
  //         },
  //         {
  //             item:"Kiomoi",
  //             href:"/"
  //         },
  //         {
  //             item:"Kiomoi",
  //             href:"/"
  //         }
  //     ]
  // }
  // console.log(router)
  // console.log(headersList.get('host'))
  return (
    <>
      {/* style={{position:'sticky',top:'60px'}} */}
      <section className="container">
        <div className="row_">
          <ul
            className="breadcrumb flex items-center"
            itemScope={true}
            itemType="https://schema.org/BreadcrumbList"
          >
            {bread.enabled.map((e, index) => {
              return (
                <li
                  key={index}
                  itemProp="itemListElement"
                  className="flex items-center"
                  itemScope={true}
                  itemType="https://schema.org/ListItem"
                >
                  <>
                    <Link href={`https://www.kiomoi.com${e.href}`} itemProp="item">
                      <div className="_b_active">
                        <span itemProp="name">{e.item}</span>
                      </div>
                    </Link>
                    <meta itemProp="position" content={index + 1} />
                    <TiChevronRight className={tw`bread_icon inline`} />
                  </>
                </li>
              );
            })}
            <li
            itemProp="itemListElement"
            itemScope={true}
            itemType="https://schema.org/ListItem"
            >
              <a href={`https://www.kiomoi.com${asPath}`} itemProp="item"/>
              <span itemProp="name">
                {bread.disabled.item}
              </span>
              <span itemProp="position" content={bread?.enabled?.length+1} />
              </li>
          </ul>
        </div>
      </section>
    </>
  );
};

export default BreadCrumbs;
