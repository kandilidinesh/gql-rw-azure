let users = {
    1: {
        id: '1',
        username: 'Dinesh',
        messageIds: [1]
    },
    2:{
        id:'2',
        username: 'Magesh',
        messageIds: [2]
    }
};

let messages = {
    1: {
      id: '1',
      text: 'Hello World',
      userId: '1'
    },
    2: {
      id: '2',
      text: 'By World',
      userId: '2'
    },
};

module.exports = {users, messages};