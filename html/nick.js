const form = document.querySelector("form");
const nick = document.querySelector("#nick");


form.addEventListener("submit", function(e) {
    e.preventDefault();

    if (nick.value != null) {
        document.cookie = "nick=" + nick.value;
        window.location.href = document.URL + "chat";
    }
});