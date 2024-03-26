const API = "https://restcountries.com/v3.1";

export async function getPaisesByName(name) {
  const data = await fetch(`${API}/name/${name}`);
  const json = await data.json();
  return json;
}

export async function getPaisesAll() {
  const data = await fetch(`${API}/all`);
  const json = await data.json();
  console.log(json);
  return json;
}