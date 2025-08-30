import { useState, useEffect } from "react";
import axios from "axios";
import WordHistory from "./WordHistory";

const Game = () => {
  const [player, setPlayer] = useState(1);
  const [wordP1, setWordP1] = useState("");
  const [wordP2, setWordP2] = useState("");
  const [lastWord, setLastWord] = useState("a");  
  const [scores, setScores] = useState({ 1: 0, 2: 0 });
  const [history, setHistory] = useState([]);
  const [message, setMessage] = useState("");
  const [timer, setTimer] = useState(15);

  useEffect(() => {
    const interval = setInterval(() => {
      setTimer((prev) => {
        if (prev === 1) {
          handleSubmit();
          return 15;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [player, lastWord]);

  const handleSubmit = async () => {
    let currentWord = player === 1 ? wordP1 : wordP2;
    if (!currentWord) return;

    try {
      const res = await axios.post("http://localhost:5000/validate-word", {
        word: currentWord,
        lastWord,
      });

      if (res.data.valid) {
        setLastWord(currentWord);
        setScores({ ...scores, [player]: scores[player] + 1 });
        setMessage(`Player ${player} is correct!`);
      } else {
        setScores({ ...scores, [player]: scores[player] - 1 });
        setMessage(`Player ${player} is wrong! ${res.data.reason}`);
      }

      const histRes = await axios.get("http://localhost:5000/history");
      setHistory(histRes.data.history);

      if (player === 1) setWordP1("");
      else setWordP2("");

      setPlayer(player === 1 ? 2 : 1);
      setTimer(15);
    } catch (err) {
      console.log(err);
    }
  };

  //  New reset function
  const handleReset = async () => {
    try {
      await axios.post("http://localhost:5000/reset");
      setWordP1("");
      setWordP2("");
      setLastWord("a");
      setScores({ 1: 0, 2: 0 });
      setHistory([]);
      setMessage("Game has been reset!");
      setPlayer(1);
      setTimer(15);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-100 to-purple-200 flex flex-col items-center py-10">
      <h1 className="text-4xl font-bold mb-6 text-purple-800">Shiritori Game</h1>

      <div className="bg-white shadow-lg rounded-xl p-6 w-full max-w-3xl">
        <div className="flex justify-between items-center mb-4">
          <p className="text-lg font-semibold text-purple-700">Player 1: {scores[1]}</p>
          <p className="text-lg font-semibold text-purple-700">Player 2: {scores[2]}</p>
          <p className="text-lg font-semibold text-red-500">Time: {timer}s</p>
        </div>

        <p className="text-center mb-4 text-gray-700">
          Last Word: <span className="font-bold text-purple-600">{lastWord}</span>
        </p>

        <div className="flex gap-6 mb-4">
          <div className="flex-1">
            <h3 className="font-semibold text-purple-700 mb-2">Player 1</h3>
            <input
              type="text"
              value={wordP1}
              disabled={player !== 1}
              onChange={(e) => setWordP1(e.target.value)}
              placeholder={`Start with '${lastWord.slice(-1)}'`}
              className={`w-full p-3 rounded-lg border ${
                player === 1 ? "border-purple-400 focus:ring-2 focus:ring-purple-300" : "border-gray-300 bg-gray-100"
              }`}
            />
          </div>
          <div className="flex-1">
            <h3 className="font-semibold text-purple-700 mb-2">Player 2</h3>
            <input
              type="text"
              value={wordP2}
              disabled={player !== 2}
              onChange={(e) => setWordP2(e.target.value)}
              placeholder={`Start with '${lastWord.slice(-1)}'`}
              className={`w-full p-3 rounded-lg border ${
                player === 2 ? "border-purple-400 focus:ring-2 focus:ring-purple-300" : "border-gray-300 bg-gray-100"
              }`}
            />
          </div>
        </div>

        <div className="flex gap-4">
          <button
            onClick={handleSubmit}
            className="flex-1 bg-purple-600 hover:bg-purple-700 text-white font-semibold py-3 rounded-lg transition duration-300"
          >
            Submit
          </button>
          {/*  Reset button */}
          <button
            onClick={handleReset}
            className="flex-1 bg-red-500 hover:bg-red-600 text-white font-semibold py-3 rounded-lg transition duration-300"
          >
            Reset
          </button>
        </div>

        {message && <p className="mt-4 text-center text-lg">{message}</p>}
      </div>

      <WordHistory history={history} />
    </div>
  );
};

export default Game;
