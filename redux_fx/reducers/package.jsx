import { FETCH_PACKAGES } from "../actions";

const packageReducer = (state = {}, action) => {
  switch (action.type) {
    case FETCH_PACKAGES:
      return { ...state, package: action.data };
    // case 'GET_PACKAGE':
    //     return {...state,package:action.data,loading:false}
    // case 'PACKAGE_LOADING':
    //     return {...state,loading:true}

    default:
      return state;
  }
};

export default packageReducer;
