'use strict';

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
    options.tableName = 'Spots';
    return queryInterface.bulkInsert(options, [
      {
        address: "399 abc",
        city: "Monterey",
        state: "California",
        country: "United States",
        lat: 45.9998,
        lng: -9.8888,
        name: "Cliff House~Big Sur Coast",
        description: "Stunning Ocean Views. Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
        price: 899.99,
        ownerId: 1,
      },
      {
        address: "22 sub",
        city: "Orlando",
        state: "Florida",
        country: "United States",
        lat: 114.5556,
        lng: 2.4445,
        name: "Guest Suite",
        description: "Comfy studio 5 min from Airport.",
        price: 70.99,
        ownerId: 2,
      },
      {
        address: "33 Congee",
        city: "Orlando",
        state: "Florida",
        country: "United States",
        lat: 554.999,
        lng: 22.6666,
        name: "Magic KingDom Castle",
        description: "luxury suite",
        price: 1099,
        ownerId: 3,
      },
      {
        address: "14250 Knob Hills",
        city: "Tampa",
        state: "Florida",
        country: "United States",
        lat: 89.3345,
        lng: 9.1112,
        name: "Busch Garden Hotel",
        description: "Unforgettable night",
        price: 50,
        ownerId: 3,
      },
      {
        address: "22 sub",
        city: "Philadelphia",
        state: "Pennsylvania",
        country: "United States",
        lat: 114.5556,
        lng: 2.4445,
        name: "Countryside House",
        description: "Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur",
        price: 70.99,
        ownerId: 4,
      },
      {
        address: "225 captain el",
        city: "El Paso",
        state: "California",
        country: "United States",
        lat: 114.5556,
        lng: 2.4445,
        name: "A Frame Kit Home",
        description: "Nam libero tempore, cum soluta nobis est eligendi optio cumque nihil impedit quo minus id quod maxime placeat facere possimus, omnis voluptas assumenda est, omnis dolor repellendus.",
        price: 899.99,
        ownerId: 5,
      },
      {
        address: "456 Elm St",
        city: "New York",
        state: "New York",
        country: "United States",
        lat: 40.7128,
        lng: -74.0060,
        name: "Penthouse Suite",
        description: "Stunning penthouse with panoramic city views.",
        price: 2000,
        ownerId: 3,
      },
      {
        address: "789 Oak St",
        city: "San Francisco",
        state: "California",
        country: "United States",
        lat: 37.7749,
        lng: -122.4194,
        name: "Cozy Cottage",
        description: "Charming cottage in a peaceful neighborhood.",
        price: 500,
        ownerId: 4,
      },
      {
        address: "789 Elm St",
        city: "Chicago",
        state: "Illinois",
        country: "United States",
        lat: 41.8781,
        lng: -87.6298,
        name: "Urban Loft",
        description: "Modern loft in the heart of the city.",
        price: 800,
        ownerId: 3,
      },
      {
        address: "555 Pine St",
        city: "Seattle",
        state: "Washington",
        country: "United States",
        lat: 47.6062,
        lng: -122.3321,
        name: "Waterfront Condo",
        description: "Beautiful condo with stunning waterfront views.",
        price: 1200,
        ownerId: 5,
      },
      {
        address: "222 Maple Ave",
        city: "Austin",
        state: "Texas",
        country: "United States",
        lat: 30.2672,
        lng: -97.7431,
        name: "Private Ranch",
        description: "Escape to this secluded ranch surrounded by nature.",
        price: 1000,
        ownerId: 1,
      },
      {
        address: "123 Broadway",
        city: "San Diego",
        state: "California",
        country: "United States",
        lat: 32.7157,
        lng: -117.1611,
        name: "Beachfront Bungalow",
        description: "Quaint bungalow steps away from the beach.",
        price: 600,
        ownerId: 2,
      },
      {
        address: "456 Cherry Ave",
        city: "Denver",
        state: "Colorado",
        country: "United States",
        lat: 39.7392,
        lng: -104.9903,
        name: "Mountain Retreat",
        description: "Get away from it all in this cozy mountain retreat.",
        price: 900,
        ownerId: 3,
      },
      {
        address: "789 Oak St",
        city: "Portland",
        state: "Oregon",
        country: "United States",
        lat: 45.5051,
        lng: -122.6750,
        name: "Treehouse Oasis",
        description: "Experience the magic of living among the trees in this unique treehouse.",
        price: 700,
        ownerId: 4,
      }
    ])
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    options.tableName = 'Spots';
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options, {
      ownerId: { [Op.in]: [1, 2, 3, 4, 5] }
    }, {});
  }
};
