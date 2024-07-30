import React, { useState } from 'react';
import { Button } from '@mui/material';
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { classifyImage } from '../utils/geminiApi'; // Import the Gemini API utility function

const storage = getStorage();

const ImageUpload = ({ onUpload }) => {
    const [image, setImage] = useState(null);

    const handleCapture = ({ target }) => {
        setImage(target.files[0]);
    };

    const handleUpload = async () => {
        if (image) {
            const storageRef = ref(storage, `images/${image.name}`);
            await uploadBytes(storageRef, image);
            const url = await getDownloadURL(storageRef);
            onUpload(url);

            // Call Gemini API to classify the image
            try {
                const classification = await classifyImage(url);
                console.log('Image classification:', classification);
                // Pass the classification result to the parent component
                onUpload(url, classification);
            } catch (error) {
                console.error('Error classifying image:', error);
            }

            setImage(null);
        }
    };

    return (
        <div>
            <input accept="image/*" type="file" onChange={handleCapture} />
            <Button onClick={handleUpload} variant="contained" color="primary">Upload Image</Button>
        </div>
    );
};

export default ImageUpload;
