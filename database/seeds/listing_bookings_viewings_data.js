const viewSample = require('../sample_data/views.js');
const bookingSample = require('../sample_data/bookings.js');


const generateListingHost = (knex, view) => (
  knex('users').insert({
    user_id: view.hostId,
    superhost: view.superhostStatus,
  })
);

const generateListings = (knex, view) => (
  knex('listings').insert({
    listing_id: view.listingId,
    city: view.city,
    rating: view.rating,
    price: view.price,
    accomodation_type: view.accomodationType,
  })
);

const addView = (knex, view) => (
  knex('bookingsviewings').insert({
    date: view.createdAt,
    listing_id: view.listingId,
    user_id: view.hostId,
    viewings: 1,
  })
);

const addBooking = (knex, booking) => (
  knex('bookingsviewings')
    .where({
      'date': booking.createdAt,
      'listing_id': booking.listingId,
    })
    .update({
      'bookings': knex.raw('bookings + 1'),
    })
);

exports.seed = (knex, Promise) => (
  // Deletes ALL existing entries
  knex('users')
    .del()
    .then(() => (
      knex('listings').del()
    ))
    .then(() => (
      knex('bookingsviewings').del()
    ))
    .then(() => {
      // Inserts seed entries
      const seedPromises = [];
      viewSample.forEach((view) => {
        seedPromises.push(generateListingHost(knex, view));
        seedPromises.push(generateListings(knex, view));
        seedPromises.push(addView(knex, view));
      });
      bookingSample.forEach((booking) => {
        seedPromises.push(addBooking(knex, booking));
      });
      return Promise.all(seedPromises);
    })
);
