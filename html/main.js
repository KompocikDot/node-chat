var socket = io();
var init_load = false;

let messages = document.querySelector("div.row");
let form = document.querySelector("#form");
let input = document.querySelector("#input");

form.addEventListener('submit', function(e) {
    e.preventDefault();
    if (input.value) {
        socket.emit('chat message', {message: input.value, nick: document.cookie.split("; ")[0].split("=")[1]});
        input.value = '';
    }
});

socket.on('chat message', function(msg) {
    messages.insertAdjacentHTML('beforeend', `<div class="column"><div class="card"><div class="card-body">${msg.nick} | ${msg.message}</div></div></div><br>`);
    window.scrollTo(0, document.body.scrollHeight);
});

socket.on('old messages', function(msg) {
    if (!init_load){
        msg.forEach(element => {
            messages.insertAdjacentHTML('beforeend', `<div class="column"><div class="card"><div class="card-body">${element.nick} | ${element.message}</div></div></div><br>`);
        });
        window.scrollTo(0, document.body.scrollHeight);
        init_load = true;
    }

})