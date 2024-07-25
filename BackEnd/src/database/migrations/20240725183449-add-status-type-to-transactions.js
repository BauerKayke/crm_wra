module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('transactions', 'type', {
      type: Sequelize.STRING,
      allowNull: false,
      defaultValue: 'Residential Sale',
    });
    await queryInterface.addColumn('transactions', 'status', {
      type: Sequelize.STRING,
      allowNull: false,
      defaultValue: 'Listing',
    });
  },

  down: async (queryInterface) => {
    await queryInterface.removeColumn('transactions', 'type');
    await queryInterface.removeColumn('transactions', 'status');
  },
};
