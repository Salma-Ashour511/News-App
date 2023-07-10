import NewsArticleModel from "./ArticleModel"

class MenuModel {
  status: string
  totalResults: number
  articles: NewsArticleModel[]
  constructor(status: string, totalResults: number, articles: NewsArticleModel[]) {
    this.status = status
    this.totalResults = totalResults
    this.articles = articles
  }
}

export default MenuModel