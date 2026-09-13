import React, { useState } from 'react';
import {
  Heart,
  Star,
  Calendar as CalendarIcon,
  Clock,
  CheckCircle2,
  AlertCircle,
  Video,
  UserCheck,
  ChevronLeft,
  ChevronRight,
  ShieldCheck,
  Award,
  Sparkles,
  Info,
  QrCode,
  Stethoscope,
  Users
} from 'lucide-react';
import { DOCTORS_DATA } from '../data/doctors';
import { Doctor } from '../types';

interface LaptopScreenProps {
  isElderMode: boolean;
  setIsElderMode: React.Dispatch<React.SetStateAction<boolean>>;
  onOpenBooking: (date: string, time: string, doctor?: Doctor) => void;
  onOpenConsultation: (doctor?: Doctor) => void;
  onOpenIdCard: (doctor?: Doctor) => void;
}

export const LaptopScreen: React.FC<LaptopScreenProps> = ({
  isElderMode,
  setIsElderMode,
  onOpenBooking,
  onOpenConsultation,
  onOpenIdCard,
}) => {
  // Selected doctor: defaults to dr. Sarah or dr. Muhammad Ali
  const [selectedDoctorIndex, setSelectedDoctorIndex] = useState<number>(0);
  const activeDoctor: Doctor = DOCTORS_DATA[selectedDoctorIndex] || DOCTORS_DATA[0];

  // Selected date state: defaults to 'Senin, 11 Juni'
  const [selectedDayIndex, setSelectedDayIndex] = useState<number>(0);
  const [selectedTimeSlot, setSelectedTimeSlot] = useState<string>('09:30 - 10:00');
  const [selectedCalendarDay, setSelectedCalendarDay] = useState<number>(11);

  // The 3 prominent date indicators as specified:
  // Senin 11 Juni (selected green), Selasa 12 Juni (red), Rabu 13 Juni (blue/grey)
  const quickDays = [
    {
      dayName: 'Senin',
      dateStr: '11 Juni',
      fullDate: 'Senin, 11 Juni 2026',
      status: 'available',
      quotaText: 'Tersedia (Sisa 8 Antrean)',
      colorType: 'green',
      available: true,
    },
    {
      dayName: 'Selasa',
      dateStr: '12 Juni',
      fullDate: 'Selasa, 12 Juni 2026',
      status: 'full',
      quotaText: 'Kuota Penuh / Tutup',
      colorType: 'red',
      available: false,
    },
    {
      dayName: 'Rabu',
      dateStr: '13 Juni',
      fullDate: 'Rabu, 13 Juni 2026',
      status: 'limited',
      quotaText: 'Sisa 3 Antrean Sore',
      colorType: 'blue',
      available: true,
    },
  ];

  // Calendar month days for Juni
  const daysInMonth = Array.from({ length: 30 }, (_, i) => i + 1);

  const timeSlots = [
    { id: '1', time: '09:00 - 09:30', period: 'Pagi', available: true },
    { id: '2', time: '09:30 - 10:00', period: 'Pagi', available: true },
    { id: '3', time: '10:30 - 11:00', period: 'Pagi', available: true },
    { id: '4', time: '13:30 - 14:00', period: 'Siang', available: true },
    { id: '5', time: '14:00 - 14:30', period: 'Siang', available: false },
    { id: '6', time: '16:30 - 17:00', period: 'Sore', available: true },
  ];

  const currentSelectedDateString = quickDays[selectedDayIndex]?.fullDate || `${selectedCalendarDay} Juni 2026`;

  return (
    <div
      className={`w-full h-full bg-slate-50 text-slate-800 flex flex-col select-none transition-all duration-300 font-sans overflow-y-auto ${
        isElderMode ? 'elder-mode text-base' : 'text-xs'
      }`}
    >
      {/* 1. Header matches main site, labeled "Profil & Jadwal Dokter" on top-left with Mode Lansia toggle on top-right */}
      <header className="bg-white border-b border-slate-200 px-4 py-2.5 sticky top-0 z-20 shadow-xs flex items-center justify-between gap-3">
        {/* Top-Left: Logo & "Profil & Jadwal Dokter" */}
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-xl bg-teal-600 flex items-center justify-center text-white shadow-sm shrink-0">
            <Heart className="w-4 h-4 fill-white" />
          </div>
          <div>
            <h1 className={`font-black tracking-tight text-slate-900 leading-tight ${isElderMode ? 'text-lg' : 'text-sm'}`}>
              Profil & Jadwal Dokter
            </h1>
            <p className="text-[10px] text-teal-700 font-semibold">
              RS Muhammad Ali • Peduli Bersama
            </p>
          </div>
        </div>

        {/* Top-Right: Mode Lansia / Teks Besar toggle */}
        <div className="flex items-center gap-2 bg-emerald-50 border border-emerald-300/80 px-2 py-1 rounded-xl">
          <label
            htmlFor="elder-toggle-laptop"
            className="text-[10px] sm:text-xs font-bold text-emerald-900 cursor-pointer select-none"
          >
            <span>Mode Lansia / Teks Besar</span>
          </label>
          <button
            id="elder-toggle-laptop"
            role="switch"
            aria-checked={isElderMode}
            onClick={() => setIsElderMode(!isElderMode)}
            className={`w-9 h-5 flex items-center rounded-full p-0.5 transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-emerald-500 ${
              isElderMode ? 'bg-emerald-600' : 'bg-slate-300'
            }`}
            title="Aktifkan mode tulisan besar untuk kemudahan membaca"
          >
            <div
              className={`bg-white w-4 h-4 rounded-full shadow-md transform transition-transform duration-200 ease-in-out ${
                isElderMode ? 'translate-x-4' : 'translate-x-0'
              }`}
            />
          </button>
        </div>
      </header>

      {/* Doctor ID Card Switcher Strip */}
      <div className="bg-slate-100/90 border-b border-slate-200 px-4 py-2 flex items-center gap-2 overflow-x-auto">
        <div className="flex items-center gap-1 text-[11px] font-extrabold text-teal-800 shrink-0 mr-1">
          <Users className="w-3.5 h-3.5 text-teal-600" />
          <span>Pilih Dokter:</span>
        </div>
        <div className="flex items-center gap-2">
          {DOCTORS_DATA.map((doc, idx) => {
            const isSelected = selectedDoctorIndex === idx;
            return (
              <button
                key={doc.id}
                type="button"
                onClick={() => setSelectedDoctorIndex(idx)}
                className={`flex items-center gap-1.5 px-2.5 py-1 rounded-xl border text-[11px] font-bold whitespace-nowrap transition-all ${
                  isSelected
                    ? 'bg-teal-600 text-white border-teal-600 shadow-xs scale-105'
                    : 'bg-white text-slate-700 border-slate-200 hover:border-teal-400 hover:bg-teal-50'
                }`}
              >
                <img
                  src={doc.imageUrl}
                  alt={doc.name}
                  className="w-4 h-4 rounded-full object-cover border border-white/60"
                />
                <span>{doc.name.split(',')[0]}</span>
                <span className={`text-[9px] px-1 py-0.2 rounded font-mono ${isSelected ? 'bg-teal-700 text-teal-100' : 'bg-slate-100 text-slate-500'}`}>
                  {doc.id}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* 2. Main Content Grid: Left Card (ID Card Dokter) & Right Section (Pilih Tanggal Janji Temu) */}
      <div className="p-3 sm:p-4 flex-1 grid grid-cols-1 lg:grid-cols-12 gap-4 items-start">
        {/* Left Column: Digital "ID CARD DOKTER" */}
        <div className="lg:col-span-5 flex flex-col space-y-3">
          {/* Digital ID Card */}
          <div 
            onClick={() => onOpenIdCard(activeDoctor)}
            className="cursor-pointer group relative bg-gradient-to-b from-white to-slate-50 rounded-3xl p-4 sm:p-5 border-2 border-teal-500/50 shadow-lg shadow-teal-900/5 hover:border-teal-500 transition-all"
          >
            {/* Top Badge of the ID Card */}
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div className="flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-teal-600" />
                <span className="font-extrabold text-[10px] tracking-wider text-slate-600 uppercase">
                  ID CARD DOKTER
                </span>
              </div>
              <span className="bg-teal-100 text-teal-800 font-extrabold text-[10px] px-2 py-0.5 rounded-md font-mono">
                ID: {activeDoctor.id}
              </span>
            </div>

            {/* Doctor Photo & Details */}
            <div className="mt-4 flex flex-col items-center text-center">
              {/* Photo Frame */}
              <div className="relative">
                <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-2xl overflow-hidden border-3 border-teal-500 shadow-md group-hover:scale-105 transition-transform duration-300">
                  <img
                    src={activeDoctor.imageUrl}
                    alt={activeDoctor.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                {/* Active status pip */}
                <div className="absolute -bottom-1 -right-1 bg-emerald-500 text-white p-1 rounded-full border-2 border-white shadow">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                </div>
              </div>

              {/* Doctor Name & Specialty */}
              <h2 className={`font-extrabold text-slate-900 mt-3 ${isElderMode ? 'text-xl' : 'text-base'}`}>
                {activeDoctor.name}
              </h2>
              <p className="text-teal-700 font-bold text-xs">
                ({activeDoctor.specialty})
              </p>
              {activeDoctor.subSpecialty && (
                <p className="text-[10px] text-slate-500 font-medium mt-0.5">
                  Subspesialis: {activeDoctor.subSpecialty}
                </p>
              )}

              {/* 5 Gold Stars Rating */}
              <div className="flex items-center justify-center gap-1 mt-2">
                {[1, 2, 3, 4, 5].map((s) => (
                  <Star key={s} className="w-4 h-4 text-amber-400 fill-amber-400 drop-shadow-xs" />
                ))}
                <span className="text-xs font-bold text-slate-700 ml-1">
                  {activeDoctor.rating.toFixed(1)} / 5.0
                </span>
              </div>
              <span className="text-[10px] text-slate-400 font-medium">
                {activeDoctor.reviewCount}+ Ulasan Pasien Terverifikasi
              </span>

              {/* Doctor Quick Credentials */}
              <div className="w-full mt-3 pt-3 border-t border-slate-100 grid grid-cols-2 gap-2 text-left text-[11px]">
                <div className="bg-slate-100/70 p-2 rounded-xl">
                  <span className="text-[10px] text-slate-400 block font-medium">Pengalaman</span>
                  <span className="font-bold text-slate-700">{activeDoctor.experienceYears}+ Tahun</span>
                </div>
                <div className="bg-slate-100/70 p-2 rounded-xl">
                  <span className="text-[10px] text-slate-400 block font-medium">Lokasi Praktik</span>
                  <span className="font-bold text-slate-700 truncate block">{activeDoctor.hospitalBranch}</span>
                </div>
              </div>

              {/* Blue "Virtual Booking" Label Underneath */}
              <div className="w-full mt-3">
                <div className="w-full py-2 bg-blue-600 text-white font-extrabold rounded-xl text-center text-xs tracking-wide shadow-md shadow-blue-500/20 flex items-center justify-center gap-1.5 uppercase">
                  <Video className="w-3.5 h-3.5" />
                  <span>Virtual Booking</span>
                </div>
              </div>
            </div>

            {/* Tap to flip hint */}
            <div className="mt-2 text-center text-[10px] text-slate-400 flex items-center justify-center gap-1">
              <QrCode className="w-3 h-3" />
              <span>Klik kartu untuk melihat QR & verifikasi SIP resmi</span>
            </div>
          </div>

          {/* Quick Doctor Notice */}
          <div className="bg-teal-50 border border-teal-200 rounded-2xl p-3 text-[11px] text-teal-900 leading-snug">
            <span className="font-bold">Fokus Praktik:</span> {activeDoctor.bio}
          </div>
        </div>

        {/* Right Column: "Pilih Tanggal Janji Temu" with Interactive Date Indicators & Calendar Grid */}
        <div className="lg:col-span-7 bg-white rounded-3xl p-4 sm:p-5 border border-slate-200 shadow-sm flex flex-col justify-between">
          <div>
            {/* Title Header */}
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <CalendarIcon className="w-5 h-5 text-teal-600" />
                <h3 className={`font-black text-slate-900 tracking-tight ${isElderMode ? 'text-xl' : 'text-base'}`}>
                  Pilih Tanggal Janji Temu
                </h3>
              </div>
              <span className="text-[11px] font-bold text-slate-400">Juni 2026</span>
            </div>

            {/* Large Interactive Date Indicators:
                Senin 11 Juni (selected green)
                Selasa 12 Juni (red)
                Rabu 13 Juni (blue/grey)
            */}
            <div className="grid grid-cols-3 gap-2 sm:gap-3 mb-4">
              {/* 1. Senin 11 Juni (Green) */}
              <button
                type="button"
                onClick={() => {
                  setSelectedDayIndex(0);
                  setSelectedCalendarDay(11);
                }}
                className={`p-3 rounded-2xl text-left border-2 transition-all relative overflow-hidden flex flex-col justify-between ${
                  selectedDayIndex === 0
                    ? 'bg-emerald-600 text-white border-emerald-500 shadow-lg shadow-emerald-600/30 scale-[1.02]'
                    : 'bg-emerald-50 text-emerald-950 border-emerald-300 hover:border-emerald-500'
                }`}
              >
                <div>
                  <div className={`text-[10px] sm:text-xs uppercase font-extrabold tracking-wider ${selectedDayIndex === 0 ? 'text-emerald-100' : 'text-emerald-700'}`}>
                    Senin
                  </div>
                  <div className={`font-black leading-none my-1 ${isElderMode ? 'text-2xl sm:text-3xl' : 'text-xl sm:text-2xl'}`}>
                    11 Juni
                  </div>
                </div>
                <div className={`text-[9px] sm:text-[10px] font-bold mt-1 ${selectedDayIndex === 0 ? 'text-emerald-100' : 'text-emerald-700'}`}>
                  ● Tersedia (8 Slot)
                </div>
              </button>

              {/* 2. Selasa 12 Juni (Red) */}
              <button
                type="button"
                onClick={() => {
                  setSelectedDayIndex(1);
                  setSelectedCalendarDay(12);
                }}
                className={`p-3 rounded-2xl text-left border-2 transition-all relative overflow-hidden flex flex-col justify-between ${
                  selectedDayIndex === 1
                    ? 'bg-red-600 text-white border-red-500 shadow-lg shadow-red-600/30 scale-[1.02]'
                    : 'bg-red-50 text-red-950 border-red-300 hover:border-red-500'
                }`}
              >
                <div>
                  <div className={`text-[10px] sm:text-xs uppercase font-extrabold tracking-wider ${selectedDayIndex === 1 ? 'text-red-100' : 'text-red-700'}`}>
                    Selasa
                  </div>
                  <div className={`font-black leading-none my-1 ${isElderMode ? 'text-2xl sm:text-3xl' : 'text-xl sm:text-2xl'}`}>
                    12 Juni
                  </div>
                </div>
                <div className={`text-[9px] sm:text-[10px] font-bold mt-1 ${selectedDayIndex === 1 ? 'text-red-100' : 'text-red-700'}`}>
                  ✕ Kuota Penuh
                </div>
              </button>

              {/* 3. Rabu 13 Juni (Blue/Grey) */}
              <button
                type="button"
                onClick={() => {
                  setSelectedDayIndex(2);
                  setSelectedCalendarDay(13);
                }}
                className={`p-3 rounded-2xl text-left border-2 transition-all relative overflow-hidden flex flex-col justify-between ${
                  selectedDayIndex === 2
                    ? 'bg-blue-600 text-white border-blue-500 shadow-lg shadow-blue-600/30 scale-[1.02]'
                    : 'bg-slate-100 text-slate-800 border-slate-300 hover:border-blue-400'
                }`}
              >
                <div>
                  <div className={`text-[10px] sm:text-xs uppercase font-extrabold tracking-wider ${selectedDayIndex === 2 ? 'text-blue-100' : 'text-slate-500'}`}>
                    Rabu
                  </div>
                  <div className={`font-black leading-none my-1 ${isElderMode ? 'text-2xl sm:text-3xl' : 'text-xl sm:text-2xl'}`}>
                    13 Juni
                  </div>
                </div>
                <div className={`text-[9px] sm:text-[10px] font-bold mt-1 ${selectedDayIndex === 2 ? 'text-blue-100' : 'text-slate-600'}`}>
                  ● Sisa 3 Antrean
                </div>
              </button>
            </div>

            {/* Full-Month Grid Calendar with Large, Easy-to-Read Numbers */}
            <div className="bg-slate-50 rounded-2xl p-3 sm:p-4 border border-slate-200">
              <div className="flex items-center justify-between mb-2">
                <span className="font-extrabold text-xs sm:text-sm text-slate-800">
                  Kalender Bulan Juni 2026
                </span>
                <div className="flex items-center gap-1 text-[11px] text-slate-500">
                  <span className="w-2 h-2 rounded-full bg-emerald-500" /> Ada Praktik
                  <span className="w-2 h-2 rounded-full bg-red-400 ml-2" /> Penuh
                </div>
              </div>

              {/* Day names */}
              <div className="grid grid-cols-7 gap-1 text-center font-bold text-[10px] sm:text-xs text-slate-400 mb-1">
                <span>Sen</span>
                <span>Sel</span>
                <span>Rab</span>
                <span>Kam</span>
                <span>Jum</span>
                <span>Sab</span>
                <span className="text-red-400">Min</span>
              </div>

              {/* Days grid with large easy-to-read numbers */}
              <div className="grid grid-cols-7 gap-1 sm:gap-1.5">
                {daysInMonth.map((day) => {
                  const isSelected = selectedCalendarDay === day;
                  const isHighlighted11 = day === 11;
                  const isHighlighted12 = day === 12;
                  const isHighlighted13 = day === 13;
                  const isSunday = day % 7 === 0;

                  return (
                    <button
                      key={day}
                      type="button"
                      onClick={() => {
                        setSelectedCalendarDay(day);
                        if (day === 11) setSelectedDayIndex(0);
                        else if (day === 12) setSelectedDayIndex(1);
                        else if (day === 13) setSelectedDayIndex(2);
                        else setSelectedDayIndex(-1);
                      }}
                      className={`relative aspect-square flex flex-col items-center justify-center rounded-xl font-bold transition-all ${
                        isElderMode ? 'text-base sm:text-lg' : 'text-xs sm:text-sm'
                      } ${
                        isSelected
                          ? 'bg-teal-600 text-white shadow-md ring-2 ring-teal-400 scale-105 z-10'
                          : isHighlighted11
                          ? 'bg-emerald-100 text-emerald-900 border border-emerald-300 font-extrabold'
                          : isHighlighted12
                          ? 'bg-red-100 text-red-900 border border-red-200'
                          : isHighlighted13
                          ? 'bg-blue-100 text-blue-900 border border-blue-200'
                          : isSunday
                          ? 'text-red-400 hover:bg-slate-200/60'
                          : 'text-slate-700 hover:bg-slate-200/80'
                      }`}
                    >
                      <span>{day}</span>
                      {isHighlighted11 && !isSelected && (
                        <span className="w-1 h-1 bg-emerald-600 rounded-full mt-0.5" />
                      )}
                      {isHighlighted12 && !isSelected && (
                        <span className="w-1 h-1 bg-red-500 rounded-full mt-0.5" />
                      )}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Time Slot Picker */}
            <div className="mt-3">
              <label className="block font-bold text-xs text-slate-700 mb-1.5 flex items-center justify-between">
                <span>Pilih Jam Konsultasi:</span>
                <span className="text-[10px] text-teal-700 font-semibold">
                  {currentSelectedDateString}
                </span>
              </label>

              {selectedDayIndex === 1 ? (
                <div className="bg-red-50 text-red-800 p-2.5 rounded-xl text-xs font-semibold flex items-center gap-2 border border-red-200">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  <span>Jadwal pada tanggal 12 Juni telah penuh. Silakan pilih 11 atau 13 Juni.</span>
                </div>
              ) : (
                <div className="grid grid-cols-3 gap-2 text-xs">
                  {timeSlots.map((slot) => (
                    <button
                      key={slot.id}
                      type="button"
                      disabled={!slot.available}
                      onClick={() => setSelectedTimeSlot(slot.time)}
                      className={`p-2 rounded-xl text-center border font-bold transition-all ${
                        !slot.available
                          ? 'bg-slate-100 text-slate-400 border-slate-200 cursor-not-allowed line-through'
                          : selectedTimeSlot === slot.time
                          ? 'bg-teal-700 text-white border-teal-800 shadow-xs'
                          : 'bg-white text-slate-700 border-slate-200 hover:border-teal-400'
                      }`}
                    >
                      <div>{slot.time}</div>
                      <div className={`text-[9px] font-normal ${selectedTimeSlot === slot.time ? 'text-teal-200' : 'text-slate-400'}`}>
                        {slot.period}
                      </div>
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* CTAs at the Bottom:
              Green button "Mulai Konsultasi Online"
              Blue button "Buat Janji Temu"
          */}
          <div className="mt-4 pt-3 border-t border-slate-200 grid grid-cols-1 sm:grid-cols-2 gap-3">
            {/* Green Button: Mulai Konsultasi Online */}
            <button
              type="button"
              onClick={() => onOpenConsultation(activeDoctor)}
              className={`w-full bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white font-extrabold rounded-2xl shadow-md shadow-emerald-600/20 active:scale-95 transition-all flex items-center justify-center gap-2 border-2 border-emerald-400/40 ${
                isElderMode ? 'py-4 text-base tracking-wide' : 'py-3 text-xs sm:text-sm'
              }`}
            >
              <Video className="w-4 h-4" />
              <span>Mulai Konsultasi Online</span>
            </button>

            {/* Blue Button: Buat Janji Temu */}
            <button
              type="button"
              onClick={() => onOpenBooking(currentSelectedDateString, selectedTimeSlot, activeDoctor)}
              className={`w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-extrabold rounded-2xl shadow-md shadow-blue-600/20 active:scale-95 transition-all flex items-center justify-center gap-2 border-2 border-blue-400/40 ${
                isElderMode ? 'py-4 text-base tracking-wide' : 'py-3 text-xs sm:text-sm'
              }`}
            >
              <CalendarIcon className="w-4 h-4" />
              <span>Buat Janji Temu</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
