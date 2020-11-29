const displayedItems = document.querySelector('#displayedItems');

const buildManufacturerList = async function (product) {
  let manufacturerList = [];
  let repsInventory = [];
  let inventory = [];
  const productUrl =
    'https://bad-api-assignment.reaktor.com/products/' + product;
  try {
    // Handle success case
    const response = await fetch(productUrl);
    inventory = await response.json();
    console.log(inventory);
    inventory.map((item) => {
      const manufacturer = item.manufacturer;
      const manufacturerIsNew = !manufacturerList.includes(manufacturer);
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

const buildAvailabilityList = async function (manufacturer) {
  let availabilityCategories = [];
  const availabilityUrl =
    'https://bad-api-assignment.reaktor.com/availability/' + manufacturer;
  try {
    // Handle success case
    const response = await fetch(availabilityUrl);
    const responseData = await response.json();
    const availabilityData = responseData.response;
    console.log(availabilityData);
    availabilityData
      .filter((_, i) => i < 10)
      .map((item) => {
        const inStockValue = item.DATAPAYLOAD.substring(31).split('<')[0];
        console.log(inStockValue);
      });
  } catch (error) {
    // Handle error case
    console.log(error);
  }
};

buildManufacturerList('jackets');
buildAvailabilityList('reps');

function runApp(inventory, manufacturerList) {
  const tenJ = inventory.filter((item, i) => i < 10);
  console.log(tenJ);
  tenJ.map((item, i) => {
    const tr = document.createElement('tr');
    const id = document.createElement('td');
    const name = document.createElement('td');
    const manufacturer = document.createElement('td');
    const color = document.createElement('td');
    const price = document.createElement('td');
    id.textContent = item.id;
    name.textContent = item.name;
    manufacturer.textContent = item.manufacturer;
    color.textContent = item.color;
    price.textContent = item.price;
    tr.appendChild(id);
    tr.appendChild(name);
    tr.appendChild(manufacturer);
    tr.appendChild(color);
    tr.appendChild(price);
    displayedItems.appendChild(tr);
  });
}
