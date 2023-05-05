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
    return `/holidays/${cityname?.replace(/\s+/g, ' ').replace(/\s+/g, "-").toLowerCase()}-tour-packages-${id}1`
}
export const createCountryListURL = ({cityname,id}) =>{
    return `/holidays-international/${cityname?.replace(/\s+/g, ' ').replace(/\s+/g, "-").toLowerCase()}-tour-packages-${id}`
}

export const createStateListURL = ({statename,id}) =>{
    return `/holidays/${statename?.replace(/\s+/g, ' ').replace(/\s+/g, "-").toLowerCase()}-tour-packages-${id}2`
}

export const createTGCityURL = ({city,id}) =>{
    return `/travel-guide/cities/${city?.trim().replace(/\s+/g, ' ').replace(/\s+/g, "-").replace('--', "-").toLowerCase()}-${id}`
}


const replaceLast=(x, y, z)=>{
    var a = x.split("");
    var length = y.length;
    if(x.lastIndexOf(y) != -1) {
        for(var i = x.lastIndexOf(y); i < x.lastIndexOf(y) + length; i++) {
            if(i == x.lastIndexOf(y)) {
                a[i] = z;
            }
            else {
                delete a[i];
            }
        }
    }

    return a.join("");
}

export const jpgToWebp = ({uri}) =>{
    // return uri
    return replaceLast(uri,'.jpg','.webp')
    // return uri.replace(/\.jpg\.jpg/g,'.jpg.webp').replace(/\.jpg/g,".webp").replace(/\.jpeg\.jpg/g,'.webp')
}

export const createTGStateURL = ({city,id}) =>{
    return `/travel-guide/states/${city?.trim().replace(/\s+/g, ' ').replace(/\s+/g, "-").replace('--', "-").toLowerCase()}-${id}`
}
export const createTGCountryURL = ({country,id}) =>{
    return `/travel-guide/countries/${country?.trim().replace(/\s+/g, ' ').replace(/\s+/g, "-").replace('--', "-").toLowerCase()}-${id}`
}