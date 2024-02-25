import React, { useState } from 'react';
import { Box, Button, Center, Text, VStack } from '@chakra-ui/react';
import axios from 'axios';
import { FaFileUpload } from 'react-icons/fa';
import { Spinner } from '@chakra-ui/react';

const FileUploadPage = () => {
    const [selectedFile, setSelectedFile] = useState(null);
    const [resp, setResp] = useState('waiting');
    const [loading, setLoading] = useState(false)
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
        <>
            {
                loading ? (
                    <Center h={'80vh'} >
                        <Spinner
                            thickness='4px'
                            speed='0.65s'
                            emptyColor='gray.200'
                            color='blue.500'
                            size='xl'
                        />

                    </Center>

                ) : (<Center h="100vh">
                    <VStack>
                        <VStack spacing={4} p={6} borderWidth="1px" borderRadius="lg" boxShadow="lg">
                            <Text fontSize="2xl" fontWeight="bold">Document Summarizer</Text>
                            <Box w="100%" borderStyle="dashed" borderWidth="2px" borderRadius="lg" p={4} borderColor="white" cursor="pointer">
                                <label htmlFor="file-upload" className="custom-file-upload">
                                    <input id="file-upload" type="file" onChange={handleFileChange} hidden />
                                    {selectedFile ? (
                                        <Text>{selectedFile.name}</Text>
                                    ) : (
                                        <Box display="flex" flexDirection="column" alignItems="center">
                                            <FaFileUpload size={60} />
                                            <Text>Click to Upload File</Text>
                                        </Box>
                                    )}
                                </label>
                            </Box>
                            <Button colorScheme="blue" onClick={handleUpload}>Upload</Button>
                        </VStack>
                        <Box w={'100%'} maxWidth={'100%'}>
                            <Text>{resp}</Text>
                        </Box>
                    </VStack>
                </Center>)
            }
        </>
    );
};

export default FileUploadPage;
