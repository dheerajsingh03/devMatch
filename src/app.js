const express=require("express");

const app=express();

app.use("/hello",(req,res)=>{
    res.send("Hello");
})

app.use("/test",(req,res)=>{
    res.send("test")
});

app.listen(7777,()=>{
    
})