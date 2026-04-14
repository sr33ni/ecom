const cursor = document.querySelector(".custom-cursor");
document.addEventListener("mousemove", (e) => {
  cursor.style.left = e.clientX + "px";
  cursor.style.top = e.clientY + "px";
});

document.querySelectorAll("a, button, article").forEach((el) => {
  el.addEventListener("mouseenter", () =>
    cursor.classList.add("scale-[5]", "mix-blend-difference", "bg-white"),
  );
  el.addEventListener("mouseleave", () =>
    cursor.classList.remove("scale-[5]", "mix-blend-difference", "bg-white"),
  );
});
