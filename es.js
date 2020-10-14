// Example comes from https://github.com/elastic/elasticsearch-js/blob/master/docs/examples/typescript.asciidoc
'use strict'

const fs = require('fs');
const { Client } = require('@elastic/elasticsearch')
const client = new Client({
  node: 'https://elasticsearch-sample-es-http.default.svc:9200',
  
  maxRetries: 5,
  requestTimeout: 60000,
  sniffOnStart: true,

  auth: {
    username: 'elastic',
    password: process.env.ELASTIC_PASSWORD,
  },

  ssl: {
    ca: fs.readFileSync('/etc/ssl/elastic/ca.crt'),
    rejectUnauthorized: true,
  },
})

async function run () {
  // Let's start by indexing some data
  await client.index({
    index: 'game-of-thrones',
    // type: '_doc', // uncomment this line if you are using Elasticsearch ≤ 6
    body: {
      character: 'Ned Stark',
      quote: 'Winter is coming.'
    }
  })

  await client.index({
    index: 'game-of-thrones',
    // type: '_doc', // uncomment this line if you are using Elasticsearch ≤ 6
    body: {
      character: 'Daenerys Targaryen',
      quote: 'I am the blood of the dragon.'
    }
  })

  await client.index({
    index: 'game-of-thrones',
    // type: '_doc', // uncomment this line if you are using Elasticsearch ≤ 6
    body: {
      character: 'Tyrion Lannister',
      quote: 'A mind needs books like a sword needs a whetstone.'
    }
  })

  // here we are forcing an index refresh, otherwise we will not
  // get any result in the consequent search
  await client.indices.refresh({ index: 'game-of-thrones' })

  // Let's search!
  const { body } = await client.search({
    index: 'game-of-thrones',
    // type: '_doc', // uncomment this line if you are using Elasticsearch ≤ 6
    body: {
      query: {
        match: { quote: 'winter' }
      }
    }
  })

  console.log(body.hits.hits)
}

run().catch(console.log)
