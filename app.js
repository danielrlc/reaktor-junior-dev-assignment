var displayedData = document.querySelector("#displayedData");
var listOfProducts = ["jackets", "shirts", "accessories"];

var getListOfManufacturersForAProduct = async function(product) {
  var list = [];
  productUrl = "https://bad-api-assignment.reaktor.com/products/" + product;
  await fetch(productUrl)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      data
        .map(function (item) {
          var manufacturer = item.manufacturer;
          var manufacturerIsNew = !list.includes(manufacturer);
          if (manufacturerIsNew) {
            list = list.concat(manufacturer);
          }
        });
    });
  return list;
}

var listOfManufacturersForJackets = getListOfManufacturersForAProduct("jackets");

console.log(listOfManufacturersForJackets)
