// Verification script for Driver Phone Feature Implementation
const Database = require("better-sqlite3");
const path = require("path");
const fs = require("fs");

const dbPath = path.join(__dirname, "data", "ambulance.db");
const db = new Database(dbPath);

console.log("🔍 DRIVER PHONE FEATURE VERIFICATION\n");
console.log("═".repeat(60));

// 1. Check database schema
console.log("\n1. DATABASE SCHEMA CHECK");
console.log("─".repeat(60));

try {
  const driverInfo = db.prepare("PRAGMA table_info(drivers)").all();
  const driverCols = driverInfo.map((col) => col.name);
  
  if (driverCols.includes("phone")) {
    console.log("✓ drivers table has 'phone' column");
  } else {
    console.log("✗ drivers table MISSING 'phone' column");
  }
  
  const bookingInfo = db.prepare("PRAGMA table_info(bookings)").all();
  const bookingCols = bookingInfo.map((col) => col.name);
  
  if (bookingCols.includes("driverPhone")) {
    console.log("✓ bookings table has 'driverPhone' column");
  } else {
    console.log("✗ bookings table MISSING 'driverPhone' column");
  }
} catch (err) {
  console.log("✗ Database error:", err.message);
}

// 2. Check driver data
console.log("\n2. DRIVER DATA CHECK");
console.log("─".repeat(60));

try {
  const driversWithPhone = db.prepare("SELECT COUNT(*) as count FROM drivers WHERE phone IS NOT NULL").get();
  const totalDrivers = db.prepare("SELECT COUNT(*) as count FROM drivers").get();
  
  console.log(`✓ Total drivers: ${totalDrivers.count}`);
  console.log(`✓ Drivers with phone: ${driversWithPhone.count}`);
  
  if (driversWithPhone.count > 0) {
    const sampleDriver = db.prepare("SELECT id, name, phone FROM drivers WHERE phone IS NOT NULL LIMIT 1").get();
    console.log(`  Example: ${sampleDriver.name} - ${sampleDriver.phone}`);
  }
} catch (err) {
  console.log("✗ Driver data error:", err.message);
}

// 3. Check bookings with driverPhone
console.log("\n3. BOOKING DATA CHECK");
console.log("─".repeat(60));

try {
  const bookingsWithPhone = db.prepare("SELECT COUNT(*) as count FROM bookings WHERE driverPhone IS NOT NULL").get();
  const totalBookings = db.prepare("SELECT COUNT(*) as count FROM bookings").get();
  
  console.log(`✓ Total bookings: ${totalBookings.count}`);
  console.log(`✓ Bookings with driverPhone: ${bookingsWithPhone.count}`);
  
  if (bookingsWithPhone.count > 0) {
    const sampleBooking = db.prepare(
      "SELECT id, driverName, driverPhone FROM bookings WHERE driverPhone IS NOT NULL LIMIT 1"
    ).get();
    console.log(`  Example: ${sampleBooking.driverName} - ${sampleBooking.driverPhone}`);
  }
} catch (err) {
  console.log("✗ Booking data error:", err.message);
}

// 4. Check backend files
console.log("\n4. BACKEND CODE CHECK");
console.log("─".repeat(60));

try {
  const serverCode = fs.readFileSync(path.join(__dirname, "backend", "server.js"), "utf8");
  
  const checks = [
    { 
      name: "Driver signup accepts phone", 
      pattern: /const\s*{\s*name,\s*email,\s*password,\s*vehicle,\s*baseLocation,\s*phone\s*}\s*=\s*req\.body/,
      inDriverSignup: true
    },
    {
      name: "Driver signup stores phone",
      pattern: /INSERT INTO drivers\s*\([^)]*phone[^)]*\)/,
      inDriverSignup: true
    },
    {
      name: "Driver login returns phone",
      pattern: /SELECT[^FROM]*phone[^FROM]*FROM drivers WHERE email/,
      inDriverLogin: true
    },
    {
      name: "Booking creation stores driverPhone",
      pattern: /driverPhone[^)]*VALUES/,
      inBooking: true
    },
    {
      name: "Booking creation includes chosenDriver.phone",
      pattern: /chosenDriver\.phone/,
      inBooking: true
    }
  ];
  
  checks.forEach((check) => {
    if (check.pattern.test(serverCode)) {
      console.log(`✓ ${check.name}`);
    } else {
      console.log(`✗ ${check.name}`);
    }
  });
} catch (err) {
  console.log("✗ Backend check error:", err.message);
}

// 5. Check frontend files
console.log("\n5. FRONTEND CODE CHECK");
console.log("─".repeat(60));

try {
  const htmlCode = fs.readFileSync(path.join(__dirname, "public", "index.html"), "utf8");
  
  const checks = [
    {
      name: "Driver signup form has phone input",
      pattern: /id="ds-phone"/
    },
    {
      name: "Driver signup captures phone",
      pattern: /document\.getElementById\("ds-phone"\)\.value/
    },
    {
      name: "Driver signup sends phone in body",
      pattern: /phone.*vehicle.*baseLocation|baseLocation.*phone/
    },
    {
      name: "Patient dashboard displays driverPhone",
      pattern: /latest\.driverPhone/
    }
  ];
  
  checks.forEach((check) => {
    if (check.pattern.test(htmlCode)) {
      console.log(`✓ ${check.name}`);
    } else {
      console.log(`✗ ${check.name}`);
    }
  });
} catch (err) {
  console.log("✗ Frontend check error:", err.message);
}

db.close();

console.log("\n" + "═".repeat(60));
console.log("✓ VERIFICATION COMPLETE\n");
console.log("Next steps:");
console.log("1. Restart the server: npm start");
console.log("2. Create a new driver account with a phone number");
console.log("3. Create a user booking");
console.log("4. Accept the booking with a driver");
console.log("5. Verify patient dashboard shows driver phone");
