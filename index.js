import express from "express";
import { getAllCountries, createCountry } from "./src/country.js";
const app = express();
app.use(express.json());

app.get("/countries", async (req, res) => {
  try {
    const result = await getAllCountries();
    res.status(200).send(result);
  } catch (error) {
    res.status(500).send(error);
  }
});

app.post("/countries", async (req, res) => {
  const country = req.body;

  try {
    const result = await createCountry(country);
    res.status(201).send(result);
  } catch (error) {
    res.status(500).send(error);
  }
});

const port = 5601;
app.listen(port, () => {
  console.log(`We are listening on ${port}`);
});
