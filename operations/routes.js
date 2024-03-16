const  { Router } =  "express";
const  { controller } =  "./controller";

export const  userRoutes=Router();

userRoutes.post('/add-invoice',controller.addInvoice)
userRoutes.get('/get-invoice',controller.getInvoices)
userRoutes.post('/get-invoice-details/:id',controller.getInvoiceDetails)
userRoutes.post('/delete-invoice',controller.deleteInvoice)
userRoutes.put('/update-invoice',controller.updateInvoice)