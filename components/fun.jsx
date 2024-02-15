export const toTitleCase = (phrase) => {
  phrase = phrase.replace(/-/g, " ");
  return phrase
    .toLowerCase()
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
};

export const randomRating = () => {
  let min = 4;
  let max = 5;
  let rating = Math.round((Math.random() * (max - min) + min) * 10) / 10;
  let review = Math.round(Math.random() * (50 - 20) + 20);
  return {
    rating: rating,
    review: review,
  };
};

export const strToUrl = (phrase) => {
  phrase = phrase.replace(/ /g, "-").toLowerCase();
  return phrase;
};

export const createDetailUrl = ({ name, id }) => {
  // const x = "/holidays/" +
  // name.trim().replace(/\s+/g, ' ').replace(/\s+/g, "-").toLowerCase().replace(/-tour-package/g,'').replace(/-tour/g,'').replace(/&/g,'and') +
  // "-tour-package-" +
  // id + "/";
  // return x
  const y = `/holidays/${name
    .trim()
    .replace(/\s+/g, " ")
    .replace(/\s+/g, "-")
    .toLowerCase()
    .replace(/-tour-package/g, "")
    .replace(/-tour/g, "")
    .replace(/&/g, "and")}-tour-package-${id}`;

  // const y = `/holiday-${name.trim().replace(/\s+/g, ' ').replace(/\s+/g, "-").toLowerCase().replace(/-tour-package/g,'').replace(/-tour/g,'').replace(/&/g,'and')}-tour-package-${id}`
  return y;
};

export const createThemeListURL = ({ cityname }) => {
  return `/holidays/${cityname
    ?.replace(/\s+/g, " ")
    .replace(/\s+/g, "-")
    .toLowerCase()}-tour-packages`;
};

export const createCityListURL = ({ cityname, id }) => {
  return `/holidays/${cityname
    ?.replace(/\s+/g, " ")
    .replace(/\s+/g, "-")
    .toLowerCase()}-tour-packages-${id}1`;
};
export const createCountryListURL = ({ cityname, id }) => {
  // return `/holidays-international/${cityname?.replace(/\s+/g, ' ').replace(/\s+/g, "-").toLowerCase()}-tour-packages-${id}`
  return `/holidays/${cityname
    ?.replace(/\s+/g, " ")
    .replace(/\s+/g, "-")
    .toLowerCase()}-tour-packages-${id}3`;
};

export const createStateListURL = ({ statename, id }) => {
  return `/holidays/${statename
    ?.replace(/\s+/g, " ")
    .replace(/\s+/g, "-")
    .toLowerCase()}-tour-packages-${id}2`;
};

export const createThemeStateListURL = ({ statename,themeName, id }) => {
  return `/holidays/${themeName?.trim().replace(/\s+/g," ").replace(/\s+/g, "-").toLowerCase()}-tour-packages-in-${statename
    ?.replace(/\s+/g, " ")
    .replace(/\s+/g, "-")
    .toLowerCase()}-${id}2`;
};

export const createTGCityURL = ({ city, id }) => {
  // return `/travel-guide/cities/${city
  return `/places/${city
    ?.trim()
    .replace(/\s+/g, " ")
    .replace(/\s+/g, "-")
    .replace("--", "-")
    .toLowerCase()}-${id}`;
};

const replaceLast = (x, y, z) => {
  var a = x.split("");
  var length = y.length;
  if (x.lastIndexOf(y) != -1) {
    for (var i = x.lastIndexOf(y); i < x.lastIndexOf(y) + length; i++) {
      if (i == x.lastIndexOf(y)) {
        a[i] = z;
      } else {
        delete a[i];
      }
    }
  }

  return a.join("");
};

export const jpgToWebp = ({ uri }) => {
  // return uri
  try {
    return replaceLast(uri, ".jpg", ".webp");
  } catch {
    return uri;
  }

  // return uri.replace(/\.jpg\.jpg/g,'.jpg.webp').replace(/\.jpg/g,".webp").replace(/\.jpeg\.jpg/g,'.webp')
};

export const imgNameByUrl = ({ url }) => {
  return url.replace(".jpg", "").split("/").slice(-1)[0].replace(/%20/g, " ");
};

export const createTGStateURL = ({ city, id }) => {
  // return `/travel-guide/states/${city
  return `/states/${city
    ?.trim()
    .replace(/\s+/g, " ")
    .replace(/\s+/g, "-")
    .replace("--", "-")
    .toLowerCase()}-${id}`;
};
export const createTGCountryURL = ({ country, id }) => {
  // return `/travel-guide/countries/${country
  return `/countries/${country
    ?.trim()
    .replace(/\s+/g, " ")
    .replace(/\s+/g, "-")
    .replace("--", "-")
    .toLowerCase()}-${id}`;
};

export const createAttractionsURL = ({attraction, city, id }) => {
  // return `/travel-guide/countries/${country
  return `/attractions/${attraction}-in-${city}-${id}`.trim()
  .replace(/\s+/g, " ")
  .replace(/\s+/g, "-")
  .replace("--", "-")
  .toLowerCase();
};

export const createArticleURL = ({ heading, id }) => {
  return (
    "/travel-articles/" +
    heading
      .trim()
      .replace(/\s+/g, " ")
      .replace(/\s+/g, "-")
      .replace(/--/g, "-")
      .toLowerCase() +
    "-" +
    id +
    "/"
  );
  // return `/travel-guide/countries/${country?.trim().replace(/\s+/g, ' ').replace(/\s+/g, "-").replace('--', "-").toLowerCase()}-${id}`
};
