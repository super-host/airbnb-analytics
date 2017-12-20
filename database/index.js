const connection = process.env.DATABASE_URL || 'postgres://postgres:postgres@localhost:5432/analytics';
const dp = require('./data_proccess.js');

const knex = require('knex')({
  client: 'pg',
  connection,
});


async function manageView(data) {
  const host = dp.generateListingHost(data);
  const listing = dp.generateListings(data);
  const view = dp.addNewView(data);
  const insert = (tableName, entry) => (knex(tableName).insert(entry).toString());
  let updateHost = await knex.raw(`${insert('hosts', host)} on conflict (host_id) do update set superhost = ${host.superhost}`);
  let updateListing = await knex.raw(`${insert('listings', listing)} on conflict (listing_id) do nothing`);
  let checkViewEntry = await knex('bookingsviewings')
                               .where({ 
                                date: view.date, 
                                listing_id: view.listing_id, 
                                })
                               .select()
  let editEntry;
  if (checkViewEntry.length > 0) {
    editEntry = await knex('bookingsviewings')
                        .where({
                          date: view.date,
                          listing_id: view.listing_id,
                        })
                        .increment('viewings', 1);
  } else {
    editEntry = await knex.raw(`${insert('bookingsviewings', view)}`);
  }
  return updateHost + updateListing + checkViewEntry + editEntry;

}


async function addBookCount(data) {
  return await knex('bookingsviewings')
                .where({
                  date: data.createdAt,
                  listing_id: data.listingId,
                })
                .increment('bookings', 1);
};


module.exports.knex = knex;
module.exports.manageView = manageView;
module.exports.addBookCount = addBookCount;

