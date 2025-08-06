import sequelize from "../config/database";
import Patient from "./Patient";
import Guarantor from "./Guarantor";
import User from "./User";
import Role from "./Role";
import bcrypt from "bcryptjs";

Patient.hasMany(Guarantor, {
  foreignKey: "patientId",
  as: "guarantors",
  onDelete: "CASCADE",
});
Guarantor.belongsTo(Patient, {
  foreignKey: "patientId",
  as: "patient",
});

const db = {
  sequelize,
  Patient,
  Guarantor,
  User,
  Role,
};

export const initializeDatabase = async () => {
  try {
    // FIXED: Remove alter: true to prevent duplicate indexes
    // Use force: false and alter: false for safety
    await sequelize.sync({
      force: false, // Never drop and recreate tables
      alter: false, // Never modify existing table structure
    });
    console.log("Database synchronized successfully.");

    // Only seed data in development
    if (process.env.NODE_ENV === "development") {
      const roleCount = await Role.count();
      if (roleCount === 0) {
        await Role.bulkCreate([
          { name: "Admin" },
          { name: "Doctor" },
          { name: "Registration" },
          { name: "Nurse" },
        ]);
        console.log("Roles seeded.");
      }

      const userCount = await User.count();
      if (userCount === 0) {
        const adminRole = await Role.findOne({ where: { name: "Admin" } });
        if (adminRole) {
          const hashedPassword = await bcrypt.hash("admin123", 8);
          await User.create({
            username: "admin",
            email: "admin@simrs.com",
            password_hash: hashedPassword,
            roleId: adminRole.id,
          });
          console.log("Admin user created.");
        }
      }
    }
  } catch (error) {
    console.error("Unable to connect to the database or seed data:", error);
  }
};

export default db;
