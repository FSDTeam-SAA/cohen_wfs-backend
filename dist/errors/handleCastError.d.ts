import mongoose from "mongoose";
import { TGenericErrorResponse } from "../interface/globalInterface.js";
declare const handleCastError: (error: mongoose.Error.CastError) => TGenericErrorResponse;
export default handleCastError;
