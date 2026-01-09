import express from "express";
import Contact from "../models/Contact.js";

const router = express.Router();


router.post("/", async (req, res) => {
  try {
    console.log("Incoming body:", req.body); 
    const contact = new Contact({
      name: req.body.name,
      email: req.body.email || "",
      phone: req.body.phone,
      message: req.body.message || "",
    });

    const savedContact = await contact.save();
    console.log("Saved contact:", savedContact);
    res.status(201).json(savedContact);
  } catch (err) {
    console.error("Error saving contact:", err.message);
    res.status(500).json({ error: "Failed to save contact" });
  }
});


router.get("/", async (req, res) => {
  try {
    const contacts = await Contact.find();
    res.json(contacts);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch contacts" });
  }
});


router.put("/:id", async (req, res) => {
  try {
    const updatedContact = await Contact.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updatedContact);
  } catch (err) {
    res.status(500).json({ error: "Failed to update contact" });
  }
});


router.delete("/:id", async (req, res) => {
  try {
    await Contact.findByIdAndDelete(req.params.id);
    res.json({ message: "Contact deleted" });
  } catch (err) {
    res.status(500).json({ error: "Failed to delete contact" });
  }
});

export default router;
