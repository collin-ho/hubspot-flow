import { useState, useMemo } from 'react';
import { acronyms, categoryLabels } from '../data/acronyms';
import type { Acronym } from '../types';

interface GlossaryProps {
  isOpen: boolean;
  onToggle: () => void;
}

export function Glossary({ isOpen, onToggle }: GlossaryProps) {
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<Acronym['category'] | 'all'>('all');

  const filteredAcronyms = useMemo(() => {
    return acronyms.filter(a => {
      const matchesSearch = search === '' ||
        a.term.toLowerCase().includes(search.toLowerCase()) ||
        a.definition.toLowerCase().includes(search.toLowerCase());
      const matchesCategory = selectedCategory === 'all' || a.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });
  }, [search, selectedCategory]);

  const groupedAcronyms = useMemo(() => {
    const groups: Record<string, Acronym[]> = {};
    for (const acronym of filteredAcronyms) {
      const category = acronym.category;
      if (!groups[category]) {
        groups[category] = [];
      }
      groups[category].push(acronym);
    }
    return groups;
  }, [filteredAcronyms]);

  const categories = Object.keys(categoryLabels) as Acronym['category'][];

  return (
    <div
      className={`
        fixed left-0 top-0 h-full bg-white shadow-xl border-r border-gray-200
        transition-transform duration-300 z-50
        ${isOpen ? 'translate-x-0' : '-translate-x-full'}
      `}
      style={{ width: '320px' }}
    >
      <div className="flex flex-col h-full">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900">Glossary</h2>
          <button
            onClick={onToggle}
            className="p-1 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Search */}
        <div className="p-4 border-b border-gray-200">
          <input
            type="text"
            placeholder="Search terms..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap gap-1 p-4 border-b border-gray-200">
          <button
            onClick={() => setSelectedCategory('all')}
            className={`px-2 py-1 text-xs rounded-full transition-colors ${
              selectedCategory === 'all'
                ? 'bg-blue-500 text-white'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            All
          </button>
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-2 py-1 text-xs rounded-full transition-colors ${
                selectedCategory === cat
                  ? 'bg-blue-500 text-white'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              {categoryLabels[cat]}
            </button>
          ))}
        </div>

        {/* Acronym List */}
        <div className="flex-1 overflow-y-auto scrollbar-thin p-4">
          {Object.entries(groupedAcronyms).map(([category, items]) => {
            // Check if this category has sub-groups
            const hasGroups = items.some(a => a.group);

            if (hasGroups) {
              // Group items by their group field
              const subGroups: Record<string, Acronym[]> = {};
              for (const item of items) {
                const groupName = item.group || 'Other';
                if (!subGroups[groupName]) {
                  subGroups[groupName] = [];
                }
                subGroups[groupName].push(item);
              }

              // Define group order for result codes
              const groupOrder = ['Cancelled', 'No Sit', 'Sit', 'No Sale', 'Sale', 'Other'];
              const sortedGroups = Object.keys(subGroups).sort(
                (a, b) => groupOrder.indexOf(a) - groupOrder.indexOf(b)
              );

              return (
                <div key={category} className="mb-6">
                  <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">
                    {categoryLabels[category as Acronym['category']]}
                  </h3>
                  {sortedGroups.map(groupName => (
                    <div key={groupName} className="mb-4">
                      <h4 className="text-xs font-medium text-blue-600 mb-2 pl-1">
                        {groupName}
                      </h4>
                      <div className="space-y-2">
                        {subGroups[groupName].map(acronym => (
                          <div
                            key={acronym.term}
                            className="p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors ml-2"
                          >
                            <div className="font-medium text-gray-900">{acronym.term}</div>
                            <div className="text-sm text-gray-600 mt-1">{acronym.definition}</div>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              );
            }

            // No sub-groups, render flat list
            return (
              <div key={category} className="mb-6">
                <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">
                  {categoryLabels[category as Acronym['category']]}
                </h3>
                <div className="space-y-2">
                  {items.map(acronym => (
                    <div
                      key={acronym.term}
                      className="p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                    >
                      <div className="font-medium text-gray-900">{acronym.term}</div>
                      <div className="text-sm text-gray-600 mt-1">{acronym.definition}</div>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
          {filteredAcronyms.length === 0 && (
            <div className="text-center text-gray-500 py-8">
              No matching terms found
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export function GlossaryToggle({ onClick }: { onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className="fixed left-4 top-4 z-40 flex items-center gap-2 px-3 py-2 bg-white border border-gray-200 rounded-lg shadow-sm hover:bg-gray-50 transition-colors"
    >
      <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
      </svg>
      <span className="text-sm font-medium text-gray-700">Glossary</span>
    </button>
  );
}
