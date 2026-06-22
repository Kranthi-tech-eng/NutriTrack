import OpenAI from "openai";

const client = new OpenAI({
  apiKey: process.env.GROQ_API_KEY,
  baseURL: "https://api.groq.com/openai/v1",
});

async function testVision() {
  try {
    const models = await client.models.list();

    console.log(models.data);
  } catch (err) {
    console.error(err);
  }
}

testVision();