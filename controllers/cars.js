//   CarModel variable created, linked to car schema
const CarModel=require("../models/car")

module.exports= {
new:newCar,
create,
index,
show,
delete:deletePost,
update
}

async function update(req ,res){


  
}

 async function deletePost(req,res){


    await CarModel.findOneAndDelete(
      // Query object that ensures the book was created by the logged in user
      { _id: req.params.id/*, userRecommending: req.user._id*/ }
    );
    // Deleted book, so must redirect to index
    res.redirect("/cars");
  

}

async function  show(req,res){
 // console.log(`now showing individual object ${req.params.id}`)
try{
  const carDocument = await CarModel.findById(req.params.id).exec();

  console.log(`Now Viewing: ${carDocument}` )
  res.render("cars/show", {car: carDocument});

}catch(err){
   console.log(err);
   res.send(err);
}
}

async function index(req, res) {
  console.log(req.user);
  // find all the movies and render an movies/index.ejs page
  try {
    const carDocuments = await CarModel.find({}); // <- empty object says find all the movies!
    console.log("carDocuments", carDocuments);
    res.render("cars/index", { carDocs: carDocuments });
  
     
  } catch (err) {
    console.log(err);
    res.send(err);
  }
}

  


function newCar(req,res){
   res.render("cars/new")
}


async function create(req,res,next){
console.log(req.body, " <--- contents of the form");
console.log(req.user);


 try {
   const carDoc = await CarModel.create(req.body);
   // put it in the database, then respond client
   console.log(carDoc, " <0 this is the movie created in db");
   res.redirect("/cars"); // < this will 404 currently because
   // we haven't defined that route yet!
 } catch (err) {
  console.log('car not added to db')
   console.log(err);
   res.send(err);
   // optionally
   //next(err);
 }

}

