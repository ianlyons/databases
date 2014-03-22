/* global exports, require */
var mysql = require('mysql');
var dbConfig = require('./dbConfig');
var srv = require('./persistent_server');

//helpers:
//add users
//add rooms
//get rooms
//get users

//generalized get/add that we can supply users/messages/rooms as args?



exports.addMessage = function(message){
  var date = new Date().toISOString().slice(0, 19).replace('T', ' ');
  dbConfig.dbConnection.query('INSERT INTO `messages` (`id`, `id_users`, `message_text`, `timestamp`, `id_rooms`, `username`) VALUES (NULL, NULL, '+dbConfig.dbConnection.escape(message.text)+', "'+ date +'", NULL, '+dbConfig.dbConnection.escape(message.username)+');');
};

exports.addUser = function(message){
  dbConfig.dbConnection.query('INSERT INTO `users`(`id`, `username`) VALUES (NULL'+dbConfig.dbConnection.escape(message.username)+');');
};

exports.addRoom = function(message){
  dbConfig.dbConnection.query('INSERT INTO `rooms`(`id`, `roomname`) VALUES (NULL'+dbConfig.dbConnection.escape(message.roomname)+');');
};

exports.getMessages = function(cb) {
  dbConfig.dbConnection.query('SELECT * FROM `messages`;', function(err, rows, fields) {
    if (err){ throw err; }
    //return rows;
    cb(rows);
  });
};

