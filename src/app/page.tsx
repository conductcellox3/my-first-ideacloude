
'use client';
import { useState, MouseEvent } from "react";
import StickyNoteCompo from '@/components/StickyNoteCompo';
import ClockTimer from "@/components/ClockTimer";
import FrameworkBackground from "@/components/FrameworkBackground";
import { StickyNote } from "@/types";


export default function Home() {
  const [notes, setNotes] = useState<StickyNote[]>([]);
  const [framework, setFramework] = useState<"none" | "kj" | "swot" | "kanban">("none");

  //ホワイトボードクリック時の処理
  const addStickyNote = (e: MouseEvent<HTMLDivElement>) => {
    const boardRect = e.currentTarget.getBoundingClientRect();

    const noteWidth = 160;
    const noteHight = 128;

    const xPercent = ((e.clientX - boardRect.left - noteWidth/2) / boardRect.width) * 100;
    const yPercent = ((e.clientY - boardRect.top - noteHight/2) / boardRect.height) * 100;

    const newNote: StickyNote = {
      id: Date.now(),
      x: xPercent,
      y: yPercent,
      text: '',
      color: 'bg-yellow-200',
    };
    setNotes((prevNotes) => [...prevNotes, newNote]);
  };


  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center py-10 relative">

      {/*タイトル*/}
      <h1 className="text-4xl font-bold mb-6">
        My First Idea Cloud
      </h1>

      {/*入力テキストボックス*/}
      <input
      type="text"
      placeholder="議論したいテーマを入力…"
      className="w-1/2 p-3 rounded-2xl shadow border text-center border-gray-300"
      />

      
      {/*時計・タイマー表示*/}
      <div className="absolute top-2 right-2">
        <ClockTimer />
      </div>

      {/* フレームワーク選択ボタン */}
      <div className="absolute top-2 left-2 flex flex-col gap-2 bg-white bg-opacity-70 p-2 rounded shadow z-50">
        <button className="px-2 py-1 bg-blue-300 rounded" onClick={() => setFramework("kj")}>アイデア出し (KJ法)</button>
        <button className="px-2 py-1 bg-green-300 rounded" onClick={() => setFramework("swot")}>会議整理 (SWOT)</button>
        <button className="px-2 py-1 bg-purple-300 rounded" onClick={() => setFramework("kanban")}>タスク管理 (カンバン)</button>
        <button className="px-2 py-1 bg-gray-300 rounded" onClick={() => setFramework("none")}>フレームなし</button>
      </div>

      {/*ホワイトボード*/}
      <div
      className="mt-10 w-full h-screen flex-l bg-white rounded-lg shadow border-gray-300 relative overflow-hidden"
      onClick={addStickyNote}
      onMouseLeave={() => window.dispatchEvent(new window.MouseEvent('mouseup'))}
      >

        {/* フレームワーク表示 */}
        <FrameworkBackground type={framework} />

        {/*付箋表示*/}
        {notes.map((note) => (
          <StickyNoteCompo key={note.id} note={note} setNotes={setNotes} />
        ))}

      </div>
    </div>
  )
}