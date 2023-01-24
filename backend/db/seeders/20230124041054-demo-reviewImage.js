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
    options.tableName = 'ReviewImages';
    return queryInterface.bulkInsert(options, [
      {
        url: 'https://unsplash.com/photos/eWqOgJ-lfiI',
        reviewId: 2,
      },
      {
        url: 'https://www.pexels.com/photo/people-on-cafeteria-during-daytime-2901212/',
        reviewId: 1,
      },
      {
        url: 'https://www.pexels.com/photo/canal-beside-houses-under-clear-sky-2901211/',
        reviewId: 3,
      },
      {
        url: 'https://www.pexels.com/photo/fishing-shed-on-shore-11643474/',
        reviewId: 4,
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
    options.tableName = 'ReviewImages';
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options, {
      reviewId: { [Op.in]: [1, 2, 3, 4] }
    }, {});
  }
};
