// import ReactHtmlParser from "react-html-parser";

const ArticleContent = ({ data }) => {
  return (

    <div className="article-det" itemProp="description" dangerouslySetInnerHTML={{__html:data.article.desc}} />
    // <div className="article-det" itemProp="description">{ReactHtmlParser(data.article.desc)}</div>
  );
};

export default ArticleContent;
