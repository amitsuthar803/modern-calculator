const hamburger = document.querySelector(".hamburger");
const sidebar = document.querySelector(".sidebar");
const close = document.querySelector(".close");

hamburger.addEventListener("click", () => {
  sidebar.classList.toggle("show");
});

close.addEventListener("click", () => {
  sidebar.classList.remove("show");
});
