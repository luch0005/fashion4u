const kategori = new URLSearchParams(window.location.search).get("category");
const endpoint = `https://kea-alt-del.dk/t7/api/products?category=${kategori}`;

const container = document.querySelector(".productlist-grid");

document.querySelector("h2").textContent = kategori;

function getData() {
  fetch(endpoint)
    .then((res) => res.json())
    .then(showData);
}

function showData(products) {
  let markup = "";
  products.forEach(
    (product) =>
      (markup += ` <a href="productdetails.html?id=${product.id}">
          <article class="product-card ${product.soldout && "soldout"} ${product.discount && "sale"}">
            <div class="soldout">
              <img
                class="product-image"
                src="https://kea-alt-del.dk/t7/images/webp/640/${product.id}.webp"
                alt="Product image"
              />
             ${product.soldout ? '<div class="sold-out-badge">Sold Out</div>' : ""}
            </div>
            <h3>${product.productdisplayname}</h3>
            <p class="category-brand">${product.articletype} | ${product.brandname}</p>
            <p class="price">DKK ${product.price},-</p>
            ${product.discount ? `<p class="sale">Nu DKK ${Math.round(product.price - (product.price * product.discount) / 100)},-</p>` : ""}
            ${product.discount ? `<p class="bgsale">${product.discount}%</p>` : ""}
          </article>
        </a>`),
  );

  container.innerHTML = markup;
}

getData();
console.log(container);

document
  .querySelectorAll("button")
  .forEach((knap) => knap.addEventListener("click", filter));

let allData;

function getData() {
  fetch(endpoint)
    .then((response) => response.json())
    .then((data) => {
      allData = data;
      showData(allData);
    });
}

function filter(e) {
  const valgt = e.target.textContent;
  if (valgt === "All") {
    console.log(allData);
    showData(allData);
  } else {
    const udsnit = allData.filter((element) => element.gender == valgt);
    console.log(udsnit);
    showData(udsnit);
  }
}
