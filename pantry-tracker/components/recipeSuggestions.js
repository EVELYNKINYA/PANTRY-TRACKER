import React, { useState, useEffect } from 'react';
import { getRecipes } from '../utils/recipeApi'; // Assuming you have a recipe API utility

const RecipeSuggestions = ({ pantryItems }) => {
    const [recipes, setRecipes] = useState([]);

    useEffect(() => {
        const fetchRecipes = async () => {
            const classifications = pantryItems.map(item => item.classification).filter(Boolean);
            if (classifications.length > 0) {
                const suggestedRecipes = await getRecipes(classifications);
                setRecipes(suggestedRecipes);
            }
        };

        fetchRecipes();
    }, [pantryItems]);

    return (
        <div>
            <h2>Recipe Suggestions</h2>
            <ul>
                {recipes.map((recipe, index) => (
                    <li key={index}>{recipe}</li>
                ))}
            </ul>
        </div>
    );
};

export default RecipeSuggestions;
