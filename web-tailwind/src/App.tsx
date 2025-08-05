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
  const [filtre, setFiltre] = useState<string>("Totes");

  useEffect(() => {
    fetch("/resums.json")
      .then((res) => res.json())
      .then(setNoticies)
      .catch((err) => console.error("Error carregant les notícies:", err));
  }, []);

  const categoriesDisponibles = Array.from(new Set(noticies.flatMap(n => n.categories)));

  const noticiesFiltrades = filtre === "Totes"
    ? noticies
    : noticies.filter(n => n.categories.includes(filtre));

  return (
    <main className="max-w-3xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Resums de notícies</h1>

      <div className="mb-6">
        <label className="block mb-2 text-sm font-medium text-gray-700">Filtra per categoria:</label>
        <select
          className="p-2 border rounded"
          value={filtre}
          onChange={(e) => setFiltre(e.target.value)}
        >
          <option value="Totes">Totes</option>
          {categoriesDisponibles.map((cat) => (
            <option key={cat} value={cat}>{cat}</option>
          ))}
        </select>
      </div>

      {noticiesFiltrades.map((n, i) => (
        <NoticiaCard key={i} noticia={n} />
      ))}
    </main>
  );
}

export default App;