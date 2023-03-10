// const socket = io('http://localhost:3001');
const socket = io('https://nodejs-chatapp-nodeserver-01.onrender.com');

const textInput = document.querySelector('#textInput')
const send = document.querySelector('#send');
    document.querySelector('.conversations').classList.add(`max-h-[calc(100vh-${textInput.offsetHeight+5}px)]`)


const userName = prompt("Enter your name to join");
socket.emit("new-user-joined", userName);
socket.on('user-joined', userName => {
    //Make an element for storing the username
    const userJoinMsg = document.createElement('div');
    userJoinMsg.classList.add('mx-auto', 'block', 'px-3', 'm-2', 'rounded-sm', 'bg-slate-400', 'text-white');
    userJoinMsg.innerHTML=`New user joined ${userName} `
    const conversations = document.querySelector('.conversations');
    conversations.appendChild(userJoinMsg);
})
const sendMessage = (name) => {
    console.log("clicked");
    console.log((name));
    if (textInput.value != '') {

        // Get the message input value
        const messageBox = document.createElement('div');
        messageBox.classList.add('rightBox', 'w-fit', 'bg-blue-400', 'hover:shadow-md', 'transition-all', 'text-yellow-50', 'rounded-md', 'px-3', 'py-1', 'm-2', 'flex', 'flex-col-reverse', 'self-end');
        messageBox.innerHTML = textInput.value;

        // Append the message box to the conversations container
        const conversations = document.querySelector('.conversations');
        conversations.appendChild(messageBox);
        const lastMessage = conversations.lastElementChild;
        // Scrolls to bottom
        lastMessage.scrollIntoView({ behavior: "smooth" });

        // Adding the name on the textbox
        const tempName = document.createElement('div');
        tempName.classList.add('text-green-700');
        tempName.classList.add('text-xs');
        tempName.innerHTML = ` ~ ${name}`
        document.getElementsByClassName('rightBox')[document.getElementsByClassName('rightBox').length - 1].appendChild(tempName);


        // Emit the 'send-message' event to the server
        console.log(userName);
        // socket.emit('send', (textInput.value,userName));
        socket.emit('send', textInput.value, userName);


        // Clear the message input
        textInput.value = '';
        textInput.placeholder = " ";
    }
    else {
        textInput.placeholder = "Enter some text to send";
    }
}
socket.on("receive", (data) => {
    const messageBox = document.createElement('div');
    messageBox.classList.add('leftBox', 'w-fit', 'bg-blue-400', 'hover:shadow-md', 'transition-all', 'text-yellow-50', 'rounded-md', 'px-3', 'py-1', 'm-2', 'flex', 'flex-col-reverse');
    messageBox.innerHTML = data.message;

    // Append the message box to the conversations container
    const conversations = document.querySelector('.conversations');
    conversations.appendChild(messageBox);
    const lastMessage = conversations.lastElementChild;
    // Scrolls to bottom
    lastMessage.scrollIntoView({ behavior: "smooth" });

    // Adding the name on the textbox
    const tempName = document.createElement('div');
    tempName.classList.add('text-green-700');
    tempName.classList.add('text-xs');
    tempName.innerHTML = ` ~ ${data.named}`
    document.getElementsByClassName('leftBox')[document.getElementsByClassName('leftBox').length - 1].appendChild(tempName);



})
send.addEventListener('click', () => {
    sendMessage(userName)
    console.log("clicked")
});
textInput.addEventListener('keypress', event => {
    // Check if the Enter key was pressed
    if (event.key === 'Enter') {
        sendMessage(userName);
    }
});


