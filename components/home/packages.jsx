// import MultiCarousel2 from "react-multi-carousel";
import Link from "next/link";


// import Pack from './pack'
import dynamic from "next/dynamic";

const HomePackages = ({ data,holiday=false,tg=false }) => {
  const Pack = dynamic(() => import("./pack"));

  return (
    <section className={`TopRatedTours mt-16`}>
      <div className="container">
        <div className="row_">
          <div className={`box_design_common_ relative`}>
            <div
              className={`${holiday==false?'title_kiomoi':''} flex items-center justify-between mb-6`}
            >
              <div className={`2w-full`}>
                {
                  tg?
                  <h4 className={`text-xl lg:text-2xl font-bold`}>{tg}</h4>
                  :<h4 className={`text-xl lg:text-2xl font-bold`}>{holiday==false?"Top Rated Tours":"Best Selling Tour Packages"}</h4>
                }
                {/* <h4 className={`text-xl lg:text-2xl font-bold`}>{holiday==false?"Top Rated Tours":"Best Selling Tour Packages"}</h4> */}
                
                <p></p>
              </div>
              <div className={`2w-full`}>
                <Link href={"/holidays/"}>
                  <div href="/holidays/">
                    <div className="btn_view_more">View All</div>
                  </div>
                </Link>
              </div>
            </div>
            <div className="clearfix"></div>
            {/* <h1 className='text-2xl'>sadflkjasdlkfjalksdfjklasd</h1> */}
            <Pack data={data} />
          </div>
        </div>
      </div>
    </section>
  );
};

export default HomePackages;
