var urlCourante = document.location.href;
var url = new URL(urlCourante);
var id = url.searchParams.get("id");

// Function Send Product To Local.Storage
function saveCart(cart) {
  localStorage.setItem("selected", JSON.stringify(cart));
}

fetch(`http://localhost:3000/api/products/${id}`)
  .then(function (res) {
    if (res.ok) {
      return res.json();
    }
  })
  .then(function (data) {
    // Insert Name <Title>
    const headerTitle = document.querySelector("title");
    headerTitle.innerHTML = `${data.name}`;

    // Insert Image
    const productItem = document.getElementsByClassName("item__img")[0];
    const productImg = document.createElement("img");
    productImg.src = `${data.imageUrl}`;
    productImg.alt = `${data.altTxt}`;
    productItem.appendChild(productImg);

    // Insert Title
    const title = document.getElementById("title");
    title.innerHTML = `${data.name}`;

    // Insert Price
    const price = document.getElementById("price");
    price.innerHTML = ` ${data.price}`;

    // Insert Description
    const description = document.getElementById("description");
    description.innerHTML = `${data.description}`;

    // Insert Colors
    const listColors = data.colors;

    for (i = 0; i <= listColors.length - 1; i++) {
      const colors = document.getElementById("colors");
      let tagOption = document.createElement("option");

      tagOption.innerHTML = `${listColors[i]}`;
      tagOption.value = `${listColors[i]}`;

      colors.appendChild(tagOption);
    }

    // Initialyse Variables To Add Quantity
    const buttonAddToCart = document.getElementById("addToCart");
    let selectColor = document.getElementById("colors");
    let selectQuantity = document.getElementById("quantity");

    buttonAddToCart.addEventListener("click", function () {
      const productData = {
        ID: data._id,
        Color: selectColor.value,
        Quantity: parseInt(selectQuantity.value, 10),
      };

      let cartSaved = JSON.parse(localStorage.getItem("selected"));
      if (
        1 <= selectQuantity.value &&
        100 >= selectQuantity.value &&
        selectColor.value
      ) {
        console.log(selectColor.value);
        // If Cart Already Exist Compare It
        if (cartSaved) {
          const productControl = cartSaved.find(
            (couch) => couch.ID == data._id && couch.Color == selectColor.value
          );
          // If ID And Color Are Equal = Add Quantity
          if (productControl) {
            let addQuantity = productData.Quantity + productControl.Quantity;
            productControl.Quantity = addQuantity;
            saveCart(cartSaved);

            // Else Create New Cart
          } else {
            cartSaved.push(productData);
            saveCart(cartSaved);
          }

          // Else Create New Cart
        } else {
          cartSaved = [];
          cartSaved.push(productData);
          saveCart(cartSaved);
        }
        alert("Le produit a bien été ajouté à votre panier !");
      } else {
        alert(
          "La quantité doit étre comprise entre 1 et 100 exemplaires et avoir une couleur prédéfinie !"
        );
      }
    });
  })
  .catch(function (err) {
    // Une erreur est survenue
  });
