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
    options.tableName = 'Bookings';
    return queryInterface.bulkInsert(options, [
      {
        startDate: '2023-3-14',
        endDate: '2023-3-24',
        spotId: 1,
        userId: 1,
      },
      {
        startDate: '2023-3-3',
        endDate: '2023-3-20',
        spotId: 2,
        userId: 1,
      },
      {
        startDate: '2023-4-4',
        endDate: '2023-4-12',
        spotId: 3,
        userId: 2,
      },
      {
        startDate: '2023-5-14',
        endDate: '2023-5-24',
        spotId: 4,
        userId: 3,
      },

    ])
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    options.tableName = 'Bookings';
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options, {
      userId: { [Op.in]: [1, 2, 3] }
    }, {});
  }
};
