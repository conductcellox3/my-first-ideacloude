'use client';
import React from 'react';

type FrameworkType = "none" | "kj" | "swot" | "kanban";

type Props = {
  type: FrameworkType;
};

export default function FrameworkBackground({ type }: Props) {
  const renderFramework = () => {
    switch (type) {
      case "kj":
        return <div className="w-full h-full bg-[url('/grid.svg')] opacity-30 bg-repeat" />;
      case "swot":
        return (
          <div className="flex flex-wrap w-full h-full text-gray-400">
            <div className="w-1/2 h-1/2 border flex items-center justify-center text-lg">強み (Strength)</div>
            <div className="w-1/2 h-1/2 border flex items-center justify-center text-lg">弱み (Weakness)</div>
            <div className="w-1/2 h-1/2 border flex items-center justify-center text-lg">機会 (Opportunity)</div>
            <div className="w-1/2 h-1/2 border flex items-center justify-center text-lg">脅威 (Threat)</div>
          </div>
        );
      case "kanban":
        return (
          <div className="flex w-full h-full text-gray-400">
            <div className="w-1/3 h-full border flex items-center justify-center text-lg">未着手 (Todo)</div>
            <div className="w-1/3 h-full border flex items-center justify-center text-lg">実行中 (Doing)</div>
            <div className="w-1/3 h-full border flex items-center justify-center text-lg">完了 (Done)</div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="absolute top-0 left-0 w-full h-full pointer-events-none select-none">
      {renderFramework()}
    </div>
  );
}
