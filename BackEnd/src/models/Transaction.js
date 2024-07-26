import Sequelize, { Model } from 'sequelize';

export default class Transaction extends Model {
  static init(sequelize) {
    super.init({
      address: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      city: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      state: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      zip: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      price: {
        type: Sequelize.FLOAT,
        allowNull: false,
      },
      listing_date: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      expiration_date: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      acceptance_date: {
        type: Sequelize.DATE,
        allowNull: true,
      },
      closing_date: {
        type: Sequelize.DATE,
        allowNull: true,
      },
      additional_fields: { // Renomeado para `additional_fields`
        type: Sequelize.JSON,
        allowNull: true,
      },
      type: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      status: {
        type: Sequelize.STRING,
        allowNull: false,
      },
    }, {
      sequelize,
      tableName: 'transactions',
    });

    return this;
  }
}
