var displayedData = document.querySelector('#displayedData');
var listOfProducts = ['jackets', 'shirts', 'accessories'];

var buildManufacturersList = async function (product) {
  var list = [];
  productUrl = 'https://bad-api-assignment.reaktor.com/products/' + product;
  try {
    // Handle success case
    const response = await fetch(productUrl);
    const inventory = await response.json();
    inventory.map((item) => {
      var manufacturer = item.manufacturer;
      var manufacturerIsNew = !list.includes(manufacturer);
      if (manufacturerIsNew) {
        list = list.concat(manufacturer);
      }
    });
  } catch (error) {
    // Handle error case
    console.log(error);
  }
  console.log(list);
};

var jacketManufacturerList = buildManufacturersList('jackets');
