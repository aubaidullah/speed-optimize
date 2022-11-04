




export const fetchPackages = (packages) =>{
    return dispatch =>{
        dispatch(getPackages(packages))
        // return packages
    }
}


export const setSearchFilter = (search) =>{
    return dispatch =>{
        dispatch(getFilterText(search))
    }
}



export const FETCH_PACKAGES = "FETCH_PACKAGES"
export const FILTER_THEME = "FILTER_THEME"
export const FILTER_PLACE = "FILTER_PLACE"
export const FILTER_DURATION = "FILTER_DURATION"
export const FILTER_PRICE = "FILTER_PRICE"
export const FILTER_SEARCH = "FILTER_SEARCH"

export const FILTER_CLEAR = "FILTER_CLEAR"


export const clear_filter = () =>({
    type:FILTER_CLEAR
})

export const theme_filter = (themes) =>({
    type:FILTER_THEME,
    data:themes
})

export const places_filter = (places) =>({
    type:FILTER_PLACE,
    data:places
})

export const duration_filter = (f,l) =>({
    type:FILTER_DURATION,
    data:[f,l]
})

export const price_filter = (min,max) =>({
    type:FILTER_PRICE,
    data:[min,max]
})



export const getPackages = (packages) =>({
    type:FETCH_PACKAGES,
    data:packages

})
export const getFilterText = (search) =>({
    type:FILTER_SEARCH,
    data:search
})