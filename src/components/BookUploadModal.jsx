import React, { useState } from 'react';
import { X, UploadCloud, FileText, CheckCircle2, AlertCircle, Loader2 } from 'lucide-react';
import { extractTextFromPDF } from '../services/pdfService';

export default function BookUploadModal({ isOpen, onClose, onUploadSuccess }) {
  const [file, setFile] = useState(null);
  const [status, setStatus] = useState('IDLE'); // IDLE, UPLOADING, PROCESSING, READY, FAILED
  const [progress, setProgress] = useState(0);
  const [extractedPreview, setExtractedPreview] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  if (!isOpen) return null;

  const handleFileDrop = (e) => {
    e.preventDefault();
    const droppedFile = e.dataTransfer ? e.dataTransfer.files[0] : e.target.files[0];
    if (droppedFile) {
      validateAndProcess(droppedFile);
    }
  };

  const validateAndProcess = async (selectedFile) => {
    const ext = selectedFile.name.split('.').pop().toLowerCase();
    if (!['pdf', 'txt', 'docx'].includes(ext)) {
      setErrorMessage('Only PDF, TXT, and DOCX files are supported.');
      setStatus('FAILED');
      return;
    }

    setFile(selectedFile);
    setStatus('UPLOADING');
    setProgress(30);

    setTimeout(async () => {
      setStatus('PROCESSING');
      setProgress(75);

      // Extract text content
      const result = await extractTextFromPDF(selectedFile);

      if (result.success) {
        setProgress(100);
        setStatus('READY');
        setExtractedPreview(result.text);

        const newBook = {
          title: selectedFile.name.replace(/\.[^/.]+$/, ""),
          author: "Uploaded Document",
          category: "User Upload",
          fileType: ext.toUpperCase(),
          pageCount: result.pageCount || 10,
          extractedText: result.text,
          fileSize: `${(selectedFile.size / (1024 * 1024)).toFixed(1)} MB`
        };

        setTimeout(() => {
          onUploadSuccess(newBook);
          resetModal();
          onClose();
        }, 1200);
      } else {
        setStatus('FAILED');
        setErrorMessage('Could not extract text. Document might be scanned or protected.');
      }
    }, 1000);
  };

  const resetModal = () => {
    setFile(null);
    setStatus('IDLE');
    setProgress(0);
    setExtractedPreview('');
    setErrorMessage('');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-md animate-in fade-in duration-200">
      <div className="w-full max-w-lg rounded-3xl glass-panel p-6 border border-white/20 shadow-2xl relative">
        
        {/* Close Button */}
        <button
          onClick={() => { resetModal(); onClose(); }}
          className="absolute top-5 right-5 text-slate-400 hover:text-white p-1 rounded-full hover:bg-white/10"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 rounded-2xl bg-indigo-500/20 border border-indigo-500/30 flex items-center justify-center text-indigo-400">
            <UploadCloud className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-white">Upload Book / Document</h2>
            <p className="text-xs text-slate-400">Supported formats: PDF, TXT, DOCX (Max 25MB)</p>
          </div>
        </div>

        {status === 'IDLE' && (
          <div
            onDragOver={(e) => e.preventDefault()}
            onDrop={handleFileDrop}
            className="border-2 border-dashed border-white/20 hover:border-indigo-400 rounded-3xl p-8 text-center glass-pill cursor-pointer transition-colors group"
          >
            <input
              type="file"
              accept=".pdf,.txt,.docx"
              onChange={handleFileDrop}
              className="hidden"
              id="file-upload-input"
            />
            <label htmlFor="file-upload-input" className="cursor-pointer">
              <UploadCloud className="w-12 h-12 mx-auto text-indigo-400 group-hover:scale-110 transition-transform mb-3" />
              <p className="text-sm font-bold text-white">Drag & drop your PDF here</p>
              <p className="text-xs text-slate-400 mt-1">or click to browse your computer</p>
            </label>
          </div>
        )}

        {(status === 'UPLOADING' || status === 'PROCESSING' || status === 'READY') && (
          <div className="space-y-4 py-4 text-center">
            <div className="w-12 h-12 mx-auto rounded-full bg-indigo-500/20 border border-indigo-500/40 flex items-center justify-center">
              {status === 'READY' ? (
                <CheckCircle2 className="w-6 h-6 text-emerald-400" />
              ) : (
                <Loader2 className="w-6 h-6 text-indigo-400 animate-spin" />
              )}
            </div>

            <div>
              <h3 className="font-bold text-white text-base">{file?.name}</h3>
              <p className="text-xs text-indigo-300 uppercase font-semibold mt-1">
                Status: {status}...
              </p>
            </div>

            {/* Progress Bar */}
            <div className="w-full bg-slate-800 rounded-full h-3 overflow-hidden border border-white/10 p-0.5">
              <div
                className="bg-gradient-to-r from-indigo-500 to-purple-500 h-full rounded-full transition-all duration-300"
                style={{ width: `${progress}%` }}
              ></div>
            </div>

            {status === 'READY' && (
              <div className="p-3 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-xs font-semibold">
                ✓ Document successfully processed & ready for AI quiz generation!
              </div>
            )}
          </div>
        )}

        {status === 'FAILED' && (
          <div className="p-4 rounded-2xl bg-red-500/10 border border-red-500/30 text-center space-y-3">
            <AlertCircle className="w-8 h-8 text-red-400 mx-auto" />
            <p className="text-sm font-bold text-red-200">{errorMessage}</p>
            <button
              onClick={resetModal}
              className="px-4 py-2 rounded-xl bg-red-600 text-white text-xs font-bold"
            >
              Try Again
            </button>
          </div>
        )}

      </div>
    </div>
  );
}
