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
  const inputRef = useRef<HTMLInputElement>(null);
  const dragging = useRef(false);
  const offset = useRef({ x: 0, y: 0 });

  useEffect(() => {
    if (isEditing && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isEditing]);

  const saveText = () => {
    setNotes((prevNotes) =>
      prevNotes.map((n) => (n.id === note.id ? { ...n, text } : n))
    );
    setIsEditing(false);
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    if (isEditing) return; //編集時はドラッグ無効
    dragging.current = true;
    offset.current = {
      x: e.clientX - position.x,
      y: e.clientY - position.y,
    };
    e.stopPropagation();
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!dragging.current) return;
    setPosition({
      x: e.clientX - offset.current.x,
      y: e.clientY - offset.current.y,
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

  return (
    <div
      className="absolute bg-yellow-200 w-40 h-32 shadow p-2 rounded-2xl cursor-pointer"
      style={{ left: position.x, top: position.y }}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMounseUp}
      onClick={(e) => e.stopPropagation()}
      onDoubleClick={(e) => {
        e.stopPropagation();
        setIsEditing(true);
      }}
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
  );
}
