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
const mongoose_1 = __importDefault(require("mongoose"));
const dotenv_1 = __importDefault(require("dotenv"));
const clericalRoutes_1 = __importDefault(require("./routes/clericalRoutes"));
const cors_1 = __importDefault(require("cors")); // Import cors
dotenv_1.default.config(); // Load environment variables from .env file
const app = (0, express_1.default)(); // Initialize Express app
// Use CORS middleware to allow cross-origin requests
app.use((0, cors_1.default)()); // Apply CORS to all routes
// Middleware to parse incoming JSON requests
app.use(express_1.default.json());
// Base route handler
app.get('/', (req, res) => {
    res.send('Welcome to the Profiling System API!');
});
// Define routes for clerical records
app.use('/api/clerical', clericalRoutes_1.default);
// MongoDB Connection
const connectDB = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield mongoose_1.default.connect(process.env.MONGO_URI, {});
        console.log('MongoDB connected');
    }
    catch (error) {
        console.error('Database connection failed:', error);
        process.exit(1); // Exit process with failure
    }
});
// Call connectDB function to establish a connection
connectDB();
// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
