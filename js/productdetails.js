const id = new URLSearchParams(window.location.search).get("id");
const endpoint = `https://kea-alt-del.dk/t7/api/products/${id}`;

const container = document.querySelector("main");

function getData() {
  fetch(endpoint)
    .then((res) => res.json())
    .then(showData);
}

function showData(product) {
  console.log(product);
  container.innerHTML = `
  <div class="topproductdetails">
  <a class="tilbageknap" href="productlist.html?category=${product.category}"
  >Go back to productlist</a
>
${product.soldout ? `<h3 class="soldout-product">Sold out</h3>` : ""}
 </div>
<section class="product-grid">
 <div>
<img
        class="product-pic"
        src="https://kea-alt-del.dk/t7/images/webp/640/${product.id}.webp"
        alt="Produktbillede"
      />
      </div>
      <article class="product-information">
        <h2>${product.productdisplayname}</h2>
        <p>${product.articletype}</p>
        <p>${product.subcategory}</p>
        <p>DKK ${product.price},-</p>
        ${product.discount ? `<p class="saleprice">Nu DKK ${Math.round(product.price - (product.price * product.discount) / 100)},-</p>` : ""}
        ${product.discount ? `<p class="bgsale">${product.discount}%</p>` : ""}
        </br>
        <h3>${product.brandname}</h3>
        ${product.brandbio ? `<p>${product.brandbio}</p>` : ""}
      </article>
      <article class="form-section">
        <div class="form-container">
          <label for="stoerrelse">Størrelse XS-XL</label>
          <select id="stoerrelse" name="stoerrelse" required>
            <option value="" disabled selected>Vælg størrelse...</option>
            <option value="x-small">XS</option>
            <option value="small">S</option>
            <option value="medium">M</option>
            <option value="large">L</option>
            <option value="x-large">XL</option>
          </select>
        </div>
        <button>Føj til kurven</button>
      </article>
      </section>
`;
}

getData();
console.log(container);
