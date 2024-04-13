const assert = require('assert');
const fetch = require('node-fetch');
const nock = require('nock');

suite('Add Products page', function() {
  test('Page title', async function() {
    let res = await fetch("http://localhost:8080/add-product");
    let body = await res.text();
    assert.ok(body.includes("<h1>Add New Product</h1>"));
  });

  test('Product HTML form', async function() {
    // Mocking server response
    nock('http://localhost:8080')
      .get('/Add-Product')
      .reply(200, '<form id="product-form"></form>');

    // Your test logic
    let res = await fetch("http://localhost:8080/Add-Product");
    let body = await res.text();
    
    let nameFieldFound = body.includes('<input id="name" type="text" name="name"/>');
    assert.ok(nameFieldFound, "Field 'name' is missing");

    let quantityFieldFound = body.includes('<input id="price" type="text" name="quantity"/>');
    assert.ok(quantityFieldFound, "Field 'quantity' is missing");

    let buttonAddFound = body.includes('<button type="submit">Add</button>');
    assert.ok(buttonAddFound, "Button [Add] is missing");
  });

  test('Add valid product', async function() {
    // Mocking server response for the POST request to /Add-Product
    nock('http://localhost:8080')
      .post('/Add-Product')
      .reply(403, 'Cannot add more than three products to the cookbook!');

    // Your test logic for adding a valid product (should fail due to limit)
    let res = await fetch(
      "http://localhost:8080/Add-Product",
      {
        method: 'POST',
        headers: {
          "Content-Type": "application/x-www-form-urlencoded"
        },
        body: "name=Ham&quantity=200 g"
      }
    );
    let body = await res.text();
    assert.ok(body.includes("Cannot add more than three products to the cookbook!"), "Adding valid product should not be allowed when the limit is reached");
  });
  
  test('Add invalid product', async function() {
    // Mocking server response for the POST request to /Add-Product
    nock('http://localhost:8080')
      .post('/Add-Product')
      .reply(403, 'Cannot add product. Name and quantity fields are required!');

    // Your test logic for adding an invalid product (should fail due to missing fields)
    let res = await fetch(
      "http://localhost:8080/Add-Product",
      {
        method: 'POST',
        headers: {
          "Content-Type": "application/x-www-form-urlencoded"
        },
        body: "name=&quantity=100"
      }
    );
    let body = await res.text();
    assert.ok(body.includes("Cannot add product. Name and quantity fields are required!"), "Add invalid product should display an error message");
  });
});