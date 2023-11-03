// Page i completely made new






const mongoose= require('mongoose');


const commentsSchema = new mongoose.Schema(
  {
  content: {
    type: String,
    required: true,
  },
user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  userName: String,
  userAvatar: String

},
{
timestamps:true
}
)

const carsSchema = new mongoose.Schema({
  link: String,
  title: String,

  comments: [commentsSchema],
/////////
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  userName: String,
  userAvatar: String,
});



module.exports=mongoose.model('Car', carsSchema)


