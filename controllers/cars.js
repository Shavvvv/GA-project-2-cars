//   CarModel variable created, linked to car schema
const CarModel=require("../models/car")

module.exports= {
new:newCar,
create,
index,
show,
delete:deletePost,
edit,
update
}


async function edit(req, res) {
  const carToEdit = await CarModel.findOne({ _id: req.params.id }).exec();
  if (!carToEdit) return res.redirect("/cars");
  res.render("cars/edit", { car:carToEdit });
}
async function update(req ,res){

    try {
      const updatedcar = await CarModel.findOneAndUpdate(
        { _id: req.params.id},
        // update object with updated properties
        req.body,
        // options object {new: true} returns updated doc
        { new: true }
      );
      return res.redirect(`/cars/${updatedcar._id}`);
    } catch (e) {
      console.log(e.message);
      return res.redirect("/cars");
    }



}

 async function deletePost(req,res){
/////////// friday updatee

    await CarModel.findOneAndDelete(
      // Query object that ensures the book was created by the logged in user
      { _id: req.params.id , /*postcreator: req.user._id */}
    );
    // Deleted book, so must redirect to index
    res.redirect("/cars");
  

}

async function  show(req,res){
 // console.log(`now showing individual object ${req.params.id}`)
try{
  const carDocument = await CarModel.findById(req.params.id);

  console.log("Now Viewing" ,carDocument )
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

