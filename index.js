const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const { request, response } = require('express');
const port = 3000;

app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var id = 0;
var TodoList = [];
function Todo(id, name, desc) {
    this.id = id;
    this.name = name;
    this.desc = desc;
}



function paramObj(name, desc, btn) {
    this.name = name;
    this.desc = desc;
    this.btn = btn;
}



app.get("/", (request, response) => {
    const obj = new paramObj();
    obj.desc = "";
    obj.name = "";
    obj.btn = false;
    response.render("index", { obj });
})




app.post("/", (request, response) => {
    try {
        if (!request.body.name || !request.body.desc) {
            throw "Empty or Invalid Input";
        }
        else {
            const todo = new Todo();
            todo.id = id;
            todo.name = request.body.name;
            todo.desc = request.body.desc;
            console.log(todo.id);
            console.log(todo.name);
            console.log(todo.desc);
            id++;

            TodoList.push(todo); //Todo Added to Object Array
            // console.log("Todo Added Successfully");
            response.redirect('/');
        }

    } catch (err) {
        response.status(406).json({ message: err });
    }

});




app.get("/getTodos", (request, response) => {
    if(TodoList.length){
        // response.render("todo-list", { TodoList });
        response.status(200).json({TodoArray: TodoList});
    }else{
        response.status(404).json({ message: "Todo Array is Empty" });
    }
})




app.get("/getATodo/:id", (request, response) => {

    if (TodoList.length) {
        const { id } = request.params;

        const todo = TodoList.find(todo => todo.id == id);
        if (todo) {
            let TodoList = [];
            TodoList.push(todo);
            console.log(TodoList);
            // response.render("todo-list", { TodoList });
            response.status(200).json({TodoArray: TodoList});
        } else {
            response.status(404).json({ message: "To-do with id " + id + " is not present" });
        }
    } else {
        response.status(404).json({ message: "Todo Array is Empty" });
    }
});




app.delete("/delete/:id", (request, response) => {

    if (TodoList.length) {
        const { id } = request.params;

        const deleted = TodoList.find(todo => todo.id == id)
        if (deleted) {
            TodoList = TodoList.filter(todo => todo.id != id);
            response.redirect(303, '/getTodos');
        } else {
            response.status(404).json({ message: "Invalid Todo Id" });
        }
    } else {
        response.status(404).json({ message: "Todo Array is Empty" });
    }


});




app.put("/update/:id", (request, response) => {

    if (TodoList.length) {
        const { id } = request.params;
        var name;
        var desc;

        const updateTodo = TodoList.find(todo => todo.id == id)
        if (updateTodo) {
            const obj = new paramObj();
            obj.desc = updateTodo.desc;
            obj.name = updateTodo.name;
            obj.btn = true;
            response.render("index", { obj });
        } else {
            response.status(404).json({ message: "Invalid Todo Id" });
        }
    } else {
        response.status(404).json({ message: "Todo Array is Empty" });
    }


});



app.post("/update/:id", (request, response) => {
    if (TodoList.length) {

        console.log(request.body)
        const { name, desc } = request.body
        const id = request.params.id;
        console.log("In Post method of Update");
        // console.log(name);
        // console.log(desc);
        try {
            if (!desc || !name) {//when inputs are empty
                throw "Empty or Invalid Input";
            }
            else {
                let i = 0;
                for (; i < TodoList.length; i++) {
                    if (TodoList[i].id == id) {
                        break;
                    }
                    if (++i == TodoList.length) {//when todo with id not found
                        throw ("To-do with id:" + id + " not found");
                    }
                }
                TodoList[i].name = name;
                TodoList[i].desc = desc;
                response.status(200).json({ message: "Successfully updated" })
                // response.redirect(303, '/getTodos');
            }

        } catch (err) {
            response.status(406).json({ message: err });
        }
    } else {
        response.status(404).json({ message: "Todo Array is Empty" });
    }

})


app.listen(port, () => {
    console.log("Server is running on port" + port);
})