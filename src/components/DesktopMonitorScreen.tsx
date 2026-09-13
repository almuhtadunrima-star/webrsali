import React, { useState } from 'react';
import {
  Heart,
  Search,
  ChevronDown,
  Phone,
  Calendar,
  MessageCircle,
  CreditCard,
  PhoneCall,
  UserCheck,
  Clock,
  Bed,
  ArrowRight,
  Shield,
  Activity,
  CheckCircle,
  X,
  Stethoscope,
  Star,
  QrCode
} from 'lucide-react';
import { DOCTORS_DATA } from '../data/doctors';
import { Doctor } from '../types';

interface DesktopMonitorScreenProps {
  isElderMode: boolean;
  setIsElderMode: React.Dispatch<React.SetStateAction<boolean>>;
  onOpenAmbulance: () => void;
  onOpenIdCard: (doctor?: Doctor) => void;
  onOpenConsultation: (doctor?: Doctor) => void;
  onOpenBooking: (doctor?: Doctor) => void;
  onSwitchToLaptop?: () => void;
}

export const DesktopMonitorScreen: React.FC<DesktopMonitorScreenProps> = ({
  isElderMode,
  setIsElderMode,
  onOpenAmbulance,
  onOpenIdCard,
  onOpenConsultation,
  onOpenBooking,
  onSwitchToLaptop,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [showLayananMenu, setShowLayananMenu] = useState(false);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [authMode, setAuthMode] = useState<'login' | 'register'>('login');
  const [selectedFeatureTab, setSelectedFeatureTab] = useState<'dokter' | 'jadwal' | 'kamar'>('dokter');

  // Filter doctors by search query
  const filteredDoctors = DOCTORS_DATA.filter((doc) => {
    const q = searchQuery.toLowerCase();
    return (
      doc.name.toLowerCase().includes(q) ||
      doc.specialty.toLowerCase().includes(q) ||
      doc.id.toLowerCase().includes(q)
    );
  });

  return (
    <div 
      className={`w-full h-full bg-slate-50 text-slate-800 flex flex-col select-none transition-all duration-300 font-sans overflow-y-auto ${
        isElderMode ? 'elder-mode text-lg' : 'text-sm'
      }`}
    >
      {/* 1. Top Accessibility Notification Banner (when elder mode is on) */}
      {isElderMode && (
        <div className="bg-emerald-700 text-white px-4 py-1.5 text-xs sm:text-sm font-bold flex items-center justify-between shadow-xs">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-lime-300 animate-ping" />
            <span>Mode Lansia Aktif: Huruf diperbesar, tombol kontras tinggi, dan navigasi dipermudah.</span>
          </div>
          <button 
            onClick={() => setIsElderMode(false)}
            className="underline hover:text-emerald-200 text-xs font-semibold"
          >
            Matikan
          </button>
        </div>
      )}

      {/* 2. Main Desktop Header */}
      <header className="bg-white border-b border-slate-200 px-4 lg:px-6 py-3 sticky top-0 z-30 shadow-xs">
        <div className="flex items-center justify-between gap-2 lg:gap-4 flex-wrap">
          {/* Brand Logo with Heart & Cross Icon */}
          <div className="flex items-center gap-2.5 shrink-0">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-teal-600 to-emerald-500 flex items-center justify-center shadow-md shadow-teal-500/20 text-white relative">
              <Heart className="w-6 h-6 fill-white text-white" />
              {/* Medical cross inside */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-3.5 h-1 bg-teal-800 rounded-full" />
                <div className="w-1 h-3.5 bg-teal-800 rounded-full absolute" />
              </div>
            </div>
            <div>
              <div className={`font-black tracking-tight text-slate-900 leading-none ${isElderMode ? 'text-xl' : 'text-lg'}`}>
                RS Muhammad Ali
              </div>
              <div className="text-[10px] text-teal-700 font-bold uppercase tracking-wider">
                Peduli Bersama
              </div>
            </div>
          </div>

          {/* Search Bar */}
          <div className="flex-1 max-w-xs xl:max-w-sm hidden md:block">
            <div className="relative">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Cari dokter, ID Card, poli spesialis..."
                className={`w-full pl-9 pr-3 py-2 bg-slate-100/90 border border-slate-200 rounded-xl text-xs placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:bg-white transition-all ${
                  isElderMode ? 'text-sm py-2.5 pl-10' : ''
                }`}
              />
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            </div>
          </div>

          {/* Navigation Links */}
          <nav className="hidden xl:flex items-center gap-4 text-xs font-semibold text-slate-600">
            {/* Layanan with Dropdown */}
            <div className="relative">
              <button
                onClick={() => setShowLayananMenu(!showLayananMenu)}
                className="flex items-center gap-1 hover:text-teal-700 py-1 transition-colors"
              >
                <span>Layanan</span>
                <ChevronDown className="w-3.5 h-3.5" />
              </button>

              {showLayananMenu && (
                <div className="absolute top-full left-0 mt-2 w-48 bg-white rounded-2xl shadow-xl border border-slate-200 p-2 z-40 animate-in fade-in">
                  <button 
                    onClick={() => { setShowLayananMenu(false); setSelectedFeatureTab('kamar'); }}
                    className="w-full text-left px-3 py-2 text-xs rounded-xl hover:bg-teal-50 hover:text-teal-700 font-medium"
                  >
                    Rawat Inap & ICU
                  </button>
                  <button 
                    onClick={() => { setShowLayananMenu(false); setSelectedFeatureTab('dokter'); }}
                    className="w-full text-left px-3 py-2 text-xs rounded-xl hover:bg-teal-50 hover:text-teal-700 font-medium"
                  >
                    Poliklinik & ID Dokter
                  </button>
                  <button 
                    onClick={() => { setShowLayananMenu(false); onOpenAmbulance(); }}
                    className="w-full text-left px-3 py-2 text-xs rounded-xl hover:bg-red-50 text-red-600 font-medium"
                  >
                    IGD 24 Jam & Ambulans
                  </button>
                  <button 
                    onClick={() => { setShowLayananMenu(false); onOpenConsultation(); }}
                    className="w-full text-left px-3 py-2 text-xs rounded-xl hover:bg-teal-50 hover:text-teal-700 font-medium"
                  >
                    Telekonsultasi Online
                  </button>
                </div>
              )}
            </div>

            <button 
              onClick={() => setSelectedFeatureTab('dokter')} 
              className="hover:text-teal-700 transition-colors"
            >
              Cari Dokter & ID Card
            </button>
            <button 
              onClick={() => setSelectedFeatureTab('jadwal')} 
              className="hover:text-teal-700 transition-colors"
            >
              Jadwal
            </button>
            <a href="#artikel" className="hover:text-teal-700 transition-colors">Artikel</a>
            <a href="#kontak" className="hover:text-teal-700 transition-colors">Kontak</a>

            {/* Hospital Direct Phone */}
            <a
              href="tel:+62148517880"
              className="flex items-center gap-1 text-teal-700 font-bold bg-teal-50 px-2.5 py-1 rounded-lg border border-teal-200 hover:bg-teal-100 transition-colors ml-1"
            >
              <Phone className="w-3.5 h-3.5" />
              <span>+621 4851-7880</span>
            </a>
          </nav>

          {/* Top-Right Controls: Mode Lansia Toggle & Daftar/Masuk Button */}
          <div className="flex items-center gap-3 shrink-0">
            {/* Prominent Green Toggle Switch for Mode Lansia / Teks Besar */}
            <div className="flex items-center gap-2 bg-emerald-50 border border-emerald-300/80 px-2.5 py-1 rounded-xl shadow-xs">
              <label 
                htmlFor="elder-toggle-monitor"
                className="text-[11px] sm:text-xs font-bold text-emerald-900 cursor-pointer flex items-center gap-1 select-none"
              >
                <span>Mode Lansia / Teks Besar</span>
              </label>
              <button
                id="elder-toggle-monitor"
                role="switch"
                aria-checked={isElderMode}
                onClick={() => setIsElderMode(!isElderMode)}
                className={`w-11 h-6 flex items-center rounded-full p-1 transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-emerald-500 ${
                  isElderMode ? 'bg-emerald-600' : 'bg-slate-300'
                }`}
                title="Beralih antara tampilan normal dan mode lansia teks besar"
              >
                <div
                  className={`bg-white w-4 h-4 rounded-full shadow-md transform transition-transform duration-200 ease-in-out ${
                    isElderMode ? 'translate-x-5' : 'translate-x-0'
                  }`}
                />
              </button>
            </div>

            {/* Blue "Daftar / Masuk" Button */}
            <button
              onClick={() => setShowAuthModal(true)}
              className={`bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white font-bold rounded-xl shadow-md shadow-blue-500/20 hover:shadow-lg transition-all ${
                isElderMode ? 'px-4 py-2 text-sm' : 'px-3.5 py-1.5 text-xs'
              }`}
            >
              Daftar / Masuk
            </button>
          </div>
        </div>
      </header>

      {/* 3. Hero Section */}
      <section className="px-4 lg:px-6 py-5 bg-gradient-to-b from-teal-50/70 via-sky-50/40 to-white border-b border-slate-100">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-stretch">
          {/* Left Column: Stacked High-Contrast Button Cards */}
          <div className="lg:col-span-4 flex flex-col justify-center space-y-3">
            {/* Orange "Buat Janji Temu" (with a calendar icon) */}
            <button
              onClick={() => {
                if (onSwitchToLaptop) onSwitchToLaptop();
                onOpenBooking();
              }}
              className={`group w-full text-left bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white rounded-2xl p-4 shadow-lg shadow-orange-500/20 border-2 border-orange-400 hover:border-orange-300 transition-all transform active:scale-[0.98] ${
                isElderMode ? 'p-5' : 'p-3.5'
              }`}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-xl bg-white/20 backdrop-blur-md flex items-center justify-center text-white border border-white/30 shrink-0">
                    <Calendar className="w-7 h-7 stroke-[2.5]" />
                  </div>
                  <div>
                    <h3 className={`font-black tracking-wide text-white leading-tight ${isElderMode ? 'text-xl' : 'text-base'}`}>
                      Buat Janji Temu
                    </h3>
                    <p className={`text-orange-100 font-medium ${isElderMode ? 'text-sm' : 'text-xs'}`}>
                      Pilih dokter spesialis & tanggal kontrol
                    </p>
                  </div>
                </div>
                <ArrowRight className="w-5 h-5 text-white opacity-80 group-hover:translate-x-1 transition-transform shrink-0" />
              </div>
            </button>

            {/* Teal "Konsul Dokter Online" (with chat icon) */}
            <button
              onClick={() => onOpenConsultation()}
              className={`group w-full text-left bg-gradient-to-r from-teal-600 to-emerald-600 hover:from-teal-700 hover:to-emerald-700 text-white rounded-2xl p-4 shadow-lg shadow-teal-600/20 border-2 border-teal-400 hover:border-teal-300 transition-all transform active:scale-[0.98] ${
                isElderMode ? 'p-5' : 'p-3.5'
              }`}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-xl bg-white/20 backdrop-blur-md flex items-center justify-center text-white border border-white/30 shrink-0">
                    <MessageCircle className="w-7 h-7 stroke-[2.5]" />
                  </div>
                  <div>
                    <h3 className={`font-black tracking-wide text-white leading-tight ${isElderMode ? 'text-xl' : 'text-base'}`}>
                      Konsul Dokter Online
                    </h3>
                    <p className={`text-teal-100 font-medium ${isElderMode ? 'text-sm' : 'text-xs'}`}>
                      Telemedisin via Chat & Video Call langsung
                    </p>
                  </div>
                </div>
                <ArrowRight className="w-5 h-5 text-white opacity-80 group-hover:translate-x-1 transition-transform shrink-0" />
              </div>
            </button>

            {/* Blue "Daftar ID Card Pasien / Dokter" (with an ID card icon) */}
            <button
              onClick={() => onOpenIdCard()}
              className={`group w-full text-left bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white rounded-2xl p-4 shadow-lg shadow-blue-600/20 border-2 border-blue-400 hover:border-blue-300 transition-all transform active:scale-[0.98] ${
                isElderMode ? 'p-5' : 'p-3.5'
              }`}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-xl bg-white/20 backdrop-blur-md flex items-center justify-center text-white border border-white/30 shrink-0">
                    <CreditCard className="w-7 h-7 stroke-[2.5]" />
                  </div>
                  <div>
                    <h3 className={`font-black tracking-wide text-white leading-tight ${isElderMode ? 'text-xl' : 'text-base'}`}>
                      Daftar ID Card Pasien / Dokter
                    </h3>
                    <p className={`text-blue-100 font-medium ${isElderMode ? 'text-sm' : 'text-xs'}`}>
                      Koleksi ID Card Dokter & Pasien Pintar SATUSEHAT
                    </p>
                  </div>
                </div>
                <ArrowRight className="w-5 h-5 text-white opacity-80 group-hover:translate-x-1 transition-transform shrink-0" />
              </div>
            </button>
          </div>

          {/* Center & Right Column: Bold Text & Medical Team Photo */}
          <div className="lg:col-span-8 bg-white rounded-3xl p-5 lg:p-6 border border-teal-100 shadow-sm flex flex-col md:flex-row items-center gap-6">
            {/* Text side */}
            <div className="flex-1">
              <div className="inline-flex items-center gap-1.5 bg-teal-100 text-teal-800 text-[11px] font-extrabold px-3 py-1 rounded-full mb-2">
                <Activity className="w-3.5 h-3.5 text-teal-600" />
                <span>Terakreditasi Paripurna KARS 2026</span>
              </div>
              <h1 className={`font-extrabold text-slate-900 tracking-tight leading-tight ${
                isElderMode ? 'text-2xl lg:text-3xl' : 'text-xl lg:text-2xl'
              }`}>
                Rumah Sakit Muhammad Ali: Pelayanan Ramah, Cepat, & Terpercaya
              </h1>
              <p className={`text-slate-600 mt-2 font-medium leading-relaxed ${isElderMode ? 'text-base' : 'text-sm'}`}>
                Peduli Bersama melayani seluruh lapisan masyarakat dengan dedikasi dokter spesialis terpercaya, ID Card digital resmi, dan fasilitas medis mutakhir.
              </p>

              {/* Trust badges */}
              <div className="grid grid-cols-3 gap-2 mt-4 pt-4 border-t border-slate-100 text-center">
                <div className="bg-slate-50 p-2 rounded-xl">
                  <div className="font-extrabold text-teal-700 text-sm">150+</div>
                  <div className="text-[10px] text-slate-500 font-medium">Dokter Ahli</div>
                </div>
                <div className="bg-slate-50 p-2 rounded-xl">
                  <div className="font-extrabold text-emerald-700 text-sm">24/7</div>
                  <div className="text-[10px] text-slate-500 font-medium">Siaga IGD</div>
                </div>
                <div className="bg-slate-50 p-2 rounded-xl">
                  <div className="font-extrabold text-blue-700 text-sm">BPJS</div>
                  <div className="text-[10px] text-slate-500 font-medium">& Asuransi</div>
                </div>
              </div>
            </div>

            {/* Medical Team Photo */}
            <div className="w-full md:w-64 lg:w-72 shrink-0">
              <div className="relative rounded-2xl overflow-hidden shadow-md border-2 border-teal-100 group">
                <img
                  src="https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&w=600&q=80"
                  alt="Tim Medis RS Muhammad Ali"
                  className="w-full h-48 md:h-56 object-cover object-center group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent flex items-end p-3 text-white">
                  <div>
                    <p className="text-xs font-bold leading-tight">dr. Muhammad Ali, Sp.JP(K) & Tim Medis</p>
                    <p className="text-[10px] text-teal-200">Peduli Bersama Melayani Anda</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Emergency Red Banner */}
      <section className="px-4 lg:px-6 py-2.5">
        <div className="bg-gradient-to-r from-red-600 via-rose-600 to-red-700 text-white rounded-2xl p-4 shadow-lg shadow-red-600/25 border-2 border-red-500 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-white/20 backdrop-blur-md flex items-center justify-center shrink-0 border border-white/30">
              <PhoneCall className="w-7 h-7 text-white animate-pulse" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-yellow-300 animate-ping" />
                <h2 className={`font-black tracking-wide text-white uppercase ${isElderMode ? 'text-xl' : 'text-base'}`}>
                  Gawat Darurat & Ambulans 24 Jam
                </h2>
              </div>
              <p className={`text-red-100 font-medium ${isElderMode ? 'text-sm' : 'text-xs'}`}>
                Hubungi sekarang untuk pertolongan cepat penanganan medis darurat & penjemputan pasien.
              </p>
            </div>
          </div>

          {/* Prominent Orange-Red Button */}
          <button
            onClick={onOpenAmbulance}
            className={`shrink-0 bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 active:scale-95 text-white font-extrabold rounded-xl shadow-md border-2 border-white/40 transition-all flex items-center gap-2 ${
              isElderMode ? 'px-6 py-3.5 text-base tracking-wide' : 'px-5 py-2.5 text-xs'
            }`}
          >
            <Phone className="w-4 h-4" />
            <span>Hubungi Ambulans (021-119)</span>
          </button>
        </div>
      </section>

      {/* 5. Bottom Section: "Fitur Unggulan" with Large Cards */}
      <section className="px-4 lg:px-6 py-4 flex-1">
        <div className="flex items-center justify-between mb-3">
          <h2 className={`font-black text-slate-900 tracking-tight ${isElderMode ? 'text-2xl' : 'text-lg'}`}>
            Fitur Unggulan & ID Card Dokter
          </h2>
          <span className="text-xs text-slate-500 font-medium">Akses Cepat Fasilitas & Layanan</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Card 1: "Cari Dokter" (Quick access, with a doctor icon) */}
          <div
            onClick={() => setSelectedFeatureTab('dokter')}
            className={`cursor-pointer group bg-white rounded-2xl p-4 border-2 transition-all shadow-sm hover:shadow-md ${
              selectedFeatureTab === 'dokter'
                ? 'border-teal-500 bg-teal-50/20 ring-2 ring-teal-500/20'
                : 'border-slate-200 hover:border-teal-400'
            }`}
          >
            <div className="flex items-start justify-between">
              <div className="w-12 h-12 rounded-xl bg-teal-100 text-teal-700 flex items-center justify-center group-hover:scale-110 transition-transform">
                <UserCheck className="w-7 h-7" />
              </div>
              <span className="bg-teal-50 text-teal-700 text-[10px] font-bold px-2 py-0.5 rounded-full border border-teal-200">
                {DOCTORS_DATA.length} Dokter Terdaftar
              </span>
            </div>
            <h3 className={`font-black text-slate-900 mt-3 group-hover:text-teal-700 transition-colors ${
              isElderMode ? 'text-xl' : 'text-base'
            }`}>
              Cari Dokter & ID Card
            </h3>
            <p className={`text-slate-500 mt-1 leading-snug ${isElderMode ? 'text-sm' : 'text-xs'}`}>
              Temukan profil dokter spesialis, kartu tanda pengenal digital resmi Kemenkes, rating, dan jadwal konsultasi.
            </p>
            <div className="mt-3 pt-3 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-teal-600">
              <span>Buka Koleksi ID Card ({DOCTORS_DATA.length} Dokter)</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </div>
          </div>

          {/* Card 2: "Jadwal Praktik" (Quick access, with calendar icon) */}
          <div
            onClick={() => {
              setSelectedFeatureTab('jadwal');
              if (onSwitchToLaptop) onSwitchToLaptop();
            }}
            className={`cursor-pointer group bg-white rounded-2xl p-4 border-2 transition-all shadow-sm hover:shadow-md ${
              selectedFeatureTab === 'jadwal'
                ? 'border-blue-500 bg-blue-50/20 ring-2 ring-blue-500/20'
                : 'border-slate-200 hover:border-blue-400'
            }`}
          >
            <div className="flex items-start justify-between">
              <div className="w-12 h-12 rounded-xl bg-blue-100 text-blue-700 flex items-center justify-center group-hover:scale-110 transition-transform">
                <Clock className="w-7 h-7" />
              </div>
              <span className="bg-blue-50 text-blue-700 text-[10px] font-bold px-2 py-0.5 rounded-full border border-blue-200">
                Quick Access
              </span>
            </div>
            <h3 className={`font-black text-slate-900 mt-3 group-hover:text-blue-700 transition-colors ${
              isElderMode ? 'text-xl' : 'text-base'
            }`}>
              Jadwal Praktik
            </h3>
            <p className={`text-slate-500 mt-1 leading-snug ${isElderMode ? 'text-sm' : 'text-xs'}`}>
              Informasi live jadwal harian dokter spesialis di RS Muhammad Ali, kuota antrean terkini, dan reservasi langsung.
            </p>
            <div className="mt-3 pt-3 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-blue-600">
              <span>Buka Kalender di Laptop</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </div>
          </div>

          {/* Card 3: "Fasilitas & Kamar" (Fasilitas & Kamar, with bed/room icon) */}
          <div
            onClick={() => setSelectedFeatureTab('kamar')}
            className={`cursor-pointer group bg-white rounded-2xl p-4 border-2 transition-all shadow-sm hover:shadow-md ${
              selectedFeatureTab === 'kamar'
                ? 'border-indigo-500 bg-indigo-50/20 ring-2 ring-indigo-500/20'
                : 'border-slate-200 hover:border-indigo-400'
            }`}
          >
            <div className="flex items-start justify-between">
              <div className="w-12 h-12 rounded-xl bg-indigo-100 text-indigo-700 flex items-center justify-center group-hover:scale-110 transition-transform">
                <Bed className="w-7 h-7" />
              </div>
              <span className="bg-indigo-50 text-indigo-700 text-[10px] font-bold px-2 py-0.5 rounded-full border border-indigo-200">
                Fasilitas & Kamar
              </span>
            </div>
            <h3 className={`font-black text-slate-900 mt-3 group-hover:text-indigo-700 transition-colors ${
              isElderMode ? 'text-xl' : 'text-base'
            }`}>
              Fasilitas & Kamar
            </h3>
            <p className={`text-slate-500 mt-1 leading-snug ${isElderMode ? 'text-sm' : 'text-xs'}`}>
              Ketersediaan tempat tidur rawat inap (VVIP, VIP, Kelas 1-3, ICU) diperbarui realtime secara transparan.
            </p>
            <div className="mt-3 pt-3 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-indigo-600">
              <span>Cek Sisa 28 Kamar</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </div>
          </div>
        </div>

        {/* Feature Tab Expanded: Doctor ID Cards Gallery */}
        {selectedFeatureTab === 'dokter' && (
          <div className="mt-4 bg-white rounded-2xl p-4 sm:p-5 border border-slate-200 shadow-sm animate-in fade-in">
            <div className="flex items-center justify-between mb-3">
              <div>
                <h4 className="font-extrabold text-sm sm:text-base text-slate-800 flex items-center gap-2">
                  <Stethoscope className="w-4 h-4 text-teal-600" />
                  <span>Daftar ID Card Dokter RS Muhammad Ali ({filteredDoctors.length})</span>
                </h4>
                <p className="text-xs text-slate-500">
                  Klik dokter untuk melihat ID Card lengkap atau membuat janji temu
                </p>
              </div>
              <button 
                onClick={() => onOpenIdCard()}
                className="text-xs font-bold bg-teal-50 text-teal-700 border border-teal-200 px-3 py-1 rounded-xl hover:bg-teal-100 transition-colors"
              >
                + Buka Semua ID Card
              </button>
            </div>

            {/* Doctors ID Card Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {filteredDoctors.map((doc) => (
                <div
                  key={doc.id}
                  className="bg-slate-50/80 rounded-2xl p-3 border border-slate-200 hover:border-teal-400 hover:shadow-md transition-all flex flex-col justify-between"
                >
                  <div className="flex items-start gap-3">
                    <img
                      src={doc.imageUrl}
                      alt={doc.name}
                      className="w-14 h-14 rounded-xl object-cover border-2 border-teal-500 shrink-0"
                    />
                    <div className="overflow-hidden">
                      <div className="flex items-center justify-between gap-1">
                        <span className="font-mono text-[10px] bg-teal-100 text-teal-800 px-1.5 py-0.2 rounded font-extrabold">
                          ID: {doc.id}
                        </span>
                        <div className="flex items-center text-[10px] font-bold text-amber-500">
                          <Star className="w-3 h-3 fill-amber-400 text-amber-400 mr-0.5" />
                          <span>{doc.rating.toFixed(1)}</span>
                        </div>
                      </div>
                      <h5 className="font-extrabold text-xs text-slate-900 mt-1 truncate">
                        {doc.name}
                      </h5>
                      <p className="text-[11px] text-teal-700 font-semibold truncate">
                        {doc.specialty}
                      </p>
                      <p className="text-[10px] text-slate-400 mt-0.5">
                        SIP: {doc.registrationNumber}
                      </p>
                    </div>
                  </div>

                  <div className="mt-3 pt-2.5 border-t border-slate-200/80 flex items-center justify-between gap-2">
                    <button
                      onClick={() => onOpenIdCard(doc)}
                      className="flex-1 py-1.5 px-2 bg-white hover:bg-teal-50 text-teal-800 border border-slate-200 hover:border-teal-300 font-bold text-[11px] rounded-lg flex items-center justify-center gap-1 transition-colors"
                    >
                      <QrCode className="w-3 h-3" />
                      <span>ID Card</span>
                    </button>
                    <button
                      onClick={() => {
                        if (onSwitchToLaptop) onSwitchToLaptop();
                        onOpenBooking(doc);
                      }}
                      className="flex-1 py-1.5 px-2 bg-teal-600 hover:bg-teal-700 text-white font-bold text-[11px] rounded-lg flex items-center justify-center gap-1 shadow-xs transition-colors"
                    >
                      <Calendar className="w-3 h-3" />
                      <span>Janji Temu</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Feature Tab Expanded: Kamar View */}
        {selectedFeatureTab === 'kamar' && (
          <div className="mt-4 bg-white rounded-2xl p-4 border border-slate-200 shadow-sm animate-in fade-in">
            <div className="flex items-center justify-between mb-3">
              <h4 className="font-extrabold text-sm text-slate-800 flex items-center gap-2">
                <Bed className="w-4 h-4 text-indigo-600" />
                <span>Ketersediaan Kamar Rawat Inap RS Muhammad Ali (Live SATUSEHAT)</span>
              </h4>
              <button 
                onClick={() => setSelectedFeatureTab('dokter')} 
                className="text-xs text-slate-400 hover:text-slate-600"
              >
                Tutup Panel
              </button>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
              <div className="bg-slate-50 p-3 rounded-xl border border-slate-200">
                <div className="text-slate-500 font-semibold">VVIP President</div>
                <div className="text-lg font-black text-emerald-600 mt-1">4 Kamar</div>
                <div className="text-[10px] text-slate-400">Tersedia dari 8</div>
              </div>
              <div className="bg-slate-50 p-3 rounded-xl border border-slate-200">
                <div className="text-slate-500 font-semibold">VIP Deluxe</div>
                <div className="text-lg font-black text-emerald-600 mt-1">9 Kamar</div>
                <div className="text-[10px] text-slate-400">Tersedia dari 20</div>
              </div>
              <div className="bg-slate-50 p-3 rounded-xl border border-slate-200">
                <div className="text-slate-500 font-semibold">Kelas 1 & 2</div>
                <div className="text-lg font-black text-amber-600 mt-1">12 Tempat Tidur</div>
                <div className="text-[10px] text-slate-400">Tersedia dari 45</div>
              </div>
              <div className="bg-slate-50 p-3 rounded-xl border border-slate-200">
                <div className="text-slate-500 font-semibold">ICU / NICU Medis</div>
                <div className="text-lg font-black text-rose-600 mt-1">3 Bed Siaga</div>
                <div className="text-[10px] text-slate-400">Siaga ventilator</div>
              </div>
            </div>
          </div>
        )}
      </section>

      {/* Footer minimal credit within screen */}
      <footer className="bg-slate-100 border-t border-slate-200 px-6 py-2.5 text-[11px] text-slate-500 flex items-center justify-between">
        <div>© 2026 RS Muhammad Ali • Peduli Bersama • Jalan Sudirman No. 88, Jakarta Pusat</div>
        <div className="flex items-center gap-3">
          <span>Jam Buka: 24 Jam Setiap Hari</span>
          <span>•</span>
          <span className="text-emerald-700 font-semibold">Server Online</span>
        </div>
      </footer>

      {/* Login / Register Dialog Modal */}
      {showAuthModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-xs">
          <div className="bg-white rounded-3xl p-6 max-w-sm w-full shadow-2xl border border-slate-200">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <h3 className="font-extrabold text-lg text-slate-900">
                {authMode === 'login' ? 'Masuk Akun Pasien' : 'Pendaftaran Akun Baru'}
              </h3>
              <button 
                onClick={() => setShowAuthModal(false)}
                className="p-1 rounded-full text-slate-400 hover:text-slate-600"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="py-4 space-y-3 text-xs">
              <div>
                <label className="block font-semibold text-slate-700 mb-1">Nomor Rekam Medis / NIK</label>
                <input 
                  type="text" 
                  placeholder="Contoh: 317105..." 
                  className="w-full p-2.5 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white"
                />
              </div>
              <div>
                <label className="block font-semibold text-slate-700 mb-1">Kata Sandi</label>
                <input 
                  type="password" 
                  placeholder="••••••••" 
                  className="w-full p-2.5 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white"
                />
              </div>
              <button 
                onClick={() => {
                  alert('Berhasil masuk sebagai Pasien RS Muhammad Ali.');
                  setShowAuthModal(false);
                }}
                className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl text-sm transition-all"
              >
                {authMode === 'login' ? 'Masuk Sekarang' : 'Daftar Sekarang'}
              </button>
            </div>
            <div className="text-center text-xs text-slate-500 pt-2 border-t border-slate-100">
              {authMode === 'login' ? (
                <span>Belum punya akun rekam medis? <button onClick={() => setAuthMode('register')} className="text-blue-600 font-bold underline">Daftar di sini</button></span>
              ) : (
                <span>Sudah punya akun? <button onClick={() => setAuthMode('login')} className="text-blue-600 font-bold underline">Masuk</button></span>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
