'use client';
import { useState, useEffect, ChangeEvent, KeyboardEvent } from 'react';
import ReactMarkdown from 'react-markdown';
import { Button } from '../components/ui/button';
import { Textarea } from '../components/ui/textarea';


export default function TextUploader() {
  const [text, setText] = useState<string>('');
  const [savedText, setSavedText] = useState<string>('');

  useEffect(() => {
    const saved = localStorage.getItem('textbook');
    if (saved) setSavedText(saved);
  }, []);

  const saveNote = () => {
    localStorage.setItem('textbook', text);
    setSavedText(text);
  };

  const deleteNote = () => {
    localStorage.removeItem('textbook');
    setText('');
    setSavedText('');
  };

  const handleChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setText(e.target.value);
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      saveNote();
    }
  };

  return (
    <div className="max-w-3xl mx-auto space-y-6 flex flex-col items-center mt-10">
      <h1 className="text-3xl font-bold">Upload Your Description</h1>

      {/* Textarea */}
      <Textarea
        value={text}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        placeholder="Write in **Markdown**..."
        className="w-[300px] h-48 bg-neutral-900 text-white border border-neutral-700 rounded-lg p-3 text-sm resize-none focus:outline-none focus:ring-2 focus:ring-white/10 my-[10px]"
      />

      {/* Buttons */}
      <div className="flex gap-3">
        <Button
          onClick={saveNote}
          className="bg-white text-black rounded-lg px-5 py-2 text-sm hover:bg-neutral-200 transition"
        >
          Save
        </Button>
        <Button
          onClick={deleteNote}
          className="bg-red-600 text-white rounded-lg px-5 py-2 text-sm hover:bg-red-700 transition"
        >
          Delete
        </Button>
      </div>

      <h2 className="text-xl font-semibold mt-6">Preview</h2>

      {/* Preview Box */}
      <div className="w-[300px] bg-neutral-900 border border-neutral-700 rounded-lg p-4 my-[10px]">
        <div className="prose prose-invert text-sm max-w-none">
          <ReactMarkdown>{savedText}</ReactMarkdown>
        </div>
      </div>
    </div>
  );
}