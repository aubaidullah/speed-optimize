export const toTitleCase = (phrase) => {
    phrase = phrase.replace(/-/g," ")
    return phrase
    .toLowerCase()
    .split(' ')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
};

export const strToUrl = (phrase) =>{
    phrase = phrase.replace(/ /g,"-").toLowerCase()
    return phrase
}


export const createDetailUrl = ({name,id})=>{
    // const x = "/holidays/" +
    // name.trim().replace(/\s+/g, ' ').replace(/\s+/g, "-").toLowerCase().replace(/-tour-package/g,'').replace(/-tour/g,'').replace(/&/g,'and') +
    // "-tour-package-" +
    // id + "/";
    // return x

    const y = `/holiday-${name.trim().replace(/\s+/g, ' ').replace(/\s+/g, "-").toLowerCase().replace(/-tour-package/g,'').replace(/-tour/g,'').replace(/&/g,'and')}-tour-package-${id}`
    return y
    
}

export const createCityListURL = ({cityname,id}) =>{
    return `/holidays/${cityname.replace(/\s+/g, ' ').replace(/\s+/g, "-").toLowerCase()}-tour-packages-${id}1`
}

export const createStateListURL = ({statename,id}) =>{
    return `/holidays/${statename.replace(/\s+/g, ' ').replace(/\s+/g, "-").toLowerCase()}-tour-packages-${id}2`
}