 

const WordHistory = ({ history }) => {
  return (
    <div className="mt-6 w-full max-w-3xl bg-white shadow-md rounded-xl p-4">
      <h3 className="text-purple-700 font-semibold mb-2 text-lg">Word History</h3>
      <ul className="flex flex-wrap gap-2">
        {history.map((word, index) => (
          <li
            key={index}
            className="bg-purple-100 text-purple-800 px-3 py-1 rounded-full text-sm"
          >
            {word}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default WordHistory;
