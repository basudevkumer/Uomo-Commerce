// Express app-এর সব route এবং middleware এখানে import করছি।
const app = require("./app.js");

// MongoDB-এর সঙ্গে connection তৈরি করার function import করছি।
const connectDB = require("./config/db.js");

// Environment variable-এ PORT থাকলে সেটি ব্যবহার হবে; না থাকলে 5000 port ব্যবহার হবে।
const port = process.env.PORT || 5000;

async function startServer() {
  try {
    // প্রথমে database-এর সঙ্গে connection তৈরি হবে।
    await connectDB();

    // Database connection সফল হলে Express API server চালু হবে।
    app.listen(port, () => {
      console.log(`API listening on ${port}`);
    });
  } catch (error) {
    // Database connection ব্যর্থ হলে server চালু হবে না।
    console.error("Unable to start API", error);
    process.exit(1);
  }
}

// Application start করার জন্য function-টি call করছি।
startServer();
