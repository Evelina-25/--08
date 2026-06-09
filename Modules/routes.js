import {Router} from "express";
import authRouter from "./User/authRouter.js";
import bedRouter from "./Patients/BedRouter.js";



const router = new Router();

router.use("/beds", bedRouter);
router.use("/auth", authRouter);
export default router;