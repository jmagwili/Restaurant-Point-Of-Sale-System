//experimentation to add products dynamically

const displayProducts = document.getElementById("prod-list");
const PopupBox = document.getElementsByClassName("Pop-up");
//PopupBox Not working yet
function showbox(){
    PopupBox.style.display = 'flex';
}

function addProducts(name){
    const sampleProduct = document.createElement("div");
    sampleProduct.innerHTML = name;
    sampleProduct.classList.add("products")
    displayProducts.appendChild(sampleProduct);
}

addProducts("apple");
addProducts("orange");
addProducts("banana");
addProducts("pizza");


