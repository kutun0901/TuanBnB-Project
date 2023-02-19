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
        ownerId: 1,
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
        ownerId: 1,
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
      ownerId: { [Op.in]: [1, 2, 3] }
    }, {});
  }
};
