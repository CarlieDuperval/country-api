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
    const result = await countryCollection.add(contry);
    contry.id = result.id;
    return contry;
  } catch (error) {
    console.error(error);
  }
};
