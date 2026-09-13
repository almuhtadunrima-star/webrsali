import React from 'react';
import { X, Calendar, Clock, CheckCircle2, QrCode, MapPin, Printer, Share2, User, ShieldCheck } from 'lucide-react';
import { Doctor } from '../types';
import { DOCTORS_DATA } from '../data/doctors';

interface BookingConfirmModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedDate: string;
  selectedTime: string;
  doctor?: Doctor;
  doctorName?: string;
  doctorSpecialty?: string;
  isElderMode: boolean;
}

export const BookingConfirmModal: React.FC<BookingConfirmModalProps> = ({
  isOpen,
  onClose,
  selectedDate,
  selectedTime,
  doctor,
  doctorName,
  doctorSpecialty,
  isElderMode,
}) => {
  if (!isOpen) return null;

  const currentDoctor = doctor || DOCTORS_DATA.find(d => d.name === doctorName) || DOCTORS_DATA[0];
  const activeName = currentDoctor.name;
  const activeSpecialty = currentDoctor.specialty;
  const activeBranch = currentDoctor.hospitalBranch;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-in fade-in">
      <div className="relative w-full max-w-lg bg-white rounded-3xl shadow-2xl overflow-hidden border border-slate-200">
        {/* Header */}
        <div className="bg-gradient-to-r from-emerald-600 to-teal-700 p-5 text-white flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-white/20 flex items-center justify-center">
              <CheckCircle2 className="w-6 h-6 text-white" />
            </div>
            <div>
              <h3 className="font-extrabold text-xl">Reservasi Terkonfirmasi!</h3>
              <p className="text-xs text-emerald-100">RS Muhammad Ali • Tiket Antrean & Janji Temu Dokter</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-full hover:bg-white/10 text-white transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Ticket Content */}
        <div className="p-6 space-y-4">
          {/* Ticket Card */}
          <div className="border-2 border-dashed border-teal-300 bg-gradient-to-b from-teal-50/50 to-white rounded-2xl p-5 relative overflow-hidden">
            {/* Cutout notches */}
            <div className="absolute -left-3 top-1/2 -translate-y-1/2 w-6 h-6 bg-white rounded-full border-r border-teal-300" />
            <div className="absolute -right-3 top-1/2 -translate-y-1/2 w-6 h-6 bg-white rounded-full border-l border-teal-300" />

            <div className="flex items-start justify-between gap-3">
              <div className="flex items-center gap-3">
                <img
                  src={currentDoctor.imageUrl}
                  alt={activeName}
                  className="w-14 h-14 rounded-xl object-cover border-2 border-teal-500 shadow-xs"
                />
                <div>
                  <div className="flex items-center gap-1.5">
                    <span className="text-[10px] font-extrabold uppercase tracking-wider text-teal-700 bg-teal-100 px-2 py-0.5 rounded-md">
                      ID: {currentDoctor.id}
                    </span>
                    <span className="text-[10px] font-bold text-amber-600">
                      ★ {currentDoctor.rating.toFixed(1)}
                    </span>
                  </div>
                  <h4 className="font-extrabold text-base text-slate-800 mt-1">{activeName}</h4>
                  <p className="text-xs text-slate-500 font-medium">{activeSpecialty}</p>
                </div>
              </div>
              <div className="text-right shrink-0">
                <span className="text-[10px] text-slate-400 font-semibold block">NO. ANTREAN</span>
                <span className="text-3xl font-black text-teal-700 tracking-tight">A-14</span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3 mt-4 pt-4 border-t border-slate-200/80 text-xs">
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4 text-teal-600" />
                <div>
                  <span className="text-[10px] text-slate-400 block">Hari & Tanggal</span>
                  <span className="font-bold text-slate-700">{selectedDate}</span>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-teal-600" />
                <div>
                  <span className="text-[10px] text-slate-400 block">Perkiraan Waktu</span>
                  <span className="font-bold text-slate-700">{selectedTime} WIB</span>
                </div>
              </div>
            </div>

            <div className="mt-3 flex items-center gap-2 text-xs text-slate-600 bg-slate-100/80 p-2.5 rounded-xl">
              <MapPin className="w-4 h-4 text-rose-500 shrink-0" />
              <span>{activeBranch} • RS Muhammad Ali</span>
            </div>

            {/* QR Barcode */}
            <div className="mt-4 pt-4 border-t border-dashed border-slate-300 flex items-center justify-between">
              <div className="text-xs text-slate-500">
                <p className="font-bold text-slate-700">Tunjukkan barcode ini</p>
                <p className="text-[11px]">pada kiosk pendaftaran mandiri RS Muhammad Ali</p>
              </div>
              <div className="bg-white p-1 rounded-xl shadow-xs border border-slate-200">
                <QrCode className="w-12 h-12 text-slate-800" />
              </div>
            </div>
          </div>

          <div className="bg-amber-50 border border-amber-200 rounded-xl p-3 text-xs text-amber-800">
            <strong>Catatan Penting:</strong> Harap hadir 15 menit sebelum estimasi waktu pemeriksaan. Konfirmasi notifikasi WhatsApp telah dikirimkan ke nomor ponsel terdaftar.
          </div>

          {/* Action buttons */}
          <div className="flex items-center gap-2 pt-2">
            <button
              onClick={() => alert('Tiket antrean berhasil dikirim ke printer!')}
              className="flex-1 py-3 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold rounded-xl flex items-center justify-center gap-1.5 text-xs transition-colors"
            >
              <Printer className="w-4 h-4" />
              <span>Cetak Tiket</span>
            </button>
            <button
              onClick={() => alert('Link tiket antrean berhasil disalin untuk dibagikan via WhatsApp.')}
              className="flex-1 py-3 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold rounded-xl flex items-center justify-center gap-1.5 text-xs transition-colors"
            >
              <Share2 className="w-4 h-4" />
              <span>Bagikan WA</span>
            </button>
            <button
              onClick={onClose}
              className="flex-1 py-3 bg-teal-600 hover:bg-teal-700 text-white font-bold rounded-xl text-xs transition-colors shadow-md"
            >
              Selesai
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
