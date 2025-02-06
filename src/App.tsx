import { useEffect, useState } from "react";
import NewsFilter from "./components/NewsFilter";
import NewsList from "./components/NewsList";
import Preferences from './components/Preferences';
import { API_KEYS } from "./config";
import { Article } from './types';

const App = () => {
  const [articles, setArticles] = useState<Article[]>([]);
  const [filteredArticles, setFilteredArticles] = useState<Article[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const [sources, setSources] = useState<string[]>([]);

  useEffect(() => {
    const fetchNews = async () => {
      const urls = [
        // `https://newsapi.org/v2/top-headlines?apiKey=${API_KEYS.NEWS_API}`,
        // `https://gnews.io/api/v4/top-headlines?token=${API_KEYS.GNEWS_API}`
        `https://newsapi.org/v2/top-headlines?sources=bbc-news&apiKey=${API_KEYS.NEWS_API}`,
        `https://newsapi.org/v2/everything?q=technology&from=2025-01-06&sortBy=publishedAt&apiKey=${API_KEYS.NEWS_API}`,
        // `https://gnews.io/api/v4/top-headlines?category=technology&lang=en&country=us&token=${API_KEYS.GNEWS_API}`
        // `https://opennewsapi.com/v1/articles?apiKey=${API_KEYS.OPENNEWS_API}`,
        // `https://bbc-news-api.com/v1/articles?apiKey=${API_KEYS.BBC_API}`
      ];

      try {
        const responses = await Promise.all(urls.map(url => fetch(url)));
        const data = await Promise.all(responses.map(res => res.json()));
        const allArticles = data.flatMap((d, index) =>
          d.articles.map((article: any) => ({
            title: article.title,
            description: article.description,
            url: article.url,
            urlToImage: article.urlToImage,
            source: index === 0 ? "NewsAPI" : index === 1 ? "OpenNews" : "BBC News",
            category: article.category || "General",
            publishedAt: article.publishedAt || new Date().toISOString(),
          }))
        );
        setArticles(allArticles);
        setFilteredArticles(allArticles);
        setCategories(Array.from(new Set(allArticles.map(a => a.category))));
        setSources(Array.from(new Set(allArticles.map(a => a.source))));
      } catch (error) {
        console.error("Error fetching news:", error);
      }
    };

    fetchNews();
  }, []);

  return (
    <div className="p-4 max-w-6xl mx-auto">
      <h1 className="text-2xl font-bold text-center mb-4">News Aggregator</h1>
{/* <Preferences onSave={(prefs) => console.log('User Preferences:', prefs)} /> */}
      <NewsFilter 
        articles={articles} 
        setFilteredArticles={setFilteredArticles} 
        categories={categories} 
        sources={sources} 
      />
      <NewsList articles={filteredArticles} />
    </div>
  );
};

export default App;

