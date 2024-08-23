const { Schema, model } = require('mongoose')

const todoSchema = new Schema({
    title: String,
    complete: { type: Boolean, default: false },
    deadline: { 
        type: Date, 
        default: function() { 
            return new Date(Date.now() + 1000 * 3600 * 24)
        } 
     },
    executor: { type: Schema.Types.ObjectId, ref: 'User' }
},{
    versionKey: false,
  });

const Todo = model('Todo', todoSchema);
module.exports = Todo