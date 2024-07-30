// pages/index.js
import React, { useState, useEffect } from 'react';
import PantryForm from '../components/pantryForm';
import PantryList from '../components/pantryList';
import RecipeSuggestions from '../components/recipeSuggestions';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../firebaseConfig';

const HomePage = () => {
    const [currentItem, setCurrentItem] = useState(null);
    const [pantryItems, setPantryItems] = useState([]);

    const fetchItems = async () => {
        const querySnapshot = await getDocs(collection(db, 'pantry'));
        const itemsData = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setPantryItems(itemsData);
    };

    useEffect(() => {
        fetchItems();
    }, []);

    return (
        <div>
            <h1>My Pantry</h1>
            <PantryForm currentItem={currentItem} setCurrentItem={setCurrentItem} fetchItems={fetchItems} />
            <PantryList setCurrentItem={setCurrentItem} pantryItems={pantryItems} fetchItems={fetchItems} />
            <RecipeSuggestions pantryItems={pantryItems} />
        </div>
    );
};

export default HomePage;

// import React, { useState } from 'react';
// import PantryForm from '../components/pantryForm';
// import PantryList from '../components/pantryList';
// import RecipeSuggestions from '../components/recipeSuggestions';

// export default function Home() {
//     const [currentItem, setCurrentItem] = useState(null);

//     return (
//         <div>
//             <h1>My Pantry</h1>
//             <PantryForm currentItem={currentItem} setCurrentItem={setCurrentItem} fetchItems={fetchItems} />
//             <PantryList setCurrentItem={setCurrentItem} />
//             <RecipeSuggestions pantryItems={pantryItems} />
//         </div>
//     );
// }






// // import React, { useState } from 'react';
// // import PantryForm from '../components/pantryForm';
// // import PantryList from '../components/pantryList';
// // import RecipeSuggestions from '../components/recipeSuggestions';

// // export default function Home() {
// //     const [currentItem, setCurrentItem] = useState(null);

// //     return (
// //         <div>
// //             <h1>My Pantry</h1>
// //             <PantryForm currentItem={currentItem} setCurrentItem={setCurrentItem} fetchItems={fetchItems} />
// //             <PantryList setCurrentItem={setCurrentItem} />
// //             <RecipeSuggestions pantryItems={pantryItems} />
// //         </div>
// //     );
// // }
