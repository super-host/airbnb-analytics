const momentRandom = require('moment-random');

const type = ['Apartment', 'Condominium', 'Guesthouse', 'House'];
const city = ['San Francisco', 'New York', 'Los Angeles', 'Lisbon', 'Barcelona',
              'London', 'Shanghai', 'Portland', 'Seattle', 'Seoul', 'Bangkok', 'Paris',
              'Berlin', 'Moscow', 'Dublin', 'Dubai', 'Mexico City', 'Peru', 'Miami',
              'Rome', 'Antalya', 'Kuala Lumpur', 'Istanbul', 'Hong Kong', 'Singapore'];

const bookingBias = (view) => {
  let bookingCount = Math.floor(Math.random() * 1000);
  if (view.superhostStatus) {
    bookingCount += 150;
  }
  return bookingCount;
};

module.exports = {
  generateListingHost: view => (
    {
      host_id: view.hostId,
      superhost: view.superhostStatus,
    }
  ),
  generateListings: view => (
    {
      listing_id: view.listingId,
      city: view.city,
      rating: view.rating,
      price: view.price,
      accomodation_type: view.accomodationType,
      beds: view.beds,
    }
  ),
  addView: view => (
    {
      date: view.createdAt,
      listing_id: view.listingId,
      host_id: view.hostId,
      viewings: Math.floor(Math.random() * 100000),
      bookings: bookingBias(view),
    }
  ),
  View: num => (
    {
      createdAt: momentRandom('2017-12-13', '2017-12-03').format('l'),
      listingId: num,
      hostId: num,
      superhostStatus: Math.random() >= 0.5,
      city: city[Math.floor(Math.random() * 25)],
      rating: (Math.random() * 5).toFixed(1),
      accomodationType: type[Math.floor(Math.random() * 4)],
      beds: Math.floor(Math.random() * 11) + 1,
      price: Math.floor(Math.random() * (1000 - 49)) + 50,
    }
  ),
  addNewView: view => (
    {
      date: view.createdAt,
      listing_id: view.listingId,
      host_id: view.hostId,
      viewings: 1,
    }
  ),
};

