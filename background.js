chrome.commands.onCommand.addListener((command) => {
  if (command === "qi") {
    openPopupWindow();
  }
});

function openPopupWindow() {
  const width = 300;
  const height = 200;

  chrome.windows.getCurrent((window) => {
    const left = Math.round(window.width / 2 - width / 2 + window.left);
    const top = Math.round(window.height / 2 - height / 2 + window.top);

    chrome.windows.create({
      url: chrome.runtime.getURL("popup.html"),
      type: "popup",
      left: left,
      top: top,
      width: width,
      height: height,
    });
  });
}
