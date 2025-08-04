function NoticiaCard({ noticia, onDelete }) {
  return (
    <div className="border p-4 rounded-lg shadow mb-4">
      <h2 className="text-xl font-semibold">{noticia.titol}</h2>
      <p className="text-sm text-gray-500 mb-2">{noticia.categoria}</p>
      <p className="mb-2">{noticia.resum}</p>
      <a href={noticia.url} target="_blank" className="text-blue-500 underline">
        Llegir més
      </a>
      <br />
      <button
        onClick={() => onDelete(noticia)}
        className="mt-2 text-sm text-red-600 hover:underline"
      >
        🗑️ Eliminar
      </button>
    </div>
  );
}

export default NoticiaCard;
