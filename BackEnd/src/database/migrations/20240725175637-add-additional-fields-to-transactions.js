// migrations/XXXXXXXXXXXXXX-add-additional-fields-to-transactions.js

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('transactions', 'additional_field_1', {
      type: Sequelize.STRING,
      allowNull: true, // ou false se for obrigatório
    });

    await queryInterface.addColumn('transactions', 'additional_field_2', {
      type: Sequelize.STRING,
      allowNull: true, // ou false se for obrigatório
    });
  },

  down: async (queryInterface) => {
    await queryInterface.removeColumn('transactions', 'additional_field_1');
    await queryInterface.removeColumn('transactions', 'additional_field_2');
  },
};
