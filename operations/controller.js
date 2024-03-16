import { controller } from "../auth/controller";
import AppDataSource from "../config";
import Invoice from "../entities/invoice";
import User from "../models/user";

const addInvoice = async (req, res) => {
    const invoiceRepo = AppDataSource.getRepository(Invoice)
    let invoice = req.body
    await invoiceRepo.save(invoice)
    res.send(invoice)
}

const getInvoices = async (req, res) => {
    const invoiceRepo = AppDataSource.getRepository(Invoice)
    let invoices = await invoiceRepo.find()
    if (invoices) {
        res.send(invoices)
    } else {
        res.send({ message: "no invoices found" })

    }
}

const getInvoiceDetails = async (req, res) => {
    const invoiceRepo = AppDataSource.getRepository(Invoice)
    let result = await invoiceRepo.findOne({
        where: { invoice_id: req.body.id }
    })

    if (result) {
        res.send(result)
    } else {
        res.send({ result: "No record found" })
    }
    console.log(result)
}

const deleteInvoice = async (req, res) => {
    const invoiceRepo = AppDataSource.getRepository(Invoice)
    let result = await invoiceRepo.delete({
        where: { invoice_id: req.body.id }
    })
    if (result) {
        res.send(result)
    } else {
        res.send({ result: "No record found" })
    }

}

const updateInvoice = async (req, res) => {
    const invoiceRepo = AppDataSource.getRepository(Invoice)
    let result = await invoiceRepo.update(
        { _id: req.params.id },
        {
            $set: req.body
        }
    )
    res.send(result)
}
exports.controller = {
addInvoice,
getInvoices,
getInvoiceDetails,
deleteInvoice,
updateInvoice
}