import { baseUrl } from "../data/image";

export async function signupUser(data) {
  const res = await fetch(
    "https://ecommerse-site-aroy.onrender.com/user/signup",
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    }
  );
  return res.json();
}
export async function loginUser(data) {
  const res = await fetch(
    "https://ecommerse-site-aroy.onrender.com/user/login",
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    }
  );
  return res.json();
}

export async function infoUser(data) {
  const res = await fetch(
    "https://ecommerse-site-aroy.onrender.com/user/info",
    {
      method: "POST",
      headers: {
        Authorization: localStorage.getItem("token"),
      },
    }
  );
  return res.json();
}

// export async function addCart(data) {
//   const res = await fetch(
//     "https://ecommerse-site-aroy.onrender.com/user/add-to-cart",
//     {
//       method: "POST",
//       headers: {
//         Authorization: localStorage.getItem("token"),
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify({
//         cart: data,
//       }),
//     }
//   );
//   return res.json();
// }

export async function createOrder(data) {
  const res = await fetch(baseUrl + "/user/order", {
    method: "POST",
    headers: {
      Authorization: localStorage.getItem("token"),
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      items: data,
    }),
  });
  return res.json();
}

export async function getOrder() {
  console.log("here");
  const res = await fetch(baseUrl + "/user/get-order", {
    method: "POST",
    headers: {
      Authorization: localStorage.getItem("token"),
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ data: "someDAta" }),
  });
  return res.json();
}
