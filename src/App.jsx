import { useState } from "react"
import axios from 'axios';
import './index.css';
import { LoaderCircle } from 'lucide-react';

function App() {

  const [textInput, setTextInput] = useState("");
  const [selectValue, setSelectValue] = useState("");
  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(false);

  const handleTextTranslation = async () => {
    if (!textInput || !selectValue) return alert("Please enter text & select language");

    setLoading(true);

    const options = {
      method: 'POST',
      url: 'https://google-translator9.p.rapidapi.com/v2',
      headers: {
        'x-rapidapi-key': '40b4f1e998mshd86da2b9e80cfd8p1487f4jsnc4228e7cef7c',   // 🔴 remove hardcoded key
        'x-rapidapi-host': 'google-translator9.p.rapidapi.com',
        'Content-Type': 'application/json'
      },
      data: {
        q: textInput,
        source: 'en',
        target: selectValue,
        format: 'text'
      }
    };

    try {
      const response = await axios.request(options);
      setResult(response?.data?.data?.translations?.[0]?.translatedText);
    } catch (error) {
      console.error(error);
      alert("Error while translating!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-full bg-slate-200 flex items-center justify-center px-4">
      <div className="flex items-center justify-center flex-col gap-y-8 w-full max-w-[600px]">

        <h1 className="text-2xl md:text-3xl text-zinc-700 font-bold text-center">
          Text Translator
        </h1>

        <div className="flex items-center justify-center flex-col gap-y-4 w-full">
          <textarea 
            className="bg-white w-full h-32 md:h-40 border border-slate-700 outline-none rounded-lg text-base md:text-lg px-4 py-2"
            placeholder="Enter Text..."
            onChange={(e) => setTextInput(e.target.value)}
          />

          <textarea 
            className="bg-white w-full h-32 md:h-40 border border-slate-700 outline-none rounded-lg text-base md:text-lg px-4 py-2"
            value={result}
            readOnly
            placeholder="Translated Text..."
          />
        </div>

        <div className="flex flex-col sm:flex-row gap-3 w-full justify-between items-center">
          <label className="font-semibold">Convert into:</label>

          <select 
            className="bg-white px-3 py-2 rounded-lg border border-zinc-700 outline-none cursor-pointer w-full sm:w-auto"
            onChange={(e) => setSelectValue(e.target.value)}
          >
            <option value="">Select</option>
            <option value="hi">Hindi</option>
            <option value="bn">Bengali</option>
            <option value="fr">French</option>
            <option value="es">Spanish</option>
            <option value="de">German</option>
            <option value="ar">Arabic</option>
            <option value="ja">Japanese</option>
            <option value="ko">Korean</option>
            <option value="ru">Russian</option>
            <option value="zh">Chinese</option>
          </select>
        </div>

        <button 
          className="bg-slate-700 text-slate-100 w-full py-3 rounded-lg cursor-pointer flex items-center justify-center text-lg"
          onClick={handleTextTranslation}
        >
          {
            loading ? <LoaderCircle className="animate-spin" /> : "Translate"
          }
        </button>

      </div>
    </div>
  );
}

export default App;
