import { useState } from "react";
import api from "../services/api";

function AICopilot({businessId}) {
  const [message, setMessage] = useState("");
  const [answer, setAnswer] = useState("");
  const [loading, setLoading] = useState(false);
const askCopilot = async () => {
//   if (!message.trim() || !businessId) return;
console.log("MESSAGE:", message);
console.log("BUSINESS ID IN COPILOT:", businessId);

if (!message.trim() || !businessId) return;
  try {
    setLoading(true);

    const res = await api.post("/copilot/chat", {
      businessId,
      message,
    });

    setAnswer(res.data.answer);

  } catch (error) {
    console.log(error);
    setAnswer("Sorry, I couldn't process your request.");
  } finally {
    setLoading(false);
  }
};
  return (
    <div className="mt-10 bg-white rounded-2xl shadow-md border border-[#E8DDD5] p-8">

      <h2 className="text-2xl font-semibold text-[#3E2F2F]">
        🤖 AI Business Copilot
      </h2>

      <p className="text-gray-500 mt-2">
        Ask anything about your business and get AI-powered guidance.
      </p>

      {/* Input */}
      <div className="flex gap-3 mt-6">

        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Ask something about your business..."
          className="flex-1 border border-[#E8DDD5] rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-[#D9C2A3]"
        />
<button
  onClick={askCopilot}
  disabled={loading}
  className="bg-[#6D4C41] text-white px-6 py-3 rounded-xl hover:bg-[#5A3E35] transition disabled:opacity-50"
>
  {loading ? "Thinking..." : "Ask 🤖"}
</button>

      </div>

      {/* Answer */}
      {answer && (
        <div className="mt-6 bg-[#FFFDF9] rounded-xl p-6 border border-[#E8DDD5]">
          <h3 className="font-semibold text-[#3E2F2F] mb-3">
            🤖 HerRoom Copilot
          </h3>

          <p className="text-gray-600 whitespace-pre-line">
            {answer}
          </p>
        </div>
      )}

    </div>
  );
}

export default AICopilot;