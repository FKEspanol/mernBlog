import mongoose from 'mongoose';
const connectDB = async() => {
    try {
        mongoose.connect(process.env.LOCAL_MONGODB_URI as string);
    } catch (error) {
        console.log(error)
    }
}

export default connectDB;