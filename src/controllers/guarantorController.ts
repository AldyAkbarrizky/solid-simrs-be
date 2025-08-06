import { Request, Response, NextFunction } from "express";
import db from "../models";
import { errorResponse, successResponse } from "../utils/apiResponse";

const { Guarantor, Patient } = db;

export const getGuarantorsByPatientId = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { patientId } = req.params;
    const guarantors = await Guarantor.findAll({ where: { patientId } });
    return successResponse(
      res,
      "Guarantors retrieved successfully",
      guarantors
    );
  } catch (error) {
    next(error);
  }
};

// POST /api/guarantors
export const addGuarantor = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { patientId, ...guarantorData } = req.body;

    if (!patientId) {
      return errorResponse(res, "patientId is required", 400);
    }
    const patient = await Patient.findByPk(patientId);
    if (!patient) {
      return errorResponse(res, "Patient not found", 404);
    }
    const newGuarantor = await Guarantor.create({
      ...guarantorData,
      patientId,
    });
    return successResponse(
      res,
      "Guarantor added successfully",
      newGuarantor,
      201
    );
  } catch (error) {
    next(error);
  }
};

// PUT /api/guarantors/:guarantorId
export const updateGuarantor = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { guarantorId } = req.params;
    const guarantorData = req.body;
    const guarantor = await Guarantor.findByPk(guarantorId);
    if (!guarantor) {
      return errorResponse(res, "Guarantor not found", 404);
    }
    delete guarantorData.patientId;
    await guarantor.update(guarantorData);
    return successResponse(res, "Guarantor updated successfully", guarantor);
  } catch (error) {
    next(error);
  }
};

// DELETE /api/guarantors/:guarantorId
export const deleteGuarantor = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { guarantorId } = req.params;
    const guarantor = await Guarantor.findByPk(guarantorId);
    if (!guarantor) {
      return errorResponse(res, "Guarantor not found", 404);
    }
    await guarantor.destroy();
    return successResponse(res, "Guarantor deleted successfully", null, 204);
  } catch (error) {
    next(error);
  }
};
