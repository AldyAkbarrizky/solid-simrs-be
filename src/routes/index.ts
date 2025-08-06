import { Router } from "express";
import authRoutes from "./authRoutes";
import patientRoutes from "./patientRoutes";
import guarantorRoutes from "./guarantorRoutes";

const router = Router();

router.use("/auth", authRoutes);
router.use("/patients", patientRoutes);
router.use("/guarantors", guarantorRoutes);

export default router;
