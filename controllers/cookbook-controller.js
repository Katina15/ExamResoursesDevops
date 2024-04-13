function setup(app, cookbook) {
  app.get('/', function(req, res) {
    let model = {
      title: "Cookbook",
      msg: "Cookbook",
      cookbook: cookbook
    };
    res.render('home', model);
  });

  app.get('/loaderio-97355a48d08652424ffe033c5cf3d460.txt', function(req, res) {
    res.send('loaderio-97355a48d08652424ffe033c5cf3d460');
  });

  app.get('/cookbook', function(req, res) {
    let model = { title: "Cookbook", cookbook };
    res.render('cookbook', model);
  });

  app.get('/about', function(req, res) {
    let model = { title: "About" };
    res.render('about', model);
  });

  app.get('/add-product', function(req, res) {
    let model = { title: "Add Product" };
    res.render('add-product', model);
  });

  function paramEmpty(p) {
    return typeof(p) !== 'string' || p.trim().length === 0;
  }

  app.post('/add-product', function(req, res) {
    // Check if name or quantity fields are empty
    if (paramEmpty(req.body.name) || paramEmpty(req.body.quantity)) {
      let model = {
        title: "Add Product", 
        errMsg: "Cannot add product. Name and quantity fields are required!"
      };
      return res.render('add-product', model);
    }
  
    // Check if the cookbook already contains three products
    if (cookbook.length >= 3) {
      let model = {
        title: "Add Product", 
        errMsg: "Cannot add more than three products to the cookbook!"
      };
      return res.render('add-product', model);
    }
  
    let product = {
      name: req.body.name,
      quantity: req.body.quantity
    };
  
    cookbook.push(product);
    
    // Check if the cookbook now contains more than three products
    if (cookbook.length > 3) {
      // Remove the last product to ensure only three products are kept
      cookbook.pop();
    }
  
    return res.redirect('/cookbook');
  });
}

module.exports = { setup };