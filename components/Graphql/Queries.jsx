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


export const getallpackages = gql`
fragment Payload on REST {
    id: Int
  }
query allpackage($input:Payload!) {
    allpackage(input:$input) @rest(type: "package",method:"POST", path: "/api/v1/package/list") {
      output
    }
  }
`;


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