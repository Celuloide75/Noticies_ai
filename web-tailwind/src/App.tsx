import React, { useState } from 'react';
import NoticiaCard from './components/NoticiaCard';
import resums from '../public/resums.json';

function App() {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  // Obtenir categories úniques de totes les notícies
  const categoriesUnicas = Array.from(
    new Set(resums.flatMap((n) => n.categories || []))
  );

  // Filtrar les notícies segons la categoria seleccionada
  const noticiesFiltrades = selectedCategory
    ? resums.filter((n) => n.categories?.includes(selectedCategory))
    : resums;

  return (
    <div className="p-4 max-w-4xl mx-auto">
      {/* MENÚ DE CATEGORIES */}
      <div className="flex overflow-x-auto gap-2 pb-4 mb-4 border-b border-gray-200">
        <button
          className={`px-4 py-2 rounded-full border text-sm ${
            selectedCategory === null ? 'bg-black text-white' : 'bg-white text-black'
          }`}
          onClick={() => setSelectedCategory(null)}
        >
          Totes
        </button>
        {categoriesUnicas.map((cat) => (
          <button
            key={cat}
            className={`px-4 py-2 rounded-full border text-sm whitespace-nowrap ${
              selectedCategory === cat ? 'bg-black text-white' : 'bg-white text-black'
            }`}
            onClick={() => setSelectedCategory(cat)}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* LLISTAT DE NOTÍCIES */}
      <div className="grid gap-6">
        {noticiesFiltrades.map((noticia, index) => (
          <NoticiaCard key={index} noticia={noticia} />
        ))}
      </div>
    </div>
  );
}

export default App;
