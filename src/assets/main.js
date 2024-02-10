// This script will be run within the webview itself
// It cannot access the main VS Code APIs directly.
(function () {
  const vscode = acquireVsCodeApi();

  // Variables
  const messages = document.querySelector('.message-list');
  const btn = document.querySelector('.btn');
  const input = document.querySelector('input');

  window.addEventListener('message', (event) => {
    const message = event.data; // The json data that the extension sent
    switch (message.type) {
      case 'receiveMessage': {
        receiveMessage(message.value);
        break;
      }
    }
  });

  btn.addEventListener('click', () => {
    onBtnClicked(input.value);
    sendMessage(input.value);
    input.value = '';
  });

  function onBtnClicked(text) {
    vscode.postMessage({ type: 'sendMessage', value: text });
  }

  // Messenger Functions
  function sendMessage(text) {
    const message = document.createElement('li');
    message.classList.add('message-item', 'item-secondary');
    message.innerHTML = `<strong>You:</strong> ${text}`;
    messages.appendChild(message);
    messages.scrollTop = messages.scrollHeight;
  }

  function receiveMessage(text) {
    const message = document.createElement('li');
    message.classList.add('message-item', 'item-primary');
    message.innerHTML = `<strong>Bot:</strong> ${text}`;
    messages.appendChild(message);
    messages.scrollTop = messages.scrollHeight;
  }
})();
