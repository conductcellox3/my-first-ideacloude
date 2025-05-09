"use client";
import React, { useState, useRef, useEffect } from "react";
import { StickyNote } from "../types";

type StickyNoteProps = {
  note: StickyNote;
  setNotes: React.Dispatch<React.SetStateAction<StickyNote[]>>;
};

export default function StickyNoteCompo({ note, setNotes }: StickyNoteProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [text, setText] = useState(note.text);
  const [position, setPosition] = useState({ x: note.x, y: note.y });
  const [showMenu, setShowMenu] = useState(false);
  const [menuPosition, setMenuPosition] = useState({ x: 0, y: 0 });

  const inputRef = useRef<HTMLInputElement>(null);
  const dragging = useRef(false);
  const offset = useRef({ x: 0, y: 0 });

  useEffect(() => {
    if (isEditing && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isEditing]);

  useEffect(() => {
    setPosition({x: note.x, y: note.y});
  }, [note.x, note.y])

  //メニューの外をクリックしたら閉じる処理
  useEffect(() => {
    const handleClickOutside = () => setShowMenu(false);
    window.addEventListener("click", handleClickOutside);
    return () => window.removeEventListener("click", handleClickOutside);
  }, []);

  const saveText = () => {
    setNotes((prevNotes) =>
      prevNotes.map((n) => (n.id === note.id ? { ...n, text } : n))
    );
    setIsEditing(false);
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    if (isEditing) return; //編集時はドラッグ無効
    dragging.current = true;

    const boardRect = (e.currentTarget.parentElement as HTMLElement).getBoundingClientRect();

    offset.current = {
      x: e.clientX - boardRect.left - (boardRect.width * position.x) / 100,
      y: e.clientY - boardRect.top - (boardRect.height * position.y) / 100,
    };
    e.stopPropagation();
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!dragging.current) return;

    const boardRect = (e.currentTarget.parentElement as HTMLElement).getBoundingClientRect();
    const updatedXPercent = ((e.clientX - boardRect.left - offset.current.x) / boardRect.width) * 100;
    const updatedYPercent = ((e.clientY - boardRect.top - offset.current.y) / boardRect.height) * 100;

    setPosition({
      x: updatedXPercent,
      y: updatedYPercent,
    });
    e.stopPropagation();
  };

  const handleMounseUp = () => {
    if (dragging.current) {
      dragging.current = false;
      setNotes((prevNotes) =>
        prevNotes.map((n) =>
          n.id === note.id ? { ...n, x: position.x, y: position.y } : n
        )
      );
    }
  };

  //right click menu
  const handleContextMenu = (e: React.MouseEvent) => {
    e.preventDefault();
    setShowMenu(true);
    setMenuPosition({ x: e.clientX, y: e.clientY - 180 });
  };

  //delete note
  const handleDelete = () => {
    setNotes((prevNotes) => prevNotes.filter((n) => n.id !== note.id));
  };

  //change note color
  const handleChangeColor = (color: string) => {
    setNotes((prevNotes) =>
      prevNotes.map((n) => n.id === note.id ? { ...n, color } : n)
    );
    setShowMenu(false);
  };

  return (
    <>
      <div
        className={`absolute ${note.color} w-40 h-32 shadow p-2 rounded-2xl cursor-move`}
        style={{ left: `${position.x}%`, top: `${position.y}%`, zIndex: 500 }}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMounseUp}
        onClick={(e) => e.stopPropagation()}
        onDoubleClick={(e) => {
          e.stopPropagation();
          setIsEditing(true);
        }}
        onContextMenu={handleContextMenu}
      >
        {isEditing ? (
          <input
            ref={inputRef}
            value={text}
            onChange={(e) => setText(e.target.value)}
            onBlur={saveText}
            onKeyDown={(e) => e.key === "Enter" && saveText()}
            className="w-full h-full bg-transparent outline-none"
          />
        ) : (
          <span className="text-sm whitespace-pre-wrap">
            {note.text || "ダブルクリックで入力"}
          </span>
        )}
      </div>

      {/*右クリックメニュー*/}
      {showMenu && (
        <div
          className="absolute bg-white border shadow rounded-2xl p-2"
          style={{ left: menuPosition.x, top: menuPosition.y, zIndex: 1000 }}
          onClick={(e) => e.stopPropagation()}
        >
          <button
            className="block w-full text-left px-2 py-1 hover:bg-gray-100"
            onClick={handleDelete}
          >
            🚮削除
          </button>
          <button
            className="block w-full text-left px-2 py-1 hover:bg-gray-100"
            onClick={() => handleChangeColor('bg-yellow-200')}
          >
            黄色
          </button>
          <button
            className="block w-full text-left px-2 py-1 hover:bg-gray-100"
            onClick={() => handleChangeColor('bg-green-200')}
          >
            緑色
          </button>
          <button
            className="block w-full text-left px-2 py-1 hover:bg-gray-100"
            onClick={() => handleChangeColor('bg-blue-200')}
          >
            青色
          </button>
          <button
            className="block w-full text-left px-2 py-1 hover:bg-gray-100"
            onClick={() => handleChangeColor('bg-red-200')}
          >
            赤色
          </button>
        </div>
      )}
    </>
  );
}
