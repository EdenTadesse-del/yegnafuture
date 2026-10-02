import { useEffect, useRef, useState } from 'react';

const CANNED = {
  default: "I'm ready to help! Ask me anything about your subjects, homework, or lessons. Try: 'Explain photosynthesis' or 'Help with quadratic equations'.",
  photosynthesis:
    'Photosynthesis is how green plants make food from sunlight. The equation is:\n\n6CO₂ + 6H₂O + light → C₆H₁₂O₆ + 6O₂\n\nIt happens in the chloroplasts. There are two stages:\n1. Light-dependent reactions — produce ATP and NADPH\n2. Calvin cycle — uses those to make glucose',
  quadratic:
    'A quadratic equation has the form ax² + bx + c = 0.\n\nMethods to solve:\n1. Factoring\n2. Completing the square\n3. Quadratic formula: x = (-b ± √(b²-4ac)) / 2a\n\nThe discriminant (b² - 4ac) tells you how many solutions exist.',
};

function findReply(text) {
  const lower = text.toLowerCase();
  if (lower.includes('photosynthesis')) return CANNED.photosynthesis;
  if (lower.includes('quadratic')) return CANNED.quadratic;
  return `Good question! Here's what I can tell you about "${text}":\n\nThe AI Tutor will give you a full, personalized answer once the backend is connected. Right now I'm running in demo mode so you can see how the interface works.`;
}

export default function Tutor() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [busy, setBusy] = useState(false);
  const bottomRef = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, busy]);

  const send = async (e) => {
    e.preventDefault();
    if (!input.trim() || busy) return;

    const text = input;
    setMessages((m) => [...m, { role: 'user', content: text }]);
    setInput('');
    setBusy(true);

    setTimeout(() => {
      setMessages((m) => [...m, { role: 'assistant', content: findReply(text) }]);
      setBusy(false);
    }, 700);
  };

  return (
    <div className="flex h-[calc(100vh-8rem)] flex-col card animate-in">
      <div className="border-b border-slate-100 px-5 py-3">
        <h1 className="font-bold text-slate-800">AI Tutor 🤖</h1>
        <p className="text-xs text-slate-400">
          Ask anything about your subjects and lessons.
        </p>
      </div>

      <div className="flex-1 space-y-4 overflow-y-auto p-5">
        {messages.length === 0 && (
          <div className="flex h-full flex-col items-center justify-center text-center">
            <div className="text-4xl">🤖</div>
            <p className="mt-3 font-semibold text-slate-700">
              Hi! I'm your AI Tutor.
            </p>
            <p className="mt-1 max-w-sm text-sm text-slate-500">
              Ask me to explain a topic, help with homework, or generate practice
              questions.
            </p>

            <div className="mt-4 flex flex-wrap justify-center gap-2">
              {[
                'Explain photosynthesis',
                'Help with quadratic equations',
                'Grade 10 biology practice questions',
              ].map((s) => (
                <button
                  key={s}
                  onClick={() => setInput(s)}
                  className="chip hover:bg-blue-100"
                >
                  {s}
                </button>
              ))}
            </div>
          </div>
        )}

        {messages.map((m, i) => (
          <div
            key={i}
            className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div
              className={`max-w-[80%] whitespace-pre-wrap rounded-2xl px-4 py-2.5 text-sm ${
                m.role === 'user'
                  ? 'bg-blue-600 text-white'
                  : 'bg-slate-100 text-slate-700'
              }`}
            >
              {m.content}
            </div>
          </div>
        ))}

        {busy && (
          <div className="flex justify-start">
            <div className="flex gap-1 rounded-2xl bg-slate-100 px-4 py-3">
              <span className="h-2 w-2 animate-bounce rounded-full bg-slate-400" />
              <span
                className="h-2 w-2 animate-bounce rounded-full bg-slate-400"
                style={{ animationDelay: '0.1s' }}
              />
              <span
                className="h-2 w-2 animate-bounce rounded-full bg-slate-400"
                style={{ animationDelay: '0.2s' }}
              />
            </div>
          </div>
        )}

        <div ref={bottomRef} />
      </div>

      <form onSubmit={send} className="flex gap-2 border-t border-slate-100 p-4">
        <input
          className="input"
          placeholder="Ask your tutor..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          disabled={busy}
        />
        <button type="submit" className="btn-primary" disabled={busy || !input.trim()}>
          Send
        </button>
      </form>
    </div>
  );
}