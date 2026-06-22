import OpenAI from "openai";

export const getNutritionFromText = async (req, res) => {
  try {
   

    const client = new OpenAI({
      apiKey: process.env.GROQ_API_KEY,
      baseURL: "https://api.groq.com/openai/v1",
    });

    const { query } = req.body;

    if (!query) {
      return res.status(400).json({
        message: "Query is required",
      });
    }

    const completion = await client.chat.completions.create({
      model: "llama-3.3-70b-versatile",
      temperature: 0.2,
      messages: [
        {
          role: "system",
          content: `
You are a nutrition expert.

Return ONLY a valid JSON array.

Each object must contain exactly these fields:
- foodName
- quantity
- calories
- protein

Rules:
- Do not include explanations.
- Do not include markdown.
- Do not wrap the response in \`\`\`.
- calories and protein must be numbers.

Example:

[
  {
    "foodName": "Banana",
    "quantity": "2",
    "calories": 210,
    "protein": 2
  }
]
          `,
        },
        {
          role: "user",
          content: `Estimate calories and protein for: ${query}`,
        },
      ],
    });

    const text = completion.choices[0].message.content;

    const cleaned = text
      .replace(/```json/g, "")
      .replace(/```/g, "")
      .trim();

    const nutritionData = JSON.parse(cleaned);

    return res.status(200).json(nutritionData);
  } catch (err) {
    console.error("Groq Error:", err);

    return res.status(500).json({
      message: err.message,
    });
  }
};
export const getNutritionFromImage = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        message: "Please upload an image",
      });
    }

    const client = new OpenAI({
      apiKey: process.env.GROQ_API_KEY,
      baseURL: "https://api.groq.com/openai/v1",
    });

    const base64Image = req.file.buffer.toString("base64");

    const completion = await client.chat.completions.create({
      model: "meta-llama/llama-4-scout-17b-16e-instruct",
      messages: [
        {
          role: "user",
          content: [
            {
              type: "text",
              text: `Analyze this meal image.

Return ONLY valid JSON.

[
  {
    "foodName": "Banana",
    "quantity": "2",
    "calories": 210,
    "protein": 2
  }
]`,
            },
            {
              type: "image_url",
              image_url: {
                url: `data:${req.file.mimetype};base64,${base64Image}`,
              },
            },
          ],
        },
      ],
    });

    const text = completion.choices[0].message.content;

    const cleaned = text
      .replace(/```json/g, "")
      .replace(/```/g, "")
      .trim();

    const nutritionData = JSON.parse(cleaned);

    res.status(200).json(nutritionData);
  } catch (err) {
    console.error(err);

    res.status(500).json({
      message: err.message,
    });
  }
};


export const testGroqModels = async (req, res) => {
  try {
    const client = new OpenAI({
      apiKey: process.env.GROQ_API_KEY,
      baseURL: "https://api.groq.com/openai/v1",
    });

    const models = await client.models.list();

    res.json(models.data);
  } catch (err) {
    console.error(err);

    res.status(500).json({
      message: err.message,
    });
  }
};