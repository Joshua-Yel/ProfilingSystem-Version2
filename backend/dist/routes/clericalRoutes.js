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
const express_1 = __importDefault(require("express"));
const clericalModel_1 = __importDefault(require("../models/clericalModel"));
const clericalRouter = express_1.default.Router();
// Route to fetch all clerical records
clericalRouter.get('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        console.log('Fetching all clerical records...');
        const records = yield clericalModel_1.default.find();
        console.log('Records fetched:', records);
        res.status(200).json(records);
    }
    catch (error) {
        console.error('Error fetching clerical records:', error);
        res.status(500).json({ message: 'Error fetching clerical records', error });
    }
}));
// Route to fetch a single clerical record by ID
clericalRouter.get('/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const record = yield clericalModel_1.default.findById(req.params.id);
        if (!record) {
            return res.status(404).json({ message: 'Record not found' });
        }
        res.status(200).json(record);
    }
    catch (error) {
        console.error('Error fetching record by ID:', error);
        res.status(500).json({ message: 'Error fetching record', error });
    }
}));
exports.default = clericalRouter;
