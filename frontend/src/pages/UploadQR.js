import { useState } from "react";
import Navbar from "../components/Navbar";
import api from "../services/api";

function UploadQR() {
  const [file, setFile] = useState(null);
  const [result, setResult] = useState("");
  const [error, setError] = useState("");

  const upload = async () => {
    setError("");
    setResult("");
  
    if (!file) {
      setError("Please select a QR image");
      return;
    }
  
    try {
      const formData = new FormData();
      formData.append("qrImage", file);
  
      const res = await api.post("/scan/upload", formData, {
        headers: {
          Authorization: localStorage.getItem("token")
        }
      });
  
      setResult(res.data.qrValue);   
      setError("");                 
  
    } catch (err) {
      console.error(err);
      setResult("");
      setError("QR scanning failed");
    }
  };

  return (
    <>
      <Navbar />

      <div className="upload-page">
        <h1>Scan QR Code</h1>

        {error && !result && (
          <div className="upload-error">{error}</div>
        )}


        <input
          type="file"
          accept="image/*"
          onChange={(e) => setFile(e.target.files[0])}
        />

        <button onClick={upload}>Scan QR</button>

        {result && (
          <div>
            <strong>Result:</strong> {result}
          </div>
        )}
      </div>
    </>
  );
}

export default UploadQR;
