import { Router } from "express";
import {
  createPatient,
  getAllPatients,
  getPatientById,
  updatePatient,
  deletePatient,
} from "../controllers/patientController";
import { protect, authorize } from "../middlewares/authMiddleware";

const router = Router();

// All patient routes are protected
router.use(protect);

router
  .route("/")
  .post(authorize("Admin", "Registration", "1"), createPatient)
  .get(getAllPatients);

router
  .route("/:id")
  .get(getPatientById)
  .put(authorize("Admin", "Registration", "1"), updatePatient)
  .delete(authorize("Admin", "1"), deletePatient);

export default router;
