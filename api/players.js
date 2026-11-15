
export default async function handler(req, res) {
  if (req.method !== "GET") {
    res.setHeader("Allow", "GET");
    return res.status(405).json({
      success: false,
      message: "Method not allowed."
    });
  }

  const appsScriptUrl = process.env.KCC_APPS_SCRIPT_URL;

  if (!appsScriptUrl) {
    return res.status(500).json({
      success: false,
      message: "Players API is not configured."
    });
  }

  try {
    const url = new URL(appsScriptUrl);
    url.searchParams.set("action", "players");

    const response = await fetch(url.toString(), {
      method: "GET",
      redirect: "follow",
      headers: { Accept: "application/json" }
    });

    const data = await response.json();

    if (!response.ok || !data.success || !Array.isArray(data.players)) {
      return res.status(502).json({
        success: false,
        message: data.message || "Unable to load player profiles."
      });
    }

    res.setHeader("Cache-Control", "no-store");
    return res.status(200).json(data);

  } catch (error) {
    return res.status(502).json({
      success: false,
      message: "Unable to connect to the players database."
    });
  }
}
