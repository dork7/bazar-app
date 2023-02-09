export async function getAllProducts() {
  const response = await fetch('http://localhost:3000/api/products', {
    method: 'GET',
  });

  const data = await response.json();
  return data;
}

export async function getProductById(productId) {
  const response = await fetch(
    `http://localhost:3000/api/products/${productId}`,
    {
      method: 'GET',
    }
  );

  const data = await response.json();
  return data;
}

export async function getStaticProductIds(productId) {
  const response = await fetch(
    `http://localhost:3000/api/products/getStaticIds`,
    {
      method: 'GET',
    }
  );

  const data = await response.json();
  return data;
}

export async function signUp(body) {
  console.log('bodyo :>> ', body);
  const response = await fetch(`/api/sign-up`, {
    method: 'POST',
    body,
    headers: {
      'Content-Type': 'application/json',
    },
  });

  const data = await response.json();
  return data;
}
