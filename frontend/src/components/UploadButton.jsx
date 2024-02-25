import React, { useState } from 'react';
import { BsUpload } from 'react-icons/bs';

const CustomFileUpload = ({ onFileSelect }) => {
    const [selectedFile, setSelectedFile] = useState(null);

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        setSelectedFile(file);
        onFileSelect(file);
    };

    return (
        <label className="relative flex flex-col items-center justify-center bg-white border-2 border-gray-300 rounded-lg cursor-pointer w-48 h-48">
            <input type="file" className="absolute inset-0 opacity-0" onChange={handleFileChange} />
            <BsUpload className="text-4xl text-gray-400" />
            {selectedFile && <span className="mt-2 text-gray-500">{selectedFile.name}</span>}
        </label>
    );
};

export default CustomFileUpload;
