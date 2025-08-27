import axios from "axios";
import { use } from "react";

export default function QuizRoom() {
  const [theme, setTheme] = useState("");
  const [lang, setLang] = useState("");
  const [question, setQuestion] = useState(null);
  const [loading, setLoading] = useState(false);

  return <div>QuizRoom</div>;
}
