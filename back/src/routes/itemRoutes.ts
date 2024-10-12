import { Router } from "express";
import {
  createItem,
  getItems,
  getItem,
  updateItem,
  deleteItem,
  updateNotesOrder, // Import the new function
} from "../controllers/itemController";

const router = Router();

// Define routes
router.post("/notes", createItem);
router.get("/notes", getItems);
router.get("/notes/:id", getItem);
router.put("/notes/:id", updateItem);
router.delete("/notes/:id", deleteItem);
router.put("/notes/order", updateNotesOrder); // New route for updating order

export default router;
