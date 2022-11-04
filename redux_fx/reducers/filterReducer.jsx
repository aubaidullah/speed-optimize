import {FILTER_PLACE, FILTER_SEARCH, FILTER_THEME,FILTER_DURATION, FILTER_PRICE, FILTER_CLEAR,SORTING} from '../actions'



const filterReducer = (state={places:[],themes:[],minduration:1,maxduration:100,min:3000,max:50000,price:0,duration:0},action)=>{

    switch(action.type){
        case FILTER_SEARCH:
            return {...state,search:action.data}

        case FILTER_PLACE:
            // console.log(action.data)

            if (state.places.includes(action.data) == true){
                state.places = state.places.filter(item => item !== action.data)
            }
            else{
                console.log(action.data)
                state.places.push(action.data)
            }
            return {...state}

        case FILTER_CLEAR:
            state={places:[],themes:[],minduration:1,maxduration:100,min:3000,max:50000}
            return {...state}


        case FILTER_PRICE:
            state.min = action.data[0]
            state.max = action.data[1]
            return {...state}



        case FILTER_DURATION:
            console.log(action.data)

            // if (state.maxduration == action.data[1]){
            //     state.minduration = null
            //     state.maxduration = null
            // }
            // else if(state.minduration >= action.data[0]){
            //     state.minduration = action.data[0]
            //     console.log("nothing")
            // }
            // else{
            //     state.minduration = action.data[0]
            //     state.maxduration = action.data[1]
            // }
            state.minduration = action.data[0]
            state.maxduration = action.data[1]            
            return {...state}


        case FILTER_THEME:

            if (state.themes.includes(action.data) == true){
                state.themes = state.themes.filter(item => item !== action.data)
            }
            else{
                console.log(action.data)
                state.themes.push(action.data)
            }
            return {...state}                     


        case SORTING:
            // if(action.data.key =='duration'){
                state.duration = action.value
            // }
            return {...state}
                


        default : return state
    }
}

export default filterReducer