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
        url: 'https://img.staticmb.com/mbcontent//images/uploads/2022/12/Most-Beautiful-House-in-the-World.jpg',
        preview: true,
        spotId: 1,
      },
      {
        url: 'https://www.designboom.com/twitterimages/uploads/2019/12/niko-architect-house-in-the-landscape-moscow-designboom-1200.jpg',
        preview: true,
        spotId: 2,
      },
      {
        url: 'https://www.thespruce.com/thmb/dDeobutJDNWPnpq89eL9A-JgRwc=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/craftsman-homes-5070211-hero-e13889c50bec48a386a8b51b25f748c1.jpg',
        preview: true,
        spotId: 3,
      },
      {
        url: 'https://images.squarespace-cdn.com/content/v1/57c837262e69cf6dc3c7ef62/1586359275166-WBMR1SZ4PPF48FZQE66O/Beach-House-Architecture-Delaware-Maryland-Custom-Small.jpg',
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
