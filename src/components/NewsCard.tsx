import React from 'react';
import { Article } from '../types'; // Import the Article type

interface NewsCardProps {
  article: Article;
}
const NewsCard: React.FC<NewsCardProps> = ({ article }) => {
    console.log(article);
  return (
    <div className="border p-4 rounded-lg shadow-lg mb-6 transition-transform hover:scale-105">
      <img
        src={article.urlToImage || 'default-image.jpg'} 
        alt={article.title}
        className="w-full h-48 object-cover rounded"
      />
      <h2 className="text-xl font-semibold">{article.title}</h2>
      <p className="text-sm text-gray-600">{article.description}</p>
      <a
        href={article.url}
        target="_blank"
        rel="noopener noreferrer"
        className="text-blue-500 hover:text-blue-700"
      >
        Read more
      </a>
    </div>
  );
};

export default NewsCard;

  
