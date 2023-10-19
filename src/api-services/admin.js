import { baseUrl } from "../data/image";

export async function signupAdmin(data) {
  const res = await fetch(
    "https://ecommerse-site-aroy.onrender.com/admin/signup",
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    }
  );
  return res.json();
}
export async function loginAdmin(data) {
  const res = await fetch(
    baseUrl + "/admin/login",
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    }
  );
  return res.json();
}
export async function adminAddProuct({
  name,
  details,
  price,
  image,
  category,
}) {
  console.log(typeof category);
  const formData = new FormData();
  formData.append("name", name);
  formData.append("details", details);
  formData.append("price", price);
  formData.append("image", image);
  formData.append("category", category);
  const res = await fetch(
    baseUrl+"/admin/add-product",
    {
      method: "POST",
      headers: {
        Authorization: localStorage.getItem("token_admin"),
      },
      body: formData,
    }
  );
  return res.json();
}
export async function editProuct({
  name,
  details,
  price,
  image,
  category,
  _id,
}) {
  console.log(typeof category);
  const formData = new FormData();
  formData.append("name", name);
  formData.append("details", details);
  formData.append("price", price);
  formData.append("image", image);
  formData.append("category", category);
  formData.append("_id", _id);
  const res = await fetch(
    baseUrl+"/admin/edit-product",
    {
      method: "POST",
      headers: {
        Authorization: localStorage.getItem("token_admin"),
      },
      body: formData,
    }
  );
  return res.json();
}

export async function postDeletProduct(data) {
  const res = await fetch(
    baseUrl+"/admin/delet",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: localStorage.getItem("token_admin"),
      },
      body: JSON.stringify(data),
    }
  );
  return res.json();
}
