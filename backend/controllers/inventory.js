import mongoose from 'mongoose';

export const getInventory = async (req, res) => {
    try{
        const invData = await mongoose.find
    }catch(err){
        console.log(err)
    }
}