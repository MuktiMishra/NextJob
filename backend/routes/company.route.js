import express from 'express';
import isAuthenticated from '../middleware/isAuthenticated.js';
import { getCompany, getCompanyById, registerCompany, updateCompany } from '../controllers/company.controller.js';
import { singleUpload } from "../middleware/multer.js" 

const companyRouter =  express.Router();

companyRouter.route('/register').post(isAuthenticated, registerCompany);
companyRouter.route('/get').get(isAuthenticated, getCompany);
companyRouter.route('/get/:id').get(isAuthenticated, getCompanyById);
companyRouter.route('/update/:id').put(isAuthenticated, singleUpload, updateCompany);


export default companyRouter;
