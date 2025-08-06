"use strict";
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("patients", {
      id: { type: Sequelize.INTEGER, autoIncrement: true, primaryKey: true },
      mrNumber: { type: Sequelize.STRING, allowNull: true, unique: true },
      title: { type: Sequelize.ENUM("Tuan", "Nyonya", "Nona", "Anak", "Bayi") },
      fullName: { type: Sequelize.STRING, allowNull: false },
      nickname: { type: Sequelize.STRING },
      patientType: { type: Sequelize.ENUM("Dewasa", "Anak", "Bayi") },
      idType: { type: Sequelize.STRING },
      idNumber: { type: Sequelize.STRING, allowNull: false, unique: true },
      kkNumber: { type: Sequelize.STRING },
      birthPlace: { type: Sequelize.STRING },
      birthDate: { type: Sequelize.DATEONLY },
      gender: { type: Sequelize.STRING },
      bloodType: { type: Sequelize.STRING },
      religion: { type: Sequelize.STRING },
      maritalStatus: { type: Sequelize.STRING },
      education: { type: Sequelize.STRING },
      address: { type: Sequelize.TEXT },
      province: { type: Sequelize.STRING },
      city: { type: Sequelize.STRING },
      district: { type: Sequelize.STRING },
      village: { type: Sequelize.STRING },
      postalCode: { type: Sequelize.STRING },
      phone: { type: Sequelize.STRING },
      email: { type: Sequelize.STRING },
      motherName: { type: Sequelize.STRING },
      emergencyName: { type: Sequelize.STRING },
      relationship: { type: Sequelize.STRING },
      emergencyPhone: { type: Sequelize.STRING },
      occupation: { type: Sequelize.STRING },
      company: { type: Sequelize.STRING },
      photoUrl: { type: Sequelize.STRING },
      createdAt: { allowNull: false, type: Sequelize.DATE },
      updatedAt: { allowNull: false, type: Sequelize.DATE },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("patients");
  },
};
