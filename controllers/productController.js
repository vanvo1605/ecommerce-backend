const getAllProducts = (req, res) => {
  const sampleProducts = [
    { id: 1, name: "Shirt", price: 25 },
    { id: 2, name: "Pants", price: 40 }
  ];
  res.json(sampleProducts);
};

module.exports = { getAllProducts };
