import React from 'react';
import NewsCard from './NewsCard';
import { Article } from '../types';
interface NewsListProps {
    articles: Article[];
  }
  const NewsList = ({ articles }: NewsListProps) => {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {articles.length > 0 ? (
        articles.map((article, index) => (
          <NewsCard key={index} article={article} />
        ))
      ) : (
        <p>No articles found.</p>
      )}
    </div>
    );
  };
  
  export default NewsList;
 