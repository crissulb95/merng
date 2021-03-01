/**Apollo Server es un servidor GraphQL de código abierto que cumple con las especificaciones, y es compatible con cualquier cliente GraphQL, incluido Apollo Client. Es la mejor manera de crear una API GraphQL autodocumentada y lista para producción que pueda usar datos de cualquier fuente. */
const { ApolloServer } = require('apollo-server');
const gql = require('graphql-tag'); //GraphQL types
const mongoose = require('mongoose');
require('dotenv').config();

const Post = require('./src/models/Post');

const { MONGODB } = require('./config');

/**Será la definición los tipos de dato que devolverá graphQL, cuando se le llame
 *      -(!) Signo de exclamación indica que es requerido (REQUIRED)
 * 
 *      Ej. 
 * type Query{
        saludo: String!
    }
 */
const typeDefs = gql`
    type Post{
        id: ID!,
        body: String!,
        created_at: String!,
        username: String!
    }

    type Query{
        getPosts:[Post]
    }
`;

/**Por cada query, mutation o subscription debe haber un resolver
 * Procesa cierto tipo de lógica para que retorne la información necesaria
 * 
 * Ej. 
 * Query: {
        saludo: () => 'Prueba inicial con GraphQL'
    }
 */
const resolvers = {
    Query: {
        async getPosts() {
            try {
                const posts = await Post.find(); 
                //Si no se especifica nada dentro de find, traerá todo lo asociado al modelo
                return posts;
            } catch (error) {
                console.log(error);
                throw new Error(error);
            }
        }
    }
}

const server = new ApolloServer({
    typeDefs, resolvers
});

mongoose.connect( MONGODB, { useNewUrlParser:true, useUnifiedTopology: true })
.then(() => {
    console.log('|-| -- Base de datos CONECTADA -- |-|')
    return server.listen({ port:3005 }) //Server levantado, mostrando UI de graphQL 
})
.then( res => {
    console.log(`Servidor ejecutando en url ${res.url}`)
})
.catch( err => {
    console.log(`Ha ocurrido un error al intentar conectar a la DB: ${err}`)
});
