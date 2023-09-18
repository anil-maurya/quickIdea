let data;

function render() {
  // const itemList = data.map((item) => `<li>${item}</li>`).join("");
  const itemList = data
    .map(
      (item, index) => `
    <li>
       - ${item} 
        <button id="${index}">x</button>
    </li>
`
    )
    .join("");

  const textArea = document.getElementById("textArea");
  textArea.innerHTML = `<ul>${itemList}</ul>`;
}

function deleteItem(index) {
  data.splice(index, 1);
  chrome.storage.local.set({ brainDump: data }, () => {
    render();
  });
}

function setState(value) {
  data.push(value);
  chrome.storage.local.set({ brainDump: data }, () => {
    render();
  });
}

document.addEventListener("DOMContentLoaded", function () {
  document.getElementById("textInput").focus();

  window.addEventListener("keydown", function (event) {
    if (event.key === "Escape") {
      window.close();
    }
  });
  const textArea = document.getElementById("textArea");

  textArea.addEventListener("click", (e) => {
    console.log(e.target.id);
    deleteItem(e.target.id);
  });

  chrome.storage.local.get(["brainDump"], (result) => {
    data = result.brainDump;
    render();
  });
});

document
  .getElementById("textInput")
  .addEventListener("keydown", function (event) {
    if (event.key === "Enter") {
      setState(this.value);
      this.value = "";
    }
  });
