import { useEffect, useState } from "react";
import NoticiaCard from "./components/NoticiaCard";

interface Noticia {
  titol: string;
  url: string;
  resum: string;
  categories: string[];
}

function App() {
  const [noticies, setNoticies] = useState<Noticia[]>([]);
  const [eliminades, setEliminades] = useState<string[]>([]);

  useEffect(() => {
    fetch("/resums.json")
      .then((res) => res.json())
      .then(setNoticies)
      .catch((err) => console.error("Error carregant les notícies:", err));
  }, []);

  const categoriesDisponibles = Array.from(new Set(noticies.flatMap(n => n.categories)));

  const filtraNoEliminades = (noticies: Noticia[]) =>
    noticies.filter((n) => !eliminades.includes(n.url));

  const handleElimina = (url: string) => {
    setEliminades([...eliminades, url]);
  };

  return (
    <main className="max-w-5xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Resums de notícies</h1>

      <nav className="flex flex-wrap gap-2 mb-6">
        {categoriesDisponibles.map((cat) => (
          <a
            key={cat}
            href={`#cat-${cat}`}
            className="bg-blue-100 text-blue-800 px-3 py-1 rounded hover:bg-blue-200"
          >
            {cat}
          </a>
        ))}
      </nav>

      {categoriesDisponibles.map((cat) => (
        <section key={cat} id={`cat-${cat}`} className="mb-10">
          <h2 className="text-2xl font-semibold mb-4">📂 {cat}</h2>
          {filtraNoEliminades(noticies.filter(n => n.categories.includes(cat))).length > 0 ? (
            filtraNoEliminades(noticies.filter(n => n.categories.includes(cat))).map((n, i) => (
              <NoticiaCard key={i} noticia={n} onElimina={handleElimina} />
            ))
          ) : (
            <p className="text-gray-500">No hi ha notícies disponibles en aquesta categoria.</p>
          )}
        </section>
      ))}
    </main>
  );
}

export default App;
