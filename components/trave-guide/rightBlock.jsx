import * as Constants from "../Constants";
const rightBlock = ({ icon, heading, desc }) => {
    return (
      <div className={`flex pb-2`}>
        <div>
          <img
            src={`${Constants.assets_api}/public/icons/${icon}`}
            alt="icon"
            className={`inline h-[15.7px]`}
          />
        </div>
        <div className={`ml-4`}>
          <div className={`t_12px font-bold`}>{heading}</div>
          <div className="t_12px">{desc}</div>
        </div>
      </div>
    );
  };


export default rightBlock