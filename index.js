import express from "express";
import { getAllCountries, createCountry, updateCountry, getCountryById, getCountryByFilter } from "./src/country.js";
const app = express();
app.use(express.json());

// app.get("/countries", async (req, res) => {
//   try {
//     const result = await getCountryById(id);
//     res.status(200).send(result);
//   } catch (error) {
//     res.status(500).send(error);
//   }
// });


app.get('/countries/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const result = await getCountryById (id);
    res.status(200).send(result)
  } catch (error) {
    res.status(500).send(error)
  }

})

app.get('/countries', async (req, res) => {
  const { areacode, location, name, population} = req.query
  const filter = { areacode, location, name, population}
  try {
    const result = await getCountryByFilter(filter)
    res.status(200).send(result)
    
  } catch (error) {
    console.error(error)
    res.status(500).send(error)
    
  }
})



app.post("/countries", async (req, res) => {
  const country = req.body;

  try {
    const result = await createCountry(country);
    res.status(201).send(result);
  } catch (error) {
    res.status(500).send(error);
  }
});

app.patch('/countries/:id', async (req, res) => {
  const { id } = req.params
  const updateInput = req.body

  if (!updateInput){
    res.status(400).send("Empty Body")
    return
  }
  try {
    const result = await updateCountry(id, updateInput)
    res.status(200).send(result)
    
  } catch (error) {
    res.status(500).send(error)
  }
})



const port = 5601;
app.listen(port, () => {
  console.log(`We are listening on ${port}`);
});
