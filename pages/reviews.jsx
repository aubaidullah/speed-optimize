// const { Nav } = require("../components/Nav")
import { getreviewsQuery } from "@/components/Graphql/Queries";
import client from "@/components/Graphql/service";
// import Nav from "@/components/Nav"
// import Meta from "@/components/meta"
import { BsStarFill, BsStarHalf } from "react-icons/bs";

import dynamic from "next/dynamic";

const Nav = dynamic(() => import("@/components/Nav"));
const Meta = dynamic(() => import("@/components/meta"));

const Reviews = ({ reviews }) => {
  var options = { year: "numeric", month: "long", day: "numeric" };
  return (
    <>
      <Meta meta={{ title: "Kiomoi reviews" }} />
      <Nav />
      <div className="container">
        <div>
          <h2 className="text-2xl text-center py-10 bg-white">
            People tell about kiomoi
          </h2>
        </div>
        <div>
          {reviews.map((item, index) => {
            var tmp = [];
            for (var i = 0; i < item.ratings; i++) {
              tmp.push(i);
            }
            var indents = tmp.map(function (i) {
              return (
                <BsStarFill key={i} className={`icon_size inline text-sm`} />
              );
            });
            var tmp2 = [];
            for (var i = 0; i < 5 - item.ratings; i++) {
              tmp2.push(i);
            }
            var star = tmp2.map(function (i) {
              return (
                <BsStarHalf key={i} className={`icon_size inline text-sm`} />
              );
            });

            return (
              <>
                <div className="p-4 mt-2 rounded-lg bg-white border-b border-gray-200">
                  <div>
                    <div className="flex justify-between">
                      <div className="user_title"><h3>{item.cName}</h3></div>
                      <div>
                        {indents}
                        {star}
                      </div>
                    </div>
                    <div className="pt-2">
                      <div><h4>{item.review}</h4></div>
                      <div>
                        <div className="verified_ text-right text-sm text-gray-500 italic pt-2">
                          <span>Verfied Review</span>
                          <span> | </span>
                          <span>
                            {new Date(item.modifiedDate).toLocaleTimeString(
                              [],
                              options,
                            )}{" "}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </>
            );
          })}
        </div>
      </div>
    </>
  );
};

export async function getServerSideProps(context) {
  // console.log(context.query)
  let payload = {
    av: "",
    geoid: 0,
    home: "",
    id: "",
    pagenum: 1,
    pid: 0,
    pt: "",
    size: 50,
    type: "",
  };
  const res = await client.query({
    query: getreviewsQuery,
    variables: { input: payload },
  });
  // const leadifo = await axios.post(Constants.api+'/api/v1/lead/get-info/'+context.query.token,{"id":context.query.token})
  // console.log(leadifo.data.output)
  // console.log(res.data.reviews.output)
  return { props: { reviews: res.data.reviews.output.reviews } };
}

export default Reviews;
