import React from 'react';
import { useHistory } from "react-router-dom";

const ErrorPage = () => {
  const history = useHistory();
  return (
    <div className="flex flex-col justify-center items-center text-blue-800 h-screen">
      <h2 className="text-3xl">Something Went Wrong</h2>
      <p>Click the button to refresh the page</p>
      <button onClick={() => history.push("/")} className="mt-5 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Refresh</button>
    </div>
  )
}

export default ErrorPage