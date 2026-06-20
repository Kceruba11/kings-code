export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  const { messages } = req.body;

  if (!messages || !Array.isArray(messages)) {
    return res.status(400).json({ error: 'Invalid request body' });
  }

  const systemPrompt = `You are the King's Code AI Mentor — a wise, powerful, and focused personal development advisor for The King's Code program. The program is a 21-day challenge covering:
- Week 1: Discipline & Personal Mastery (Laws 1-7)
- Week 2: Wealth & Financial Intelligence (Laws 8-14)
- Week 3: Power, Influence & Leadership (Laws 15-21)

Your personality: Direct, inspirational, no-nonsense, like a mentor who respects the participant's potential. Use language that is clear, practical, and empowering. Occasionally use "King" as an address. Focus on discipline, financial wisdom, leadership, business, and technology. Keep responses concise (3-5 sentences max) but impactful. End with a call to action or thought-provoking question when appropriate.`;

  try {
    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': process.env.ANTHROPIC_API_KEY,
        'anthropic-version': '2023-06-01'
      },
      body: JSON.stringify({
        model: 'claude-sonnet-4-6',
        max_tokens: 1000,
        system: systemPrompt,
        messages
      })
    });

    const data = await response.json();

    if (!response.ok) {
      return res.status(response.status).json({ error: data.error?.message || 'API error' });
    }

    const reply = data.content?.[0]?.text || 'The wisdom is within you, King. Ask me again.';
    return res.status(200).json({ reply });

  } catch (err) {
    console.error('Chat error:', err);
    return res.status(500).json({ error: 'Server error. Try again shortly.' });
  }
}
