import "react-loading-skeleton/dist/skeleton.css";
import Skeleton from "react-loading-skeleton";
import { tw } from "twind";
// export const TableLoading = () =>{
//     return(
//         <Skeleton count={5} />
//     )
// }

export const TableLoading1 = () => {
  return <div>Loading,.......</div>;
};

export const TableLoading_ = () => {
  return (
    <div>
      <div>
        <Skeleton height={5} baseColor="red" width={"30%"} />
      </div>

      <div>
        <Skeleton height={13} width={"50%"} />
      </div>
      <div style={{ marginTop: "10px" }}>
        <Skeleton height={5} width={"20%"} />
      </div>
    </div>
  );
};
export const QNALoading = () => {
  return (
    <div>
      <div
        style={{ marginTop: "30px", background: "white", paddingLeft: "66px" }}
      >
        <div style={{ width: "60%", marginBottom: "45px" }}>
          <Skeleton height={20} count={1} />
        </div>
        <div style={{ width: "80%", marginBottom: "45px" }}>
          <Skeleton height={20} count={1} />
        </div>
        <div style={{ width: "30%", marginBottom: "45px" }}>
          <Skeleton height={20} count={1} />
        </div>

        <div style={{ width: "50%", marginBottom: "45px" }}>
          <Skeleton height={20} count={1} />
        </div>
        <div style={{ width: "70%", marginBottom: "45px" }}>
          <Skeleton height={20} count={1} />
        </div>
      </div>
    </div>
  );
};

export const SimilarTourLoading = () => {
  return (
    <>
      <div className={tw`container bg-white rounded-lg`}>
        <Skeleton height={100} />
      </div>
    </>
  );
};

export const TableLoading = () => {
  return (
    <div>
      {/* <div style={{ marginTop:"13px",marginLeft:"10px",marginBottom:"20px"}}>
            <Skeleton height={50} width={100}/>
            </div> */}
      <div
        style={{
          marginTop: "30px",
          marginBottom: "0px",
          backgroundColor: "white",
          padding: "20px",
          borderRadius: "10px",
        }}
      >
        <div style={{ display: "flex", flexFlow: "row" }}>
          <div style={{ width: "30%" }}>
            <Skeleton height={150} count={1} />
          </div>
          <div style={{ width: "70%" }}>
            <div style={{ marginLeft: "20px", width: "50%" }}>
              <Skeleton height={20} count={1} />
              <div style={{ marginTop: "10px", width: "30%" }}>
                <Skeleton height={10} count={1} />
              </div>
              <div style={{ marginTop: "10px", width: "80%" }}>
                <Skeleton height={10} count={1} />
              </div>
              <div style={{ marginTop: "52px", width: "80%" }}>
                <Skeleton height={15} count={1} />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div
        style={{
          marginTop: "30px",
          marginBottom: "0px",
          backgroundColor: "white",
          padding: "20px",
          borderRadius: "10px",
        }}
      >
        <div style={{ display: "flex", flexFlow: "row" }}>
          <div style={{ width: "30%" }}>
            <Skeleton height={150} count={1} />
          </div>
          <div style={{ width: "70%" }}>
            <div style={{ marginLeft: "20px", width: "50%" }}>
              <Skeleton height={20} count={1} />
              <div style={{ marginTop: "10px", width: "30%" }}>
                <Skeleton height={10} count={1} />
              </div>
              <div style={{ marginTop: "10px", width: "80%" }}>
                <Skeleton height={10} count={1} />
              </div>
              <div style={{ marginTop: "52px", width: "80%" }}>
                <Skeleton height={15} count={1} />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* <div style={{marginTop:"30px",marginBottom:"0px"}}>
            <Skeleton height={150} count={2}/>
        </div>
        <div style={{marginTop:"10px",marginBottom:"0px"}}>
            <Skeleton height={150} count={2}/>
        </div> */}
    </div>
  );
};
