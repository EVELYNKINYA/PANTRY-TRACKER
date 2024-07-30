import axios from 'axios';

const GEMINI_API_URL = 'https://api.gemini.com/v1'; // Replace with the actual API URL

export const classifyImage = async (imageUrl) => {
    try {
        const response = await axios.post(
            `${GEMINI_API_URL}/classify`, // Adjust the endpoint accordingly
            { imageUrl },
            {
                headers: {
                    'Authorization': `Bearer ${process.env.NEXT_PUBLIC_GEMINI_API_KEY}`,
                },
            }
        );
        return response.data;
    } catch (error) {
        console.error('Error classifying image:', error);
        throw error;
    }
};
