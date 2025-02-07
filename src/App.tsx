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
  const [selectedCategory, setSelectedCategory] = useState<string>("general"); // Default category

  useEffect(() => {
    const fetchNews = async () => {
      const urls = [
        {
          url:`https://newsapi.org/v2/top-headlines?sources=bbc-news&apiKey=${API_KEYS.BBC_API}`,
          source: "BBC News"
        },
        {
          url: `https://newsapi.org/v2/top-headlines?category=${selectedCategory}&apiKey=${API_KEYS.NEWS_API}`,
          source: "OpenNews"
        },
        {
          url: `https://gnews.io/api/v4/top-headlines?category=${selectedCategory}&token=${API_KEYS.GNEWS_API}`,
          source: "GNEWS"
        }
      ];

      try {
        const responses = await Promise.all(urls.map(urlObj => fetch(urlObj.url)));
        const data = await Promise.all(responses.map(res => res.json()));
        console.log(data);
        const allArticles = data.flatMap((d, index) => {
          if (!d.articles && !d.results) return [];

          const articles = d.articles || d.results;

          return articles.map((article: any) => ({
            title: article.title || article.headline?.main || "No Title",
            description: article.description || article.abstract || "No Description",
            url: article.url || article.web_url,
            urlToImage: article.urlToImage,
            source: urls[index].source,
            category: selectedCategory,
            publishedAt: article.publishedAt || article.pub_date || new Date().toISOString(),
          }));
        });
        setArticles(allArticles);
        setFilteredArticles(allArticles);
        setCategories(["general", "business", "entertainment", "health", "science", "sports", "technology"]);
        setSources(Array.from(new Set(allArticles.map(a => a.source))));
      } catch (error) {
        console.error("Error fetching news:", error);
      }
    };

    fetchNews();
  }, [selectedCategory]);

  return (
    <div className="p-4 max-w-6xl mx-auto">
      <h1 className="text-2xl font-bold text-center mb-4">News Aggregator</h1>
{/* <Preferences onSave={(prefs) => console.log('User Preferences:', prefs)} /> */}
      {/* <div className="mb-4 text-center"> */}
        {/* <label htmlFor="category" className="font-bold mr-2">Select Category:</label> */}
        <select 
          id="category" 
          value={selectedCategory} 
          onChange={(e) => setSelectedCategory(e.target.value)}
          className="border p-2 rounded w-52"
        >
          {categories.map(cat => (
            <option key={cat} value={cat}>{cat.charAt(0).toUpperCase() + cat.slice(1)}</option>
          ))}
        </select>
      {/* </div> */}
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

