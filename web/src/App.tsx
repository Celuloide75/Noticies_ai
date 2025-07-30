import { useEffect, useState } from "react";
import NoticiaCard from "./components/NoticiaCard";

interface Noticia {
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

  const categoriesDisponibles = Array.from(
    new Set(noticies.flatMap((n) => n.categories))
  );

  const noticiesFiltrades =
    filtre === "Totes"
      ? noticies
      : noticies.filter((n) => n.categories.includes(filtre));

  return (
    <main style={{ maxWidth: "700px", margin: "auto", padding: "1rem" }}>
      <h1 style={{ fontSize: "24px", fontWeight: "bold", marginBottom: "1rem" }}>
        Resums de notícies
      </h1>

      <label style={{ display: "block", marginBottom: "0.5rem" }}>
        Filtra per categoria:
      </label>
      <select
        value={filtre}
        onChange={(e) => setFiltre(e.target.value)}
        style={{ padding: "0.5rem", marginBottom: "1.5rem" }}
      >
        <option value="Totes">Totes</option>
        {categoriesDisponibles.map((cat) => (
          <option key={cat} value={cat}>
            {cat}
          </option>
        ))}
      </select>

      {noticiesFiltrades.map((noticia, i) => (
        <NoticiaCard key={i} noticia={noticia} />
      ))}
    </main>
  );
}

export default App;