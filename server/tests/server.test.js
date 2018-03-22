const expect = require('expect');
const request = require('supertest');

const {app} = require('./../server');
const {Todo} = require('./../models/todo');

const todos = [{text:'First todos'},{text:'Second todos'},{text:'Third todos'}];

// beforeEach((done)=>{
//   Todo.remove({}).then(()=>done())
// });

beforeEach((done)=>{
   Todo.remove({}).then(()=>{
     return Todo.insertMany(todos);
   }).then(()=>done());
 });

describe('POST/todos', ()=>{
    it('should create a new todo',(done)=>{
      var text = 'First todos';
      request(app)
        .post('/todos')
        .send({text})
        .expect(200)
        .expect((res) =>{
          expect(res.body.text).toBe(text)
        })
        .end((err,res)=>{
          if(err){
            return done(err);
          }

          Todo.find().then((todos)=>{
            expect(todos.length).toBe(4);
            expect(todos[0].text).toBe(text);
            done();
          }).catch((e)=>{done(e)});
        });
    });

    it('should not create a new todo with invalid body data',(done)=>{
          request(app)
          .post('/todos')
          .send({})
          .expect(400)
          .end((err,res)=>{
              if(err){
                console.log('err' + err);
                return done(err);
              }
              Todo.find().then((todos)=>{
                expect(todos.length).toBe(3);
                console.log('Test' + res);
                done();
              }).catch((e)=>{done(e)});
          });
    });
});

describe('GET/todos', ()=>{
  it('should get all todos',(done)=>{
    request(app)
    .get('/todos')
    .expect(200)
    .expect((res)=>{
      expect(res.body.length).toBe(3);
    })
    .end(done());
});
});
