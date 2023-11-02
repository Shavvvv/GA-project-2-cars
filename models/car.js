// Page i completely made new






const mongoose= require('mongoose');


const carsSchema = new mongoose.Schema({
  link: String,
  title: String,
});



module.exports=mongoose.model('Car', carsSchema)


