import mongoose from "mongoose";
import { TGenericErrorResponse } from "../interface/globalInterface.js";
declare const handleValidationError: (error: mongoose.Error.ValidationError) => TGenericErrorResponse;
export default handleValidationError;
