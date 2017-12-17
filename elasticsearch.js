// const elasticsearch = require('elasticsearch');

// const elasticClient = new elasticsearch.Client({
//   host: 'localhost:9200',
//   log: 'info',
// });

// const indexName = 'bookingsviewings';

// /**
// * Delete an existing index
// */
// const deleteIndex = () => (
//   elasticClient.indices.delete({
//     index: indexName,
//   })
// );


// /**
// * create the index
// */
// const initIndex = () => (
//   elasticClient.indices.create({
//     index: indexName,
//   })
// );


// /**
// * check if the index exists
// */
// const indexExists = () => (
//   elasticClient.indices.exists({
//     index: indexName,
//   })
// );


// const initMapping = () => (
//   elasticClient.indices.putMapping({
//     index: indexName,
//     type: 'document',
//     body: {
//       properties: {
//         date: { type: 'string' },
//         listing_id: { type: 'string' },
//         host_id: { type: 'string' },
//         bookings: { type: 'integer' },
//         viewings: { type: 'integer' },
//         suggest: {
//           type: 'completion',
//           analyzer: 'simple',
//           search_analyzer: 'simple',
//           payloads: true,
//         },
//       },
//     },
//   })
// );

// const addDocument = document => (
//   elasticClient.index({
//     index: indexName,
//     type: 'document',
//     body: {
//       date: document.date,
//       listing_id: document.listing_id,
//       host_id: document.host_id,
//       bookings: document.bookings,
//       viewings: document.viewings,
//       suggest: {
//         input: document.title.split(' '),
//         output: document.title,
//         payload: document.metadata || {},
//       },
//     },
//   })
// );

// const getSuggestions = input => (
//   elasticClient.suggest({
//     index: indexName,
//     type: 'document',
//     body: {
//       docsuggest: {
//         text: input,
//         completion: {
//           field: 'suggest',
//           fuzzy: true,
//         },
//       },
//     },
//   })
// );

// exports.getSuggestions = getSuggestions;
// exports.deleteIndex = deleteIndex;
// exports.initIndex = initIndex;
// exports.indexExists = indexExists;
// exports.initMapping = initMapping;
// exports.addDocument = addDocument;
