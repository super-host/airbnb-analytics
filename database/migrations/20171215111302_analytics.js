
exports.up = (knex, Promise) => {
  return Promise.all([
    knex.schema.createTable('hosts', (table) => {
      table
        .increments('id')
        .unsigned()
        .primary();
      table
        .integer('host_id')
        .unsigned()
        .unique();
      table.boolean('superhost');
    }),
    knex.schema.createTable('listings', (table) => {
      table.increments('id')
        .unsigned()
        .primary();
      table
        .integer('listing_id')
        .unsigned()
        .unique();
      table.string('city');
      table.float('rating');
      table
        .integer('price')
        .unsigned();
      table.string('accomodation_type');
      table.integer('beds');
    }),
    knex.schema.createTable('bookingsviewings', (table) => {
      table
        .increments('id')
        .unsigned()
        .primary();
      table.string('date');
      table
        .integer('listing_id')
        .unsigned()
        .references('listing_id')
        .inTable('listings');
      table
        .integer('host_id')
        .unsigned()
        .references('host_id')
        .inTable('hosts');
      table
        .integer('bookings')
        .unsigned()
        .defaultTo(0);
      table
        .integer('viewings')
        .unsigned()
        .defaultTo(0);
    }),
  ]);
};

exports.down = (knex, Promise) => {
  return (
    knex.schema
      .dropTable('users')
      .dropTable('listings')
      .dropTable('bookingsviewings')
  );
};
