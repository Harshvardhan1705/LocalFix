// Ensure the DOM is fully loaded before executing scripts
document.addEventListener('DOMContentLoaded', () => {
    const chatBox = document.getElementById('chat-box');
    const userInput = document.getElementById('user-input');
    const sendBtn = document.getElementById('send-btn');
  
    // Replace with your actual OpenAI API key
    const OPENAI_API_KEY = 'YOUR_OPENAI_API_KEY';
  
    // Event listener for the Send button
    sendBtn.addEventListener('click', () => {
      const message = userInput.value.trim();
      if (message === '') return;
  
      appendMessage('user', message);
      userInput.value = '';
      fetchBotResponse(message);
    });
  
    // Function to append messages to the chat box
    function appendMessage(sender, message) {
      const messageElem = document.createElement('div');
      messageElem.classList.add(`${sender}-message`);
      messageElem.textContent = message;
      chatBox.appendChild(messageElem);
      chatBox.scrollTop = chatBox.scrollHeight;
    }
  
    // Function to fetch response from OpenAI API
    async function fetchBotResponse(message) {
      appendMessage('bot', 'Typing...');
  
      try {
        const response = await fetch('https://api.openai.com/v1/chat/completions', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${OPENAI_API_KEY}`
          },
          body: JSON.stringify({
            model: 'gpt-3.5-turbo',
            messages: [{ role: 'user', content: message }],
            temperature: 0.7,
            max_tokens: 150
          })
        });
  
        const data = await response.json();
  
        // Remove the 'Typing...' message
        const typingElem = chatBox.querySelector('.bot-message:last-child');
        if (typingElem && typingElem.textContent === 'Typing...') {
          chatBox.removeChild(typingElem);
        }
  
        if (response.ok) {
          const botMessage = data.choices[0].message.content.trim();
          appendMessage('bot', botMessage);
        } else {
          console.error('Error from OpenAI API:', data);
          appendMessage('bot', 'Sorry, I am unable to respond at the moment.');
        }
      } catch (error) {
        console.error('Error fetching bot response:', error);
        appendMessage('bot', 'Sorry, I am unable to respond at the moment.');
      }
    }
  });
  
/* learn more button from section tag */
  function toggleMoreInfo() 
  {
    const section = document.getElementById("more-info");
    section.style.display = section.style.display === "none" ? "block" : "none";
  }

