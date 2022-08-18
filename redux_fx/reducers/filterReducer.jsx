import {FILTER_SEARCH} from '../actions'

const filterReducer = (state={} ,action)=>{

    switch(action.type){
        case FILTER_SEARCH:
            return {...state,search:action.data}
        // case 'GET_PACKAGE':
        //     return {...state,package:action.data,loading:false}
        // case 'PACKAGE_LOADING':
        //     return {...state,loading:true}
                
        default : return state
    }
}

export default filterReducer