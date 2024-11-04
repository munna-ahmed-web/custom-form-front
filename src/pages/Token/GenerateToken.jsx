import { useState } from "react";
import { useSelector } from "react-redux";

const GenerateToken = () => {
  const { accessToken } = useSelector((state) => state.userInfo);
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard
      .writeText(accessToken)
      .then(() => {
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      })
      .catch((error) => {
        console.error("Failed to copy text: ", error);
      });
  };
  const displayToken = `${accessToken.slice(0, 20)}.......${accessToken.slice(
    -20
  )}`;
  return (
    <div className="bg-gray-100 min-h-screen">
      <div className="flex justify-center items-center mx-auto flex-col p-4 bg-gray-100 rounded-lg shadow-md max-w-xs">
        <p className="text-lg font-semibold text-gray-800 px-4 py-2">
          Your API Token
        </p>

        <p className="mb-4 text-center text-gray-700 text-sm">{displayToken}</p>
        <button
          onClick={handleCopy}
          className={`px-4 py-2 rounded-lg font-medium text-white 
          ${copied ? "bg-green-500" : "bg-blue-500 hover:bg-blue-600"}
          transition-colors duration-300 ease-in-out`}
        >
          {copied ? "Copied!" : "Copy to Clipboard"}
        </button>
      </div>
    </div>
  );
};

export default GenerateToken;
