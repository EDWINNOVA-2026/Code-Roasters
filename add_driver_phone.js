// Script to add phone column to drivers table if it doesn't exist
const Database = require("better-sqlite3");
const path = require("path");

const dbPath = path.join(__dirname, "data", "ambulance.db");
const db = new Database(dbPath);

try {
  const driverInfo = db.prepare("PRAGMA table_info(drivers)").all();
  const driverCols = driverInfo.map((col) => col.name);
  
  if (!driverCols.includes("phone")) {
    db.prepare("ALTER TABLE drivers ADD COLUMN phone TEXT").run();
    console.log("✓ Added 'phone' column to drivers table");
  } else {
    console.log("✓ 'phone' column already exists in drivers table");
  }
  
  const bookingInfo = db.prepare("PRAGMA table_info(bookings)").all();
  const bookingCols = bookingInfo.map((col) => col.name);
  
  if (!bookingCols.includes("driverPhone")) {
    db.prepare("ALTER TABLE bookings ADD COLUMN driverPhone TEXT").run();
    console.log("✓ Added 'driverPhone' column to bookings table");
  } else {
    console.log("✓ 'driverPhone' column already exists in bookings table");
  }
  
  // Verify the changes
  const updatedDriverInfo = db.prepare("PRAGMA table_info(drivers)").all();
  const updatedBookingInfo = db.prepare("PRAGMA table_info(bookings)").all();
  
  console.log("\nDrivers table schema:");
  updatedDriverInfo.forEach((col) => console.log(`  - ${col.name} (${col.type})`));
  
  console.log("\nBookings table schema (relevant columns):");
  updatedBookingInfo.filter(col => col.name.includes("driver") || col.name.includes("Driver"))
    .forEach((col) => console.log(`  - ${col.name} (${col.type})`));
  
  db.close();
  console.log("\n✓ Migration completed successfully");
} catch (err) {
  console.error("Error:", err.message);
  process.exit(1);
}
