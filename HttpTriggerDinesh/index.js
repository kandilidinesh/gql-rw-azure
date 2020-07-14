// const express = require('express');
// const {ApolloServer, gql} = require('apollo-server-express');
import { ApolloServer, ApolloError } from "apollo-server-azure-functions";
const cors = require('cors');
require('dotenv').config();
const {v4} = require('uuid');

const pool = require("./db");
const schema = require('./schema/index');
const resolvers = require('./resolvers/index');
const models = require('./models/index');

const messages = models.messages;
const users = models.users;

// const app = express();

// app.use(cors());

// const server = new ApolloServer({typeDefs:schema, resolvers, context: {me: users[1]}});
const server = new ApolloServer({typeDefs:schema, resolvers, context:({request}) => ({
    request,
    pool,
    me: '1',
    messages,
    users, 
    v4
})});

export default server.createHandler({
    cors: {
        origin: '*',
        credentials: true,
    },
});
// server.applyMiddleware({ app, path: '/graphql' });

// app.listen({port: 8000}, () => {
//     console.log(`Apollo Server is running on port http://localhost:8000/graphql`);
// });