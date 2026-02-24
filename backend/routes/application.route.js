import express from "express";
import isAuthenticated from "../middleware/isAuthenticated.js";
import { applyJob, getApplicants, getAppliedJobs, updateStatus } from "../controllers/application.controller.js";
 
const applicationrouter = express.Router();

applicationrouter.route("/apply/:id").get(isAuthenticated, applyJob);
applicationrouter.route("/get").get(isAuthenticated, getAppliedJobs);
applicationrouter.route("/:id/applicants").get(isAuthenticated, getApplicants);
applicationrouter.route("/status/:id/update").post(isAuthenticated, updateStatus);
 

export default applicationrouter;
