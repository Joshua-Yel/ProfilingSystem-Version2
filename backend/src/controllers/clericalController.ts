import { Request, Response } from "express";
import ClericalRecord from "../models/clericalModel";
import Clerical from "../models/clericalModel";  

// Get all clerical records
export const getClericalRecords = async (req: Request, res: Response) => {
  try {
    const records = await Clerical.find(); // This fetches data from the 'ClericalRecords' collection
    res.status(200).json(records); // Send the records as a response
  } catch (error) {
    console.error('Error fetching clerical records:', error);
    res.status(500).json({ message: 'Failed to fetch records' });
  }
};

// Create a clerical record
export const createClericalRecord = async (req: Request, res: Response) => {
  try {
    const record = new ClericalRecord(req.body);
    const savedRecord = await record.save();
    res.status(201).json(savedRecord);
  } catch (error) {
    res.status(500).json({ message: "Error creating record" });
  }
};

export const searchClericalRecords = async (req: Request, res: Response) => {
  try {
    const { searchTerm } = req.query;  // Get search term from query parameters
    if (!searchTerm) {
      return res.status(400).json({ message: "Search term is required" });
    }

    // Perform the search in the MongoDB collection
    const records = await Clerical.find({
      $or: [
        { name: { $regex: searchTerm, $options: "i" } }, // Search by name (case-insensitive)
        { description: { $regex: searchTerm, $options: "i" } } // Search by description (case-insensitive)
      ]
    });

    return res.json(records);  // Send back the search results
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Server error" });
  }
};
