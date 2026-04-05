"use client";

import axios from "axios";
import { useState, useRef } from "react";
import { UploadCloud, FileText, Loader2, Sparkles } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function Upload({ setMessage, setPreview }) {
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [dragActive, setDragActive] = useState(false);
  const fileInputRef = useRef(null);

  const handleFileSelect = (selectedFile) => {
    if (selectedFile?.name.match(/\.(tif|tiff)$/i)) {
      setFile(selectedFile);
      setMessage(`✅ ${selectedFile.name} ready`);
    } else {
      setMessage("⚠️ Only .tif/.tiff allowed");
      setFile(null);
    }
  };

  const handleUpload = async () => {
    if (!file) return setMessage("⚠️ Select file first");

    setLoading(true);
    setMessage("🧠 AI is analyzing...");

    try {
      const formData = new FormData();
      formData.append("file", file);

      const res = await axios.post(
        "http://localhost:8000/predict",
        formData,
        { timeout: 600000 }
      );

      // ✅ show preview
      setPreview(`data:image/png;base64,${res.data.preview}`);

      setMessage("✅ Prediction complete!");

    } catch (err) {
      setMessage("❌ Error: " + err.message);
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="max-w-xl mx-auto px-4">
      
      <div className="text-center mb-8">
        <h1 className="text-3xl font-semibold text-white">
          Flood AI Predictor
        </h1>
        <p className="text-zinc-400 text-sm mt-2">
          Upload GeoTIFF satellite data
        </p>
      </div>

      {/* Upload Zone */}
      <motion.div
        whileHover={{ scale: 1.02 }}
        className={`relative rounded-3xl p-[2px]
        ${dragActive ? "bg-gradient-to-r from-teal-400 to-emerald-500" : "bg-zinc-800"}`}
      >
        <div
          className="bg-zinc-900 rounded-3xl p-12 text-center cursor-pointer"
          onDragOver={(e) => { e.preventDefault(); setDragActive(true); }}
          onDragLeave={() => setDragActive(false)}
          onDrop={(e) => {
            e.preventDefault();
            setDragActive(false);
            handleFileSelect(e.dataTransfer.files[0]);
          }}
          onClick={() => fileInputRef.current.click()}
        >
          <AnimatePresence mode="wait">
            {!file ? (
              <motion.div key="upload" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                <UploadCloud className="w-14 h-14 text-zinc-500 mx-auto mb-4" />
                <p className="text-white text-lg font-medium">
                  Drop GeoTIFF here
                </p>
                <p className="text-zinc-500 text-sm mt-2">
                  or click to browse
                </p>
              </motion.div>
            ) : (
              <motion.div key="file" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                <FileText className="w-14 h-14 text-emerald-400 mx-auto mb-3" />
                <p className="text-white break-all">{file.name}</p>
                <p className="text-zinc-500 text-sm">
                  {(file.size / (1024 * 1024)).toFixed(2)} MB
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>

      <input
        type="file"
        ref={fileInputRef}
        className="hidden"
        accept=".tif,.tiff"
        onChange={(e) =>
          e.target.files?.[0] && handleFileSelect(e.target.files[0])
        }
      />

      {/* Button */}
      <motion.button
        onClick={handleUpload}
        disabled={!file || loading}
        className="mt-8 w-full h-14 rounded-2xl font-semibold
        bg-gradient-to-r from-emerald-500 to-teal-500
        disabled:opacity-40 flex items-center justify-center gap-3"
      >
        {loading ? (
          <>
            <Loader2 className="animate-spin w-5 h-5" />
            Processing...
          </>
        ) : (
          <>
            <Sparkles className="w-5 h-5" />
            Run Prediction
          </>
        )}
      </motion.button>
    </div>
  );
}