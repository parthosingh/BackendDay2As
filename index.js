const { json } = require("body-parser");
const express = require("express");
const fs = require ("fs");
const { todo } = require("node:test");

const server = express();

const PORT = 8080;
server.use(express.json())

const readJson = ()=> {
    const data = fs.readFileSync("db.json")
    return JSON.parse(data);
}

server.get("/todos", (req,res)=> {
  const data = readJson();
  res.send(data)
})

server.post("/todo", (req,res)=> {
    const data = readJson();

    const newTask = {
        id: data.todos.length+1,
        task: req.body.task,
        status: false
    };

    data.todos.push(newTask);
    fs.writeFileSync("db.json", JSON.stringify(data, null, 2));
    res.send(newTask)
})

server.put("/todos/update", (req,res)=> {
    let data = readJson();
    data.todos.forEach((todo) => {
        if(todo.id%2 ==0 && todo.status == false){
          todo.status = true;  
        }
        
        
    });
    fs.writeFileSync("db.json", JSON.stringify(data, null, 2));
    res.send(data.todos)
})

server.delete("/todos/delete-true", (req,res)=> {
    const data = readJson();
   data.todos= data.todos.filter((todo)=> !todo.status)
  fs.writeFileSync("db.json", JSON.stringify(data))
  res.send(data.todos)
})

server.listen(PORT, ()=> {
    console.log(`listening on port ${PORT}`);
})