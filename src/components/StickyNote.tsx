'use client'
import React, { useState, useRef, useEffect } from "react";

type StickyNoteProps = {
    note: {
        id: number;
        x: number;
        y: number;
        text: string;
    };
    setNotes: React.Dispatch<React.SetStateAction<unknown[]>>;
};

export default function StickyNote({note, setNotes}: StickyNoteProps) {
    const [isEditing, setIsEditing] = useState(false);
    const [text, setText] = useState(note.text);
    const inputRef = useRef<HTMLInputElement>(null);

    useEffect(()=> {
        if (isEditing && inputRef.current) {
            inputRef.current.focus();
        }
    }, [isEditing]);

    const saveText = () => {
        setNotes((prevNotes) => prevNotes.map((n) => (n.id === note.id ? {...n, text} : n)));
        setIsEditing(false);
    };

    return (
        <div
        className="absolute bg-yellow-200 w-40 h-32 shadow p-2 rounded-2xl cursor-pointer"
        style={{left: note.x, top: note.y}}
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
                onKeyDown={(e) => e.key === 'Enter' && saveText()}
                className="w-full h-full bg-transparent outline-none"
                />
            ) : (
                <span className="text-sm whitespace-pre-wrap">
                    {note.text || 'ダブルクリックで入力'}
                </span>
            )}

        </div>
    );
}