const mongoose = require('mongoose')

const connection = async()=>{
    await mongoose.connect('mongodb+srv://radhimiyani218:exam2@cluster0.ui9riio.mongodb.net/?retryWrites=true&w=majority')
    console.log("db connect")
}

module.exports = connection