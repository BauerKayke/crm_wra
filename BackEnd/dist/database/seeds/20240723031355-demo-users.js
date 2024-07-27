"use strict";const bcryptjs = require('bcryptjs');

module.exports = {
  async up(queryInterface) {
    await queryInterface.bulkInsert('users', [
      {
        nome: 'João da Silva',
        email: 'joao.silva@example.com',
        phone: '1234567890',
        password_hash: await bcryptjs.hash('123456', 8), // Substitua com um hash real
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        nome: 'Maria Oliveira',
        email: 'maria.oliveira@example.com',
        phone: '1234567890',
        password_hash: await bcryptjs.hash('123456', 8), // Substitua com um hash real
        created_at: new Date(),
        updated_at: new Date(),
      },
    ]);
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete('users', null, {});
  },
};
