import { Router } from "express";
import {
  addGuarantor,
  updateGuarantor,
  deleteGuarantor,
  getGuarantorsByPatientId,
} from "../controllers/guarantorController";
import { protect, authorize } from "../middlewares/authMiddleware";

const router = Router();
router.use(protect);
router.use(authorize("Admin", "Registration", "Doctor", "Nurse"));

router.route("/").post(addGuarantor);
router.route("/by-patient/:patientId").get(getGuarantorsByPatientId);
router.route("/:guarantorId").put(updateGuarantor).delete(deleteGuarantor);
export default router;
