const mongoose = require('mongoose');
mongoose.set("strictQuery",true);

const connectDB = async () => {
    try {
        await mongoose.connect("mongodb://localhost:27017/shopping");
        console.log('MongoDB Connected');
    } catch (error) {
        console.error('MongoDB Connection Error:', error);
    
    }

}

module.exports = connectDB;
