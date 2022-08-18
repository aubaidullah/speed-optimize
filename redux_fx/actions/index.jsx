




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
export const FILTER_SEARCH = "FILTER_SEARCH"

export const getPackages = (packages) =>({
    type:FETCH_PACKAGES,
    data:packages

})
export const getFilterText = (search) =>({
    type:FILTER_SEARCH,
    data:search
})