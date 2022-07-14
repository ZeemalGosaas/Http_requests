//console.log("index.js");
//console.log("changed file");
//express add
const express = require('express')

//losding module student using ./ because it is int he same folder
const student = require('./students')


//saving 
const app = express();
//json ki body ko parse kry ga object mn convert kry ga
app.use(express.json())

//listen
 app.listen(4000, () => {
    console.log("Listening mode on")
 })


//get function handles the get request
//req handles the requests send
//home page shows this message
 app.get('/', (req, res) => {
    //res.send("<h1>Hello world</h1>")
    res.json({message : "API is working"})
    //res.json(student)

 })

 //new handle
 //after enter url /students shows data 
 app.get('/api/students', (req, res) => {
    res.json(student)
 })



//hanldes post request
 app.post('/api/students', (req,res) => 
 {
    //printing error
    if(!req.body.email)
    {
        res.status(400) //error code
        return res.json({error : "email is required"}) //error msg
    }
    //body ko read krny k lconfiguration krni pry gi is k liye req aa rhi hy to beech mn koi aesa hona chaiye jo req ki body mn json bhja hy usy object mn convert kry java script k or req ki .body property set kr dy
    //console.log(req.body);
    //user object
    const user = {
        id : student.length+1,
        first_name : req.body.first_name,
        last_name : req.body.last_name,
        email : req.body.email
    }
    //now append to student
    student.push(user)
    //res.send("students post request")
    res.json(user)
 })


 //put (pass id so that kon sa student update krna hy yh pata ho)
 app.put('/api/students/:id' , (req, res) =>
 {
    //read id
    let id = req.params.id
    //read
    let first_name = req.body.first_name
    let last_name = req.body.last_name
    let email = req.body.email

    //seraching for index
    let index = student.findIndex((student)=>{
        //id string ko number mn convert kiya
        return (student.id== Number.parseInt(id))
    })

    console.log(id, req.body , index)
    //update
    if(index >= 0)
    {
        let std = student[index]
        std.last_name = last_name
        std.first_name = first_name
        std.email = email
        //updated student send krna hy
        res.json(std)
    }
    else 
    {
        res.status(404)
        res.json({error : "Not found"})
        res.end()
    }

    
   
    //console.log(id)
   // res.json(id)
 })

 //delete request
 app.delete('/api/students/:id', (req, res) =>
 {
    //id read
    let id  = req.params.id

    //searching
    let index = student.findIndex((student)=>{
        //id string ko number mn convert kiya
        return (student.id== Number.parseInt(id))
    })

    //now delete
    if(index >= 0)
    {
        //jo dlt hna hy wo std mn hy
        let std = student[index]
        //dlt using splice
        student.splice( index, 1)
        //passing back to client
        res.json(std)
    }
    else 
    {
        res.status(404)
        res.json({error : "Not found"})
    }
 } )


 


