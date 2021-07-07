/* eslint-disable max-len */
const functions = require("firebase-functions");
// The Firebase Admin SDK to access Firestore.
const admin = require("firebase-admin");
admin.initializeApp();

exports.addRecord = functions.https.onRequest(async (req, res) => {
  const {itemName, itemDesc, itemPrice, itemQty, inStock, category} = req.body;
  if (!itemName || !itemDesc || !itemPrice || !itemQty || !inStock || !category) {
    return res.status(400).send("Missing required fields");
  }
  const timestamp = new Date().toISOString();
  const record = {itemName, itemDesc, itemPrice, itemQty, inStock, category, updatedOn: timestamp};
  const writeResult = await admin.firestore().collection("inventory").add(record);
  record.id = writeResult.id;
  res.status(201).json({status: "success", message: "record added", data: record});
});

exports.inventory = functions.https.onRequest(async (req, res) => {
  const snapshot = await admin.firestore().collection("inventory").get();
  const inventoryList = snapshot.docs.map((doc) => doc.data());
  res.status(200).json({status: "success", message: "inventory list", data: inventoryList});
});

exports.updateRecord = functions.https.onRequest(async (req, res) => {
  const {id, itemName, itemDesc, itemPrice, itemQty, inStock, category} = req.body;
  if (!id || !itemName || !itemDesc || !itemPrice || !itemQty || !inStock || !category) {
    return res.status(400).send("Missing required fields");
  }
  const timestamp = new Date().toISOString();
  const record = {itemName, itemDesc, itemPrice, itemQty, inStock, category, updatedOn: timestamp};
  await admin.firestore().collection("inventory").doc(id).update(record);
  record.id = id;
  res.status(200).json({status: "success", message: "record updated", data: record});
});

exports.deleteRecord = functions.https.onRequest(async (req, res) => {
  const {id} = req.body;
  if (!id) {
    return res.status(400).send("Missing required fields");
  }
  await admin.firestore().collection("inventory").doc(id).delete();
  res.status(200).json({status: "success", message: "record deleted"});
});
