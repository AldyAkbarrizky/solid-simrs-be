import { DataTypes, Model, Optional, Sequelize } from "sequelize";
import sequelize from "../config/database";

interface PatientAttributes {
  id: number;
  mrNumber: string;
  title?: "Tuan" | "Nyonya" | "Nona" | "Anak" | "Bayi";
  fullName: string;
  nickname?: string;
  patientType?: "Dewasa" | "Anak" | "Bayi";
  idType?: string;
  idNumber: string;
  kkNumber?: string;
  birthPlace?: string;
  birthDate?: Date;
  gender?: string;
  bloodType?: string;
  religion?: string;
  maritalStatus?: string;
  education?: string;
  address?: string;
  province?: string;
  city?: string;
  district?: string;
  village?: string;
  postalCode?: string;
  phone?: string;
  email?: string;
  motherName?: string;
  emergencyName?: string;
  relationship?: string;
  emergencyPhone?: string;
  occupation?: string;
  company?: string;
  photoUrl?: string;
}

interface PatientCreationAttributes extends Optional<PatientAttributes, "id"> {}

class Patient
  extends Model<PatientAttributes, PatientCreationAttributes>
  implements PatientAttributes
{
  public id!: number;
  public mrNumber!: string;
  public title?: "Tuan" | "Nyonya" | "Nona" | "Anak" | "Bayi";
  public fullName!: string;
  public nickname?: string;
  public patientType?: "Dewasa" | "Anak" | "Bayi";
  public idType?: string;
  public idNumber!: string;
  public kkNumber?: string;
  public birthPlace?: string;
  public birthDate?: Date;
  public gender?: string;
  public bloodType?: string;
  public religion?: string;
  public maritalStatus?: string;
  public education?: string;
  public address?: string;
  public province?: string;
  public city?: string;
  public district?: string;
  public village?: string;
  public postalCode?: string;
  public phone?: string;
  public email?: string;
  public motherName?: string;
  public emergencyName?: string;
  public relationship?: string;
  public emergencyPhone?: string;
  public occupation?: string;
  public company?: string;
  public photoUrl?: string;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;

  public get age(): number | null {
    if (!this.birthDate) return null;
    const today = new Date();
    const birthDate = new Date(this.birthDate);
    let age = today.getFullYear() - birthDate.getFullYear();
    const m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    return age;
  }

  public get formattedName(): string {
    return `${this.title || ""} ${this.fullName}`.trim();
  }
}

Patient.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    mrNumber: {
      type: DataTypes.STRING,
      allowNull: true,
      unique: true,
    },
    // UPDATED FIELD: Title for the patient is now an ENUM for data consistency
    title: {
      type: DataTypes.ENUM("Tuan", "Nyonya", "Nona", "Anak", "Bayi"),
      allowNull: true,
    },
    fullName: { type: DataTypes.STRING, allowNull: false },
    nickname: { type: DataTypes.STRING },
    patientType: {
      type: DataTypes.ENUM("Dewasa", "Anak", "Bayi"),
      allowNull: true,
    },
    idType: { type: DataTypes.STRING },
    idNumber: { type: DataTypes.STRING, allowNull: false, unique: true },
    kkNumber: { type: DataTypes.STRING },
    birthPlace: { type: DataTypes.STRING },
    birthDate: { type: DataTypes.DATEONLY },
    gender: { type: DataTypes.STRING },
    bloodType: { type: DataTypes.STRING },
    religion: { type: DataTypes.STRING },
    maritalStatus: { type: DataTypes.STRING },
    education: { type: DataTypes.STRING },
    address: { type: DataTypes.TEXT },
    province: { type: DataTypes.STRING },
    city: { type: DataTypes.STRING },
    district: { type: DataTypes.STRING },
    village: { type: DataTypes.STRING },
    postalCode: { type: DataTypes.STRING },
    phone: { type: DataTypes.STRING },
    email: { type: DataTypes.STRING, validate: { isEmail: true } },
    motherName: { type: DataTypes.STRING },
    emergencyName: { type: DataTypes.STRING },
    relationship: { type: DataTypes.STRING },
    emergencyPhone: { type: DataTypes.STRING },
    occupation: { type: DataTypes.STRING },
    company: { type: DataTypes.STRING },
    photoUrl: { type: DataTypes.STRING },
  },
  {
    sequelize,
    tableName: "patients",
    timestamps: true,
    hooks: {
      beforeCreate: async (patient: Patient) => {
        // Generate a unique Medical Record (MR) number
        const lastPatient = await Patient.findOne({ order: [["id", "DESC"]] });
        const nextId = lastPatient ? lastPatient.id + 1 : 1;
        patient.mrNumber = `MR${String(nextId).padStart(6, "0")}`;
      },
    },
  }
);

export default Patient;
