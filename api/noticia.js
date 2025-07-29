export default async function handler(req, res) {
  try {
    const { url, titol } = req.body;

    console.log("🔗 Rebuda URL:", url);
    console.log("📝 Rebuda Títol:", titol);

    // Retorn provisional per verificar que tot arriba bé
    res.status(200).json({
      missatge: "✅ Dades rebudes al servidor!",
      urlRebuda: url,
      titolRebut: titol
    });
  } catch (error) {
    console.error("❌ Error intern al servidor:", error);
    res.status(500).json({ error: "Error al processar la petició" });
  }
}
