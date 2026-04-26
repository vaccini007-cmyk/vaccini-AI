const OpenAI = require('openai');

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

const systemPrompt = `You are a medical information assistant specialized in providing accurate, evidence-based information about vaccines and their adverse effects. 

Your responsibilities:
- Provide factual, scientifically-backed information about vaccine side effects
- Distinguish between common and rare side effects
- Explain the difference between correlation and causation
- Direct users to consult healthcare professionals for medical advice
- Always emphasize the importance of vaccination in preventing serious diseases
- Be empathetic and non-judgmental when answering questions

Important: Always include a disclaimer that you're providing educational information, not medical advice, and recommend consulting with a healthcare provider for specific concerns.`;

async function generateResponse(userQuestion) {
  try {
    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        {
          role: "system",
          content: systemPrompt
        },
        {
          role: "user",
          content: userQuestion
        }
      ],
      max_tokens: parseInt(process.env.MAX_TOKENS) || 1000,
      temperature: parseFloat(process.env.TEMPERATURE) || 0.7
    });

    return completion.choices[0].message.content;
  } catch (error) {
    console.error('OpenAI API error:', error);
    throw new Error('Failed to generate response from OpenAI');
  }
}

module.exports = {
  generateResponse
};
