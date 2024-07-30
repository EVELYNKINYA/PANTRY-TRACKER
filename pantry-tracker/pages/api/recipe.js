import { Configuration, GeminiApi} from "gemini";

const configuration = new Configuration({
    apiKey: process.env.GEMINI_API_KEY,
});
const gemini = new GeminiApi(configuration);

export default async function handler(req, res) {
    const { items } = req.body;

    const response = await gemini.createCompletion({
        model: "text-davinci-003",
        prompt: `Suggest recipes based on the following pantry items: ${items.join(', ')}.`,
        max_tokens: 150,
    });

    res.status(200).json({ recipes: response.data.choices[0].text });
}
