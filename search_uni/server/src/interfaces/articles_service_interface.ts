export type ArticleType = {
    id: any,
    title: any,
    description: any,
}

export interface Articles_service_interface {
    getAllArticles: () => object | object[];
    createArticle: (newArticle: ArticleType) => object;
    deleteArticle: (id: number | string) => object;
}