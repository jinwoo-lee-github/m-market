var stompClient = null;

function setConnected(isConnected) {
    if (isConnected) {
        document.getElementById("senderName").setAttribute("disabled", "disabled");
        document.getElementById("connect").setAttribute("disabled", "disabled");
        document.getElementById("disconnect").removeAttribute("disabled");
        document.getElementById("conversation").style.display = "block";
    }
    else {
        document.getElementById("senderName").removeAttribute("disabled");
        document.getElementById("connect").removeAttribute("disabled");
        document.getElementById("disconnect").setAttribute("disabled", "disabled");
        document.getElementById("conversation").style.display = "none";
    }
}

function connect() {
    document.getElementById("senderId").value = (Math.random()).toString(36).substr(2);
    var socket = new SockJS("/connect");
    stompClient = Stomp.over(socket);
    stompClient.connect({}, function (frame) {
        setConnected(true);
        console.log("Connected: " + frame);

        stompClient.subscribe("/topic/chatRoomId", function (message) {
            displayMessage(message);
        });
    });
}

function disconnect() {
    if (stompClient !== null) {
        stompClient.disconnect();
    }
    setConnected(false);
    console.log("Disconnected");
}

function sendMessage() {
    var senderId = document.getElementById("senderId").value;
    var senderName = document.getElementById("senderName").value;
    var content = document.getElementById("content").value;
    document.getElementById("content").value = "";
    stompClient.send("/app/chat", {}, JSON.stringify({"senderId": senderId, "senderName": senderName, "content": content}));
}

function displayMessage(message) {
    var tr = document.createElement("tr");
    var td = document.createElement("td");

    var obj = JSON.parse(message.body);
    if (obj.senderId != document.getElementById("senderId").value) {
        td.innerHTML = "<span>" + obj.senderName + "</span>" + obj.content;
    }
    else {
        td.classList.add("me");
        td.innerHTML = obj.content;
    }
    tr.append(td);
    document.getElementById("conversation").getElementsByTagName("tbody")[0].append(tr);
}

// init
document.addEventListener("DOMContentLoaded", () => {
    Array.from(document.getElementsByTagName("form")).forEach(function (form) {
        form.addEventListener("submit", (e) => {
            e.preventDefault();
        });
    });

    document.getElementById("connect").addEventListener("click", (e) => {
        e.preventDefault();
        connect();
    });

    document.getElementById("disconnect").addEventListener("click", (e) => {
        e.preventDefault();
        disconnect();
    });

    document.getElementById("send").addEventListener("click", (e) => {
        e.preventDefault();
        sendMessage();
    });
});
