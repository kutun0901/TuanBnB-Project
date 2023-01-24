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
    options.tableName = 'SpotImages';
    return queryInterface.bulkInsert(options, [
      {
        url: 'https://www.pexels.com/photo/photo-of-house-2980955/',
        preview: true,
        spotId: 1,
      },
      {
        url: 'https://www.pexels.com/photo/brown-wooden-house-with-pool-2480608/',
        preview: true,
        spotId: 2,
      },
      {
        url: 'https://www.pexels.com/photo/brown-wooden-house-during-snow-950058/',
        preview: true,
        spotId: 3,
      },
      {
        url: 'https://www.pexels.com/photo/brown-house-on-field-2351649/',
        preview: true,
        spotId: 4,
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
    options.tableName = 'SpotImages';
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options, {
      spotId: { [Op.in]: [1, 2, 3, 4] }
    }, {});
  }
};
