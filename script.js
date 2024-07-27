// function sendMessage() {
//     var inputField = document.getElementById('user-input');
//     var userInput = inputField.value;
//     displayMessage("You: " + userInput);
//     inputField.value = '';  // 清空输入框
//     // 模拟响应
//     setTimeout(() => {
//         var response;
//         var normalizedInput = userInput.trim();

//         // 定义一个包含各种“再见”表达方式的数组
//         const byePhrases = ["再见", "拜拜", "我走了", "后会有期"];

//         // 检查用户输入是否包含任何一个“再见”表达
//         const isGoodbye = byePhrases.some(phrase => normalizedInput.includes(phrase));

//         if (normalizedInput.includes("你好")) {
//             response = "小哥哥你好呀，需要我帮助什么吗？";
//         } else if (normalizedInput.includes("你怎么样")) {
//             response = "I'm a chatbot, so I don't have feelings, but thanks for asking!";
//         } else if (isGoodbye) {
//             response = "再见了，希望还能再次帮到您！";
//         } else if (normalizedInput.includes("天气")) {
//             response = "我不太清楚当前天气，建议查一下天气预报哦！";
//         } else if (normalizedInput.includes("笑话") || normalizedInput.includes("讲个笑话")) {
//             response = "你知道吗？程序员最擅长什么游戏？答案是：隐藏和寻找！";
//         } else if (normalizedInput.includes("帮助")) {
//             response = "请告诉我您具体需要帮助的问题，我会尽力协助您。";
//         } else {
//             response = "对不起，我不太明白您的意思。可以尝试用其他方式表达吗？";
//         }
//         displayMessage("Chatbot: " + response);  // 显示聊天机器人的回应
//     }, 1000);
// }

// function displayMessage(message) {
//     var chatOutput = document.getElementById('chat-output');
//     var messageElement = document.createElement('div');
//     messageElement.textContent = message;
//     chatOutput.appendChild(messageElement);
// }


document.getElementById('model-select').addEventListener('change', function() {
    var selectedModel = this.value;
    console.log("Model changed to:", selectedModel);
    // 这里可以添加更多逻辑来实际切换模型或处理其他动作
});


async function sendMessage() {
    const inputField = document.getElementById('user-input');
    const userInput = inputField.value;
    displayMessage("You: " + userInput);
    inputField.value = ''; // 清空输入框

    try {
        const response = await fetch('http://192.168.40.184:5001/chat', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ user_input: userInput })
        });

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        console.log("来自服务器的响应:", data);
        displayMessage("Chatbot: " + data.response);

    } catch (error) {
        console.error('Fetch错误:', error);
    }
}


function displayMessage(message) {
    var chatOutput = document.getElementById('chat-output');
    var messageElement = document.createElement('div');
    messageElement.textContent = message;
    chatOutput.appendChild(messageElement);
}



