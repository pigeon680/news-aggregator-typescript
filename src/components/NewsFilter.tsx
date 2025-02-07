import { useState, useEffect } from "react";
import { Article } from "../types";

interface NewsFilterProps {
  articles: Article[];
  setFilteredArticles: (articles: Article[]) => void;
  categories: string[];
  sources: string[];
}

const NewsFilter = ({ articles, setFilteredArticles, categories, sources }: NewsFilterProps) => {
  const [selectedSource, setSelectedSource] = useState<string>("all");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [searchKeyword, setSearchKeyword] = useState<string>("");
  const [selectedDate, setSelectedDate] = useState<string>("");

  useEffect(() => {
    let filtered = articles;

    if (selectedSource !== "all") {
      filtered = filtered.filter(article => article.source === selectedSource);
    }

    if (selectedCategory !== "all") {
      filtered = filtered.filter(article => article.category === selectedCategory);
    }

    if (searchKeyword.trim() !== "") {
      filtered = filtered.filter(article =>
        article.title.toLowerCase().includes(searchKeyword.toLowerCase())
      );
    }

    if (selectedDate !== "") {
      filtered = filtered.filter(article =>
        article.publishedAt.startsWith(selectedDate)
      );
    }

    setFilteredArticles(filtered);
  }, [selectedSource, selectedCategory, searchKeyword, selectedDate]);
  console.log(selectedSource);
  return (
    <div className="flex flex-col md:flex-row gap-4 mb-6 items-center" style={{paddingTop: '1rem'}}>
      {/* Filter by Source */}
      <select value={selectedSource} onChange={(e) => { setSelectedSource(e.target.value); }} className="border p-2 rounded w-52">
        <option value="all">All Sources</option>
        {sources.map((source) => (
          <option key={source} value={source}>
            {source}
          </option>
        ))}
      </select>

      {/* Filter by Category */}
      {/* <select value={selectedCategory} onChange={(e) => { setSelectedCategory(e.target.value); }} className="border p-2 rounded w-52">
        <option value="all">All Categories</option>
        {categories.map((category) => (
          <option key={category} value={category}>
            {category}
          </option>
        ))}
      </select> */}
      
      {/* Search by Keyword */}
      <input
        type="text"
        placeholder="Search..."
        value={searchKeyword}
        onChange={(e) => { setSearchKeyword(e.target.value); }}
        className="border p-2 rounded w-52"/>

      {/* Filter by Date */}
      <input
        type="date"
        value={selectedDate}
        onChange={(e) => { setSelectedDate(e.target.value); }}
        className="border p-2 rounded w-52"/>
    </div>
  );
};

export default NewsFilter;
