import axios from "axios";
import { useState } from "react";

function Upload() {
  const [file, setFile] = useState(null);

  const handleUpload = async () => {
    const formData = new FormData();
    formData.append("file", file);

    const res = await axios.post(
      "http://127.0.0.1:8000/predict",
      formData
    );

    alert("Prediction done: " + JSON.stringify(res.data));
  };

  return (
    <div>
      <input type="file" onChange={(e)=>setFile(e.target.files[0])}/>
      <button onClick={handleUpload}>Run AI</button>
    </div>
  );
}

export default Upload;