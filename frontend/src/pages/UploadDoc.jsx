// FileUploadPage.js
import React, { useState } from 'react';
import { Box, Button, Center, Text, VStack } from '@chakra-ui/react';
import axios from 'axios';
import ReactMarkdown from 'react-markdown';

const FileUploadPage = () => {
    const [selectedFile, setSelectedFile] = useState(null);
    const [resp, setResp] = useState('waiting');

    const handleFileChange = (event) => {
        setSelectedFile(event.target.files[0]);
    };



    const handleUpload = async () => {
        if (selectedFile) {
            const formData = new FormData();
            formData.append("file", selectedFile);
            let config = {
                method: 'post',
                maxBodyLength: Infinity,
                url: 'http://127.0.0.1:5000/upload',
                data: formData
            };

            console.log('Uploading file:', selectedFile);

            axios.request(config)
                .then((response) => {
                    console.log(response.data);
                    setResp(response.data)
                })
                .catch((error) => {
                    console.error(error);
                });
        }
        else {
            alert('No file selected');
        }
    };

    return (
        <Center h="100vh">
            <VStack >
                <VStack spacing={4} p={6} borderWidth="1px" borderRadius="lg" boxShadow="xl">
                    <Text fontSize="2xl" fontWeight="bold">Document Summarizer</Text>
                    <Box w="100%">
                        <input type="file" onChange={handleFileChange} />
                    </Box>
                    <Button colorScheme="blue" onClick={handleUpload}>Upload</Button>
                </VStack>
                <Box w={'100%'} maxWidth={'100%'}>
                <ReactMarkdown>{resp}</ReactMarkdown>
                </Box>
            </VStack>
        </Center>
    );
};

export default FileUploadPage;
