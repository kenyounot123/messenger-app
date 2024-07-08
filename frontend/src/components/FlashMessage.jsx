import { useEffect } from "react";

export default function FlashMessage({
  errorMessage,
  setErrorMessage,
  textColor = "text-red-700",
  bgColor = "bg-white",
  borderColor = "border-red-500",
}) {
  useEffect(() => {
    if (errorMessage) {
      const timer = setTimeout(() => {
        setErrorMessage("");
      }, 5000); // 5 seconds

      return () => clearTimeout(timer); // Clear timeout if component unmounts
    }
  }, [errorMessage, setErrorMessage]);

  return (
    <div className="w-full">
      <div
        className={`rounded-xl left-1/2 -translate-x-1/2 ${bgColor} p-5 ${textColor} ${borderColor} absolute mt-5 max-w-sm mx-auto`}
      >
        {errorMessage}
      </div>
    </div>
  );
}
