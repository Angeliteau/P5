// Get OrderID From Url
var urlCourante = document.location.href;
var url = new URL(urlCourante);
var id = url.searchParams.get("id");

// Display OrderID
let displayOrderId = document.getElementById("orderId");
displayOrderId.innerHTML = id;
displayOrderId.style.fontWeight = "bold";
