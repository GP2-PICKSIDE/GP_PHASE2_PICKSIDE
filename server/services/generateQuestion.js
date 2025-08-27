const { GoogleGenAI } = require("@google/genai");
const genAI = new GoogleGenAI({ apiKey: process.env.GOOGLE_API_KEY });
const model = "gemini-2.5-flash";

const generateQuestion = async ({
  rounds = 1,
  theme = "general",
  lang = "id",
} = {}) => {
  try {
    const n = Math.max(1, Math.min(10, Number(rounds) || 1));

    const prompt = `
      Buat ${n} pertanyaan "Would You Rather" bertema "${theme}"
      dalam bahasa "${lang}".

      Kriteria penting:
      - Setiap pertanyaan harus relevan dengan tema "${theme}".
      - Pertanyaan maksimal 12 kata, jelas, natural, dan mudah dipahami.
      - Tiap pertanyaan hanya punya 2 opsi (A dan B).
      - Opsi maksimal 5 kata, singkat, relevan, dan seimbang (sama-sama menarik/dilema).
      - Hindari pengulangan kata/tema, hindari opsi yang terlalu absurd/aneh.
      - Gaya bahasa harus konsisten dengan "${lang}".
      - Format output wajib JSON valid berikut:

      {
        "items": [
          { "question": "…", "options": ["…","…"] }
        ]
      }

      Jumlah "items" harus tepat = ${n}.
      Jangan tulis apapun selain JSON valid tersebut.
    `;

    const resp = await genAI.models.generateContent({
      model,
      contents: prompt,
    });

    let t = String(resp.text || "")
      .replace(/```json|```/gi, "")
      .trim();

    const s = t.indexOf("{"),
      e = t.lastIndexOf("}");
    if (s !== -1 && e !== -1) t = t.slice(s, e + 1);

    let data;
    try {
      data = JSON.parse(t);
    } catch {
      data = { items: [] };
    }

    let items = Array.isArray(data.items) ? data.items.slice(0, n) : [];
    while (items.length < n) items.push({});

    return items.map((it) => ({
      question: (it?.question || "Would you rather A or B?").trim(),
      options: [
        (it?.options?.[0] || "Option A").trim(),
        (it?.options?.[1] || "Option B").trim(),
      ],
    }));
  } catch (err) {
    throw err;
  }
};

module.exports = { generateQuestion };
