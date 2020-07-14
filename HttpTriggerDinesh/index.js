const { ApolloServer, ApolloError }= require("apollo-server-azure-functions");
const cors = require('cors');
require('dotenv').config();
const {v4} = require('uuid');

const pool = require("./src/db");
const schema = require('./src/schema/index');
const resolvers = require('./src/resolvers/index');
const models = require('./src/models/index');

const messages = models.messages;
const users = models.users;

const server = new ApolloServer({typeDefs:schema, resolvers, context:({request}) => ({
    request,
    pool,
    me: '1',
    messages,
    users, 
    v4
})});

module.exports = server.createHandler({
    cors: {
        origin: '*',
        credentials: true,
    },
});