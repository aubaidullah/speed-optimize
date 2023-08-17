import ReactHtmlParser from "react-html-parser";

const ArticleContent = ({ data }) => {
  return (
    <div className="article-det">{ReactHtmlParser(data.article.desc)}</div>
  );
};

export default ArticleContent;
