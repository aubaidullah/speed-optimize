import Link from "next/link";

import ParseHtml from "../parseToHtml";

const S_Article = ({ item, aurl, index }) => {
  return (
    <div key={index} className={`flex flex-wrap mb-6`}>
      <div className={`w-full lg:w-1/3`}>
        <div>
          <img src={item.images} alt={item.heading} />
        </div>
      </div>

      <div className={`w-full pl-0 lg:w-2/3 lg:pl-4`}>
        <div>
          <h2 className={`text-xl font-bold`}>{item.heading}</h2>
          
          {ParseHtml({text:item.description.substring(0, 450)})}

          <Link href={aurl}>
            <div href={aurl} className="text-[#f06726]">
              Read full story
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default S_Article;
