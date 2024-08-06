// utils/recipeApi.js
import axios from 'axios';

const RECIPE_API_URL = 'https://api.edamam.com/api/'; // Replace with the actual API URL

export const getRecipes = async (classifications) => {
    try {
        const response = await axios.post(
            RECIPE_API_URL,
            { classifications },
            {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${process.env.NEXT_PUBLIC_RECIPE_API_KEY}`, // If an API key is needed
                },
            }
        );
        return response.data.recipes;
    } catch (error) {
        console.error('Error fetching recipes:', error);
        throw error;
    }
};
