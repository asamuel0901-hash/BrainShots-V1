export default async function handler(req, res) {
  if (req.method!== 'POST') return res.status(405).json({error: 'POST only'});

  const { text } = req.body;
  const apiKey = process.env.OPENAI_KEY;

  const response = await fetch('https://api.openai.com/v1/chat/completions', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${apiKey}` },
    body: JSON.stringify({
      model: 'gpt-3.5-turbo',
      messages: [{ role: 'user', content: `Summarize this YouTube transcript in 3 bullet points: ${text}` }],
      max_tokens: 150
    })
  });

  const data = await response.json();
  res.status(200).json({ summary: data.choices[0].message.content });
    }
