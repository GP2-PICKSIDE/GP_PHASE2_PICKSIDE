const { GoogleGenerativeAI } = require("@google/generative-ai");
const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

const generateQuestion = async ({
  rounds = 1,
  theme = "general",
  lang = "id",
} = {}) => {
  try {
    // max 10
    const n = Math.max(1, Math.min(10, Number(rounds) || 1));

    const prompt = `
    Buat ${n} pertanyaan "Would You Rather" dengan tema "${theme}" dalam bahasa "${lang}".
    Syarat:
    - Tiap pertanyaan unik, kreatif, dan lucu/menarik (hindari pengulangan kata/tema).
    - Pertanyaan max 12 kata.
    - Hanya 2 opsi (A dan B), masing-masing max 5 kata.
    - Jangan tulis apapun selain JSON valid dengan format ini:

    {
      "items": [
        { "question": "…", "options": ["…","…"] }
      ]
    }

    Jumlah "items" harus tepat = ${n}.
  `;

    const { response } = await model.generateContent(prompt);
    let t = (response?.text?.() || "").replace(/```json|```/gi, "").trim();
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
    while (items.length < n) items.push({}); // lengkapi jika kurang

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
