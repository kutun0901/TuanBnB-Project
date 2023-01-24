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
    options.tableName = 'Reviews';
    return queryInterface.bulkInsert(options, [
      {
        review: 'This is a dream house.',
        stars: 5,
        spotId: 1,
        userId: 1,
      },
      {
        review: 'We enjoyed our stay so much!',
        stars: 4,
        spotId: 2,
        userId: 2,
      },
      {
        review: 'There is no wifi at the place',
        stars: 3,
        spotId: 3,
        userId: 3,
      },
      {
        review: 'Awesome stay at this incredible location.',
        stars: 4,
        spotId: 4,
        userId: 2,
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
    options.tableName = 'Reviews';
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options, {
      userId: { [Op.in]: [1, 2, 3] }
    }, {});
  }
};
