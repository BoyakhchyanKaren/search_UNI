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

    static async getDescriptions() {
        try {
            const descriptions = await axios.get('http://localhost:4000/descriptions');
            return descriptions;
        } catch (e) {
            return null;
        }
    };

    static async addDescriptions(aaa: string[]) {
        try {
            await axios.post('http://localhost:4000/descriptions', [aaa]);
            return {
                added: true,
            }
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

    static async editArticle(id: string, data: any) {
        try {
            await axios.put(`http://localhost:4000/articles/${id}`, data);
            return {
                updated: true,
            }
        } catch (e) {
            return null;
        }
    };


    getAllArticles: () => object | object[];
    createArticle: (newArticle: ArticleType) => object;
    deleteArticle: (id: number | string) => object;

};

