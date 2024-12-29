const express=require("express");
const lists=require("../Data/query");
const path=require("path");

const router=express.Router();

// router.get('/',(req,res)=>{
//     res.render('home')
// })
router.get('/',(req,res)=>{
    // res.send("i am firt endpoint")
  
    const query=req.query.query;
    // console.log(query);
    // if (!query) {
    //     return res.status(400).send('<h1>Error: Name is required in the URL</h1>');
    // }
    if(query){
    const result=lists.filter(item=>{
        return item.branch.toLowerCase()===query.toLowerCase()
    })
   
      res.render('home',{result})
     }
     else{
     res.render('home',{result:[]})
     }
  })
  router.get('/details/:name',(req,res)=>{
    const name=req.params.name;
    if (!name) {
        return res.status(400).send('<h1>Error: Name is required in the URL</h1>');
    }
    const user=lists.find(item=>
         item.name.toLowerCase()===name.toLowerCase()
    )
   if(user){
    return res.render('../views/layouts/details',{user})
   }
    else{
        return res.status(404).send(`user ${name} not found`)
    }
   
  })

module.exports=router;