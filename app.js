const displayedItems = document.querySelector('#displayedItems');

async function getAvailabilityData() {
  let data = [];
  const reps = await getAvailabilityForManufacturer('reps');
  const abiplos = await getAvailabilityForManufacturer('abiplos');
  const nouke = await getAvailabilityForManufacturer('nouke');
  const derp = await getAvailabilityForManufacturer('derp');
  const xoon = await getAvailabilityForManufacturer('xoon');
  data = data.concat(reps);
  data = data.concat(abiplos);
  data = data.concat(nouke);
  data = data.concat(derp);
  data = data.concat(xoon);
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
  } catch (error) {
    // Handle error case
    console.log(error);
  }
  prepFinalData(inventory, availabilityData);
}

function prepFinalData(inventory, availabilityData) {
  const preppedAvailabilityData = availabilityData.map((item) => {
    return {
      id: item.id.toLowerCase(),
      availability: item.DATAPAYLOAD.substring(31).split('<')[0],
    };
  });
  combinedData = inventory.map((inventoryItem) => {
    const itemAvailability = preppedAvailabilityData.find(
      (availabilityItem) => availabilityItem.id === inventoryItem.id,
    );
    return {
      ...inventoryItem,
      availability: itemAvailability.availability,
    };
  });
  runApp(combinedData);
}

function runApp(finalData) {
  finalData.map((item) => {
    const itemFeaturesToDisplay = [
      'id',
      'name',
      'manufacturer',
      'color',
      'price',
      'availability',
    ];
    const tr = document.createElement('tr');
    itemFeaturesToDisplay.map((feature) => {
      const featureTd = document.createElement('td');
      featureTd.textContent = item[feature];
      tr.appendChild(featureTd);
    });
    displayedItems.appendChild(tr);
  });
}

getAvailabilityData();
