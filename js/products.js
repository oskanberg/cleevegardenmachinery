const endpoint = "https://os-t.com/cgm-api/api/collections/get/products?token=a9bed48fd1e3ba6f4f37ec8a88aaca";


const template = document.getElementById("template").children[0];
function newProduct(name, description, price, image) {
    let node = template.cloneNode(true);
    // name
    node.getElementsByClassName("product-name")[0].innerHTML = name;

    // description
    node.getElementsByClassName("product-description")[0].innerHTML = description;

    // price
    node.getElementsByClassName("product-price")[0].innerHTML = price;

    // image

    // image can be either absolute (i.e. starts http) or relative (i.e. starts with /)
    if (!image.startsWith("http")) {
        image = "https://os-t.com/cgm-api/" + image;
    }
    node.getElementsByClassName("product-image")[0].src = image;

    return node;
}

const productSection = document.getElementById("products");
function addEntry(product) {
    let p = newProduct(product.Name, product.Description, product.Price, product.Image.path)
    productSection.appendChild(p);
}

function loadProducts() {
    fetch(endpoint)
        .then(function (response) {
            return response.json();
        })
        .then(function (products) {
            products.entries.forEach(addEntry)
        })
        .catch(function (error) {
            console.error("oh no!");
            console.error(error);
        });
}

loadProducts();
