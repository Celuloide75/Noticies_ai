import { useEffect, useState } from 'react';
import NoticiaCard from './components/NoticiaCard';

function App() {
  const [noticies, setNoticies] = useState([]);
  const adminMode = new URLSearchParams(window.location.search).get('admin') === '1234';

  useEffect(() => {
    fetch('/resums.json')
      .then((res) => res.json())
      .then((data) => setNoticies(data));
  }, []);

  const handleDelete = async (noticia) => {
    const confirmat = window.confirm("Segur que vols eliminar aquesta notícia?");
    if (!confirmat) return;

    const res = await fetch('https://59999288-44ae-490f-a373-51392082f41a-00-399cnfssr9k5m.spock.replit.dev/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ url: noticia.url }),
    });

    if (res.ok) {
      setNoticies((prev) => prev.filter((n) => n.url !== noticia.url));
    } else {
      alert("❌ Error eliminant la notícia.");
    }
  };

  return (
    <div className="p-4">
      <h1 className="text-3xl font-bold mb-4">Notícies resumides</h1>
      <div className="grid gap-4">
        {noticies.map((noticia, idx) => (
          <NoticiaCard
            key={idx}
            noticia={noticia}
            adminMode={adminMode}
            onDelete={handleDelete}
          />
        ))}
      </div>
    </div>
  );
}

export default App;
