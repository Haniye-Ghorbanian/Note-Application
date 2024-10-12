import { Request, Response, NextFunction, RequestHandler } from "express";
import { Item } from "../models/item";
import { AppDataSource } from "../data-source";
import { In } from "typeorm"; // Import In from TypeORM

const itemRepository = AppDataSource.getRepository(Item);

export const createItem: RequestHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const newItem = itemRepository.create(req.body);
    const result = await itemRepository.save(newItem);
    res.status(201).json(result);
  } catch (error: any) {
    next(error);
  }
};

export const getItems: RequestHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const items = await itemRepository.find({
      order: { order: "ASC" }, // Fetch items ordered by the 'order' field
    });
    res.status(200).json(items);
  } catch (error: any) {
    next(error);
  }
};

export const getItem: RequestHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const item = await itemRepository.findOneBy({
      id: parseInt(req.params.id),
    });
    if (!item) {
      res.status(404).json({ error: "Item not found" });
    } else {
      res.status(200).json(item);
    }
  } catch (error: any) {
    next(error);
  }
};

export const updateItem: RequestHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const item = await itemRepository.findOneBy({
      id: parseInt(req.params.id),
    });
    if (!item) {
      res.status(404).json({ error: "Item not found" });
    } else {
      itemRepository.merge(item, req.body);
      const result = await itemRepository.save(item);
      res.status(200).json(result);
    }
  } catch (error: any) {
    next(error);
  }
};

export const deleteItem: RequestHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const item = await itemRepository.findOneBy({
      id: parseInt(req.params.id),
    });
    if (!item) {
      res.status(404).json({ error: "Item not found" });
    } else {
      await itemRepository.remove(item);
      res.status(200).json({ message: "Item deleted" });
    }
  } catch (error: any) {
    next(error);
  }
};

export const updateNotesOrder: RequestHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { orderedIds } = req.body; // Expecting an array of note IDs in the new order

    // Find all items in the new order using the 'where' clause
    const items = await itemRepository.find({
      where: { id: In(orderedIds) }, // Use In to filter by multiple IDs
    });

    // Update the order in the database
    for (const [index, id] of orderedIds.entries()) {
      const item = items.find((item) => item.id === id);
      if (item) {
        item.order = index; // Update the order field
        await itemRepository.save(item);
      }
    }

    res.status(200).json({ message: "Order updated successfully" });
  } catch (error: any) {
    next(error);
  }
};
