const frame = document.getElementById("browser-frame");
const addressText = document.getElementById("address-text");

function setActiveUrl(url, label) {
  if (frame) frame.src = url;
  if (addressText) addressText.textContent = label || url;

  document.querySelectorAll(".tab").forEach(t => t.classList.remove("active"));
  document.querySelectorAll(`.tab[data-url="${url}"]`).forEach(t => t.classList.add("active"));
}

document.querySelectorAll(".tab").forEach(tab => {
  tab.addEventListener("click", () => {
    const url = tab.dataset.url;
    const label = tab.textContent.trim();
    setActiveUrl(url, label);
  });
});

document.querySelectorAll(".link").forEach(link => {
  link.addEventListener("click", () => {
    const url = link.dataset.url;
    const label = link.dataset.label || url;
    setActiveUrl(url, label);
  });
});
