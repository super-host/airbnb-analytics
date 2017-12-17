const connection = process.env.DATABASE_URL || 'postgres://postgres:postgres@localhost:5432/analytics';

const knex = require('knex')({
  client: 'pg',
  connection,
});

const generateListingHost = view => (
  {
    host_id: view.hostId,
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
    beds: view.beds,
  }
);

const addView = view => (
  {
    date: view.createdAt,
    listing_id: view.listingId,
    host_id: view.hostId,
  }
);

const manageView = (data) => {
  const host = generateListingHost(data);
  const insert = (tableName, entry) => (knex(tableName).insert(entry).toString());
  const view = addView(data);
  return knex.raw(`${insert('hosts', host)} on conflict (host_id) do update set superhost = ${host.superhost}`)
    .then(() => {
      const listing = generateListings(data);
      return knex.raw(`${insert('listings', listing)} on conflict (listing_id) do nothing`);
    })
    .then(() => (
      knex('bookingsviewings')
        .where({
          date: view.date,
          listing_id: view.listing_id,
        })
        .select()
    ))
    .then((result) => {
      if (result.length > 0) {
        return knex('bookingsviewings')
          .where({
            date: view.date,
            listing_id: view.listing_id,
          })
          .increment('viewings', 1);
      } else {
        return knex.raw(`${insert('bookingsviewings', view)}`);
      }
    });
};

const addBookCount = data => (
  knex('bookingsviewings')
    .where({
      date: data.createdAt,
      listing_id: data.listingId,
    })
    .increment('bookings', 1)
);

module.exports.knex = knex;
module.exports.manageView = manageView;
module.exports.addBookCount = addBookCount;

