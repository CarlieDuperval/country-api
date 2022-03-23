import connect from "./connect.js";

const countryCollection = connect().collection("countries");

export const getAllCountries = async () => {
  try {
    const snapshot = await countryCollection.get();
    const result = snapshot.docs.map((doc) => {
      const country = doc.data();
      country.id = doc.id;
      return country;
    });

    return result;
  } catch (error) {
    console.error(error);
  }
};

export const createCountry = async (contry) => {
  try {
    const result = await countryCollection.add(contry)
    contry.id = result.id;
    return contry;
  } catch (error) {
    console.error(error);
  }
};

export const updateCountry = async (id, country) => {

  try {
     await countryCollection.doc(id).update(country)
    return await getCountryById(id)
    
  } catch (error) {
    console.error(error)
  }

}

export const getCountryById = async id => {
  try {
    const result = await countryCollection.doc(id).get()
    return {
      id: result.id,
      ...result.data()
    }
  } catch (error) {
    console.error(error)
    
  }
}

export const getCountryByFilter = async countryFilter => {

  if(!countryFilter){
    countryFilter = {}
  }
  const { areacode, location, name, population} = countryFilter
  let query = countryCollection


  if(areacode){
    query = query.where("areacode", "==", areacode)
  }
  if(location){
    query = query.where("location", "==", location)
  }
  if(name){
    query = query.where("name", "==", name)
  }
  if(population){
    query = query.where("population", "==", population)
  }
  
  try {
    const snapshot = await query.get()
    const result = snapshot.docs.map((doc) => {
      const country = doc.data();
      country.id = doc.id;
      return country;
    });
    return result

  } catch (error) {
    console.error(error)
    
  }
}