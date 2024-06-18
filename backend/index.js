import express from 'express'
import client from './client.js'
const app=express()

const port=4000

async function init(){
   // client.set('user:3',"shatu bhi")
   // await client.expire("user:3",20)
    const result= await client.get('user:3')
    console.log(result);
}

init()
app.get('/',(req,res)=>{
    res.send("hello from docker");
})

app.listen(port,()=>{
    console.log("server is listening on port 4000");
})
