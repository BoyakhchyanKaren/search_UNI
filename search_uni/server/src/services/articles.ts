import axios from 'axios';
import { Articles_service_interface, ArticleType } from "../interfaces/articles_service_interface";
export class ArticlesRepository implements Articles_service_interface {

    static async getAllArticles() {
        try {
            const articles = await axios.get('http://localhost:4000/articles');
            return articles;
        } catch (e) {
            return null;
        }
    };

    static async createArticle(newArticle: ArticleType) {
        try {
            await axios.post('http://localhost:4000/articles', newArticle);
            return {
                added: true,
            }
        } catch (e) {
            return null;
        }
    };

    static async deleteArticle(id: string) {
        try {
            await axios.delete(`http://localhost:4000/articles/${id}`);
            return {
                deleted: true,
            }
        } catch (e) {
            return null;
        }
    };


    getAllArticles: () => object | object[];
    createArticle: (newArticle: ArticleType) => object;
    deleteArticle: (id: number | string) => object;

};

