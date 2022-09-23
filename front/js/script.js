fetch("http://localhost:3000/api/products")
  .then(function (response) {
    if (response.ok) {
      return response.json();
    }
  })
  .then(function (data) {
    // Create Boucle
    for (i = 0; i < data.length; i++) {
      // Select #items
      let container = document.getElementById("items");
      // Create a, article, img, h3, p
      let a = document.createElement("a");
      let article = document.createElement("article");
      let img = document.createElement("img");
      let h3 = document.createElement("h3");
      let p = document.createElement("p");

      // Add Class to h3, p
      h3.className = "productName";
      p.className = "productDescription";

      // Place balise
      container.appendChild(a);
      a.appendChild(article);
      article.appendChild(img);
      article.appendChild(h3);
      article.appendChild(p);

      // Insert link, img/alt, name, description
      a.href = `./product.html?id=${data[i]._id}`;
      img.src = `${data[i].imageUrl}`;
      img.alt = `${data[i].altTxt}`;
      h3.innerHTML = `${data[i].name}`;
      p.innerHTML = `${data[i].description}`;
    }
  })
  .catch(function (err) {
    console.log("Une erreur est survenue");
  });
