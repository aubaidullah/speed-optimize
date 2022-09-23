import { gql } from '@apollo/client';


export const getpackage = gql`
fragment Payload on REST {
    id: Int
  }
query package($input:Payload!) {
    package(input:$input) @rest(type: "package",method:"POST", path: "/api/v1/package/{args.input.id}/") {
      output
    }
  }
`;


export const getTravelGuideDetail = gql`
fragment Payload on REST {
    id: Int
  }
query travelGuide($input:Payload!) {
    travelGuide(input:$input) @rest(type: "travelGuide",method:"POST", path: "/api/v1/travelguide/{args.input.id}/") {
      output
    }
  }
`;


export const getrelatedpackage = gql`
fragment Payload on REST {
    id: Int
  }
query package($input:Payload!) {
    package(input:$input) @rest(type: "package",method:"POST", path: "/api/v1/package/list") {
      output
    }
  }
`;


export const getTravelPackage = gql`
fragment Payload on REST {
    av: String,
    geoid:Int,
    id:String,
    pagenum:Int,
    pid:Int,
    pt:String,
    size:Int,
    type:String
  }
query package($input:Payload!) {
    package(input:$input) @rest(type: "package",method:"POST", path: "/api/v1/package/slist") {
      output
    }
  }
`;


export const getTravelHotel = gql`
fragment Payload on REST {
    av: String,
    id:String,
    name:String,
    pt:String
    type:String
  }
query hotels($input:Payload!) {
    hotels(input:$input) @rest(type: "hotels",method:"POST", path: "/api/v1/hotel/list") {
      output
    }
  }
`;


export const getStateByCityQuery = gql`
fragment Payload on REST {
    av: String,
    id: String,
    pt: String,
    text: String
  }
query state($input:Payload!) {
    state(input:$input) @rest(type: "state",method:"POST", path: "/api/v1/geo/statebycity") {
      output
    }
  }
`;


export const getallpackages = gql`
  fragment Payload on REST {
    av: String,
    pt: String,
    id: String,
    name:String,
    type: String

  }
query allpackage($input:Payload!) {
    allpackage(input:$input) @rest(type: "package",method:"POST", path: "/api/v1/package/list") {
      output
    }
  }
`;


export const getThemeQuery = gql`
  fragment Payload on REST {
    av: String,
    pt: String,
    id: String,
    name:String,
    type: String

  }
query alltheme($input:Payload!) {
    alltheme(input:$input) @rest(type: "theme",method:"POST", path: "/api/v1/package/themes") {
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
  av: String,
  pt: String,
  geoid: Int,
  id: String,
  pagenum: Int,
  pid: Int,
  size: Int,
  type: String

}
query reviews($input:Payload!) {
    reviews(input:$input) @rest(type: "reviews",method:"POST", path: "/api/v1/review/list") {
      output
    }
  }
`;


export const getarticleQuery = gql`
fragment Payload on REST {
  av: String,
  pt: String,
  geoid: Int,
  id: String,
  pagenum: Int,
  pid: Int,
  size: Int,
  type: String

}
query articles($input:Payload!) {
    articles(input:$input) @rest(type: "articles",method:"POST", path: "/api/v1/article/list") {
      output
    }
  }
`;


export const getQnaQuery = gql`
fragment Payload on REST {
  av: String,
  did: String,
  pagenum: Int,
  pt: String,
  size: Int,
  tgid: String

}
query qna($input:Payload!) {
    qna(input:$input) @rest(type: "qna",method:"POST", path: "/api/v1/qna/list") {
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
query banner($input:Payload!) {
    banner(input:$input) @rest(type: "banner",method:"POST", path: "/api/v1/home/banners") {
      output
    }
  }
`;




export const getTravelGuideHome = gql`
fragment Payload on REST {
    id: Int
  }
query travelguide($input:Payload!) {
    travelguide(input:$input) @rest(type: "travelguide",method:"POST", path: "/api/v1/travelguide/list") {
      output
    }
  }
`;


export const getHome = gql`
    fragment Payload on REST {
      id: Int
    }
  query banner($input:Payload!) {
      home(input:$input) @rest(type: "home",method:"POST", path: "/api/v1/home/content") {
        output
      }
    }  
`



export const getArticle = gql`
fragment Payload on REST {
    id: Int
  }
query travelArticle($input:Payload!) {
    travelArticle(input:$input) @rest(type: "travelArticle",method:"GET", path: "/api/v1/article/{args.input.id}/") {
      output
    }
  }
`;