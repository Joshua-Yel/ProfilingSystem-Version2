"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.searchClericalRecords = exports.createClericalRecord = exports.getClericalRecords = void 0;
const clericalModel_1 = __importDefault(require("../models/clericalModel"));
const clericalModel_2 = __importDefault(require("../models/clericalModel"));
// Get all clerical records
const getClericalRecords = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const records = yield clericalModel_2.default.find(); // This fetches data from the 'ClericalRecords' collection
        res.status(200).json(records); // Send the records as a response
    }
    catch (error) {
        console.error('Error fetching clerical records:', error);
        res.status(500).json({ message: 'Failed to fetch records' });
    }
});
exports.getClericalRecords = getClericalRecords;
// Create a clerical record
const createClericalRecord = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const record = new clericalModel_1.default(req.body);
        const savedRecord = yield record.save();
        res.status(201).json(savedRecord);
    }
    catch (error) {
        res.status(500).json({ message: "Error creating record" });
    }
});
exports.createClericalRecord = createClericalRecord;
const searchClericalRecords = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { searchTerm } = req.query; // Get search term from query parameters
        if (!searchTerm) {
            return res.status(400).json({ message: "Search term is required" });
        }
        // Perform the search in the MongoDB collection
        const records = yield clericalModel_2.default.find({
            $or: [
                { name: { $regex: searchTerm, $options: "i" } }, // Search by name (case-insensitive)
                { description: { $regex: searchTerm, $options: "i" } } // Search by description (case-insensitive)
            ]
        });
        return res.json(records); // Send back the search results
    }
    catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Server error" });
    }
});
exports.searchClericalRecords = searchClericalRecords;
