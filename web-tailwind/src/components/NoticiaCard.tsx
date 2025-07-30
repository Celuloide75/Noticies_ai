interface Noticia {
  url: string;
  resum: string;
  categories: string[];
}

export default function NoticiaCard({ noticia }: { noticia: Noticia }) {
  return (
    <div className="bg-white p-4 rounded-xl shadow mb-4">
      <a
        href={noticia.url}
        target="_blank"
        rel="noopener noreferrer"
        className="text-blue-800 underline font-semibold text-lg"
      >
        Llegir notícia
      </a>
      <p className="my-2">{noticia.resum}</p>
      <div className="flex gap-2 flex-wrap">
        {noticia.categories.map((cat) => (
          <span
            key={cat}
            className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full"
          >
            {cat}
          </span>
        ))}
      </div>
    </div>
  );
}