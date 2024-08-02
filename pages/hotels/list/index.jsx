import client from "../../../components/Graphql/service";
import { getHotelList, getMetaQuery, getMetaQueryUniversal } from "../../../components/Graphql/Queries";

import { useRouter } from "next/router";
import { toTitleCase } from "../../../components/fun";
import dynamic from "next/dynamic";
import Meta from "@/components/meta";

const SearchHotel = ({ hotels, info, meta }) => {
  const BreadCrumbs = dynamic(() => import("@/components/breadcrumbs"));
  const Nav = dynamic(() => import("@/components/HomeNav"));
  const SearchBar = dynamic(() => import("@/components/hotel/searchBar"));
  const HotelList = dynamic(() => import("@/components/hotel/hotel-list"));

  const router = useRouter();
  console.log(router.query.city);
  const bread = {
    disabled: {
      item: `${router.query.city}`,
    },
    enabled: [
      {
        item: "Home",
        href: "/",
      },
      {
        item: "Hotels",
        href: "/hotels",
      },
    ],
  };
  const bimg =
    "https://testkiomoi.vercel.app/_next/image?url=https%3A%2F%2Fres.cloudinary.com%2Fkmadmin%2Fimage%2Fupload%2Fv1552993397%2Fkiomoi%2FPelling%2FPelling-2.jpg&w=1920&q=75";
  return (
    <>
      <Meta meta={meta} />
      <Nav />
      <SearchBar img={info ? info.i : bimg} />

      <BreadCrumbs bread={bread} />
      <section className="container">
        <div className={`mt-4`}>
          <h2 className={`_titles_ mb-4`}>
            Results in{" "}
            <span className={`primary-color`}>
              {toTitleCase(router.query.city)}
            </span>
          </h2>
          <HotelList hotels={hotels} />
        </div>
      </section>
    </>
  );
};

export async function getServerSideProps(context) {
  let _id = context.query.id;
  let city = context.query.city;

  console.log(_id);
  let payloads = {
    av: "1.3",
    id: _id,
    name: city,
    pt: "Website",
    type: "City",
  };
  const res = await client.query({
    query: getHotelList,
    variables: { input: payloads },
  });

  // const meta = await client.query({query:getMetaQuery,variables:{input:{av:"",id:_id,key:'HOTEL',name:"",pt:'WEBSITE',type:"HOTEL"}}})
  // let {name:hotelname,price,cityname} = meta.data.meta.output.hotel

  // // let {finalprice,images} = meta.data.meta.output.package
  // price = `₹${price} `

  // const metas ={
  //     title:meta.data.meta.output.tags.title.replace(/<HOTEL>/g,hotelname).replace(/<CITY>/g,cityname).replace(/<PRICE>/g,price),
  //     longDesc:meta.data.meta.output.tags.longDesc.replace(/<HOTEL>/g,hotelname).replace(/<CITY>/g,cityname),
  //     keywords:meta.data.meta.output.tags.keywords.replace(/<HOTEL>/g,hotelname).replace(/<CITY>/g,cityname)
  // }

  const meta = await client.query({
    query: getMetaQueryUniversal,
    variables: { input: {},},
  });
  // let { name: hotelname, price, cityname } = meta.data.meta.output.hotel;
  const n_meta = meta.data.meta.output.filter((item)=>item.name=="CITY_HOTELS")[0]

  // price = `₹${price} `;

    const metas = {
      title:
          n_meta.title
          .replace(/<CITY>/g, city.replace(/-/g, " ")),
      longDesc:
        n_meta.longDesc.replace(
          /<CITY>/g,
          city.replace(/-/g, " "),
        ),
      keywords:
        n_meta.keywords.replace(
          /<CITY>/g,
          city.replace(/-/g, " "),
        ),
      image: n_meta.imageurl,
    };


  const hotels = res.data.hotels.output.hotels;
  const info = res.data.hotels.output.images;
  return { props: { hotels: hotels, info: info, meta: metas } };
}

export default SearchHotel;
