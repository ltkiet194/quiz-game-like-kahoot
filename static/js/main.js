


class WebSocketClient {


    constructor(url,roomCode,DisplayName,email) {
        this.socket = new WebSocket(url);
        this.roomCode =roomCode;
        this.DisplayName = "DisplayName";
        this.email = email;
        this.setupSocket(roomCode,DisplayName);
    }
    setupSocket(roomCode,DisplayName) {

        this.socket.onopen = (event) => {
            this.handleOpen(roomCode,DisplayName);
        };
        this.socket.onmessage = (event) => {
            this.handleMessage(event);
        };
        this.socket.onclose = (event) => {
            this.handleClose(event);
        };
        this.socket.onerror = (event) => {
            this.handleError(event);
        };
    }
    handleOpen(roomCode,displayName) {
        if (displayName!=="" && roomCode!=="") {
            let jsonData = {
                Tags: 7,
                Data: {
                    DisplayName: displayName,
                    Avatar: "https://cdn-icons-png.flaticon.com/512/149/149071.png",
                    RoomCode: roomCode,
                    Email:this.email
                }
            };
            this.socket.send(JSON.stringify(jsonData));
        }
        else {
            console.log("User canceled or did not provide enough information.");
        }
    }
    handleMessage(event) {
        const eventData = JSON.parse(event.data);
        if (eventData.Tags === 6) {
            $("#member").empty();
            eventData.Data.Players.forEach((player) => {
                const newMember = $(`
                <tr>
                    <td class="px-5 py-5 text-sm bg-white">
                        <div class="flex items-center">
                            <div class="flex-shrink-0 w-10 h-10">
                                <img class="w-full h-full rounded-full"
                                    src="${player.Avatar}"
                                    alt="" />
                            </div>
                                <div class="ml-3">
                                    <p class="text-gray-900 whitespace-no-wrap">
                                    ${player.DisplayName}
                                    </p>
                                </div>
                            </div>
                    </td>
                    <td class="px-5 py-5 text-sm bg-white">
                        <p class="text-gray-900 whitespace-no-wrap">${player.Level}</p>
                    </td>                              
                    <td class="px-5 py-5 text-sm bg-white">
                        <span
                            class="relative inline-block px-3 py-1 font-semibold leading-tight text-red-900">
                            <span aria-hidden
                                class="absolute inset-0 bg-green rounded-full opacity-50"></span>
                        <span class="relative">Ready!</span>
                        </span>
                    </td>
                </tr>
                `);
                $("#member").append(newMember);
            });
        }
        else if (eventData.Tags === 8){

        }
        console.log(eventData);
    }
    handleClose(event) {
        console.log('Connection closed');
    }
    handleError(event) {
        console.error('WebSocket error:', event);
    }
}
function changeStatus() {
    var button = document.getElementById("statusRoom");
    if (button.innerHTML === "Offline") {
        button.innerHTML = "Online";
        button.classList.remove("bg-gray-600");
        button.classList.add("bg-green");
    } else {
        button.innerHTML = "Offline";
        button.classList.remove("bg-green");
        button.classList.add("bg-gray-600");
    }
}
function setCookie(roomCode, value, daysToExpire) {
    var expires = "";

    if (daysToExpire) {
        var date = new Date();
        date.setTime(date.getTime() + daysToExpire * 24 * 60 * 60 * 1000);
        expires = "; expires=" + date.toUTCString();
    }

    document.cookie = 'TempUserName' + "=" + value + expires + "; path=/";
}

function checkNickname(dpname) {
    var dataToSend = {
        key: dpname,
    };

    $.ajax({
        type: "GET",
        url: "{% url 'validate_nickname' %}",
        data: dataToSend,
        success: function (response) {
            setCookie("{{roomCode}}", response.message, 1);
            location.reload();
        },
        error: function (response) {
            console.log(response);
        },
    });
}

function toggleModal(value) {
    const modalCl = modal.classList;
    const overlayCl = modal_overlay;
    
    if (value) {
        overlayCl.classList.remove("hidden");
        setTimeout(() => {
            modalCl.remove("opacity-0");
            modalCl.remove("-translate-y-full");
            modalCl.remove("scale-150");
        }, 100);
    } else {
        modalCl.add("-translate-y-full");
        setTimeout(() => {
            modalCl.add("opacity-0");
            modalCl.add("scale-150");
        }, 100);
        setTimeout(() => overlayCl.classList.add("hidden"), 300);
    }
}

function getCookie(name) {
    const cookies = document.cookie.split(";");
    for (let i = 0; i < cookies.length; i++) {
        const cookie = cookies[i].trim();
        if (cookie.startsWith(name + "=")) {
            return cookie.substring(name.length + 1);
        }
    }

    return null;
}

function setupSocket(dpname,roomCode) {
    var TempUserName = dpname

    if (TempUserName == null ||TempUserName ==="") {
        toggleModal(true);
    } else {
        const socketUrl = 'ws://localhost:8765';
        const client = new WebSocketClient(socketUrl, roomCode, TempUserName);
        toggleModal(false);
    }
}

$(document).ready(function () {
    toggleModal(true);
    $("#quiz-button").click(function() {
        $("#quiz-button").removeClass("bg-white");
        $(this).addClass("bg-blue");
    });
});
function startCountdown(seconds) {
    var countdownElement = $('#countdown');

    var countdownInterval = setInterval(function() {
        seconds--;

        countdownElement.text(seconds);

        if (seconds <= 0) {
            clearInterval(countdownInterval);
            
        }
    }, 1000);
}
