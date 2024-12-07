const socket = io();

let user;

let chatBox = document.getElementById("chatBox");

Swal.fire({
  title: "Registro",
  input: "text",
  text: "Ingresa tu usuario",
  inputValidator: (value) => {
    return !value && "Por favor ingresar nombre de usuario";
  },
  allowOutsideClick: false,
}).then((result) => {
  user = result.value;
  console.log(user);
  socket.emit("newUser", user);
});

chatBox.addEventListener("keyup", (e) => {
  if (e.key === "Enter") {
    if (chatBox.value.trim().length > 0) {
      socket.emit("message", { user: user, message: chatBox.value });
      chatBox.value = "";
    }
  }
});

socket.on("messageLogs", (data) => {
  let messageLogs = document.getElementById("messageLogs");
  let messages = "";

  data.forEach((messageLog) => {
    messages =
      messages + `${messageLog.user} dice: ${messageLog.message} </br>`;
  });

  messageLogs.innerHTML = messages;
});

socket.on("newUser", (data) => {
  Swal.fire({
    text: `Se conectó nuevo usuario ${data}`,
    toast: true,
    position: "top-right",
    timer: 2000,
  });
});
