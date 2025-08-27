const { GoogleGenerativeAI } = require("@google/generative-ai");

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-pro" });

class GenerateAi {
  static async generateAi(req, res, next) {
    try {
      const { theme, lang } = req.body;

      const prompt = `Buat 1 pertanyaan "Would You Rather" dengan tema ${theme}, 
tulis dalam bahasa ${lang}. 
Jawabannya harus 2 pilihan yang lucu dan berbeda. 
Formatkan JSON:
{
  "question": "pertanyaannya...",
  "options": ["pilihan A", "pilihan B"]
}`;

      const result = await model.generateContent(prompt);
      const response = await result.response;
      const text = response.text();

      // parsed text(string) ke JSON
      let parsed;

      try {
        parsed = JSON.parse(text);
      } catch (err) {
        console.error("Error parsing JSON:", err);
      }

      res.json(parsed);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: "Internal Server Error" });
    }
  }
}

module.exports = GenerateAi;
