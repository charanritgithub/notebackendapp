import mongoose from "mongoose";

const connectToMongoDB = async () => {
    try{
        await mongoose.connect("mongodb://127.0.0.1:27017/note_app");
        console.log("connected to mangoDB")
    }catch(error){
        console.log("Error connecting to mangoDB",error.message)
    }
}

export default connectToMongoDB      