const faker = require('faker');
const momentRandom = require('moment-random');
// const pg = require('pg');
const knex = require('knex')({
  client: 'pg',
  connection: 'postgres://postgres:postgres@localhost:5432/analytics',
});

// const conString = 'postgres://postgres:postgres@localhost:5432/analytics';
// const client = new pg.Client(conString);
// client.connect();

const type = ['Apartment', 'Condominium', 'Guesthouse', 'House'];

const generateListingHost = view => (
  {
    user_id: view.hostId,
    superhost: view.superhostStatus,
  }
);

const generateListings = view => (
  {
    listing_id: view.listingId,
    city: view.city,
    rating: view.rating,
    price: view.price,
    accomodation_type: view.accomodationType,
  }
);

const addView = view => (
  {
    date: view.createdAt,
    listing_id: view.listingId,
    user_id: view.hostId,
    viewings: Math.floor(Math.random() * 100000),
    bookings: Math.floor(Math.random() * 1000),
  }
);


const View = num => (
  {
    createdAt: momentRandom('2017-12-13', '2017-12-03').format('l'),
    listingId: num,
    hostId: num,
    superhostStatus: Math.random() >= 0.5,
    city: faker.address.city(),
    rating: (Math.random() * 6).toFixed(1),
    accomodationType: type[Math.floor(Math.random() * 4)],
    beds: Math.floor(Math.random() * 11) + 1,
    price: Math.floor(Math.random() * (1000 - 49)) + 50,
  }
);


const seedingPromises = () => {
  let result = [];
  for (let i = 10000000; i < 10000006; i++) {
    result.push(View(i));
    if (i % 50000 === 0) {
      console.log('Done generating ', i, ' entries');
    }
  }
  console.log('Done generating entries');
  knex.transaction((tr) => {
    const usersRows = [];
    console.log('starting to create usersRows');
    result.forEach((entry) => {
      usersRows.push(generateListingHost(entry));
    });
    console.log('Done creating usersRows');
    return knex.batchInsert('users', usersRows)
      .transacting(tr);
  })
    .then(() => {
      console.log('users entry completed!');
    }).then(() => {
      return knex.transaction((tr) => {
        const listingsRows = [];
        console.log('starting to create listingsRows');
        result.forEach((entry) => {
          listingsRows.push(generateListings(entry));
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
          bookingsViewingsRows.push(addView(entry));
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

