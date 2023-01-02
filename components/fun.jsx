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