"use strict";
// Make connection

const socket = io.connect("http://localhost:4000");

const message = $("#message"),
      handle = $("#handle"),
      btn = $("#send"),
      output = $("#output"),
      feedback = $("#feedback");

// Emit events
btn.click((e) => {
   if (message.val() === "" || handle.val() === "") {
      alert("请输入内容！");
      return;
   }
   socket.emit("chat", {
      message: message.val(),
      handle: handle.val()
   });

   // clear input content
   message.val("");
   handle.val("");
});

message.keypress((e) => {
   socket.emit("typing", handle.val());
});

// Listen for events
socket.on("chat", (data) => {
   const {message, handle} = data;
   feedback.html("");
   output.html(output.html() + `
   <p>
      <span style="color:cornflowerblue;">${handle}</span>: ${message}
   </p>
   <hr/>`);
});

socket.on("typing", (data) => {
   feedback.html(`<em>${data} is a typing message...</em>`);
});