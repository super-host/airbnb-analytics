
exports.up = (knex, Promise) => (
  knex.schema.table('bookingsviewings', (t) => {
    t.index(['date']);
    t.index(['listing_id']);
  })
);

exports.down = (knex, Promise) => (
  knex.schema.table('bookingsviewings', (t) => {
    t.dropIndex(['index']);
    t.dropIndex(['listing_id']);
  })
);