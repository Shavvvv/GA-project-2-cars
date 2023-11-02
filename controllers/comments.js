const CarModel = require("../models/car");

module.exports = {
  create
};

async function create(req,res){
  // find the movie first
  try {
    const carDoc = await CarModel.findById(req.params.id);

    console.log(req.body, " <- contents of the form");
   
    req.body.user = req.user._id;
    req.body.userName = req.user.name;
    req.body.userAvatar = req.user.avatar;

    carDoc.comments.push(req.body);

    // ^ mutating a document we got from the database
    // tell mongodb we mutated the document (movieDoc)
    await carDoc.save(); // this tells the db we add the review
    // to the movieDoc
    
    res.redirect(`/cars/${carDoc._id}`);
    // res.redirect(`/movies/${req.params.id}`)
    // Either redirect works ^
    console.log("comment created")
  } catch (err) {
    console.log(err);
    res.send(err);
  }
}