import { useContext, createContext, useState } from "react";

const ArticlesContext = createContext();

export const useArticlesContext = () => useContext(ArticlesContext);

const ArticlesContextProvider = ({ children }) => {
    const [articles, setArticles] = useState([]);
    const [currentArticle, setCurrentArticle] = useState(null);
    const [showArticles, setShowArticles] = useState([]);

    return (
        <ArticlesContext.Provider
            value={{
                articles, setArticles, currentArticle, setCurrentArticle, showArticles, setShowArticles
            }}
        >
            {children}
        </ArticlesContext.Provider>
    )
}

export default ArticlesContextProvider;