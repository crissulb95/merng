const { model, Schema } = require('mongoose');

const postSchema = new Schema({
    created_at: String,
    body: String,
    username: String,
    comments: {
        created_at: String,
        body: String,
        username: String, 
    },
    likes:[
        {
            created_at: String,
            username: String,
        }
    ],
    user:{
        //Para utilizar mongoose, de modo que se cree cierto tipo de relación con otro schema
        type:Schema.Types.ObjectId,
        ref:'users'
    }
    //se podría utilizar el required pero esta acción se utilizará con GraphQL
});

module.exports = model('Post', postSchema);