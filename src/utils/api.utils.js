export async function getAllProducts() {
  try {
    const response = await fetch("http://localhost:3000/api/products", {
      method: "GET",
    });

    const data = await response.json();
    return data;
  } catch (err) {
    console.log(`err`, err);
  }
}

export async function getProductById(productId) {
  try {
    const response = await fetch(
      `http://localhost:3000/api/products/${productId}`,
      {
        method: "GET",
      }
    );

    const data = await response.json();
    return data;
  } catch (err) {
    console.log(`err`, err);
  }
}

export async function getStaticProductIds() {
  try {
    const response = await fetch(
      `http://localhost:3000/api/products/getStaticIds`,
      {
        method: "GET",
      }
    );

    const data = await response.json();
    return data;
  } catch (err) {
    console.log(`err`, err);
  }
}

export async function signUp(body) {
  try {
    const response = await fetch(`/api/sign-up`, {
      method: "POST",
      body,
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = await response.json();
    return data;
  } catch (err) {
    console.log(`err`, err);
  }
}
export async function getUser(userId) {
  try {
    const response = await fetch(`http://localhost:3000/api/user/${userId}`, {
      method: "GET",
    });
    console.log(`response`, response);
    const data = await response.json();
    console.log(`data`, data);
    return data;
  } catch (err) {
    console.log(`err`, err);
  }
}
