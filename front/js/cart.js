let displayItems = JSON.parse(localStorage.getItem("selected"));
let sumQuantity = 0;
let sumPrice = 0;

// Insert Each Element Of Local.Storage
if (displayItems && displayItems.length > 0) {
  for (i = 0; i < displayItems.length; i++) {
    let container = document.getElementById("cart__items");
    // Set Article
    let article = document.createElement("article");
    container.appendChild(article);
    article.className = "cart__item";
    article.setAttribute("data-id", displayItems[i].ID);
    article.setAttribute("data-color", displayItems[i].Color);

    // Insert Img And Alt Text
    let divImg = document.createElement("div");
    article.appendChild(divImg);
    divImg.className = "cart__item__img";
    let img = document.createElement("img");
    divImg.appendChild(img);

    // Create Element Content
    let divContent = document.createElement("div");
    article.appendChild(divContent);
    divContent.className = "cart__item__content";

    let divContentDescription = document.createElement("div");
    divContent.appendChild(divContentDescription);
    divContentDescription.className = "cart__item__content__description";

    // Insert Name And Color
    let h2 = document.createElement("h2");
    divContentDescription.appendChild(h2);

    let pColor = document.createElement("p");
    divContentDescription.appendChild(pColor);
    pColor.innerHTML = displayItems[i].Color;
    let pPrice = document.createElement("p");
    divContentDescription.appendChild(pPrice);

    // Get Price From API
    fetch(`http://localhost:3000/api/products/${displayItems[i].ID}`)
      .then(function (res) {
        if (res.ok) {
          return res.json();
        }
      })
      .then(function (data) {
        pPrice.innerHTML = data.price + " €/pièce";
        h2.innerHTML = data.name;
        img.src = data.imageUrl;
        img.setAttribute("alt", data.altTxt);
      })
      .catch(function (err) {
        console.log(err);
      });

    // Create Element Settings
    let divContentSettings = document.createElement("div");
    article.appendChild(divContentSettings);
    divContentSettings.className = "cart__item__content__settings";

    let divContentSettingsQuantity = document.createElement("div");
    divContentSettings.appendChild(divContentSettingsQuantity);
    divContentSettingsQuantity.className =
      "cart__item__content__settings__quantity";
    // Insert Field Quantity
    let pQuantity = document.createElement("p");
    divContentSettingsQuantity.appendChild(pQuantity);
    pQuantity.innerHTML = "Qté : ";
    let inputQuantity = document.createElement("input");
    divContentSettingsQuantity.appendChild(inputQuantity);
    inputQuantity.className = "itemQuantity";
    inputQuantity.setAttribute("type", "Number");
    inputQuantity.setAttribute("name", "itemQuantity");
    inputQuantity.setAttribute("min", "1");
    inputQuantity.setAttribute("max", "100");
    inputQuantity.setAttribute("value", displayItems[i].Quantity);

    // Insert DeleteButon
    let divContentSettingsDelete = document.createElement("div");
    divContentSettings.appendChild(divContentSettingsDelete);
    divContentSettingsDelete.className =
      "cart__item__content__settings__delete";

    let pDelete = document.createElement("p");
    divContentSettingsDelete.appendChild(pDelete);
    pDelete.className = "deleteItem";
    pDelete.innerHTML = "Supprimer";

    // Calculate Total Quantity
    let totalQuantity = document.getElementById("totalQuantity");
    sumQuantity += displayItems[i].Quantity;
    totalQuantity.innerHTML = sumQuantity;

    // Calculate Total Price
    let totalPrice = document.getElementById("totalPrice");
    let quantityEach = displayItems[i].Quantity;

    fetch(`http://localhost:3000/api/products/${displayItems[i].ID}`)
      .then(function (res) {
        if (res.ok) {
          return res.json();
        }
      })
      .then(function (data) {
        sumPrice += data.price * quantityEach;
        totalPrice.innerHTML = sumPrice;
      })
      .catch(function (err) {
        console.log(err);
      });

    // Insert Interactivity In Field Quantity
    const input = document.querySelectorAll(".itemQuantity")[i];

    input.addEventListener("change", function () {
      if (1 <= input.value && 100 >= input.value) {
        let whichArticle = input.closest("article");

        let wichID = whichArticle.getAttribute("data-id");
        console.log(wichID);

        let wichColor = whichArticle.getAttribute("data-color");
        console.log(wichColor);

        let getValue = parseInt(input.value);
        console.log(getValue);

        let cherche = displayItems.find(
          (color) => color.Color == wichColor && color.ID == wichID
        );
        console.log(cherche);

        console.log(cherche.Quantity);

        cherche.Quantity = getValue;

        console.log(cherche);

        localStorage.setItem("selected", JSON.stringify(displayItems));

        location.reload();
      } else if (input.value > 100) {
        alert("La quantité doit étre comprise entre 1 et 100 exemplaires !");
        location.reload()
      } else if (input.value < 1) {
        alert("Êtes-vous sûr de vouloir retirer cette article ? Si oui, appuyer sur le bouton Supprimer !");
        location.reload()
      }
    });
  }

  // Insert Interactivity For DeleteButon
  const buttonDelete = document.querySelectorAll(".deleteItem");

  buttonDelete.forEach((buttonDelete) => {
    buttonDelete.addEventListener("click", () => {
      let whichArticle = buttonDelete.closest("article");

      let wichID = whichArticle.getAttribute("data-id");

      let wichColor = whichArticle.getAttribute("data-color");

      let cherche = displayItems.find(
        (color) => color.Color == wichColor && color.ID == wichID
      );

      let whichDelete = displayItems.indexOf(cherche);

      console.log(whichDelete);

      displayItems.splice(whichDelete, 1);

      localStorage.setItem("selected", JSON.stringify(displayItems));

      console.log(displayItems);

      location.reload();
    });
  });

} else {
  let emptyCart = document.getElementsByClassName("cart")[0];
  emptyCart.style.display = "none";
  let h1 = document.querySelector("h1");
  h1.innerHTML = "Votre panier est vide !";
}
////////////////// FORM //////////////////

