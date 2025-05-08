
'use client';
import { useState, MouseEvent } from "react";
import StickyNoteCompo from '@/components/StickyNoteCompo';
import { StickyNote } from "@/types";


export default function Home() {
  const [notes, setNotes] = useState<StickyNote[]>([]);

  //ホワイトボードクリック時の処理
  const addStickyNote = (e: MouseEvent<HTMLDivElement>) => {
    const boardRect = e.currentTarget.getBoundingClientRect();

    const noteWidth = 160;
    const noteHight = 128;

    const newNote: StickyNote = {
      id: Date.now(),
      x: e.clientX - boardRect.left - noteWidth/2,
      y: e.clientY - boardRect.top + noteHight,
      text: '',
    };
    setNotes((prevNotes) => [...prevNotes, newNote]);
  };


  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center py-10">

      {/*タイトル*/}
      <h1 className="text-4xl font-bold mb-6">
        My First Idea Cloude
      </h1>

      {/*入力テキストボックス*/}
      <input
      type="text"
      placeholder="議論したいテーマを入力…"
      className="w-1/2 p-3 rounded-2xl shadow border border-gray-300"
      />

      {/*ホワイトボード*/}
      <div
      className="mt-10 w-full h-screen bg-white rounded-lg shadow border-gray-300"
      onClick={addStickyNote}
      >
        {/*付箋表示*/}
        {notes.map((note) => (
          <StickyNoteCompo key={note.id} note={note} setNotes={setNotes} />
        ))}

      </div>
    </div>
  )
}