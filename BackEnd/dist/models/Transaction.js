"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _sequelize = require('sequelize'); var _sequelize2 = _interopRequireDefault(_sequelize);

 class Transaction extends _sequelize.Model {
  static init(sequelize) {
    super.init({
      address: {
        type: _sequelize2.default.STRING,
        allowNull: false,
      },
      city: {
        type: _sequelize2.default.STRING,
        allowNull: false,
      },
      state: {
        type: _sequelize2.default.STRING,
        allowNull: false,
      },
      zip: {
        type: _sequelize2.default.STRING,
        allowNull: false,
      },
      price: {
        type: _sequelize2.default.FLOAT,
        allowNull: false,
      },
      listing_date: {
        type: _sequelize2.default.DATE,
        allowNull: false,
      },
      expiration_date: {
        type: _sequelize2.default.DATE,
        allowNull: false,
      },
      acceptance_date: {
        type: _sequelize2.default.DATE,
        allowNull: true,
      },
      closing_date: {
        type: _sequelize2.default.DATE,
        allowNull: true,
      },
      additional_fields: { // Renomeado para `additional_fields`
        type: _sequelize2.default.JSON,
        allowNull: true,
      },
      type: {
        type: _sequelize2.default.STRING,
        allowNull: false,
      },
      status: {
        type: _sequelize2.default.STRING,
        allowNull: false,
      },
    }, {
      sequelize,
      tableName: 'transactions',
    });

    return this;
  }
} exports.default = Transaction;
