import React, { useState } from 'react';
import {
  Monitor,
  Laptop as LaptopIcon,
  Maximize2,
  Sparkles,
  Info,
  Sun,
  Moon,
  Coffee,
  Check,
  RotateCcw,
  Layers,
  Volume2
} from 'lucide-react';
import { DesktopMonitorScreen } from './DesktopMonitorScreen';
import { LaptopScreen } from './LaptopScreen';
import { PottedPlant, DeskNotebook, DesktopKeyboardMouse } from './DeskProps';
import { Doctor } from '../types';
import { DOCTORS_DATA } from '../data/doctors';

interface DeskSetupProps {
  isElderMode: boolean;
  setIsElderMode: React.Dispatch<React.SetStateAction<boolean>>;
  viewMode: 'desk' | 'monitor' | 'laptop';
  setViewMode: (mode: 'desk' | 'monitor' | 'laptop') => void;
  onOpenAmbulance: () => void;
  onOpenIdCard: (doctor?: Doctor) => void;
  onOpenConsultation: (doctor?: Doctor) => void;
  onOpenBooking: (date?: string, time?: string, doctor?: Doctor) => void;
}

export const DeskSetup: React.FC<DeskSetupProps> = ({
  isElderMode,
  setIsElderMode,
  viewMode,
  setViewMode,
  onOpenAmbulance,
  onOpenIdCard,
  onOpenConsultation,
  onOpenBooking,
}) => {
  const [ambientLight, setAmbientLight] = useState<'soft-teal' | 'warm-clinic' | 'modern-dark'>('soft-teal');
  const [showNotesModal, setShowNotesModal] = useState(false);
  const [soundAssistance, setSoundAssistance] = useState(false);

  // Background style based on ambient light
  const bgClass =
    ambientLight === 'soft-teal'
      ? 'from-sky-100 via-teal-50 to-cyan-100'
      : ambientLight === 'warm-clinic'
      ? 'from-amber-50 via-teal-50 to-emerald-100'
      : 'from-slate-900 via-teal-950 to-slate-900';

  return (
    <div className={`relative w-full min-h-screen bg-gradient-to-br ${bgClass} transition-colors duration-700 flex flex-col justify-between overflow-x-hidden select-none`}>
      {/* 1. Floating Top Navigation Bar */}
      <nav className="w-full bg-white/85 backdrop-blur-md border-b border-teal-200/60 shadow-xs px-4 py-2.5 z-40 flex items-center justify-between flex-wrap gap-2 sticky top-0">
        <div className="flex items-center gap-2 sm:gap-3">
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-teal-500 animate-pulse" />
            <h1 className="font-extrabold text-sm sm:text-base text-slate-900 tracking-tight">
              RS Muhammad Ali <span className="text-teal-600 font-semibold">• Peduli Bersama</span>
            </h1>
          </div>
          <span className="hidden md:inline-block text-[11px] bg-teal-100/80 text-teal-800 font-bold px-2.5 py-0.5 rounded-full border border-teal-200">
            Meja Kerja Modern (Dual-Device)
          </span>
        </div>

        {/* View Switcher Tabs */}
        <div className="flex items-center bg-slate-200/70 p-1 rounded-2xl">
          <button
            onClick={() => setViewMode('desk')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl font-extrabold text-xs transition-all ${
              viewMode === 'desk'
                ? 'bg-white text-teal-800 shadow-sm'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Layers className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Meja Dual Device</span>
            <span className="sm:hidden">Dual</span>
          </button>
          <button
            onClick={() => setViewMode('monitor')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl font-extrabold text-xs transition-all ${
              viewMode === 'monitor'
                ? 'bg-white text-teal-800 shadow-sm'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Monitor className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Layar Monitor (Landing)</span>
            <span className="sm:hidden">Monitor</span>
          </button>
          <button
            onClick={() => setViewMode('laptop')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl font-extrabold text-xs transition-all ${
              viewMode === 'laptop'
                ? 'bg-white text-teal-800 shadow-sm'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <LaptopIcon className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Layar Laptop (Booking)</span>
            <span className="sm:hidden">Laptop</span>
          </button>
        </div>

        {/* Ambient & Accessibility Utilities */}
        <div className="flex items-center gap-2">
          {/* Quick Ambient lighting changer */}
          <div className="hidden lg:flex items-center bg-slate-100 rounded-xl p-1 text-[11px] font-semibold text-slate-600">
            <button
              onClick={() => setAmbientLight('soft-teal')}
              className={`px-2 py-0.5 rounded-lg ${ambientLight === 'soft-teal' ? 'bg-white text-teal-700 shadow-xs' : ''}`}
              title="Cahaya Lembut Biru-Teal"
            >
              Soft Teal
            </button>
            <button
              onClick={() => setAmbientLight('warm-clinic')}
              className={`px-2 py-0.5 rounded-lg ${ambientLight === 'warm-clinic' ? 'bg-white text-amber-700 shadow-xs' : ''}`}
              title="Cahaya Hangat Klinik"
            >
              Warm
            </button>
            <button
              onClick={() => setAmbientLight('modern-dark')}
              className={`px-2 py-0.5 rounded-lg ${ambientLight === 'modern-dark' ? 'bg-slate-800 text-white shadow-xs' : ''}`}
              title="Studio Malam"
            >
              Studio Dark
            </button>
          </div>

          {/* Sound / Voice assistance toggle */}
          <button
            onClick={() => {
              setSoundAssistance(!soundAssistance);
              if (!soundAssistance) {
                alert('Audio Asistensi Suara Aktif: Membantu lansia dan pengguna tunanetra bernavigasi.');
              }
            }}
            className={`p-2 rounded-xl border text-xs font-bold flex items-center gap-1 transition-colors ${
              soundAssistance
                ? 'bg-emerald-600 text-white border-emerald-500'
                : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-100'
            }`}
            title="Asistensi Suara Aksesibilitas"
          >
            <Volume2 className="w-3.5 h-3.5" />
            <span className="hidden md:inline">{soundAssistance ? 'Suara Aktif' : 'Suara'}</span>
          </button>
        </div>
      </nav>

      {/* 2. Main Desk Presentation Area */}
      {viewMode === 'desk' && (
        <div className="flex-1 w-full max-w-[1700px] mx-auto p-3 sm:p-6 lg:p-8 flex flex-col justify-center">
          {/* Desk Space Container */}
          <div className="relative w-full">
            {/* Soft Studio Ambient Wall Lighting Effect */}
            <div className="absolute inset-0 -top-12 bg-radial from-teal-400/15 via-transparent to-transparent blur-3xl pointer-events-none" />

            {/* Devices Row: Left Desktop Monitor + Right Angled Laptop */}
            <div className="grid grid-cols-1 xl:grid-cols-12 gap-6 lg:gap-8 items-end justify-center">
              
              {/* ==============================================================
                  LEFT DEVICE: DESKTOP MONITOR (Landing Page)
                  ============================================================== */}
              <div className="xl:col-span-7 flex flex-col items-center">
                {/* Desktop Screen Bezel & Enclosure */}
                <div className="relative w-full max-w-4xl bg-slate-900 rounded-[28px] p-3 sm:p-4 shadow-2xl shadow-slate-950/30 border-4 border-slate-700/80">
                  {/* Top Bezel: Camera dot & ambient light sensor */}
                  <div className="absolute top-1.5 left-1/2 -translate-x-1/2 flex items-center gap-1.5">
                    <div className="w-1.5 h-1.5 rounded-full bg-teal-500/80 animate-pulse" />
                    <div className="w-2.5 h-2.5 rounded-full bg-slate-950 border border-slate-700 flex items-center justify-center">
                      <div className="w-1 h-1 rounded-full bg-cyan-900" />
                    </div>
                  </div>

                  {/* Quick Expand Button on Monitor */}
                  <button
                    onClick={() => setViewMode('monitor')}
                    className="absolute top-2.5 right-4 z-30 bg-slate-800/80 hover:bg-slate-700 text-white p-1.5 rounded-lg backdrop-blur-md transition-transform hover:scale-105 flex items-center gap-1 text-[10px] font-bold"
                    title="Perbesar Layar Monitor Penuh"
                  >
                    <Maximize2 className="w-3 h-3" />
                    <span>Perbesar Monitor</span>
                  </button>

                  {/* Screen Glass Reflection & Display Canvas */}
                  <div className="relative rounded-2xl overflow-hidden shadow-inner bg-white h-[580px] sm:h-[640px] flex flex-col border border-slate-300/40">
                    {/* Subtle glass glare */}
                    <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-bl from-white/15 to-transparent pointer-events-none z-20" />
                    
                    {/* Actual Landing Page Content */}
                    <DesktopMonitorScreen
                      isElderMode={isElderMode}
                      setIsElderMode={setIsElderMode}
                      onOpenAmbulance={onOpenAmbulance}
                      onOpenIdCard={onOpenIdCard}
                      onOpenConsultation={onOpenConsultation}
                      onOpenBooking={(doc) => onOpenBooking(undefined, undefined, doc)}
                      onSwitchToLaptop={() => setViewMode('laptop')}
                    />
                  </div>

                  {/* Bottom Metallic Chin of Monitor */}
                  <div className="mt-2.5 flex items-center justify-center">
                    <div className="flex items-center gap-1.5 text-slate-400 font-bold text-[10px] tracking-widest uppercase">
                      <div className="w-2 h-2 rounded-full bg-teal-500" />
                      <span>RS Muhammad Ali Pro Display 32"</span>
                    </div>
                  </div>
                </div>

                {/* Sturdy Monitor Stand */}
                <div className="flex flex-col items-center -mt-1 relative z-0 select-none pointer-events-none">
                  {/* Vertical Column with Cable Pass-through Hole */}
                  <div className="w-16 sm:w-20 h-20 sm:h-24 bg-gradient-to-r from-slate-400 via-slate-300 to-slate-400 rounded-sm shadow-md border-x border-slate-400/60 flex items-center justify-center">
                    <div className="w-6 h-10 bg-slate-700/90 rounded-full border border-slate-500/50 shadow-inner" />
                  </div>
                  {/* Heavy Metal Base Plate resting on desk */}
                  <div className="w-56 sm:w-64 h-3.5 bg-gradient-to-r from-slate-300 via-slate-200 to-slate-400 rounded-t-xl rounded-b-md shadow-lg border-t border-slate-100" />
                  {/* Shadow on Desk */}
                  <div className="w-64 sm:w-72 h-4 bg-slate-950/35 rounded-full blur-md -mt-1" />
                </div>

                {/* Desktop Keyboard & Mouse on Desk Pad */}
                <DesktopKeyboardMouse />
              </div>

              {/* ==============================================================
                  RIGHT DEVICE: LAPTOP (Doctor Profile & Booking)
                  ============================================================== */}
              <div className="xl:col-span-5 flex flex-col items-center xl:items-start relative">
                {/* Desk Props positioned in the scene */}
                <div className="absolute -top-10 right-0 sm:right-6 flex items-end gap-5 z-10 pointer-events-auto">
                  <PottedPlant />
                  <DeskNotebook onOpenNotes={() => setShowNotesModal(true)} />
                </div>

                {/* Laptop Chassis Wrapper with subtle 3D tilt perspective */}
                <div className="w-full max-w-2xl transform xl:-rotate-1 xl:scale-95 transition-transform duration-300">
                  {/* Laptop Screen Lid */}
                  <div className="relative bg-slate-900 rounded-t-[20px] p-2.5 sm:p-3 border-3 border-slate-700 shadow-2xl shadow-slate-950/40">
                    {/* Top Bezel Webcam */}
                    <div className="flex items-center justify-center pb-1">
                      <div className="w-2 h-2 rounded-full bg-slate-950 border border-slate-700 flex items-center justify-center">
                        <div className="w-0.5 h-0.5 rounded-full bg-teal-400" />
                      </div>
                    </div>

                    {/* Quick Expand Button on Laptop */}
                    <button
                      onClick={() => setViewMode('laptop')}
                      className="absolute top-2.5 right-4 z-30 bg-slate-800/80 hover:bg-slate-700 text-white p-1.5 rounded-lg backdrop-blur-md transition-transform hover:scale-105 flex items-center gap-1 text-[10px] font-bold"
                      title="Perbesar Layar Laptop Penuh"
                    >
                      <Maximize2 className="w-3 h-3" />
                      <span>Perbesar Laptop</span>
                    </button>

                    {/* Laptop Screen Content Canvas */}
                    <div className="relative rounded-xl overflow-hidden bg-white h-[500px] sm:h-[540px] flex flex-col border border-slate-300/40">
                      {/* Doctor Profile & Booking Screen */}
                      <LaptopScreen
                        isElderMode={isElderMode}
                        setIsElderMode={setIsElderMode}
                        onOpenBooking={onOpenBooking}
                        onOpenConsultation={onOpenConsultation}
                        onOpenIdCard={onOpenIdCard}
                      />
                    </div>
                  </div>

                  {/* Laptop Hinge & Lower Keyboard Deck */}
                  <div className="relative bg-gradient-to-b from-slate-300 via-slate-200 to-slate-400 h-16 sm:h-20 rounded-b-3xl border-t border-slate-300 shadow-xl border-x-2 border-b-2 border-slate-400 flex flex-col items-center justify-between p-2">
                    {/* Keyboard indentation texture */}
                    <div className="w-4/5 h-6 bg-slate-400/40 rounded-lg border border-slate-300/60 flex items-center justify-center gap-1">
                      <div className="w-1/3 h-2 bg-slate-200 rounded-xs" />
                      <div className="w-1/4 h-2 bg-slate-200 rounded-xs" />
                    </div>

                    {/* Laptop Trackpad */}
                    <div className="w-24 h-6 sm:h-8 bg-slate-200/90 rounded-md border border-slate-400/50 shadow-inner" />
                  </div>

                  {/* Laptop Shadow on Desk */}
                  <div className="w-full h-5 bg-slate-950/30 rounded-full blur-md -mt-1 mx-auto" />
                </div>
              </div>

            </div>

            {/* 3. Desk Matte Surface Base */}
            <div className="relative mt-4 w-full h-14 sm:h-18 bg-gradient-to-b from-slate-200 via-slate-300 to-stone-400 rounded-t-3xl border-t-2 border-white/60 shadow-2xl flex items-center justify-between px-6 text-slate-600 text-xs">
              <div className="flex items-center gap-2">
                <Coffee className="w-4 h-4 text-teal-700" />
                <span className="font-semibold hidden sm:inline">Meja Konsultasi Dokter RS Muhammad Ali</span>
              </div>
              <div className="text-[11px] text-slate-500 font-medium">
                Peduli Bersama • Desain Inklusif, ID Card Dokter Terverifikasi & Ramah Lansia
              </div>
            </div>
          </div>
        </div>
      )}

      {/* View Mode: Full Desktop Monitor View */}
      {viewMode === 'monitor' && (
        <div className="flex-1 w-full max-w-7xl mx-auto p-2 sm:p-4 animate-in fade-in flex flex-col">
          <div className="bg-white rounded-3xl shadow-2xl border-4 border-slate-700 overflow-hidden flex-1 min-h-[85vh] flex flex-col">
            <div className="bg-slate-900 px-4 py-2 text-white flex items-center justify-between text-xs">
              <div className="flex items-center gap-2">
                <Monitor className="w-4 h-4 text-teal-400" />
                <span className="font-bold">Tampilan Penuh Layar Monitor (Landing Page RS Muhammad Ali)</span>
              </div>
              <button
                onClick={() => setViewMode('desk')}
                className="bg-slate-800 hover:bg-slate-700 px-3 py-1 rounded-lg text-[11px] font-bold flex items-center gap-1 transition-colors"
              >
                <RotateCcw className="w-3 h-3" />
                <span>Kembali ke Setup Meja</span>
              </button>
            </div>
            <div className="flex-1 overflow-y-auto">
              <DesktopMonitorScreen
                isElderMode={isElderMode}
                setIsElderMode={setIsElderMode}
                onOpenAmbulance={onOpenAmbulance}
                onOpenIdCard={onOpenIdCard}
                onOpenConsultation={onOpenConsultation}
                onOpenBooking={(doc) => onOpenBooking(undefined, undefined, doc)}
                onSwitchToLaptop={() => setViewMode('laptop')}
              />
            </div>
          </div>
        </div>
      )}

      {/* View Mode: Full Laptop View */}
      {viewMode === 'laptop' && (
        <div className="flex-1 w-full max-w-5xl mx-auto p-2 sm:p-4 animate-in fade-in flex flex-col">
          <div className="bg-white rounded-3xl shadow-2xl border-4 border-teal-800 overflow-hidden flex-1 min-h-[85vh] flex flex-col">
            <div className="bg-teal-900 px-4 py-2 text-white flex items-center justify-between text-xs">
              <div className="flex items-center gap-2">
                <LaptopIcon className="w-4 h-4 text-teal-300" />
                <span className="font-bold">Tampilan Penuh Layar Laptop (Profil & Reservasi Dokter)</span>
              </div>
              <button
                onClick={() => setViewMode('desk')}
                className="bg-teal-800 hover:bg-teal-700 px-3 py-1 rounded-lg text-[11px] font-bold flex items-center gap-1 transition-colors"
              >
                <RotateCcw className="w-3 h-3" />
                <span>Kembali ke Setup Meja</span>
              </button>
            </div>
            <div className="flex-1 overflow-y-auto">
              <LaptopScreen
                isElderMode={isElderMode}
                setIsElderMode={setIsElderMode}
                onOpenBooking={onOpenBooking}
                onOpenConsultation={onOpenConsultation}
                onOpenIdCard={onOpenIdCard}
              />
            </div>
          </div>
        </div>
      )}

      {/* Interactive Notes Modal (from notebook on desk) */}
      {showNotesModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-xs">
          <div className="bg-white rounded-3xl p-6 max-w-md w-full shadow-2xl border-2 border-teal-500">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h3 className="font-black text-teal-800 text-lg">Catatan Agenda Meja Medis</h3>
              <button
                onClick={() => setShowNotesModal(false)}
                className="text-slate-400 hover:text-slate-600 font-bold"
              >
                ✕
              </button>
            </div>
            <div className="py-4 space-y-3 text-xs text-slate-700">
              <div className="bg-teal-50 p-3 rounded-2xl border border-teal-200">
                <span className="font-bold text-teal-900 block mb-1">Daftar ID Card Dokter RS Muhammad Ali:</span>
                <p>• dr. Sarah Anindita, Sp.A (Anak) - ID: DS-9012</p>
                <p>• dr. Muhammad Ali, Sp.JP(K) (Jantung) - ID: DJ-1001</p>
                <p>• dr. Farhan Ramadhan, Sp.B (Bedah) - ID: DB-3412</p>
                <p>• dr. Maya Kusuma, Sp.OG (Kandungan) - ID: DO-5521</p>
                <p>• dr. Rian Pratama, Sp.PD (Penyakit Dalam) - ID: DP-7788</p>
              </div>
              <div className="bg-slate-50 p-3 rounded-2xl border border-slate-200">
                <span className="font-bold text-slate-900 block mb-1">Protokol Lansia:</span>
                <p>• Kursi roda gratis tersedia di lobby utama drop-off.</p>
                <p>• Petugas perawat siaga mendampingi dari pendaftaran hingga poli.</p>
              </div>
            </div>
            <button
              onClick={() => setShowNotesModal(false)}
              className="w-full py-2.5 bg-teal-700 hover:bg-teal-800 text-white font-bold rounded-xl text-xs transition-colors"
            >
              Tutup Catatan
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
