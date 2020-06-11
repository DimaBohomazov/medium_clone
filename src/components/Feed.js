import React from 'react';
import TagList from './TagList'
import {Link} from "react-router-dom";

const Feed = ({articles}) => {
  return (
    <div>
      {articles.map((article, index) => (
        <div className='article-preview' key={`art-${index}`}>
          <div className="article-meta">
            <Link
              to={`/profiles/${article.author.username}`}
            >
              <img
                src={article.author.image ? article.author.image : "https://images-na.ssl-images-amazon.com/images/I/41jrhrQiEHL._SX331_BO1,204,                203,200_.jpg" }
                alt="author"
              />
            </Link>
            <div className="info">
              <Link
                className='author'
                to={`/profiles/${article.author.username}`}
              >
                {article.author.username}
              </Link>
              <span className='date'>{article.createdAt}</span>
            </div>
          </div>
          <Link
            className='preview-link'
            to={`/articles/${article.slug}`}
          >
            <h1>{article.title}</h1>
            <p>{article.description}</p>
            <span>Read more...</span>
            <TagList
              tags={article.tagList}
            />
          </Link>
        </div>
      ))}
    </div>
  );
};

export default Feed;