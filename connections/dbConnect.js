const { Client } = require('pg');

const client = new Client({
  connectionString: "postgres://jqkontfnvrsaaf:9386ba36b3095f7e2178981bde59753f9c5e09f43dcba31c8dfdbbc6e1e06844@ec2-54-83-17-151.compute-1.amazonaws.com:5432/d3k5hh7b0t958o",
  ssl: true,
});

client.connect(function(err) {
    if (err) throw err;
});

module.exports = client;