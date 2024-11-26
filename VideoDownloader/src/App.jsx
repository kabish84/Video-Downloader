import React, { useState } from "react";
import { FaYoutube } from "react-icons/fa";
import axios from "axios";

function App() {
  const [URL, setURL] = useState("");

  const handleInput = (e) => {
    e.preventDefault();
    setURL(e.target.value);
  };

  const downloadVideo = async (e) => {
    e.preventDefault();

    const options = {
      method: "GET",
      url: "https://youtube-data8.p.rapidapi.com/video/streaming-data/",
      params: { id: URL },
      headers: {
        "x-rapidapi-key": "08de0cc688msh077919d7f1c57c0p1f40fajsn282bfdf9f6de",
        "x-rapidapi-host": "youtube-data8.p.rapidapi.com",
        "content-type": "application/json",
      },
    };

    try {
      const rspn = await axios.request(options);
      if (rspn?.data?.formats[0]?.url) {
        // Redirect to the video URL for download
        window.location.href = rspn?.data?.formats[0]?.url;
      }
      // Clear the input after download
      setURL("");
    } catch (error) {
      console.error("Error downloading video:", error);
      // Clear the input even if there's an error
      setURL("");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-500 via-purple-600 to-blue-600 flex items-center justify-center px-4 text-white">
      {/* Card Container */}
      <div className="bg-white text-gray-800 rounded-lg shadow-xl p-8 w-full max-w-md space-y-6 transform transition-all hover:scale-105">
        {/* Header Section */}
        <div className="flex items-center justify-center space-x-4">
          <FaYoutube size={50} className="text-red-600" />
          <h1 className="text-2xl font-bold text-gray-800">YouTube Downloader</h1>
        </div>

        {/* Form Section */}
        <div className="space-y-4">
          <p className="text-center text-gray-600">
            Enter a YouTube video URL to download it instantly.
          </p>
          <input
            type="url"
            placeholder="https://www.youtube.com/watch?v=..."
            className="w-full h-12 px-4 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:outline-none"
            onChange={handleInput}
            value={URL} // Controlled input tied to URL state
          />
          <button
            onClick={downloadVideo}
            className="w-full h-12 bg-gradient-to-r from-red-500 to-pink-600 text-white font-bold rounded-lg shadow-md hover:from-red-600 hover:to-pink-700 transition-all duration-200 transform hover:scale-105"
          >
            Download Video
          </button>
        </div>
      </div>

      {/* Footer */}
      <footer className="absolute bottom-4 text-xs text-white text-center">
        <p>
          Built with <span className="text-pink-400">❤</span> by Kabish Yadav
        </p>
      </footer>
    </div>
  );
}

export default App;
