const { gql } = require("apollo-server-azure-functions");

const messageDefs = gql`
    extend type Query{
        messages: [Message!]!
        message(id:ID!): Message!
    }

    type Message{
        id: ID!
        text: String!
        user: User
    }

    type Response{
        user: User
        responseText: String
    }

   extend type Mutation{
        createMessage(text: String!, user_id: ID!): Message!
        deleteMessage(id: ID!): Response!
        updateMessage(id: ID!, text: String!): Response!
    }
`;

module.exports = messageDefs;