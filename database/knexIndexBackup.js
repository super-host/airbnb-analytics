
// exports.up = (knex, Promise) => (
//   knex.schema.table('bookingsviewings', (t) => {
//     t.index(['date']);
//   })
// );

// exports.down = (knex, Promise) => (
//   knex.schema.table('bookingsviewings', (t) => {
//     t.dropIndex(['index']);
//   })
// );



// exports.up = (knex, Promise) => (
//   Promise.all([
//     knex.schema.table('hosts', (t) => {
//       t.index(['host_id']);
//     }),
//     knex.schema.table('listings', (t) => {
//       t.index(['listing_id']);
//     }),
//   ])
// );

// exports.down = (knex, Promise) => (
//   Promise.all([
//     knex.schema.table('hosts', (t) => {
//       t.dropIndex(['host_id']);
//     }),
//     knex.schema.table('listings', (t) => {
//       t.dropIndex(['listing_id']);
//     }),
//   ])
// );
