const kategori = new URLSearchParams(window.location.search).get("category");
const endpoint = `https://kea-alt-del.dk/t7/api/products?category=${kategori}&limit=60`;
document.querySelector("h2").textContent = kategori;

const container = document.querySelector(".productlist-grid");

let allData;

document
  .querySelectorAll("#filter button")
  .forEach((knap) => knap.addEventListener("click", filter));

document
  .querySelectorAll("#sorter button")
  .forEach((knap) => knap.addEventListener("click", sorter));

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
    currentData = allData;
    showData(currentData);
  } else {
    currentData = allData.filter((element) => element.gender == valgt);
    showData(currentData);
  }
}

function sorter(event) {
  if (event.target.dataset.price) {
    const dir = event.target.dataset.price;
    if (dir == "acc") {
      currentData.sort((a, b) => a.price - b.price);
    } else {
      currentData.sort((a, b) => b.price - a.price);
    }
  } else {
    const dir = event.target.dataset.text;
    if (dir == "az") {
      currentData.sort((a, b) =>
        a.productdisplayname.localeCompare(b.productdisplayname, "da"),
      );
    } else {
      currentData.sort((a, b) =>
        b.productdisplayname.localeCompare(a.productdisplayname, "da"),
      );
    }
  }
  showData(currentData);
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
            ${product.discount ? `<p class="saleprice">Nu DKK ${Math.round(product.price - (product.price * product.discount) / 100)},-</p>` : ""}
            ${product.discount ? `<p class="bgsale">${product.discount}%</p>` : ""}
          </article>
        </a>`),
  );

  container.innerHTML = markup;
}

getData();
