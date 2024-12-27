import React, { useState, useMemo } from 'react';
import { Grid, List, Search, SlidersHorizontal } from 'lucide-react';
import { useNouns } from '../hooks/useNouns';
import type { Database } from '../lib/database.types';

type Noun = Database['public']['Tables']['nouns']['Row'];
type ViewMode = 'list' | 'grid';
type SortField = 'word' | 'article' | 'translation';
type SortOrder = 'asc' | 'desc';

const NounsRegister: React.FC = () => {
  const { nouns, loading, error } = useNouns();
  const [viewMode, setViewMode] = useState<ViewMode>('list');
  const [searchTerm, setSearchTerm] = useState('');
  const [articleFilter, setArticleFilter] = useState<'der' | 'die' | 'das' | 'all'>('all');
  const [sortField, setSortField] = useState<SortField>('word');
  const [sortOrder, setSortOrder] = useState<SortOrder>('asc');

  const filteredAndSortedNouns = useMemo(() => {
    return nouns
      .filter(noun => {
        const matchesSearch = searchTerm === '' || 
          noun.word.toLowerCase().includes(searchTerm.toLowerCase()) ||
          noun.translation.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesArticle = articleFilter === 'all' || noun.article === articleFilter;
        return matchesSearch && matchesArticle;
      })
      .sort((a, b) => {
        const compareValue = sortOrder === 'asc' ? 1 : -1;
        return a[sortField] > b[sortField] ? compareValue : -compareValue;
      });
  }, [nouns, searchTerm, articleFilter, sortField, sortOrder]);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-blue-500 border-t-transparent"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-64 text-red-500">
        <span>{error}</span>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
        <h2 className="text-xl font-semibold">Nouns Repository</h2>
        <div className="flex items-center space-x-4">
          <button
            onClick={() => setViewMode('list')}
            className={`p-2 rounded-md ${viewMode === 'list' ? 'bg-blue-100 text-blue-600' : 'text-gray-600'}`}
          >
            <List className="h-5 w-5" />
          </button>
          <button
            onClick={() => setViewMode('grid')}
            className={`p-2 rounded-md ${viewMode === 'grid' ? 'bg-blue-100 text-blue-600' : 'text-gray-600'}`}
          >
            <Grid className="h-5 w-5" />
          </button>
        </div>
      </div>

      <div className="mb-6 space-y-4">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search nouns..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            />
          </div>
          <div className="flex items-center space-x-4">
            <select
              value={articleFilter}
              onChange={(e) => setArticleFilter(e.target.value as any)}
              className="rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            >
              <option value="all">All Articles</option>
              <option value="der">der</option>
              <option value="die">die</option>
              <option value="das">das</option>
            </select>
            <div className="flex items-center space-x-2">
              <SlidersHorizontal className="h-5 w-5 text-gray-400" />
              <select
                value={`${sortField}-${sortOrder}`}
                onChange={(e) => {
                  const [field, order] = e.target.value.split('-');
                  setSortField(field as SortField);
                  setSortOrder(order as SortOrder);
                }}
                className="rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              >
                <option value="word-asc">Word (A-Z)</option>
                <option value="word-desc">Word (Z-A)</option>
                <option value="article-asc">Article (A-Z)</option>
                <option value="article-desc">Article (Z-A)</option>
                <option value="translation-asc">Translation (A-Z)</option>
                <option value="translation-desc">Translation (Z-A)</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      {filteredAndSortedNouns.length === 0 ? (
        <div className="text-center text-gray-500 py-8">
          <p className="text-lg mb-2">No nouns found</p>
          <p>Adjust your search criteria</p>
        </div>
      ) : viewMode === 'list' ? (
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead>
              <tr>
                <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Article
                </th>
                <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Word
                </th>
                <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Translation
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredAndSortedNouns.map((noun) => (
                <tr key={noun.id}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {noun.article}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {noun.word}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {noun.translation}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredAndSortedNouns.map((noun) => (
            <div key={noun.id} className="border rounded-lg p-4 hover:shadow-md transition-shadow">
              <div className="flex justify-between items-start mb-4">
                <span className="text-lg font-medium">{noun.word}</span>
                <span className="text-sm font-medium text-blue-500">{noun.article}</span>
              </div>
              <p className="text-gray-600">{noun.translation}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default NounsRegister;