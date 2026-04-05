// Script to update all existing drivers with phone numbers for testing
const Database = require("better-sqlite3");
const path = require("path");

const dbPath = path.join(__dirname, "data", "ambulance.db");
const db = new Database(dbPath);

try {
  // Get all drivers
  const drivers = db.prepare("SELECT * FROM drivers").all();
  console.log(`Found ${drivers.length} drivers in database\n`);
  
  if (drivers.length === 0) {
    console.log("No drivers found. New drivers will have phone numbers when registered.");
    db.close();
    process.exit(0);
  }

  // Update each driver with a unique phone number for testing
  const updateStmt = db.prepare("UPDATE drivers SET phone = ? WHERE id = ?");
  
  drivers.forEach((driver, index) => {
    // Generate a unique test phone number
    const testPhone = `98765432${String(index).padStart(2, '0')}`;
    updateStmt.run(testPhone, driver.id);
    console.log(`✓ Driver: ${driver.name} (ID: ${driver.id}) - Phone: ${testPhone}`);
  });
  
  console.log(`\n✓ Updated ${drivers.length} drivers with phone numbers`);
  
  db.close();
  console.log("✓ Completed successfully");
} catch (err) {
  console.error("Error:", err.message);
  process.exit(1);
}
