const { Schema, model } = require('mongoose')

const userSchema = new Schema({
    name: String,
    phone: String,
},{
    versionKey: false,
    timestamps: true 
  });

const User = model('User', userSchema);
module.exports = User