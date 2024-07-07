import { useEffect } from "react";

export default function FlashMessage({
  errorMessage,
  setErrorMessage,
  textColor = "red",
  bgColor = "white",
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
        className={`rounded-xl left-1/2 -translate-x-1/2 bg-${bgColor} p-5 text-${textColor}-700 border-${textColor}-400 absolute mt-5 max-w-sm mx-auto`}
      >
        {errorMessage}
      </div>
    </div>
  );
}
