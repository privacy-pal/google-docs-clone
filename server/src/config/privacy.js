const Database = require("./db");
const { PrivacyPalClient } = require("privacy-pal");

const pal = new PrivacyPalClient(Database.firestore);

module.exports = pal;