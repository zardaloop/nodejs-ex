var port = process.env.PORT || process.env.OPENSHIFT_NODEJS_PORT || 8080;



// here is the deployment for the broker server.

var mosca = require('mosca');

var ascoltatore = {
  //using ascoltatore
  type: 'mongo',
  url: 'mongodb://userDTR:w5yPD1jh3ilDr0d3@mongodb/mqtt',
  pubsubCollection: 'feed',
  mongo: {
  }
};

var settings = {
  port: port
  //backend: ascoltatore,
  //persistence: {
  //  factory: mosca.persistence.Mongo,
  //  url: ascoltatore.url
  //}
};

var server = new mosca.Server(settings);

server.on('clientConnected', function(client) {
    console.log('client connected', client.id);
});

// fired when a message is received
server.on('published', function(packet, client) {
  //console.log('Published', packet.payload);
  //console.log('Client', client);
});

server.on('ready', setup);

// fired when the mqtt server is ready
function setup() {
  console.log('Broker server is up and running');
}
