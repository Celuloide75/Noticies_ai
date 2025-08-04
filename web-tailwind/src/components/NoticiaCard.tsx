type Noticia = {
  titol: string;
  resum: string;
  url: string;
  categories?: string[];
};

type NoticiaProps = {
  noticia: Noticia;
  onDelete: (noticia: Noticia) => void;
};

function NoticiaCard({ noticia, onDelete }: NoticiaProps) {
  return (
    <div className="border rounded-xl p-4 shadow">
      <h2 className="text-xl font-semibold mb-2">{noticia.titol}</h2>

      {noticia.categories?.length > 0 && (
        <p className="text-sm text-gray-600 mb-2">{noticia.categories.join(', ')}</p>
      )}

      <p>{noticia.resum}</p>

      <a
        href={noticia.url}
        target="_blank"
        rel="noopener noreferrer"
        className="block mt-2 text-blue-600 underline text-sm"
      >
        Llegir notícia
      </a>

      {/* ✅ Botó sempre visible */}
      <button
        className="mt-3 text-red-500 text-sm hover:underline"
        onClick={() => onDelete(noticia)}
      >
        🗑️ Eliminar
      </button>
    </div>
  );
}

export default NoticiaCard;
