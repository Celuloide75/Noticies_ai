import { useEffect, useState } from 'react';
import NoticiaCard from './components/NoticiaCard';

function App() {
  const [noticies, setNoticies] = useState([]);

  useEffect(() => {
    fetch('/resums.json')
      .then((res) => res.json())
      .then((data) => setNoticies(data));
  }, []);

  // 🔴 Nova funció per eliminar notícia
  const handleDelete = async (noticia) => {
    const confirmar = window.confirm(`Vols eliminar la notícia "${noticia.titol}"?`);
    if (!confirmar) return;

    const res = await fetch('https://59999288-44ae-490f-a373-51392082f41a-00-399cnfssr9k5m.spock.replit.dev/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ url: noticia.url }),
    });

    if (res.ok) {
      setNoticies(noticies.filter(n => n.url !== noticia.url));
    } else {
      alert("❌ Error eliminant la notícia.");
    }
  };

  return (
    <div className="p-4 max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Resums de Notícies</h1>
      {noticies.map((noticia, idx) => (
        <NoticiaCard key={idx} noticia={noticia} onDelete={handleDelete} />
      ))}
    </div>
  );
}

export default App;
