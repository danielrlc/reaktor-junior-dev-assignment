const displayedItems = document.querySelector('#displayedItems');

async function getAvailabilityData() {
  let data = [];
  const reps = await getAvailabilityForManufacturer('reps');
  const abiplos = await getAvailabilityForManufacturer('abiplos');
  const nouke = await getAvailabilityForManufacturer('nouke');
  const derp = await getAvailabilityForManufacturer('derp');
  const xoon = await getAvailabilityForManufacturer('xoon');
  // const allData = await buildAllData(reps, abiplos, nouke, derp, xoon)
  data = data.concat(reps);
  data = data.concat(abiplos);
  data = data.concat(nouke);
  data = data.concat(derp);
  data = data.concat(xoon);
  console.log(data);
  getInventory('jackets', data);
}

async function getAvailabilityForManufacturer(manufacturer) {
  const availabilityUrl =
    'https://bad-api-assignment.reaktor.com/availability/' + manufacturer;
  try {
    // Handle success case
    const response = await fetch(availabilityUrl);
    const responseData = await response.json();
    const availabilityData = responseData.response;
    return availabilityData;
  } catch (error) {
    // Handle error case
    console.log(error);
  }
}

async function getInventory(product, availabilityData) {
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
        // console.log(id, availability);
      });
  } catch (error) {
    // Handle error case
    console.log(error);
  }
  prepData(inventory, availabilityData);
}

function prepData(inventory, availabilityData) {
  // combine inventory data and availabilityData together
  let preppedI = inventory.filter((_, i) => i < 10);
  const preppedA = availabilityData
    // .filter((_, i) => i < 10)
    .map((item) => {
      return {
        id: item.id.toLowerCase(),
        availability: item.DATAPAYLOAD.substring(31).split('<')[0],
      };
    });
  // console.log(preppedI, preppedA);
  preppedI = preppedI.map((iItem) => {
    const targetA = preppedA.find((aItem) => aItem.id === iItem.id);
    return {
      ...iItem,
      availability: targetA.availability,
    };
    // console.log(targetA);
  });
  console.log(preppedI);
  runApp(inventory, availabilityData);
}

// const buildAvailabilityList = async function (manufacturer) {
//   let availabilityCategories = [];
//   const availabilityUrl =
//     'https://bad-api-assignment.reaktor.com/availability/' + manufacturer;
//   try {
//     // Handle success case
//     const response = await fetch(availabilityUrl);
//     const responseData = await response.json();
//     const availabilityData = responseData.response;
//     console.log(availabilityData);
//     availabilityData
//       .filter((_, i) => i < 10)
//       .map((item) => {
//         const inStockValue = item.DATAPAYLOAD.substring(31).split('<')[0];
//         console.log(inStockValue);
//       });
//   } catch (error) {
//     // Handle error case
//     console.log(error);
//   }
// };

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
      const availability = document.createElement('td');
      id.textContent = item.id;
      name.textContent = item.name;
      manufacturer.textContent = item.manufacturer;
      color.textContent = item.color;
      price.textContent = item.price;
      availability.textContent = item.availability;
      tr.appendChild(id);
      tr.appendChild(name);
      tr.appendChild(manufacturer);
      tr.appendChild(color);
      tr.appendChild(price);
      tr.appendChild(availability);
      displayedItems.appendChild(tr);
      const idInCaps = item.id.toUpperCase();
    });
}

getAvailabilityData();
