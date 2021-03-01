const { model, Schema } = require('mongoose');

const userSchema = new Schema({
    created_at: String,
    username: String,
    password: String,
    email: String,
    //se podría utilizar el required pero esta acción se utilizará con GraphQL
});

module.exports = model('User', userSchema);