import ReactHtmlParser from "react-html-parser";
const ParseHtml = ({text}) =>{
    return ReactHtmlParser(text)
}

export default ParseHtml