const firstName = document.getElementById("firstName");
const lastName = document.getElementById("lastName");
const address = document.getElementById("address");
const city = document.getElementById("city");
const email = document.getElementById("email");

let valueFirstName, valueLastName, valueAddress, valueCity, valueEmail;

// Conditions for FirstName
firstName.addEventListener("change", function (e) {
  valueFirstName;
  if (e.target.value.match("^[A-Za-zéèê-]+$", "g")) {
    valueFirstName = e.target.value;
    console.log("correct");
    let errorFirstName = document.getElementById("firstNameErrorMsg");
    errorFirstName.innerHTML = "";
  } else if (e.target.value.length == 0) {
    valueFirstName = null;
    let errorFirstName = document.getElementById("firstNameErrorMsg");
    errorFirstName.innerHTML = "Champ Prénom requis";
  } else {
    valueFirstName = null;
    console.log("incorrect");
    let errorFirstName = document.getElementById("firstNameErrorMsg");
    errorFirstName.innerHTML = "Champ Prénom incorrect !";
  }
});

// Conditions for LastName
lastName.addEventListener("change", function (e) {
  valueLastName;
  if (e.target.value.match("^[A-Za-zéèê-]+$", "g")) {
    valueLastName = e.target.value;
    console.log("correct");
    let errorLastName = document.getElementById("lastNameErrorMsg");
    errorLastName.innerHTML = "";
  } else if (e.target.value.length == 0) {
    valueLastName = null;
    let errorLastName = document.getElementById("lastNameErrorMsg");
    errorLastName.innerHTML = "Champ Nom requis";
  } else {
    valueLastName = null;
    console.log("incorrect");
    let errorLastName = document.getElementById("lastNameErrorMsg");
    errorLastName.innerHTML = "Champ Nom incorrect !";
  }
});

// Conditions for Address
address.addEventListener("change", function (e) {
  valueAddress;
  if (
    e.target.value.match("^[0-9]{1,6}[ ][A-Za-z]{1,10}([ ][A-Za-z]+){1,5}", "g")
  ) {
    valueAddress = e.target.value;
    console.log("correct");
    let errorAddress = document.getElementById("addressErrorMsg");
    errorAddress.innerHTML = "";
  } else if (e.target.value.length == 0) {
    valueAddress = null;
    let errorAddress = document.getElementById("addressErrorMsg");
    errorAddress.innerHTML = "Champ Adresse requis";
  } else {
    valueAddress = null;
    console.log("incorrect");
    let errorAddress = document.getElementById("addressErrorMsg");
    errorAddress.innerHTML = "Champ Adresse incorrect !";
  }
});

// Conditions for City
city.addEventListener("change", function (e) {
  valueCity;
  if (e.target.value.match("^[a-zA-Z]+(?:[s-][a-zA-Z]+)*$", "g")) {
    valueCity = e.target.value;
    console.log("correct");
    let errorCity = document.getElementById("cityErrorMsg");
    errorCity.innerHTML = "";
  } else if (e.target.value.length == 0) {
    valueCity = null;
    let errorCity = document.getElementById("cityErrorMsg");
    errorCity.innerHTML = "Champ Ville requis";
  } else {
    valueCity = null;
    console.log("incorrect");
    let errorCity = document.getElementById("cityErrorMsg");
    errorCity.innerHTML = "Champ Ville incorrect !";
  }
});

// Conditions for Email
email.addEventListener("change", function (e) {
  valueEmail;
  if (
    e.target.value.match(
      "^[a-zA-Z0-9.-_]+[@]{1}[a-zA-Z0-9.-_]+[.]{1}[a-z]{2,10}$",
      "g"
    )
  ) {
    valueEmail = e.target.value;
    console.log("correct");
    let errorEmail = document.getElementById("emailErrorMsg");
    errorEmail.innerHTML = "";
  } else if (e.target.value.length == 0) {
    valueEmail = null;
    let errorEmail = document.getElementById("emailErrorMsg");
    errorEmail.innerHTML = "Champ Email requis";
  } else {
    valueEmail = null;
    console.log("incorrect");
    let errorEmail = document.getElementById("emailErrorMsg");
    errorEmail.innerHTML = "Champ Email incorrect !";
  }
});

// Conditions for Form Validtion
const form = document.getElementById("order");

form.addEventListener("click", (e) => {
  e.preventDefault();

  if (
    valueFirstName &&
    valueLastName &&
    valueAddress &&
    valueCity &&
    valueEmail
  ) {
    console.log("Formulaire completé !");

    // Get Info From Local.storage
    const commandeFinal = JSON.parse(localStorage.getItem("selected"));
    let productID = [];

    commandeFinal.forEach((product) => {
      productID.push(product.ID);
    });
    // Create Command Which API Matching
    const commandeData = {
      contact: {
        firstName: valueFirstName,
        lastName: valueLastName,
        address: valueAddress,
        city: valueCity,
        email: valueEmail,
      },
      products: productID,
    };

    let stringifyCommandData = JSON.stringify(commandeData);

    // Create Request POST
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: stringifyCommandData,
    };

    // Send Request
    fetch("http://localhost:3000/api/products/order", options)
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        document.location.href = "confirmation.html?id=" + data.orderId;
      })
      .catch((err) => {
        console.log("Problème avec fetch : " + err.message);
      });

    localStorage.clear();
  } else {
    alert("Merci de compléter le formulaire correctement !");
  }
});
