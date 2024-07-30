// components/PantryForm.js
import React, { useState, useEffect } from 'react';
import { TextField, Button, Box } from '@mui/material';
import { collection, addDoc, updateDoc, deleteDoc, doc } from 'firebase/firestore';
import { db } from '../firebaseConfig';
import ImageUpload from './imageUpload';

const PantryForm = ({ currentItem, setCurrentItem, fetchItems }) => {
    const [item, setItem] = useState(currentItem || { name: '', quantity: '', imageUrl: '', classification: '' });

    useEffect(() => {
        setItem(currentItem || { name: '', quantity: '', imageUrl: '', classification: '' });
    }, [currentItem]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (currentItem?.id) {
            const itemRef = doc(db, 'pantry', currentItem.id);
            await updateDoc(itemRef, item);
        } else {
            await addDoc(collection(db, 'pantry'), item);
        }
        setItem({ name: '', quantity: '', imageUrl: '', classification: '' });
        fetchItems();
    };

    const handleDelete = async () => {
        if (currentItem?.id) {
            const itemRef = doc(db, 'pantry', currentItem.id);
            await deleteDoc(itemRef);
            setCurrentItem(null);
            fetchItems();
        }
    };

    const handleImageUpload = (url, classification) => {
        setItem({ ...item, imageUrl: url, classification });
    };

    return (
        <Box component="form" onSubmit={handleSubmit}>
            <TextField
                label="Item Name"
                value={item.name}
                onChange={(e) => setItem({ ...item, name: e.target.value })}
                fullWidth
                margin="normal"
            />
            <TextField
                label="Quantity"
                value={item.quantity}
                onChange={(e) => setItem({ ...item, quantity: e.target.value })}
                fullWidth
                margin="normal"
            />
            <ImageUpload onUpload={handleImageUpload} />
            <Button type="submit" variant="contained" color="primary">Save</Button>
            {currentItem && (
                <Button onClick={handleDelete} variant="contained" color="secondary" style={{ marginLeft: '10px' }}>Delete</Button>
            )}
        </Box>
    );
};

export default PantryForm;




// import React, { useState, useEffect } from 'react';
// import { TextField, Button, Box } from '@mui/material';
// import { collection, addDoc, updateDoc, deleteDoc, doc } from 'firebase/firestore';
// import { db } from '../firebaseConfig';
// import ImageUpload from './imageUpload';

// const PantryForm = ({ currentItem, setCurrentItem, fetchItems }) => {
//     const [item, setItem] = useState(currentItem || { name: '', quantity: '', imageUrl: '', classification: '' });

//     useEffect(() => {
//         setItem(currentItem || { name: '', quantity: '', imageUrl: '', classification: '' });
//     }, [currentItem]);

//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         if (currentItem?.id) {
//             const itemRef = doc(db, 'pantry', currentItem.id);
//             await updateDoc(itemRef, item);
//         } else {
//             await addDoc(collection(db, 'pantry'), item);
//         }
//         setItem({ name: '', quantity: '', imageUrl: '', classification: '' });
//         fetchItems();
//     };

//     const handleDelete = async () => {
//         if (currentItem?.id) {
//             const itemRef = doc(db, 'pantry', currentItem.id);
//             await deleteDoc(itemRef);
//             setCurrentItem(null);
//             fetchItems();
//         }
//     };

//     const handleImageUpload = (url, classification) => {
//         setItem({ ...item, imageUrl: url, classification });
//     };

//     return (
//         <Box component="form" onSubmit={handleSubmit}>
//             <TextField
//                 label="Item Name"
//                 value={item.name}
//                 onChange={(e) => setItem({ ...item, name: e.target.value })}
//                 fullWidth
//                 margin="normal"
//             />
//             <TextField
//                 label="Quantity"
//                 value={item.quantity}
//                 onChange={(e) => setItem({ ...item, quantity: e.target.value })}
//                 fullWidth
//                 margin="normal"
//             />
//             <ImageUpload onUpload={handleImageUpload} />
//             <Button type="submit" variant="contained" color="primary">Save</Button>
//             {currentItem && (
//                 <Button onClick={handleDelete} variant="contained" color="secondary" style={{ marginLeft: '10px' }}>Delete</Button>
//             )}
//         </Box>
//     );
// };

// export default PantryForm;
