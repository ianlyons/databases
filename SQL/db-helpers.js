/* global exports, require */
var mysql = require('mysql');
var srv = require('./persistent_server');

//helpers:
//get messages from db
//add users
//add rooms
//add messages
//get rooms
//get users

//generalized get/add that we can supply users/messages/rooms as args?



exports.addMessage = function(message){
  var date = new Date().toISOString().slice(0, 19).replace('T', ' ');
  srv.dbConnection.query('INSERT INTO `messages` (`id`, `id_users`, `message_text`, `timestamp`, `id_rooms`, `username`) VALUES (NULL, NULL, '+srv.dbConnection.escape(message.text)+', "'+ date +'", NULL, '+srv.dbConnection.escape(message.username)+');');
};

exports.addUser = function(message){
  srv.dbConnect.query('INSERT INTO `users`(`id`, `username`) VALUES (NULL'+srv.dbConnection.escape(message.username)+');');
};

exports.addRoom = function(message){
  srv.dbConnect.query('INSERT INTO `rooms`(`id`, `roomname`) VALUES (NULL'+srv.dbConnection.escape(message.roomname)+');');
};

