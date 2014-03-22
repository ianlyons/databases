/* global exports, require */
var mysql = require('mysql');
// var dbConfig = require('./dbConfig');
var srv = require('./persistent_server');
var Sequelize = require("sequelize");
var sequelize = new Sequelize("chat2", "root");

sequelize
  .authenticate()
  .complete(function(err) {
    if(!!err) {
      console.log('Unable to connect to the database: ', err);
    } else {
      console.log('Connection has been established successfully!');
    }
  });

//helpers:
//add users
//add rooms
//get rooms
//get users

//generalized get/add that we can supply users/messages/rooms as args?

var Message = sequelize.define('Message', {
  roomname: Sequelize.STRING,
  username: Sequelize.STRING,
  text: Sequelize.STRING
});

sequelize
  .sync()
  .complete(function(err) {
    if(!!err) {
      console.log('An error occurred while creating the table:' , err);
    } else {
      console.log('The table was created successfully!');
    }
  });



exports.addMessage = function(message){
  var message = Message.build({
    text: message.text,
    username: message.username
  });

  message
    .save()
    .complete(function(err) {
      if(!!err) {
        console.log('The instance has not been saved. Error:', err);
      } else {
        console.log('The instance has been saved successfully.');
      }
    });
};

// exports.addUser = function(message){
//   dbConfig.dbConnection.query('INSERT INTO `users`(`id`, `username`) VALUES (NULL'+dbConfig.dbConnection.escape(message.username)+');');
// };

// exports.addRoom = function(message){
//   dbConfig.dbConnection.query('INSERT INTO `rooms`(`id`, `roomname`) VALUES (NULL'+dbConfig.dbConnection.escape(message.roomname)+');');
// };

exports.getMessages = function(cb) {
  Message
    .findAll()
    .complete(function(err, messages){
      if(!!err){
        console.log('An error occured while searching for messages: ', err);
      } else if (!messages){
        console.log('no messages we found');
      } else {
        console.log('bingo!');
        cb(messages);
      }
    });

  // dbConfig.dbConnection.query('SELECT * FROM `messages`;', function(err, rows, fields) {
  //   if (err){ throw err; }
  //   //return rows;
  //   cb(rows);
  // });
};

