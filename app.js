const displayedItems = document.querySelector('#displayedItems');

const getInventory = async function (product, availabilityData) {
  let inventory = [];
  const productUrl =
    'https://bad-api-assignment.reaktor.com/products/' + product;
  try {
    // Handle success case
    const response = await fetch(productUrl);
    inventory = await response.json();
    availabilityData
      .filter((_, i) => i < 10)
      .map((item) => {
        const id = item.id.toLowerCase();
        const availability = item.DATAPAYLOAD.substring(31).split('<')[0];
        console.log(id, availability);
      });
  } catch (error) {
    // Handle error case
    console.log(error);
  }
  runApp(inventory, availabilityData);
};

function runApp(inventory, availabilityData) {
  inventory
    .filter((_, i) => i < 10)
    .map((item, i) => {
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
      const idInCaps = item.id.toUpperCase();
    });
}

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

async function getAvailabilityForManufacturer(manufacturer) {
  const availabilityUrl =
    'https://bad-api-assignment.reaktor.com/availability/' + manufacturer;
  try {
    // Handle success case
    const response = await fetch(availabilityUrl);
    const responseData = await response.json();
    const availabilityData = responseData.response;
    getInventory('jackets', availabilityData);
  } catch (error) {
    // Handle error case
    console.log(error);
  }
}

getAvailabilityForManufacturer('reps');
