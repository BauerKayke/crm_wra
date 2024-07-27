"use strict";module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('transactions', 'additional_field_1');
    await queryInterface.removeColumn('transactions', 'additional_field_2');
    await queryInterface.addColumn('transactions', 'additional_fields', {
      type: Sequelize.JSON,
      allowNull: true,
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('transactions', 'additional_fields');
    await queryInterface.addColumn('transactions', 'additional_field_1', {
      type: Sequelize.STRING,
      allowNull: true,
    });
    await queryInterface.addColumn('transactions', 'additional_field_2', {
      type: Sequelize.STRING,
      allowNull: true,
    });
  },
};
