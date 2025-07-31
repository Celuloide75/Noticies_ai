interface Props {
  noticia: {
    titol: string;
    resum: string;
    url: string;
    categories: string[];
  };
  onElimina?: (url: string) => void;
}

const NoticiaCard = ({ noticia, onElimina }: Props) => (
  <div className="bg-white border border-gray-300 rounded p-4 mb-4 shadow relative">
    <h2 className="text-xl font-semibold mb-2">{noticia.titol}</h2>
    <p className="mb-2">{noticia.resum}</p>
    <a
      href={noticia.url}
      target="_blank"
      rel="noopener noreferrer"
      className="text-blue-600 hover:underline"
    >
      🔗 Llegir notícia
    </a>
    {onElimina && (
      <button
        onClick={() => onElimina(noticia.url)}
        className="absolute top-2 right-2 text-red-600 hover:text-red-800"
      >
        ✖
      </button>
    )}
  </div>
);

export default NoticiaCard;