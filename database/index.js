const connection = process.env.DATABASE_URL || 'postgres://postgres:postgres@localhost:5432/artists';

const knex = require('knex')({
  client: 'pg',
  connection,
});

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
  }
);

const processViews = view => {
  let host = [generateListingHost(view)];
  let listing = [generateListings(view)];
  knex.select('*')
    .from('users')
    .where({ user_id: host.hostId })
    .then((hostRow) => {
      if (hostRow.length > 0) {
        knex('users').where({});
      } else {
        knex('users').insert(host);
      }


    });
}

module.exports.knex = knex;
