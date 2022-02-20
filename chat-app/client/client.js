const connect = async () => {

  const connection = new WebSocket(`ws://127.0.0.1:1024`);

  const button = document.querySelector("#send");

  connection.onopen = (event) => {
    console.log("WebSocket is open now.");
  };

  connection.onclose = (event) => {
    console.log("WebSocket is closed now.");
  };

  connection.onerror = (event) => {
    console.error("WebSocket error observed:", event);
  };

  connection.onmessage = (event) => {
    // append received message from the server to the DOM element 
    const chat = document.querySelector("#chat");
    console.log(event.data);
    chat.innerHTML += event.data;
  };

  button.addEventListener("click", () => {
    const name = document.querySelector("#name");
    const message = document.querySelector("#message");
    const data = `<p>${name.value}: ${message.value}</p>`;
    console.log(data);
    // Send composed message to the server
    connection.send(data);
    console.log(data);

    // clear input fields
    name.value = "";
    message.value = "";
  });
}

connect();
