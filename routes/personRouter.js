// express router helps in code readability and divide code into diff components => same like in front end react-router-dom
// importing express router from express
const express=require('express')
const router=express.Router()
// importing person model from person.js file
const person = require("../models/person");

// POST route to add a person
router.post("/", async (req, res) => {
  try {
    const data = req.body; //assuming body-parser saves data in rew.body

    // createe new person's document using mongoose model
    const newPerson = new person(data);

    // save newPerson to the database
    const response = await newPerson.save();
    console.log("data saved");
    res.status(200).json(response);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// get route to get the persons in database
router.get("/", async (req, res) => {
  try {
    const data = await person.find();
    console.log("data fetched from person");
    res.status(200).json(data);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// what if we require only the persons data who are chefs or manager or waiter
// there is no need to define diff api's for diff professions.
// follow steps below
router.get("/:workType", async (req, res) => {
  try {
    const workType = req.params.workType; //extract the workType(parameter) from url
    if (workType == "chef" || workType == "manager" || workType == "waiter") {
      const response = await person.find({ work: workType });
      console.log(
        "response fetched based om workType in work(defined in person.js schema)"
      );
      res.status(200).json(response);
    } else {
      res.status(404).json({ error: "Invalid work type" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// update route to update the person bsed on id
router.put('/:id',async (req,res)=>{
  try{
   const personId=req.params.id //extract id parameter from url '/:id'
   const updatedPersonData=req.body //extracted person data based on id from body parser(req.body)

   const response=await person.findByIdAndUpdate(personId,updatedPersonData, {
    new:true, //return the updated document
    runValidators:true  //run mongoose validation for person schema
   })

   if(!response){
    res.status(404).json({error:"Person not found"})
   }
   
   console.log("data updated")
   res.status(200).json(response)
  }catch(error){
    res.status(500).json({error:"Invalid server error"})
  }
})

// delete route to delete a person based on id
router.delete('/:id',async (req,res)=>{
  try{
const personId=req.params.id
  const response=await person.findByIdAndDelete(personId)
  if(!response){
    res.status(404).json({error:"Person not found"})
  }
  console.log('person deleted')
  res.status(200).json(response)
  }catch(error){
    res.status(500).json({error:"Internal server error"})
  }
  
})

module.exports=router
// comment added for testing