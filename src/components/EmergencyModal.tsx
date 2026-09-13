import React, { useState } from 'react';
import { PhoneCall, AlertTriangle, MapPin, X, ShieldAlert, HeartPulse, Check } from 'lucide-react';

interface EmergencyModalProps {
  isOpen: boolean;
  onClose: () => void;
  isElderMode: boolean;
}

export const EmergencyModal: React.FC<EmergencyModalProps> = ({ isOpen, onClose, isElderMode }) => {
  const [called, setCalled] = useState(false);
  const [locationSent, setLocationSent] = useState(false);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-in fade-in">
      <div 
        className={`relative w-full max-w-lg bg-white rounded-3xl shadow-2xl border-4 border-red-500 overflow-hidden ${
          isElderMode ? 'text-lg p-6' : 'text-base p-6'
        }`}
      >
        {/* Top Emergency Indicator Bar */}
        <div className="bg-red-600 -mx-6 -mt-6 p-4 text-white flex items-center justify-between shadow-md">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-white animate-ping" />
            <ShieldAlert className="w-6 h-6 text-white" />
            <h2 className="font-extrabold tracking-wide text-lg sm:text-xl uppercase">
              Gawat Darurat & Ambulans 24 Jam
            </h2>
          </div>
          <button 
            onClick={onClose}
            aria-label="Tutup"
            className="p-1.5 rounded-full hover:bg-red-700 text-white transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Content */}
        <div className="mt-5 space-y-4">
          <div className="flex items-start gap-3 bg-red-50 p-4 rounded-2xl border border-red-200">
            <AlertTriangle className="w-8 h-8 text-red-600 shrink-0 mt-0.5" />
            <div>
              <h3 className={`font-bold text-red-900 ${isElderMode ? 'text-xl' : 'text-base'}`}>
                Unit Reaksi Cepat RS Peduli Sehat
              </h3>
              <p className={`text-red-700 leading-snug mt-1 ${isElderMode ? 'text-base' : 'text-sm'}`}>
                Armada ambulans medis dengan ventilator & paramedis tersertifikasi siap jemput pasien dalam radius 15 km.
              </p>
            </div>
          </div>

          {/* Big Direct Call Button */}
          <div className="text-center py-2">
            <a
              href="tel:021119"
              onClick={() => setCalled(true)}
              className={`w-full flex items-center justify-center gap-3 bg-gradient-to-r from-red-600 via-rose-600 to-orange-600 text-white font-extrabold rounded-2xl shadow-xl hover:brightness-110 active:scale-95 transition-all ${
                isElderMode ? 'py-5 text-2xl tracking-wide' : 'py-4 text-xl'
              }`}
            >
              <PhoneCall className={isElderMode ? 'w-8 h-8 animate-bounce' : 'w-6 h-6 animate-bounce'} />
              <span>PANGGIL 021-119 (GRATIS)</span>
            </a>
            {called && (
              <p className="mt-2 text-sm text-emerald-600 font-semibold flex items-center justify-center gap-1">
                <Check className="w-4 h-4" /> Panggilan sedang diarahkan ke Call Center IGD...
              </p>
            )}
          </div>

          {/* Quick Location Dispatch GPS Button */}
          <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-slate-800 font-bold">
                <MapPin className="w-5 h-5 text-red-500" />
                <span>Kirim Titik Lokasi Jemputan</span>
              </div>
              <button
                onClick={() => setLocationSent(true)}
                className={`px-3 py-1.5 rounded-xl font-bold transition-all text-xs sm:text-sm ${
                  locationSent 
                    ? 'bg-emerald-600 text-white' 
                    : 'bg-slate-800 text-white hover:bg-slate-700'
                }`}
              >
                {locationSent ? '✓ Lokasi Terkirim' : 'Kirim GPS Saya'}
              </button>
            </div>
            <p className="text-xs text-slate-500 mt-1">
              {locationSent 
                ? 'Titik koordinat berhasil dikirim ke dispatcher ambulans.' 
                : 'Sistem akan mengirimkan titik peta presisi rumah Anda ke sopir ambulans.'}
            </p>
          </div>

          {/* Important First Aid Note */}
          <div className="border-t border-slate-200 pt-3">
            <h4 className="font-bold text-slate-800 flex items-center gap-1.5 text-sm">
              <HeartPulse className="w-4 h-4 text-rose-500" />
              Instruksi Sambil Menunggu Ambulans:
            </h4>
            <ul className="text-xs text-slate-600 list-disc list-inside mt-1.5 space-y-1">
              <li>Posisikan pasien di tempat aman dengan sirkulasi udara lancar.</li>
              <li>Jangan berikan makanan/minuman jika pasien tidak sadar penuh.</li>
              <li>Siapkan dokumen KTP / kartu BPJS / asuransi pasien jika tersedia.</li>
            </ul>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-5 flex justify-end">
          <button
            onClick={onClose}
            className="px-5 py-2.5 rounded-xl bg-slate-200 text-slate-800 font-bold hover:bg-slate-300 transition-colors"
          >
            Tutup
          </button>
        </div>
      </div>
    </div>
  );
};
