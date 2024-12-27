import React from 'react';

interface ArticleButtonProps {
  article: 'der' | 'die' | 'das';
  onClick: (article: 'der' | 'die' | 'das') => void;
}

export const ArticleButton: React.FC<ArticleButtonProps> = ({ article, onClick }) => (
  <button
    onClick={() => onClick(article)}
    className="bg-white border-2 border-primary rounded-lg py-4 px-6 text-lg font-semibold hover:bg-primary hover:text-white transition-colors"
  >
    {article}
  </button>
);