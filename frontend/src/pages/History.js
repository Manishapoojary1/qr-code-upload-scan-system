import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import api from "../services/api";

function History() {
  const [scans, setScans] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    if (!localStorage.getItem("token")) {
      navigate("/");
      return;
    }

    axios.get("http://localhost:5000/api/scan/history", {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`
      }
    }).then(res => setScans(res.data));
  }, [navigate]);

  return (
    <>
      <Navbar />
      <div style={{ padding: "40px" }}>
        <h2>Scan History</h2>
        <ul>
          {scans.map(scan => (
            <li key={scan._id}>
              <a href={scan.qrValue} target="_blank" rel="noreferrer">
                {scan.qrValue}
              </a>{" "}
              — {new Date(scan.scannedAt).toLocaleString()}
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}

export default History;
