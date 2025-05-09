"use client";
import { useState, MouseEvent } from "react";
import StickyNoteCompo from "@/components/StickyNoteCompo";
import ClockTimer from "@/components/ClockTimer";
import FrameworkBackground from "@/components/FrameworkBackground";
import { StickyNote, FrameworkType } from "@/types";

export default function Home() {
  const [notes, setNotes] = useState<StickyNote[]>([]);

  const [openCategory, setOpenCategory] = useState<string | null>(null);
  const [framework, setFramework] = useState<FrameworkType>("none");

  //ホワイトボードクリック時の処理
  const addStickyNote = (e: MouseEvent<HTMLDivElement>) => {
    const boardRect = e.currentTarget.getBoundingClientRect();

    const noteWidth = 160;
    const noteHight = 128;

    const xPercent =
      ((e.clientX - boardRect.left - noteWidth / 2) / boardRect.width) * 100;
    const yPercent =
      ((e.clientY - boardRect.top - noteHight / 2) / boardRect.height) * 100;

    const newNote: StickyNote = {
      id: Date.now(),
      x: xPercent,
      y: yPercent,
      text: "",
      color: "bg-yellow-200",
    };
    setNotes((prevNotes) => [...prevNotes, newNote]);
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center py-10 relative">
      {/*タイトル*/}
      <h1 className="text-4xl font-bold mb-6">My First Idea Cloud</h1>

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

      <div className="absolute top-2 left-2 flex flex-col gap-2 bg-white bg-opacity-80 p-2 rounded shadow z-50 w-48">
        {/* アイデア出し */}
        <button
          className="text-left font-semibold px-2 py-1 rounded bg-blue-300"
          onClick={() =>
            setOpenCategory(openCategory === "idea" ? null : "idea")
          }
        >
          {openCategory === "idea" ? "▼" : "▶"} アイデア出し
        </button>
        {openCategory === "idea" && (
          <div className="flex flex-col ml-4 gap-1 animate-fadeIn">
            <button
              className="text-left px-2 py-1 rounded hover:bg-blue-100"
              onClick={() => setFramework("kj")}
            >
              KJ法
            </button>
            <button
              className="text-left px-2 py-1 rounded hover:bg-blue-100"
              onClick={() => setFramework("mandara")}
            >
              曼荼羅チャート
            </button>
          </div>
        )}

        {/* 会議整理 */}
        <button
          className="text-left font-semibold px-2 py-1 rounded bg-green-300"
          onClick={() =>
            setOpenCategory(openCategory === "meeting" ? null : "meeting")
          }
        >
          {openCategory === "meeting" ? "▼" : "▶"} 会議整理
        </button>
        {openCategory === "meeting" && (
          <div className="flex flex-col ml-4 gap-1 animate-fadeIn">
            <button
              className="text-left px-2 py-1 rounded hover:bg-green-100"
              onClick={() => setFramework("mece")}
            >
              MECEチャート
            </button>
            <button
              className="text-left px-2 py-1 rounded hover:bg-green-100"
              onClick={() => setFramework("swot")}
            >
              SWOT分析
            </button>
            <button
              className="text-left px-2 py-1 rounded hover:bg-green-100"
              onClick={() => setFramework("issueTracking")}
            >
              Issue Tracking Sheet
            </button>
            <button
              className="text-left px-2 py-1 rounded hover:bg-green-100"
              onClick={() => setFramework("fishbone")}
            >
              フィッシュボーンチャート
            </button>
            <button
              className="text-left px-2 py-1 rounded hover:bg-green-100"
              onClick={() => setFramework("sipoc")}
            >
              SIPOC市場インパクト整理
            </button>
          </div>
        )}

        {/* タスク管理 */}
        <button
          className="text-left font-semibold px-2 py-1 rounded bg-purple-300"
          onClick={() =>
            setOpenCategory(openCategory === "task" ? null : "task")
          }
        >
          {openCategory === "task" ? "▼" : "▶"} タスク管理
        </button>
        {openCategory === "task" && (
          <div className="flex flex-col ml-4 gap-1 animate-fadeIn">
            <button
              className="text-left px-2 py-1 rounded hover:bg-purple-100"
              onClick={() => setFramework("kanban")}
            >
              カンバン
            </button>
            <button
              className="text-left px-2 py-1 rounded hover:bg-purple-100"
              onClick={() => setFramework("eisenhower")}
            >
              アイゼンハワーマトリクス
            </button>
          </div>
        )}

        {/* フレームなし */}
        <button
          className="text-left font-semibold px-2 py-1 rounded bg-gray-300"
          onClick={() => {
            setOpenCategory(null);
            setFramework("none");
          }}
        >
          ● フレームなし
        </button>
      </div>

      {/*ホワイトボード*/}
      <div
        className="mt-10 w-full h-screen flex-l bg-white rounded-lg shadow border-gray-300 relative overflow-hidden"
        onClick={addStickyNote}
        onMouseLeave={() =>
          window.dispatchEvent(new window.MouseEvent("mouseup"))
        }
      >
        {/* フレームワーク表示 */}
        <FrameworkBackground type={framework} />

        {/*付箋表示*/}
        {notes.map((note) => (
          <StickyNoteCompo key={note.id} note={note} setNotes={setNotes} />
        ))}
      </div>
    </div>
  );
}
