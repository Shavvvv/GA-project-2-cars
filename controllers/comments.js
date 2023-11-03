const CarModel = require("../models/car");

module.exports = {
  create,
  delete:deleteComment
};

async function deleteComment(req,res){

	console.log(req.user);
  try {
    // In order to delete a review
    // we need to find the movie that has
    // that review
    const carDoc = await CarModel.findOne({
      "comments._id": req.params.id, //<< searching the reviews array for a matching id!
      "comments.user": req.user._id,
    });

    console.log(carDoc);

    carDoc.comments.remove(req.params.id);

    // if you wanted to find a review
    const commentDoc = carDoc.comments.id(req.params.id);

    await carDoc.save();

    res.redirect(`/cars/${carDoc._id}`);
    // once you find the movieDoc
    // then you can use the .remove method on the reviews array and accepts the id of the review
    // then save to the db
    // then respond to the client!
  } catch (err) {
    console.log(err);
    res.send(err);
  }



  /*
  // Note the cool "dot" syntax to query on the property of a subdoc
  try{
    const carDoc = await CarModel.findOne({
      "comments._id": req.params.id,
      "comments.userId": req.user._id,
    });
    if (!carDoc) return;  res.redirect(`/cars/${req.params.id}`)//res.redirect(`/cars/${carDoc._id}`);
    // Remove the subdoc (https://mongoosejs.com/docs/subdocs.html)
    carDoc.comments.remove(req.params.id);
    // Save the updated car post
    await carDoc.save();
    // Redirect back to the book's show view
    res.redirect(`/cars/${carDoc._id}`);
  }
   catch (err) {
    console.log(err);
    res.send(err);
  }
  */
}


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
   

    console.log("comment created");
  } catch (err) {
    console.log(err);
    res.send(err);
  }
}