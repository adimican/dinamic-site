const filePath = path.join(__dirname, "data", "restaurants.json");

function getStoredResataurants() {
  const filedata = fs.readFileSync(filePath);
  const storedRestaurants = JSON.parse(filedata);
  return storedRestaurants;
}

function storeRestaurants(storableRestaurants) {
  fs.writeFileSync(filePath, JSON.stringify(storableRestaurants));
}
