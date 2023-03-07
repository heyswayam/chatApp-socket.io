const socket = io('http://localhost:3005');

const textInput = document.querySelector('#textInput')
const send = document.querySelector('#send');

const userName = prompt("Enter your name to join");
// socket.emit("new-user-joined", userName);
// socket.on('user-joined', userName => {
//     document.querySelector(".leftBox").innerHTML = `${userName}`
// })
const sendMessage = (name) => {
    console.log("clicked");
    console.log((name));
    if (textInput.value != '') {

        // Get the message input value
        const messageBox = document.createElement('div');
        messageBox.classList.add('rightBox');
        messageBox.classList.add('w-fit');
        messageBox.classList.add('bg-blue-400');
        messageBox.classList.add('hover:shadow-md');
        messageBox.classList.add('transition-all');
        messageBox.classList.add('text-yellow-50');
        messageBox.classList.add('rounded-md');
        messageBox.classList.add('px-3');
        messageBox.classList.add('py-1');
        messageBox.classList.add('m-2');
        messageBox.classList.add('flex-col');
        messageBox.classList.add('self-end');
        messageBox.innerHTML = textInput.value;
        
        // Append the message box to the conversations container
        const conversations = document.querySelector('.converstions');
        conversations.appendChild(messageBox);

        // Adding the name on the textbox
        const tempName = document.createElement('div');
        tempName.classList.add('text-green-700');
        tempName.classList.add('text-xs');
        tempName.innerHTML = ` ~ ${name}`
        document.getElementsByClassName('rightBox')[document.getElementsByClassName('rightBox').length-1].appendChild(tempName);


        // Emit the 'send-message' event to the server
        // socket.emit('send', (textInput.value,name));

        // Clear the message input
        textInput.value = '';
        textInput.placeholder = " ";
    }
    else {
        textInput.placeholder = "Enter some text to send";
    }
}
// socket.on("receive", (message,name) => {
//     const messageBox = document.createElement('div');
//     messageBox.classList.add('leftBox');
//     messageBox.classList.add('w-fit');
//     messageBox.classList.add('bg-blue-400');
//     messageBox.classList.add('hover:shadow-md');
//     messageBox.classList.add('transition-all');
//     messageBox.classList.add('text-yellow-50');
//     messageBox.classList.add('rounded-md');
//     messageBox.classList.add('px-3');
//     messageBox.classList.add('py-1');
//     messageBox.classList.add('m-2');
//     messageBox.classList.add('flex-col');
//     messageBox.innerHTML = message;
//     // Adding the name on the textbox
//     const tempName = document.createElement('div');
//     tempName.classList.add('text-green-700');
//     tempName.classList.add('text-xs');
//     tempName.innerHTML = ` ~ ${name}`
//     document.querySelector('leftBox').appendChild(tempName);

//     // Append the message box to the conversations container
//     const conversations = document.querySelector('.converstions');
//     conversations.appendChild(messageBox);
// })
send.addEventListener('click', sendMessage(userName))
textInput.addEventListener('keypress', event => {
    // Check if the Enter key was pressed
    if (event.key === 'Enter') {
        sendMessage(userName);
    }
});


