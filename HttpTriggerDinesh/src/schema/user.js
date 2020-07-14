const { gql } = require("apollo-server-express");

const userDefs= gql`
    extend type Query{
        me: User
        user(id: ID!): User
        users:[User!]
    }
    
    type User{
        id: ID!
        username: String!
        messages: [Message!]
    }
`;

module.exports = userDefs;