import { baseUrl } from "../data/image";

export async function shopData() {
  const res = await fetch(baseUrl + "/shop");
  return res.json();
}
