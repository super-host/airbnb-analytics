const momentRandom = require('moment-random');
const dp = require('../data_proccess.js');
const knex = require('knex')({
  client: 'pg',
  connection: 'postgres://postgres:postgres@localhost:5432/analytics',
});

const seedingPromises = () => {
  const result = [];
  for (let i = 10000006; i <= 10000007; i++) {
    result.push(dp.View(i));
    if (i % 50000 === 0) {
      console.log('Done generating ', i, ' entries');
    }
  }
  console.log('Done generating entries');
  knex.transaction((tr) => {
    const hostsRows = [];
    console.log('starting to create hostsRows');
    result.forEach((entry) => {
      hostsRows.push(dp.generateListingHost(entry));
    });
    console.log('Done creating hostsRows');
    return knex.batchInsert('hosts', hostsRows)
      .transacting(tr);
  })
    .then(() => {
      console.log('hosts entry completed!');
    }).then(() => {
      return knex.transaction((tr) => {
        const listingsRows = [];
        console.log('starting to create listingsRows');
        result.forEach((entry) => {
          listingsRows.push(dp.generateListings(entry));
        });
        console.log('Done creating listingsRows');
        return knex.batchInsert('listings', listingsRows)
          .transacting(tr);
      });
    })
    .then(() => {
      console.log('listings entry completed!');
    })
    .then(() => {
      return knex.transaction((tr) => {
        const bookingsViewingsRows = [];
        console.log('starting to create bookingsViewingsRows');
        result.forEach((entry) => {
          bookingsViewingsRows.push(dp.addView(entry));
        });
        console.log('Done creating bookingsViewingsRows');
        return knex.batchInsert('bookingsviewings', bookingsViewingsRows)
          .transacting(tr);
      });
    }).then(() => {
      console.log('bookingsViewings entry completed!');
    });
};

seedingPromises();

