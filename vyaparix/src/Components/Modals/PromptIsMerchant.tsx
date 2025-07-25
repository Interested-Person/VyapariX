import React from "react";

type MerchantPromptProps = {
  onSelect: (isMerchant: boolean) => void;
};

const MerchantPrompt: React.FC<MerchantPromptProps> = ({ onSelect }) => {
  return (
    <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white rounded-xl shadow-lg p-6 w-[90%] max-w-md text-center">
        <h2 className="text-2xl font-semibold mb-4">Are you a merchant or a customer?</h2>
        <div className="flex justify-around mt-6">
          <button
            onClick={() => onSelect(true)}
            className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition"
          >
            I'm a Merchant
          </button>
          <button
            onClick={() => onSelect(false)}
            className="bg-gray-600 text-white px-6 py-2 rounded-lg hover:bg-gray-700 transition"
          >
            I'm a Customer
          </button>
        </div>
      </div>
    </div>
  );
};

export default MerchantPrompt;
