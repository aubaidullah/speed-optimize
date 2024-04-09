import { gql } from "@apollo/client";

export const getpackage = gql`
  fragment Payload on REST {
    id: Int
  }
  query package($input: Payload!) {
    package(input: $input)
      @rest(
        type: "package"
        method: "POST"
        path: "/api/v1/package/{args.input.id}/"
      ) {
      output
    }
  }
`;

export const getTravelGuideDetail = gql`
  fragment Payload on REST {
    id: Int
  }
  query travelGuide($input: Payload!) {
    travelGuide(input: $input)
      @rest(
        type: "travelGuide"
        method: "POST"
        path: "/api/v1/travelguide/{args.input.id}/"
      ) {
      output
    }
  }
`;


export const getUserById = gql`
  fragment Payload on REST {
    id: String
  }
  query profile($input: Payload!) {
    profile(input: $input)
      @rest(
        type: "profile"
        method: "GET"
        path: "/api/v1/customer/get/{args.input.id}/"
      )
      {
        id,
        mobile,
        email,
        fname,
        lname,
        gender,
        maritalStatus,
        dob,
        active,
        wallet
      }
  },
`;




export const getHotelDetail = gql`
  fragment Payload on REST {
    id: Int
  }
  query hotelDetail($input: Payload!) {
    hotelDetail(input: $input)
      @rest(
        type: "hotelDetail"
        method: "POST"
        path: "/api/v1/hotel/{args.input.id}/"
      ) {
      output
    }
  }
`;

export const getrelatedpackage = gql`
  fragment Payload on REST {
    id: Int
  }
  query package($input: Payload!) {
    package(input: $input)
      @rest(type: "package", method: "POST", path: "/api/v1/package/list") {
      output
    }
  }
`;

export const getCountryQuery = gql`
  fragment Payload on REST {
    av: String
    home: String
    id: String
    pt: String
    screen: String
  }
  query country($input: Payload!) {
    country(input: $input)
      @rest(type: "country", method: "POST", path: "/api/v1/geo/countries") {
      output
    }
  }
`;

export const getWallet = gql`
  fragment Payload on REST {
    av: String
    page: Int
    id: String
    pt: String
    size: Int
    status: String
    userid: String
  }
  query wallet($input: Payload!) {
    wallet(input: $input)
      @rest(type: "wallet", method: "POST", path: "/api/v1/user/wallet") {
      output
    }
  }
`;

export const getBookingHistory = gql`
  fragment Payload on REST {
    av: String
    page: Int
    id: String
    pt: String
    size: Int
    status: String
    userid: String
  }
  query bookings($input: Payload!) {
    bookings(input: $input)
      @rest(type: "bookings", method: "POST", path: "/api/v1/user/bookings") {
      output
    }
  }
`;

export const getTravelPackage = gql`
  fragment Payload on REST {
    av: String
    geoid: Int
    id: String
    pagenum: Int
    pid: Int
    pt: String
    size: Int
    type: String
  }
  query package($input: Payload!) {
    package(input: $input)
      @rest(type: "package", method: "POST", path: "/api/v1/package/slist") {
      output
    }
  }
`;

export const getHotelList = gql`
  fragment Payload on REST {
    av: String
    id: String
    name: String
    pt: String
    type: String
  }
  query hotels($input: Payload!) {
    hotels(input: $input)
      @rest(type: "hotels", method: "POST", path: "/api/v1/hotel/list") {
      output
    }
  }
`;

export const getTravelGuideQuery = gql`
  fragment Payload on REST {
    av: String
    geoid: String
    home: String
    id: String
    pagenum: String
    pid: String
    pt: String
    size: String
    type: String
  }
  query travel($input: Payload!) {
    travel(input: $input)
      @rest(type: "travel", method: "POST", path: "/api/v1/travelguide/get") {
      output
    }
  }
`;

export const getCountryContent = gql`
  fragment Payload on REST {
    av: String
    id: String
    pt: String
  }
  query content($input: Payload!) {
    content(input: $input)
      @rest(type: "content", method: "POST", path: "/api/v1/home/content") {
      output
    }
  }
`;

export const getTravelHotel = gql`
  fragment Payload on REST {
    av: String
    id: String
    name: String
    pt: String
    type: String
  }
  query hotels($input: Payload!) {
    hotels(input: $input)
      @rest(type: "hotels", method: "POST", path: "/api/v1/hotel/list") {
      output
    }
  }
`;

export const getStateByCityQuery = gql`
  fragment Payload on REST {
    av: String
    id: String
    pt: String
    text: String
  }
  query state($input: Payload!) {
    state(input: $input)
      @rest(type: "state", method: "POST", path: "/api/v1/geo/statebycity") {
      output
    }
  }
`;

