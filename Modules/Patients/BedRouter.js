import Router from "express";
import BedController from "./BedController.js";
import authMiddleware from "../authMiddleware.js";

const router = new Router();

router.get(
    "/",
    authMiddleware,
    BedController.getAll
);

router.post(
    "/filter",
    authMiddleware,
    BedController.filter
);

router.post(
    "/",
    authMiddleware,
    BedController.create
);

router.get(
    "/statistics",
    authMiddleware,
    BedController.statistics
);

export default router;