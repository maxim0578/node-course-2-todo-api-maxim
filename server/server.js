var express = require('express');
var bodyParser = require('body-parser');

var {mongoose} = require('./db/mongoose');
var {Todo} = require('./models/todo');
var {User} = require('./models/user');
const {ObjectID} = require('mongodb');
var app = express();

app.use(bodyParser.json());

app.post('/todos', (req, res) => {
  var todo = new Todo({
    text: req.body.text
  });

  todo.save().then((doc) => {
    res.send(doc);
  }, (e) => {
    res.status(400).send(e);
  });
});

//get
app.get('/todos',(req,res)=>{
  Todo.find().then((anyname)=>{
      res.send({anyname});
  },(err)=>{
    res.status(400).send();
  });
});

//deleteOne
app.delete('/todos/:id',(req,res)=>{
  var id = req.params.id;
  console.log(id);
  if(!ObjectID.isValid(id)){
    return res.status(400).send();
  };

  Todo.findByIdAndRemove(id).then((result)=>{
    if(!result){
      return res.status(400).send();
    }
    res.send(result);
  },(err)=>{
    console.log(err);
  }).catch((err)=>{console.log(err);});
});

app.listen(3000, () => {
  console.log('Started on port 3000');
});

module.exports = {app};