export const getallpackages = gql`
  fragment Payload on REST {
    av: String
    pt: String
    id: String
    name: String
    theme: String
    type: String
  }
  query allpackage($input: Payload!) {
    allpackage(input: $input)
      @rest(type: "package", method: "POST", path: "/api/v1/package/list") {
      output
    }
  }
`;


export const getCityWithThemePackage = gql`
  fragment Payload on REST {
    av: String
    pt: String
    id: String
    name: String
    theme: String
    type: String
  }
  query allpackage($input: Payload!) {
    allpackage(input: $input)
      @rest(type: "package", method: "POST", path: "/api/v1/package/theme/list") {
      output
    }
  }
`;


export const getThemeQuery = gql`
  fragment Payload on REST {
    av: String
    pt: String
    id: String
    name: String
    type: String
  }
  query alltheme($input: Payload!) {
    alltheme(input: $input)
      @rest(type: "theme", method: "POST", path: "/api/v1/package/themes") {
      output
    }
  }
`;

// fragment Payload on REST {
//   av: String,
//   pt: String,
//   geoid: Int,
//   id: String,
//   pagenum: Int,
//   pid: Int,
//   size: Int,
//   type: String

// }

export const getreviewsQuery = gql`
  fragment Payload on REST {
    av: String
    pt: String
    geoid: Int
    id: String
    pagenum: Int
    pid: Int
    size: Int
    type: String
  }
  query reviews($input: Payload!) {
    reviews(input: $input)
      @rest(type: "reviews", method: "POST", path: "/api/v1/review/list") {
      output
    }
  }
`;

export const getStatereArticleQuery = gql`
  fragment Payload on REST {
    av: String
    pt: String
    geoid: Int
    id: String
    pagenum: Int
    pid: Int
    size: Int
    type: String
  }
  query articles($input: Payload!) {
    articles(input: $input)
      @rest(
        type: "articles"
        method: "POST"
        path: "/api/v1/article/state/list"
      ) {
      output
    }
  }
`;

export const getarticleQuery = gql`
  fragment Payload on REST {
    av: String
    pt: String
    geoid: Int
    id: String
    pagenum: Int
    pid: Int
    size: Int
    type: String
  }
  query articles($input: Payload!) {
    articles(input: $input)
      @rest(type: "articles", method: "POST", path: "/api/v1/article/list") {
      output
    }
  }
`;

export const getQnaQuery = gql`
  fragment Payload on REST {
    av: String
    did: String
    pagenum: Int
    pt: String
    size: Int
    tgid: String
  }
  query qna($input: Payload!) {
    qna(input: $input)
      @rest(type: "qna", method: "POST", path: "/api/v1/qna/list") {
      output
    }
  }
`;

export const getCitiesQuery = gql`
  fragment Payload on REST {
    av: String
    id: String
    pt: String
    text: String
  }
  query cities($input: Payload!) {
    cities(input: $input)
      @rest(type: "cities", method: "POST", path: "/api/v1/geo/cities") {
      output
    }
  }
`;

export const getMetaQuery = gql`
  fragment Payload on REST {
    av: String
    id: Int
    key: String
    name: String
    pt: String
    type: String
  }
  query meta($input: Payload!) {
    meta(input: $input)
      @rest(type: "meta", method: "POST", path: "/api/v1/common/tag") {
      output
    }
  }
`;


export const getMetaQueryUniversal = gql`
  query meta($input: Payload!) {
    meta(input: $input)
      @rest(type: "meta", method: "POST", path: "/api/v1/common/tags") {
      output
    }
  }
`;

// export const getallpackages = gql`
// fragment Payload on REST {
//     id: Int
//   }
// query allpackage($input:Payload!) {
//     allpackage(input:$input) @rest(type: "package",method:"POST", path: "/api/v1/package/list") {
//       output
//     }
//   }
// `;

export const getbanner = gql`
  fragment Payload on REST {
    id: Int
  }
  query banner($input: Payload!) {
    banner(input: $input)
      @rest(type: "banner", method: "POST", path: "/api/v1/home/banners") {
      output
    }
  }
`;

export const getTravelGuideHome = gql`
  fragment Payload on REST {
    id: Int
  }
  query travelguide($input: Payload!) {
    travelguide(input: $input)
      @rest(
        type: "travelguide"
        method: "POST"
        path: "/api/v1/travelguide/list"
      ) {
      output
    }
  }
`;

export const getHome = gql`
  fragment Payload on REST {
    id: Int
  }
  query banner($input: Payload!) {
    home(input: $input)
      @rest(type: "home", method: "POST", path: "/api/v1/home/content") {
      output
    }
  }
`;

export const getArticle = gql`
  fragment Payload on REST {
    id: Int
  }
  query travelArticle($input: Payload!) {
    travelArticle(input: $input)
      @rest(
        type: "travelArticle"
        method: "GET"
        path: "/api/v1/article/{args.input.id}/"
      ) {
      output
    }
  }
`;
