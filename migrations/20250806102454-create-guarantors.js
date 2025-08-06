"use strict";
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("guarantors", {
      id: { type: Sequelize.INTEGER, autoIncrement: true, primaryKey: true },
      patientId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: { model: "patients", key: "id" },
        onDelete: "CASCADE",
      },
      type: { type: Sequelize.STRING, allowNull: false },
      company: { type: Sequelize.STRING, allowNull: false },
      cardNumber: { type: Sequelize.STRING, allowNull: false },
      class: { type: Sequelize.STRING },
      expiryDate: { type: Sequelize.DATEONLY },
      createdAt: { allowNull: false, type: Sequelize.DATE },
      updatedAt: { allowNull: false, type: Sequelize.DATE },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("guarantors");
  },
};
