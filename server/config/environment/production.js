'use strict';
// Production specific configuration
// =================================
process.env.mongo_name = process.env.docker_mongo_name || 'localhost';

module.exports = {
  // Server IP 
  ip: process.env.IP ||
  undefined,

  // Server port
  port: process.env.PORT ||
  8080,

  //Domain url!
  domainUrl: 'http://www.example.com',

  // MongoDB connection options

  mongo: {
    uri: 'mongodb://' + process.env.mongo_name + '/cv'
  }
};
