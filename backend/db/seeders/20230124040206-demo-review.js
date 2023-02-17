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
        spotId: 2,
        userId: 1,
      },
      {
        review: 'We enjoyed our stay so much!',
        stars: 4,
        spotId: 3,
        userId: 1,
      },
      {
        review: 'There is no wifi at the place',
        stars: 3,
        spotId: 4,
        userId: 1,
      },
      {
        review: ' Cras magna odio, blandit ut malesuada vitae, bibendum et arcu. Sed rutrum turpis dolor, sed rutrum justo tincidunt malesuada. Curabitur euismod ornare laoreet.',
        stars: 4,
        spotId: 1,
        userId: 2,
      },
      {
        review: 'Etiam molestie, arcu sit amet tempor iaculis, nisl risus condimentum orci, ut dignissim urna est ut lorem.',
        stars: 4,
        spotId: 3,
        userId: 2,
      },
      {
        review: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
        stars: 4,
        spotId: 4,
        userId: 2,
      },
      {
        review: 'Ut maximus tortor in blandit cursus. Vestibulum odio orci, pretium sed ante a, varius finibus nunc.',
        stars: 4,
        spotId: 1,
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
    options.tableName = 'Reviews';
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options, {
      userId: { [Op.in]: [1, 2, 3] }
    }, {});
  }
};
