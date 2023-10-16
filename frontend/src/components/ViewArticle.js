import React, { useState } from 'react';

function ViewArticle({ article, onDelete }) {
  const username = localStorage.getItem('username');
  const isAuthor = article.author === username;




  return (
    <>
      <div className="article">
        <h3>{article.title}</h3>
        <p>{article.text}</p>
        <p>Author: {article.author}</p>
        {isAuthor && (
          <div className='buttons'>
            <button >Edit</button>
            <button >Delete</button>
          </div>
        )}
      </div>
    </>
  );
}

export default ViewArticle;
