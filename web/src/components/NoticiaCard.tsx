interface Noticia {
  url: string;
  resum: string;
  categories: string[];
}

export default function NoticiaCard({ noticia }: { noticia: Noticia }) {
  return (
    <div style={{
      border: "1px solid #ccc",
      padding: "1rem",
      borderRadius: "0.5rem",
      marginBottom: "1rem",
      backgroundColor: "#fff",
    }}>
      <a href={noticia.url} target="_blank" rel="noopener noreferrer">
        <h2 style={{ fontSize: "18px", color: "#1e40af", marginBottom: "0.5rem" }}>
          Llegir notícia
        </h2>
      </a>
      <p style={{ marginBottom: "0.5rem" }}>{noticia.resum}</p>
      <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap" }}>
        {noticia.categories.map((cat) => (
          <span
            key={cat}
            style={{
              backgroundColor: "#dbeafe",
              color: "#1e3a8a",
              fontSize: "12px",
              padding: "0.25rem 0.5rem",
              borderRadius: "9999px"
            }}
          >
            {cat}
          </span>
        ))}
      </div>
    </div>
  );
}