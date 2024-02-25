// FileUploadPage.js
import React, { useState } from 'react';
import { Box, Button, Center, Text, VStack } from '@chakra-ui/react';

const FileUploadPage = () => {
    const [selectedFile, setSelectedFile] = useState(null);

    const handleFileChange = (event) => {
        setSelectedFile(event.target.files[0]);
    };

    const handleUpload = () => {
        if (selectedFile) {
            // You can perform file upload logic here
            console.log('Uploading file:', selectedFile);
        }
    };

    return (
        <Center h="100vh">
            <VStack spacing={4} p={6} borderWidth="1px" borderRadius="lg" boxShadow="xl">
                <Text fontSize="2xl" fontWeight="bold">DOcument Summarizer</Text>
                <Box w="100%">
                    <input type="file" onChange={handleFileChange} />
                </Box>
                <Button colorScheme="blue" onClick={handleUpload}>Upload</Button>
            </VStack>
        </Center>
    );
};

export default FileUploadPage;
