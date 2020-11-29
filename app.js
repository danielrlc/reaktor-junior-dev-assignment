var displayedData = document.querySelector('#displayedData');

var buildManufacturerList = async function (product) {
  var manufacturerList = [];
  var inventory = [];
  var productUrl = 'https://bad-api-assignment.reaktor.com/products/' + product;
  try {
    // Handle success case
    const response = await fetch(productUrl);
    inventory = await response.json();
    inventory.map((item) => {
      var manufacturer = item.manufacturer;
      var manufacturerIsNew = !manufacturerList.includes(manufacturer);
      if (manufacturerIsNew) {
        manufacturerList = manufacturerList.concat(manufacturer);
      }
    });
  } catch (error) {
    // Handle error case
    console.log(error);
  }
  runApp(inventory, manufacturerList);
};

buildManufacturerList('jackets');

function runApp(inventory, manufacturerList) {
  console.log(manufacturerList);
  console.log(inventory);
}
