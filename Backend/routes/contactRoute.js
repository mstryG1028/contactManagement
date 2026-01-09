import express from "express";
import Contact from "../models/Contact.js";
const router = express.Router();
// CREATE
router.post("/", async (req, res) => {
  const contact = new Contact(req.body);
  await contact.save();
  res.json(contact);
});
// READ
router.get("/", async (req, res) => {
  const contacts = await Contact.find();
  res.json(contacts);
});
// UPDATE
router.put("/:id", async (req, res) => {
  const updatedContact = await Contact.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  );
  res.json(updatedContact);
});
// DELETE
router.delete("/:id", async (req, res) => {
  await Contact.findByIdAndDelete(req.params.id);
  res.json({ message: "Contact deleted" });
});
export default router;
