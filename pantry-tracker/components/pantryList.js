// components/PantryList.js
import React from 'react';
import { List, ListItem, ListItemText, ListItemSecondaryAction, IconButton } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { doc, deleteDoc } from 'firebase/firestore';
import { db } from '../firebaseConfig';

const PantryList = ({ setCurrentItem, pantryItems, fetchItems }) => {
    const handleEdit = (item) => {
        setCurrentItem(item);
    };

    const handleDelete = async (id) => {
        await deleteDoc(doc(db, 'pantry', id));
        fetchItems();
    };

    return (
        <List>
            {pantryItems.map((item) => (
                <ListItem key={item.id}>
                    <ListItemText
                        primary={`${item.name} (${item.quantity})`}
                        secondary={`Classification: ${item.classification || 'N/A'}`}
                    />
                    <ListItemSecondaryAction>
                        <IconButton edge="end" onClick={() => handleEdit(item)}>
                            <EditIcon />
                        </IconButton>
                        <IconButton edge="end" onClick={() => handleDelete(item.id)}>
                            <DeleteIcon />
                        </IconButton>
                    </ListItemSecondaryAction>
                </ListItem>
            ))}
        </List>
    );
};

export default PantryList;
