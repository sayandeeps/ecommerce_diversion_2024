import React, { useState, useEffect } from 'react';
import '../styles/Home.css'; // You need to import your CSS file
import { useContract, useContractRead } from "@thirdweb-dev/react";
import { useAddress } from "@thirdweb-dev/react";

function Chatbot() {
    let story = '';
    const { contract } = useContract("0x8C39Da722F38f54a995519d473Af2A6896846C84");
    const address = useAddress();
    const { data, isLoading } = useContractRead(contract, "userData", [address]);

    if (data) {
      if (data.name !== undefined) {
        console.log(data.name);
         story = `Embark on a digital revolution at our Hackathon, where we present an ecommerce breakthrough. Our focus lies in an avant-garde 3D Model Maker app, transforming online shopping into a visually rich experience. Generate intricate, lifelike product models, securely stored on IPFS and Polygon blockchain for transparency. Elevate your coding prowess by integrating blockchain to store order details, ensuring data integrity. Maximize user interaction through a responsive chatbot, fetching real-time order information from the blockchain. Join us in reshaping the future of ecommerce, where innovation converges with coding brilliance, and a 3D revolution unfolds at your fingertips. ${data.name} (${data.shippingAddress}) is arriving on ${data.expectedDayOfArrival}.`;
        console.log(story)
      } else {
        console.log("data.name is undefined");
      }
    } else if (isLoading) {
      console.log("Data is still loading...");
    } else {
      console.log("Data is undefined");
    }

   



  const [modalText, setModalText] = useState('my name is sayandeep sharma ');
  const [userInput, setUserInput] = useState('');
  const [chatMessages, setChatMessages] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  

  const sendMessage = async () => {
    appendMessage(userInput, 'user');
    const response = await getBotResponse(userInput, story);
    appendMessage(response, 'bot');
    setUserInput('');
    document.getElementById('chat-box').scrollTop = document.getElementById('chat-box').scrollHeight;
  };

  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      sendMessage();
    }
  };

  const appendMessage = (message, sender) => {
    setChatMessages((prevMessages) => [
      ...prevMessages,
      { message, sender }
    ]);
  };

  useEffect(() => {
    document.getElementById('chat-box').scrollTop = document.getElementById('chat-box').scrollHeight;
  }, [chatMessages]);

  const getBotResponse = async (userInput, modalText) => {
    try {
      const response = await fetch('http://127.0.0.1:5001/answer', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ context: story, question: userInput }),
      });
      const responseData = await response.json();
      return responseData.answer || "Sorry, I couldn't find an answer.";
    } catch (error) {
      console.error('Error:', error);
      return 'Sorry, there was an error processing your request.';
    }
  };

  return (
    <div className="bg-gray-100 flex flex-col h-[70vh]">
     

     

      <div className="flex-1 flex flex-col justify-end py-4 px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col space-y-2 items-end" id="chat-container">
          <div className="flex flex-col items-start w-full" id="chat-box">
            {chatMessages.map((msg, index) => (
              <div
                key={index}
                className={`flex pb-2 mb-2 flex-col items-start w-full rounded-lg p-3 ${msg.sender === 'user' ? 'bg-green-500' : 'bg-blue-500'} text-white ${msg.sender === 'user' ? 'self-start' : 'self-end'}`}
              >
                <span className="text-sm">{msg.message}</span>
              </div>
            ))}
          </div>
        </div>
        <div className="flex items-center mt-4">
          <input
            type="text"
            id="user_input"
            placeholder="Type your question here..."
            value={userInput}
            onChange={(e) => setUserInput(e.target.value)}
            onKeyPress={handleKeyPress}
            className="flex-1 py-2 px-3 rounded-lg border border-gray-300 focus:outline-none focus:border-blue-500"
          />
          <button
            id="submit"
            onClick={sendMessage}
            className="ml-2 py-2 px-4 bg-blue-700 text-white rounded-lg focus:outline-none focus:bg-blue-800"
          >
            Send
          </button>
        </div>
      </div>

      {/* Modal */}
      
    </div>
  );
}

export default Chatbot;
