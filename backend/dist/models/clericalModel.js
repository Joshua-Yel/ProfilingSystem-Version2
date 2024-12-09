"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const clericalSchema = new mongoose_1.default.Schema({
    userId: { type: mongoose_1.default.Schema.Types.ObjectId, ref: 'User', required: true },
    fullName: {
        firstName: { type: String, required: true },
        middleName: { type: String, required: true },
        lastName: { type: String, required: true },
        suffix: { type: String, required: false } // Optional
    },
    dateOfBirth: { type: Date, required: true },
    placeOfBirth: { type: String, required: true },
    nickname: { type: String, required: false }, // Optional
    // Current Information
    currentAssignment: { type: String, required: true },
    currentDiocese: { type: String, required: true },
    originalDiocese: { type: String, required: true },
    status: {
        type: String,
        required: true,
        default: "Active", // Default status is Active
        enum: ["Active", "Retired"] // Valid statuses
    },
    // Family Details
    familyDetails: {
        fatherName: { type: String, required: true },
        motherMaidenName: { type: String, required: true }
    },
    // Ordination Details
    ordinationDetails: {
        dateOfOrdination: { type: Date, required: true },
        placeOfOrdination: { type: String, required: true },
        ordainingPrelate: { type: String, required: false } // Optional
    },
    // Educational Background
    educationalBackground: {
        elementary: {
            schoolName: { type: String, required: true },
            inclusiveYears: { type: String, required: true }
        },
        highSchool: {
            schoolName: { type: String, required: true },
            inclusiveYears: { type: String, required: true }
        },
        preCollege: {
            schoolName: { type: String, required: true },
            inclusiveYears: { type: String, required: true }
        },
        college: {
            schoolName: { type: String, required: true },
            inclusiveYears: { type: String, required: true },
            honorsAwards: { type: String, required: false } // Optional
        },
        civilDegrees: { type: String, required: false }, // Optional
        seminaryFormation: {
            nameAddress: { type: String, required: true },
            philosophy: { type: Boolean, required: true },
            theology: { type: Boolean, required: true }
        },
        ecclesiasticalDegrees: { type: String, required: false } // Optional
    },
    // Priestly Assignments
    priestlyAssignments: [
        {
            location: { type: String, required: true },
            position: { type: String, required: true },
            inclusiveDates: { type: String, required: true }
        }
    ],
    // Other Details
    basicEducation: {
        pastoralCourses: { type: String, required: false }, // Optional
        priestlyMinistry: {
            successfulApostolateAreas: { type: String, required: false }, // Optional
            natureOfWorkDone: { type: String, required: false }, // Optional
            preferredWorkTypes: { type: String, required: false } // Optional
        },
        lateVocation: {
            workNature: { type: String, required: false }, // Optional
            employerCompany: { type: String, required: false } // Optional
        }
    },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now }
});
clericalSchema.index({ userId: 1 }); // Add index
const ClericalRecord = mongoose_1.default.model('ClericalRecord', clericalSchema, 'ClericalRecords');
exports.default = ClericalRecord;
// const clericalSchema = new mongoose.Schema({
//   userId: {
//     type: mongoose.Schema.Types.ObjectId,
//     required: true, // Enforcing that userId is required
//   },
//   basicEducation: {
//     pastoralCourses: {
//       type: String,
//       required: true, // Enforcing that pastoralCourses is required
//     },
//     priestlyMinistry: {
//       successfulApostolateAreas: String,
//       natureOfWorkDone: String,
//       preferredWorkTypes: String,
//     },
//     lateVocation: {
//       workNature: String,
//       employerCompany: String,
//     },
//   },
//   priestlyAssignments: [{
//     location: {
//       type: String,
//       required: true, // Enforcing that location is required
//     },
//     position: {
//       type: String,
//       required: true, // Enforcing that position is required
//     },
//     inclusiveDates: {
//       type: String,
//       required: true, // Enforcing that inclusiveDates is required
//     },
//   }],
// }, {
//   timestamps: true, // Automatically add `createdAt` and `updatedAt` fields
// });
// // Define the model only once
// const ClericalRecord = mongoose.model('ClericalRecord', clericalSchema, 'ClericalRecords');
// export default ClericalRecord;
