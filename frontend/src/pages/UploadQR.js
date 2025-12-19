import axios from "axios";
import { useState } from "react";
import Navbar from "../components/Navbar";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";


function UploadQR() {
  const [file, setFile] = useState(null);
  const [result, setResult] = useState("");
  const [error, setError] = useState("");

  const upload = async () => {
    try {
      setError("");
      setResult("");

      if (!file) {
        setError("Please select a QR image");
        return;
      }

      const formData = new FormData();
      formData.append("qrImage", file);

      const res = await axios.post(
        "http://localhost:5000/api/scan/upload",
        formData,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`
          }
        }
      );

      setResult(res.data.qrValue);
    } catch (err) {
      console.error(err);
      setError("QR scanning failed");
    }
  };


  return (
  <>
    <Navbar />

    <div className="upload-page">
      <h1 className="upload-title">Scan QR Code</h1>
      <p className="upload-subtitle">
        Upload a QR code image to extract its data instantly
      </p>

      {error && <div className="upload-error">{error}</div>}

      <div className="upload-area">
        <input
          type="file"
          id="qrUpload"
          onChange={(e) => setFile(e.target.files[0])}
        />

        <label htmlFor="qrUpload" className="upload-label">
          {file ? file.name : "Click to choose QR image"}
        </label>

        <button className="upload-btn" onClick={upload}>
          Scan QR
        </button>
      </div>

      {result && (
        <div className="upload-result">
          <span>QR Result</span>
          <a href={result} target="_blank" rel="noreferrer">
            {result}
          </a>
        </div>
      )}
    </div>
  </>
);

}

export default UploadQR;
