import ReactHtmlParser from "react-html-parser";
const ParseHtml = ({ text }) => {
  // return ReactHtmlParser(text);
  return <div dangerouslySetInnerHTML={{__html:text}} />
  // return <div>{text}</div>
};

export default ParseHtml;
