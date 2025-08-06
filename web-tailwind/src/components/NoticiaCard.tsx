import React from 'react';

interface Noticia {
  titol: string;
  resum: string;
  url: string;
  categories?: string[];
  data: string;
}

const NoticiaCard: React.FC<{ noticia: Noticia }> = ({ noticia }) => {
  return (
    <div className="bg-white rounded-xl p-6 shadow-md hover:shadow-lg transition">
      <h2 className="text-xl font-bold mb-2 text-blue-900 font-courier">
        {noticia.titol}
      </h2>

      <p className="text-sm text-gray-700 mb-3 font-courier">
        {noticia.resum}
      </p>

      <a
        href={noticia.url}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-block mb-3 text-sm text-blue-600 hover:underline font-courier"
      >
        Llegir més
      </a>

      {noticia.categories && noticia.categories.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {noticia.categories.map((categoria, idx) => (
            <span
              key={idx}
              className="bg-blue-100 text-blue-800 text-xs font-semibold px-3 py-1 rounded-full shadow-sm font-courier"
            >
              {categoria}
            </span>
          ))}
        </div>
      )}
    </div>
  );
};

export default NoticiaCard;
