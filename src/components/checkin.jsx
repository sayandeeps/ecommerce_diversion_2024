import { Web3Button } from "@thirdweb-dev/react";
import { useState } from "react";
import { getThirdwebContractAddress } from "@thirdweb-dev/react";
import thirdwebcontract from './thirdwebcontract'


export default function UpdateUserDataButton() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [shippingAddress, setShippingAddress] = useState("");
  const [expectedDayOfArrival, setExpectedDayOfArrival] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [orderTotal, setOrderTotal] = useState("");

  const handleUpdateUserData = async (contract) => {
    try {
      // Convert phone number and order total to numbers
      const phoneNumberAsNumber = parseInt(phoneNumber, 10);
      const orderTotalAsNumber = parseInt(orderTotal, 10);

      // Call the updateUserData function in the smart contract
      await contract.call("updateUserData", [
        name,
        email,
        shippingAddress,
        expectedDayOfArrival,
        phoneNumberAsNumber,
        orderTotalAsNumber,
        // Add more parameters as needed
      ]);

      // Optionally, you can handle success or show a notification to the user
      console.log("User data updated successfully!");
      alert("done")
    } catch (error) {
      // Handle errors, e.g., display an error message to the user
      console.error("Error updating user data:", error);
    }
  };

  return (
    <div>
      {/* Input fields for user data */}
      <div className="flex flex-col items-center mt-10 space-y-4">
      <div className="text-xl font-semibold">Enter Your User Details to continue</div>

  {/* Input fields for user data */}
  <input
    type="text"
    placeholder="Name"
    value={name}
    onChange={(e) => setName(e.target.value)}
    className="border border-gray-300 rounded p-2 focus:outline-none focus:border-blue-500"
  />
  <input
    type="text"
    placeholder="Email"
    value={email}
    onChange={(e) => setEmail(e.target.value)}
    className="border border-gray-300 rounded p-2 focus:outline-none focus:border-blue-500"
  />
  <input
    type="text"
    placeholder="Shipping Address"
    value={shippingAddress}
    onChange={(e) => setShippingAddress(e.target.value)}
    className="border border-gray-300 rounded p-2 focus:outline-none focus:border-blue-500"
  />
  <input
    type="text"
    placeholder="Expected Day of Arrival"
    value={expectedDayOfArrival}
    onChange={(e) => setExpectedDayOfArrival(e.target.value)}
    className="border border-gray-300 rounded p-2 focus:outline-none focus:border-blue-500"
  />
  <input
    type="text"
    placeholder="Phone Number"
    value={phoneNumber}
    onChange={(e) => setPhoneNumber(e.target.value)}
    className="border border-gray-300 rounded p-2 focus:outline-none focus:border-blue-500"
  />
  <input
    type="text"
    placeholder="Order Total"
    value={orderTotal}
    onChange={(e) => setOrderTotal(e.target.value)}
    className="border border-gray-300 rounded p-2 focus:outline-none focus:border-blue-500"
  />
</div>

      {/* Web3Button component to interact with the smart contract */}
      <div className="flex mt-4 justify-center">
  <Web3Button
    contractAddress="0x8C39Da722F38f54a995519d473Af2A6896846C84"
    action={handleUpdateUserData}
    className="mt-4" // Add margin-top for better spacing
  >
    Update User Data
  </Web3Button>
</div>
    </div>
  );
}
