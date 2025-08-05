interface Props {
  noticia: {
    titol: string;
    resum: string;
    url: string;
    categories: string[];
  };
}

const NoticiaCard = ({ noticia }: Props) => (
  <div className="bg-white border border-gray-300 rounded p-4 mb-4 shadow">
    <h2 className="text-xl font-semibold mb-2">{noticia.titol}</h2>
    <p className="mb-2">{noticia.resum}</p>
    <a
      href={noticia.url}
      target="_blank"
      rel="noopener noreferrer"
      className="text-blue-600 hover:underline"
    >
      🔗 Llegir 
    </a>
  </div>
);

export default NoticiaCard;