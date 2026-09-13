import React from 'react';
import { BookOpen, CheckCircle, Clock } from 'lucide-react';

export const PottedPlant: React.FC = () => {
  return (
    <div className="relative group select-none pointer-events-auto" title="Tanaman Hias Meja Peduli Sehat">
      {/* Plant Leaves */}
      <div className="relative w-24 h-28 flex items-end justify-center">
        {/* Shadow under pot */}
        <div className="absolute -bottom-1 w-20 h-4 bg-slate-950/40 rounded-full blur-sm" />
        
        {/* Stem & Leaves */}
        <div className="absolute bottom-10 flex items-center justify-center">
          {/* Back leaf left */}
          <div className="absolute -left-5 -bottom-2 w-8 h-16 bg-gradient-to-t from-emerald-800 to-emerald-600 rounded-full origin-bottom -rotate-35 shadow-sm border-t border-emerald-400/40" />
          {/* Back leaf right */}
          <div className="absolute -right-5 -bottom-2 w-8 h-16 bg-gradient-to-t from-teal-800 to-emerald-600 rounded-full origin-bottom rotate-35 shadow-sm border-t border-teal-400/40" />
          {/* Center tall leaf */}
          <div className="absolute -bottom-1 w-8 h-20 bg-gradient-to-t from-emerald-700 via-emerald-600 to-teal-400 rounded-full origin-bottom rotate-0 shadow-md border-t border-emerald-300/50" />
          {/* Left front leaf */}
          <div className="absolute -left-3 bottom-0 w-7 h-14 bg-gradient-to-t from-teal-700 to-emerald-500 rounded-full origin-bottom -rotate-18 shadow-inner" />
          {/* Right front leaf */}
          <div className="absolute -right-3 bottom-0 w-7 h-14 bg-gradient-to-t from-emerald-700 to-teal-500 rounded-full origin-bottom rotate-18 shadow-inner" />
          {/* Baby center shoot */}
          <div className="absolute bottom-1 w-4 h-10 bg-gradient-to-t from-emerald-500 to-lime-300 rounded-full origin-bottom rotate-3" />
        </div>

        {/* Ceramic Modern Pot */}
        <div className="relative z-10 w-16 h-12 bg-gradient-to-b from-stone-100 via-stone-200 to-stone-300 rounded-b-2xl rounded-t-sm shadow-lg border-t-2 border-stone-300/80 flex flex-col items-center">
          {/* Pot Rim */}
          <div className="w-18 -mt-1 h-2 bg-stone-200 rounded-full shadow-sm border-b border-stone-400/30" />
          {/* Hospital mini cross accent on pot */}
          <div className="mt-3 flex items-center justify-center opacity-40">
            <div className="w-2 h-0.5 bg-teal-700 rounded-full absolute" />
            <div className="w-0.5 h-2 bg-teal-700 rounded-full absolute" />
          </div>
        </div>
      </div>
      <div className="text-[10px] text-center font-medium text-slate-500/80 mt-1 opacity-0 group-hover:opacity-100 transition-opacity">
        Bonsai Meja
      </div>
    </div>
  );
};

