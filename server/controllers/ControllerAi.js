const { GoogleGenerativeAI } = require("@google/generative-ai");
const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

class GenerateAi {
  static async generateAi(req, res) {
    try {
      const { theme, lang } = req.body;

      const prompt = `Buat 1 pertanyaan "Would You Rather" dengan tema ${theme}, 
tulis dalam bahasa ${lang}. 
Pertanyaannya maksimal 10 kata, langsung kasih pertanyaan antara 2 pilihan aja dan jawabannya cuma 2 pilihan, masing-masing maksimal 5 kata. 
Hanya balas JSON tanpa penjelasan lain:
{
  "question": "...",
  "options": ["...", "..."]
}
`;

      const { response } = await model.generateContent(prompt);
      let text = response.text().trim();

      text = text.replace(/```json|```/gi, "").trim();

      const start = text.indexOf("{");
      const end = text.lastIndexOf("}");
      if (start !== -1 && end !== -1) {
        text = text.slice(start, end + 1);
      }

      let parsed;
      try {
        parsed = JSON.parse(text);
      } catch (err) {
        console.error("Error parsing JSON:", err, text);
        return res.status(500).json({ error: "AI response invalid JSON" });
      }

      res.json(parsed);
    } catch (err) {
      console.error("Generate AI Error:", err);
      res.status(500).json({ error: "Internal Server Error" });
    }
  }
}

module.exports = GenerateAi;
