import { BsXLg } from "react-icons/bs";

const Modal = (props) => {
  return (
    <>
      <div
        // show={isshow}
        animation={false}
        className={`modal ${props.show ? "fixed" : "hidden"} ${
          props.className
        } inset-0 bg-opacity-50 overflow-y-auto h-full w-full login_credential`}
        backdrop="static"
        // aria-labelledby="contained-modal-title-vcenter"
        // centered
        // size="sm"
      >
        <div
          className={`relative top-20 mx-auto p-5 max-w-lg shadow-lg rounded-xl bg-white`}
        >
          {props?.changeForm ? (
            <span className={`float-right text-black`} aria-hidden="true">
              <BsXLg
                className={`cursor-pointer`}
                //   style={{cursor: "pointer" }}
                onClick={() => props.changeForm(false)}
              />
            </span>
          ) : (
            ""
          )}

          <div>
            <h3 className={`text-2xl text-center`}>{props?.title}</h3>
          </div>
          <div>{props.children}</div>
        </div>
      </div>
    </>
  );
};

export default Modal;
