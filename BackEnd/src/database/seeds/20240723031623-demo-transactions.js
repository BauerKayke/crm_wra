module.exports = {
  async up(queryInterface) {
    await queryInterface.bulkInsert('transactions', [
      {
        address: 'Rua das Flores, 123',
        city: 'São Paulo',
        state: 'SP',
        zip: '01234-567',
        price: 500000.00,
        listing_date: new Date(),
        expiration_date: new Date(new Date().setDate(new Date().getDate() + 30)),
        acceptance_date: null,
        closing_date: null,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        address: 'Avenida Paulista, 456',
        city: 'São Paulo',
        state: 'SP',
        zip: '12345-678',
        price: 800000.00,
        listing_date: new Date(),
        expiration_date: new Date(new Date().setDate(new Date().getDate() + 30)),
        acceptance_date: null,
        closing_date: null,
        created_at: new Date(),
        updated_at: new Date(),
      },
    ]);
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete('transactions', null, {});
  },
};
