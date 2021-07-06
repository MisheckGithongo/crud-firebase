/* eslint-disable max-len */
const functions = require("firebase-functions");
// The Firebase Admin SDK to access Firestore.
const admin = require("firebase-admin");
admin.initializeApp();

exports.addRecord = functions.https.onRequest(async (req, res) => {
  const { itemName, itemDesc, itemPrice, itemQty, inStock, category } = req.body
  if(!itemName || !itemDesc || !itemPrice || !itemQty || !inStock || !category){
    return res.status(400).send("Missing required fields")
  }
  const timestamp = new Date().toISOString();
  const record = {itemName, itemDesc, itemPrice, itemQty, inStock, category, updatedOn: timestamp };
  const writeResult = await admin.firestore().collection("inventory").add(record);
  record.id = writeResult.id;
  res.status(201).json({ status: "success", data: record });
});
