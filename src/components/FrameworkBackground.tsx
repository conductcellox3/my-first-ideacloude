"use client";
import React from "react";
import { FrameworkType } from "@/types";


type Props = {
  type: FrameworkType;
};

export default function FrameworkBackground({ type }: Props) {
  const renderFramework = () => {
    switch (type) {
      case "kj":
        return (
          <div className="w-full h-full bg-[url('/grid.svg')] opacity-30 bg-repeat" />
        );

      case "mandara":
        return (
          <div className="grid grid-cols-3 grid-rows-3 w-full h-full text-gray-400">
            {[...Array(9)].map((_, i) => (
              <div key={i} className="border flex items-center justify-center">
                {i === 4 ? "テーマ" : `関連${i + 1}`}
              </div>
            ))}
          </div>
        );

      case "mece":
        return (
          <div className="grid grid-cols-2 grid-rows-2 w-full h-full text-gray-400">
            <div className="border flex items-center justify-center">A</div>
            <div className="border flex items-center justify-center">B</div>
            <div className="border flex items-center justify-center">C</div>
            <div className="border flex items-center justify-center">D</div>
          </div>
        );

      case "swot":
        return (
          <div className="flex flex-wrap w-full h-full text-gray-400">
            <div className="w-1/2 h-1/2 border flex items-center justify-center">
              強み
            </div>
            <div className="w-1/2 h-1/2 border flex items-center justify-center">
              弱み
            </div>
            <div className="w-1/2 h-1/2 border flex items-center justify-center">
              機会
            </div>
            <div className="w-1/2 h-1/2 border flex items-center justify-center">
              脅威
            </div>
          </div>
        );

        case "issueTracking":
            return (
              <div className="w-full h-full grid grid-cols-4 text-gray-400">
                <div className="border p-2">Issue</div>
                <div className="border p-2">原因</div>
                <div className="border p-2">アクション</div>
                <div className="border p-2">担当者</div>
              </div>
            );
      
            case "fishbone":
                return (
                  <div className="w-full h-full flex flex-col items-center  text-gray-500">
                    {/* 現象（中心） */}
                    <div className="font-bold text-xl  mt-20">問題点</div>
              
                    {/* メイン要因 */}
                    <div className="flex justify-between w-4/5 mt-40">
                      {/* 左側 */}
                      <div className="flex flex-col items-end">
                        <div className="font-semibold">ファームウェア</div>
                        <div className="mt-2 flex flex-col items-end text-sm">
                          <div>特定バージョンにバグ（想定原因）</div>
                          <div>他バージョン未検証（未検証）</div>
                        </div>
              
                        <div className="font-semibold mt-40">ユーザー操作</div>
                        <div className="mt-2 flex flex-col items-end text-sm">
                          <div>特殊な使い方（未検証）</div>
                        </div>
                      </div>
              
                      {/* 中心線 */}
                      <div className="w-0.5 bg-gray-300 h-80" />
              
                      {/* 右側 */}
                      <div className="flex flex-col items-start">
                        <div className="font-semibold">ハードウェア</div>
                        <div className="mt-2 flex flex-col items-start text-sm">
                          <div>基板の不具合（未検証）</div>
                          <div>接続部品の問題（未検証）</div>
                        </div>
              
                        <div className="font-semibold mt-40">環境要因</div>
                        <div className="mt-2 flex flex-col items-start text-sm">
                          <div>温度・湿度影響（未検証）</div>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              
      
          case "sipoc":
            return (
              <div className="w-full h-full grid grid-cols-5 text-gray-400">
                <div className="border flex items-center justify-center">Supplier</div>
                <div className="border flex items-center justify-center">Input</div>
                <div className="border flex items-center justify-center">Process</div>
                <div className="border flex items-center justify-center">Output</div>
                <div className="border flex items-center justify-center">Customer</div>
              </div>
            );
      

      case "kanban":
        return (
          <div className="flex w-full h-full text-gray-400">
            <div className="w-1/3 border flex items-center justify-center">
              Todo
            </div>
            <div className="w-1/3 border flex items-center justify-center">
              Doing
            </div>
            <div className="w-1/3 border flex items-center justify-center">
              Done
            </div>
          </div>
        );

      case "eisenhower":
        return (
          <div className="grid grid-cols-2 grid-rows-2 w-full h-full text-gray-400">
            <div className="border flex items-center justify-center">
              緊急＆重要
            </div>
            <div className="border flex items-center justify-center">
              重要＆非緊急
            </div>
            <div className="border flex items-center justify-center">
              緊急＆非重要
            </div>
            <div className="border flex items-center justify-center">
              非緊急＆非重要
            </div>
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
