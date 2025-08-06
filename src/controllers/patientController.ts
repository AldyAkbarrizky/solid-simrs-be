import { Request, Response, NextFunction } from "express";
import db from "../models";
import {
  errorResponse,
  successResponse,
  paginatedResponse,
} from "../utils/apiResponse";
import { Op } from "sequelize";

const { Patient, Guarantor, sequelize } = db;

export const createPatient = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const transaction = await sequelize.transaction();
  try {
    const { insurances, data: patientData, ...otherData } = req.body;
    console.log("Patient Data", patientData);

    // Create patient and guarantors in a single operation
    const newPatient = await Patient.create(
      {
        ...patientData,
        ...otherData,
        guarantors:
          insurances?.map((insurance: any) => {
            const { id, insuranceId, ...cleanInsurance } = insurance;
            return cleanInsurance;
          }) || [],
      },
      {
        transaction,
        include: [
          {
            model: Guarantor,
            as: "guarantors",
          },
        ],
      }
    );

    // Update MR number after creation
    const mrNumber = `MR${String(newPatient.id).padStart(6, "0")}`;
    await newPatient.update({ mrNumber }, { transaction });

    await transaction.commit();

    return successResponse(
      res,
      "Patient created successfully",
      newPatient,
      201
    );
  } catch (error) {
    await transaction.rollback();
    next(error);
  }
};

export const getAllPatients = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 10;
    const offset = (page - 1) * limit;
    const searchQuery = req.query.q as string;

    let whereClause = {};
    if (searchQuery) {
      whereClause = {
        [Op.or]: [
          { fullName: { [Op.like]: `%${searchQuery}%` } },
          { mrNumber: { [Op.like]: `%${searchQuery}%` } },
          { idNumber: { [Op.like]: `%${searchQuery}%` } },
          { phone: { [Op.like]: `%${searchQuery}%` } },
        ],
      };
    }

    const patients = await Patient.findAndCountAll({
      where: whereClause,
      limit,
      offset,
      order: [["createdAt", "DESC"]],
    });

    return paginatedResponse(
      res,
      "Patients retrieved successfully",
      patients,
      page,
      limit
    );
  } catch (error) {
    next(error);
  }
};

export const getPatientById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    const patient = await Patient.findByPk(id, {
      include: [{ model: Guarantor, as: "guarantors" }],
      // UPDATED: Include virtual fields in the response
      attributes: {
        include: ["age", "formattedName"],
      },
    });

    if (!patient) {
      return errorResponse(res, "Patient not found", 404);
    }

    return successResponse(res, "Patient retrieved successfully", patient);
  } catch (error) {
    next(error);
  }
};

export const updatePatient = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const transaction = await sequelize.transaction();
  try {
    const { id } = req.params;
    const { guarantors, ...patientData } = req.body;

    const patient = await Patient.findByPk(id);
    if (!patient) {
      await transaction.rollback();
      return errorResponse(res, "Patient not found", 404);
    }

    await patient.update(patientData, { transaction });

    // Handle guarantors: simple approach is to delete all and re-insert
    await Guarantor.destroy({ where: { patientId: id }, transaction });
    if (guarantors && guarantors.length > 0) {
      const guarantorData = guarantors.map((g: any) => ({
        ...g,
        patientId: patient.id,
      }));
      await Guarantor.bulkCreate(guarantorData, { transaction });
    }

    await transaction.commit();

    const updatedPatient = await Patient.findByPk(id, {
      include: ["guarantors"],
    });
    return successResponse(res, "Patient updated successfully", updatedPatient);
  } catch (error) {
    await transaction.rollback();
    next(error);
  }
};

export const deletePatient = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    const patient = await Patient.findByPk(id);

    if (!patient) {
      return errorResponse(res, "Patient not found", 404);
    }

    await patient.destroy();
    return successResponse(res, "Patient deleted successfully", null, 204);
  } catch (error) {
    next(error);
  }
};
