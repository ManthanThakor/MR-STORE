// ===============================
console.log("JavaScript is loaded");

document.querySelectorAll(".product-add-cart").forEach((button) => {
  button.addEventListener("click", () => {
    const popup = document.getElementById("popup");

    popup.classList.add("show");
    console.log("ADD TO CART clicked");

    setTimeout(() => {
      popup.classList.remove("show");
    }, 3000);
  });
});
// ===============================
