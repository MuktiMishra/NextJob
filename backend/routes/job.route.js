import express from 'express';
import isAuthenticated from '../middleware/isAuthenticated.js';
import { postJob , getAllJobs , getAdminJobs , getJobById} from '../controllers/job.controller.js';


const jobRouter =  express.Router();

jobRouter.route('/post').post(isAuthenticated, postJob);
jobRouter.route('/get').get(isAuthenticated, getAllJobs);
jobRouter.route('/getadminjobs').post(isAuthenticated, getAdminJobs);
jobRouter.route('/get/:id').get(isAuthenticated, getJobById);
export default jobRouter;