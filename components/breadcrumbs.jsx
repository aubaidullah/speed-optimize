import Link from "next/link";
import { tw } from "twind";
import { TiChevronRight } from "react-icons/ti";
const BreadCrumbs = ({ bread }) => {
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
                        <span></span>
                        <span itemProp="name">{e.item}</span>
                        <meta itemProp="position" content={index + 1} />
                      </div>
                    </Link>
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
