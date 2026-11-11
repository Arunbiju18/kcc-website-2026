export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({
      success: false,
      message: "Method not allowed"
    });
  }

  const appsScriptUrl = process.env.KCC_APPS_SCRIPT_URL;
  const secret = process.env.KCC_REGISTRATION_SECRET;

  if (!appsScriptUrl || !secret) {
    return res.status(500).json({
      success: false,
      message: "Registration service is not configured."
    });
  }

  try {
    const {
      name,
      phone,
      type,
      location,
      jersey,
      note,
      consent,
      website
    } = req.body || {};

    const response = await fetch(appsScriptUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        secret,
        website: website || "",
        name,
        phone,
        type,
        location,
        jersey,
        note: note || "",
        consent,
        source: "KCC Website"
      })
    });

    const result = await response.json();

    return res.status(result.success ? 200 : 400).json(result);

  } catch (error) {
    return res.status(502).json({
      success: false,
      message: "Unable to process registration. Please try again."
    });
  }
}
