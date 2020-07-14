const { users } = require("../models");

const messageResolvers = {
    Query: {
        //Returns all the messages with the user_id for the message
        messages: async (parent, args, {pool, messages}) => {
            // return Object.values(messages);
            const res = await pool.query("SELECT * FROM usr us,msg ms WHERE us.user_id = ms.user_id");
            let msgObj = {}
            let msgs = []
            let usrs = []
            let usrObj = {}
            res.rows.map(data => {
                usrObj = {
                    id: data.user_id,
                    username: data.uname
                }
                msgObj = {
                    id: data.msg_id,
                    text: data.msg,
                    user: usrObj
                }
                msgs.push(msgObj)
            });
            console.log(msgs)
            return msgs;

        },

        //Returns the message using the message ID 
        message: async (parent, {id}, {messages,pool}) =>  {
            // return messages[id];
            const res = await pool.query(`select us.user_id, us.uname, ms.msg_id, ms.msg from usr us, msg ms where us.user_id=ms.user_id AND ms.msg_id=${id}`);
            let details = {}
            let usrObj =[]
            res.rows.map(data => {
                user={
                    id:data.user_id,
                    username:data.uname
                }
                usrObj.push(user);
                details={
                    id:data.msg_id,
                    text:data.msg,
                    user: usrObj
                }
            });
            console.log(details);
            return details;
        }
    },
    Mutation:{
        //Creates a message based on the user_id
        createMessage: async (parent, {text, user_id}, {me, pool, users, messages, v4}) => {
            // const id = v4();
            // const message = {
            //     id,
            //     text,
            //     userId: me.id
            // };

            // messages[id] = message;
            // users[me.id].messageIds.push(id);

            // return message;
            const res =  await pool.query("INSERT INTO msg(msg, user_id) VALUES ($1, $2) RETURNING *", [text, user_id]);
            res.rows.map(data => {
                msg={
                    id: data.msg_id,
                    text: data.msg
                }
            });
            return msg;
        },

        //Deletes a message based on message id
        deleteMessage: async (parent, {id}, {pool,  users, messages}) => {
            // const { [id]: message, ...otherMessages} = messages;

            // if(!message){
            //     return false;
            // }

            // console.log(otherMessages);
            // //Input: mutation{deleteMessage(id:"1")} Output: { '2': { id: '2', text: 'By World', userId: '2' } }
            // messages = otherMessages;

            // return true;
            const res = await pool.query("DELETE FROM msg WHERE msg_id=$1 RETURNING *", [id]);
            if(res.rowCount == 0){
                return {responseText:"Message does not exist!"}
            }
            console.log(res)
            const userID = res.rows[0].user_id;
            const resTrue = await pool.query("SELECT * FROM usr us,msg ms WHERE us.user_id = ms.user_id AND us.user_id= $1", [userID]);
            let msgObj = {}
            let msgs = []
            let response = {}
            resTrue.rows.map(data => {
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
                response = {
                    user: user,
                    responseText: "Deletion Successful!"
                }
            });
            return response;

        },


        updateMessage: async (parent, {id, text,  users, messages}, {pool}) => {
            // const {[id]:message, ...otherMessages} = messages;
            // console.log(message);
            // if(!message){
            //     return false;
            // }
            
            // message.text = text;

            // return true;
            const res = await pool.query("UPDATE msg SET msg = $1 WHERE msg_id = $2 RETURNING *", [text, id]);
            console.log(res)
            if(res.rowCount == 0){
                return {responseText:"Message ID not exist!"}
            }
            console.log(res)
            const userID = res.rows[0].user_id;
            const resTrue = await pool.query("SELECT * FROM usr us,msg ms WHERE us.user_id = ms.user_id AND us.user_id= $1", [userID]);
            let msgObj = {}
            let msgs = []
            let response = {}
            resTrue.rows.map(data => {
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
                response = {
                    user: user,
                    responseText: "Deletion Successful!"
                }
            });
            return response;
        }
    },

    Message:{
        user: (message, args, {users, messages}) => {
            return users[message.userId];
        }
    },
};

module.exports = messageResolvers;