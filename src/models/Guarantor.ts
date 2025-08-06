import { DataTypes, Model, Optional } from "sequelize";
import sequelize from "../config/database";
import Patient from "./Patient";

interface GuarantorAttributes {
  id: number;
  patientId: number;
  type: string;
  company: string;
  cardNumber: string;
  class?: string;
  expiryDate?: Date;
}

interface GuarantorCreationAttributes
  extends Optional<GuarantorAttributes, "id"> {}

class Guarantor
  extends Model<GuarantorAttributes, GuarantorCreationAttributes>
  implements GuarantorAttributes
{
  public id!: number;
  public patientId!: number;
  public type!: string;
  public company!: string;
  public cardNumber!: string;
  public class?: string;
  public expiryDate?: Date;
}

Guarantor.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    patientId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: Patient,
        key: "id",
      },
    },
    type: { type: DataTypes.STRING, allowNull: false },
    company: { type: DataTypes.STRING, allowNull: false },
    cardNumber: { type: DataTypes.STRING, allowNull: false },
    class: { type: DataTypes.STRING },
    expiryDate: { type: DataTypes.DATEONLY },
  },
  {
    sequelize,
    tableName: "guarantors",
    timestamps: true,
  }
);

export default Guarantor;
