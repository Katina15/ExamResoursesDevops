const assert = require('assert');
// Fixing Page Title Test
test('Home page', async function() {
  try {
      let res = await fetch("http://localhost:8080/");
      let body = await res.text();
      assert.ok(body.includes("<title>Home</title>")); // Adjust according to your page title
  } catch (error) {
      console.error("Error fetching page title:", error);
      throw error; // Rethrow the error to fail the test
  }
});

// Fixing Products Count Test
test('Products count', async function() {
  try {
      let res = await fetch("http://localhost:8080/");
      let body = await res.text();
      assert.ok(body.includes("Cookbook: <b>3</b>")); // Adjust according to your expected products count
  } catch (error) {
      console.error("Error fetching products count:", error);
      throw error; // Rethrow the error to fail the test
  }
});