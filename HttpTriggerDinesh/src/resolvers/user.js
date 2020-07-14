const models = require('../models/index.js');
const { Connection } = require('pg');
const { indexOf } = require('./index.js');

const userResolvers = {
    Query: {
        //Returns all the messages for the 'me' user.
        me: async (parent, args, {me, pool}) => {
            // return me;
            const res = await pool.query("SELECT * FROM usr us,msg ms WHERE us.user_id = ms.user_id AND us.user_id= $1", [me]);
            let msgObj = {}
            let msgs = []
            res.rows.map(data => {
                msgObj = {
                    id: data.msg_id,
                    text: data.msg
                }
                msgs.push(msgObj)
                user ={
                    id: data.user_id,
                    username: data.uname,
                    messages: msgs
                }
            });
            return user;
        },

        //Returns the user id, user name and user messages based on the user_id in the arguments
        user: async (parent, {id}, {pool, users}) =>{
            // return users[id];
            const res = await pool.query("SELECT * FROM usr us,msg ms WHERE us.user_id = ms.user_id AND us.user_id= $1", [id]);
            let msgObj = {}
            let msgs = []
            res.rows.map(data => {
                msgObj = {
                    id: data.msg_id,
                    text: data.msg
                }
                msgs.push(msgObj)
                user ={
                    id: data.user_id,
                    username: data.uname,
                    messages: msgs
                }
            });
            return user;
        },

        //Returns the list of all users with their respective messages.
        users:async (parent, args, {pool,users}) => {
            // return Object.values(users);
            const countUser = await pool.query("select count(user_id) from usr");
            let userList = []
            for(let i = 1;i<=countUser.rows[0].count;i++){
                const res = await pool.query("SELECT * FROM usr us,msg ms WHERE us.user_id = ms.user_id AND us.user_id= $1", [i]);
                let msgObj = {}
                let msgs = []
                let user = {}
                res.rows.map(data => {
                    msgObj = {
                        id: data.msg_id,
                        text: data.msg
                    }
                    msgs.push(msgObj)
                    user ={
                        id: data.user_id,
                        username: data.uname,
                        messages: msgs
                    }
                });
                userList.push(user);
            }
            return userList;
        }   
    }
};

module.exports = userResolvers;