export const DeskNotebook: React.FC<{ onOpenNotes?: () => void }> = ({ onOpenNotes }) => {
  return (
    <div 
      onClick={onOpenNotes}
      className="relative cursor-pointer group transition-transform hover:-translate-y-1 select-none"
      title="Buku Catatan Medis & Jadwal"
    >
      {/* Notebook Shadow */}
      <div className="absolute -bottom-2 -right-2 w-36 h-44 bg-slate-950/40 rounded-xl blur-md" />
      
      {/* Notebook Body */}
      <div className="relative w-36 h-44 bg-gradient-to-br from-teal-900 via-cyan-950 to-slate-900 rounded-xl p-3 shadow-xl border border-teal-500/30 flex flex-col justify-between overflow-hidden">
        {/* Book Spine Texture */}
        <div className="absolute left-0 top-0 bottom-0 w-3.5 bg-teal-950 border-r border-teal-700/40 flex flex-col justify-around py-2">
          <div className="w-1 h-3 bg-teal-400/50 rounded-full mx-auto" />
          <div className="w-1 h-3 bg-teal-400/50 rounded-full mx-auto" />
          <div className="w-1 h-3 bg-teal-400/50 rounded-full mx-auto" />
          <div className="w-1 h-3 bg-teal-400/50 rounded-full mx-auto" />
        </div>

        {/* Bookmark Ribbon */}
        <div className="absolute right-6 -top-1 w-3 h-10 bg-amber-400 rounded-b-sm shadow-md" />

        {/* Notebook Content Header */}
        <div className="pl-3">
          <div className="flex items-center gap-1 text-[11px] font-bold text-teal-200 tracking-wider">
            <BookOpen className="w-3 h-3 text-teal-400" />
            <span>AGENDA RS</span>
          </div>
          <p className="text-[9px] text-teal-300/70">Peduli Sehat</p>
        </div>

        {/* Lined Note Preview */}
        <div className="pl-3 space-y-1.5 py-1">
          <div className="bg-slate-800/80 rounded px-1.5 py-1 border border-teal-500/20">
            <div className="flex items-center justify-between text-[8px] text-teal-300 font-semibold">
              <span className="flex items-center gap-0.5"><Clock className="w-2.5 h-2.5" /> 11 Juni, 10:00</span>
              <CheckCircle className="w-2.5 h-2.5 text-emerald-400" />
            </div>
            <p className="text-[8px] text-slate-300 truncate font-medium">dr. Sarah Sp.A (Anak)</p>
          </div>
          <div className="w-full h-1 bg-teal-700/30 rounded-full" />
          <div className="w-4/5 h-1 bg-teal-700/30 rounded-full" />
        </div>

        {/* Footer info */}
        <div className="pl-3 flex items-center justify-between text-[8px] text-teal-400/80">
          <span>Halaman 12</span>
          <span className="bg-teal-500/20 text-teal-200 px-1 rounded text-[7px]">Buka ↗</span>
        </div>
      </div>

      {/* Luxury Metallic Stylus / Pen beside notebook */}
      <div className="absolute -right-3 top-6 w-2 h-32 bg-gradient-to-r from-slate-200 via-slate-100 to-amber-200 rounded-full shadow-md border border-slate-400/40 rotate-6 flex flex-col justify-between items-center py-1 pointer-events-none">
        <div className="w-1 h-3 bg-amber-400 rounded-sm" />
        <div className="w-0.5 h-2 bg-slate-700 rounded-full mb-0.5" />
      </div>
    </div>
  );
};

export const DesktopKeyboardMouse: React.FC = () => {
  return (
    <div className="flex items-center justify-center gap-6 mt-4 opacity-95 select-none pointer-events-auto">
      {/* Keyboard */}
      <div className="relative">
        <div className="w-80 h-16 bg-gradient-to-b from-slate-200 to-slate-300 rounded-xl shadow-lg border border-slate-300/80 p-1.5 flex flex-col justify-between">
          <div className="grid grid-cols-12 gap-1 h-3">
            {Array.from({ length: 12 }).map((_, i) => (
              <div key={i} className="bg-white rounded-[2px] shadow-xs text-[6px] flex items-center justify-center text-slate-500 font-mono">
                {i === 0 ? 'esc' : i}
              </div>
            ))}
          </div>
          <div className="grid grid-cols-10 gap-1 h-4">
            {Array.from({ length: 10 }).map((_, i) => (
              <div key={i} className="bg-white rounded-[2px] shadow-xs text-[7px] flex items-center justify-center text-slate-700 font-mono">
                {['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P'][i]}
              </div>
            ))}
          </div>
          <div className="flex items-center justify-center gap-1 h-4">
            <div className="w-10 bg-white rounded-[2px] shadow-xs text-[6px] flex items-center justify-center text-slate-500">ctrl</div>
            <div className="w-40 bg-white rounded-[2px] shadow-xs h-full flex items-center justify-center text-[7px] text-slate-400">space</div>
            <div className="w-10 bg-white rounded-[2px] shadow-xs text-[6px] flex items-center justify-center text-slate-500">enter</div>
          </div>
        </div>
      </div>

      {/* Ergonomic Wireless Mouse */}
      <div className="relative">
        <div className="w-9 h-14 bg-gradient-to-b from-white via-slate-100 to-slate-200 rounded-full shadow-lg border border-slate-300 flex flex-col items-center pt-2">
          {/* Scroll Wheel */}
          <div className="w-1 h-3 bg-teal-600 rounded-full shadow-inner animate-pulse" />
          {/* Subtle divider */}
          <div className="w-full h-px bg-slate-300/60 mt-1" />
        </div>
      </div>
    </div>
  );
};
