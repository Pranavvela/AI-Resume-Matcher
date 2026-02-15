import { useState } from "react";
import axios from "axios";

type AnalyzeResult = {
  skills: string[];
  best_role: string;
  match_percentage: number;
};

function App() {
  const [file, setFile] = useState<File | null>(null);
  const [result, setResult] = useState<AnalyzeResult | null>(null);
  const [loading, setLoading] = useState(false);

  const handleUpload = async () => {
    if (!file) return alert("Please select a PDF resume first.");

    const formData = new FormData();
    formData.append("file", file);

    setLoading(true);
    try {
      const response = await axios.post<AnalyzeResult>(
        "http://localhost:5000/analyze",
        formData,
        { headers: { "Content-Type": "multipart/form-data" } }
      );
      setResult(response.data);
    } catch {
      alert("Failed to analyze resume.");
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-black text-white flex flex-col items-center justify-center px-6 py-16">

      {/* Container */}
      <div className="w-full max-w-3xl text-center">

        {/* Hero */}
        <h1 className="text-4xl md:text-6xl font-bold mb-4 tracking-tight bg-gradient-to-r from-blue-400 via-cyan-300 to-emerald-400 bg-clip-text text-transparent">
          AI Resume Matcher
        </h1>

        <p className="text-gray-400 text-lg mb-12 max-w-xl mx-auto">
          Upload your resume and instantly discover the role that best matches your skills using AI-powered analysis.
        </p>

        {/* Upload Card */}
        <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-10 shadow-2xl transition-all duration-300 hover:shadow-cyan-500/10">

          <div className="flex flex-col gap-6">

            {/* File Upload */}
            <label className="cursor-pointer">
              <div className="w-full py-4 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-500 hover:opacity-90 transition font-semibold text-lg shadow-lg">
                {file ? file.name : "Choose PDF Resume"}
              </div>
              <input
                type="file"
                accept="application/pdf"
                className="hidden"
                onChange={(e) => setFile(e.target.files?.[0] || null)}
              />
            </label>

            {/* Analyze Button */}
            <button
              onClick={handleUpload}
              disabled={loading}
              className="w-full py-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 transition font-semibold text-lg disabled:opacity-50 shadow-lg"
            >
              {loading ? "Analyzing..." : "Analyze Resume"}
            </button>
          </div>
        </div>

        {/* Results Section */}
        {result && (
          <div className="mt-12 bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-10 shadow-xl transition-all duration-500 animate-fadeIn">

            <h2 className="text-2xl font-semibold mb-6">
              Best Role:
              <span className="text-emerald-400 ml-2">
                {result.best_role}
              </span>
            </h2>

            {/* Progress Bar */}
            <div className="mb-8">
              <div className="flex justify-between text-sm text-gray-400 mb-2">
                <span>Match Score</span>
                <span>{result.match_percentage}%</span>
              </div>

              <div className="w-full bg-gray-800 rounded-full h-3 overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-blue-500 to-cyan-400 transition-all duration-700"
                  style={{ width: `${result.match_percentage}%` }}
                />
              </div>
            </div>

            {/* Skills */}
            <h3 className="text-lg font-semibold mb-4">
              Extracted Skills
            </h3>

            <div className="flex flex-wrap justify-center gap-3">
              {result.skills.map((skill, index) => (
                <span
                  key={index}
                  className="px-4 py-2 bg-gray-800/80 border border-gray-700 rounded-full text-sm text-gray-300 hover:bg-gray-700 transition"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
        )}

      </div>
    </div>
  );
}

export default App;
