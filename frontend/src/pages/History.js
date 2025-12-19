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

    api.get("/scan/history", {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`
      }
    })
    .then(res => setScans(res.data))
    .catch(err => console.error(err));

  }, [navigate]);

  return (
    <>
      <Navbar />
      <div style={{ padding: "40px" }}>
        <h2>Scan History</h2>

        {scans.length === 0 && <p>No scan history found</p>}

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
