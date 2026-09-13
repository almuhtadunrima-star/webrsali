import React, { useState } from 'react';
import { X, Send, Video, Mic, MessageSquare, Shield, Star, Clock, CheckCircle2 } from 'lucide-react';
import { Doctor } from '../types';
import { DOCTORS_DATA } from '../data/doctors';

interface OnlineConsultationModalProps {
  isOpen: boolean;
  onClose: () => void;
  isElderMode: boolean;
  doctor?: Doctor;
}

export const OnlineConsultationModal: React.FC<OnlineConsultationModalProps> = ({
  isOpen,
  onClose,
  isElderMode,
  doctor,
}) => {
  const currentDoctor = doctor || DOCTORS_DATA[0];

  const [messages, setMessages] = useState<Array<{ sender: 'doctor' | 'patient'; text: string; time: string }>>([
    {
      sender: 'doctor',
      text: `Halo! Selamat datang di Telekonsultasi ${currentDoctor.specialty} RS Muhammad Ali. Saya ${currentDoctor.name}. Ada keluhan kesehatan apa yang bisa saya bantu hari ini?`,
      time: '10:02',
    },
    {
      sender: 'patient',
      text: 'Pagi Dok, saya ingin konsultasi mengenai keluhan dan jadwal pemeriksaan lanjutan.',
      time: '10:04',
    },
    {
      sender: 'doctor',
      text: 'Baik, silakan jelaskan gejalanya secara rinci. Apakah sudah ada obat yang dikonsumsi sebelumnya?',
      time: '10:05',
    },
  ]);
  const [inputVal, setInputVal] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  if (!isOpen) return null;

  const handleSend = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!inputVal.trim()) return;

    const newMsg = {
      sender: 'patient' as const,
      text: inputVal,
      time: new Date().toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, newMsg]);
    setInputVal('');
    setIsTyping(true);

    setTimeout(() => {
      setIsTyping(false);
      setMessages((prev) => [
        ...prev,
        {
          sender: 'doctor',
          text: `Terima kasih atas informasinya. Saya sarankan untuk tetap menjaga hidrasi dan istirahat cukup. Saya siapkan catatan resep dan rekomendasi rujukan bila diperlukan.`,
          time: new Date().toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' }),
        },
      ]);
    }, 1500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-in fade-in">
      <div className="relative w-full max-w-2xl bg-white rounded-3xl shadow-2xl overflow-hidden flex flex-col h-[600px] max-h-[90vh] border border-teal-200">
        {/* Header */}
        <div className="bg-gradient-to-r from-teal-700 via-emerald-700 to-teal-800 p-4 text-white flex items-center justify-between shadow-md">
          <div className="flex items-center gap-3">
            <div className="relative">
              <img
                src={currentDoctor.imageUrl}
                alt={currentDoctor.name}
                className="w-12 h-12 rounded-full object-cover border-2 border-emerald-300 shadow"
              />
              <span className="absolute bottom-0 right-0 w-3.5 h-3.5 bg-emerald-400 border-2 border-teal-900 rounded-full animate-pulse" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-extrabold text-base sm:text-lg">{currentDoctor.name}</h3>
                <span className="bg-emerald-500/30 border border-emerald-300/40 text-[10px] font-bold px-2 py-0.5 rounded-full">
                  ONLINE
                </span>
              </div>
              <p className="text-xs text-teal-100 flex items-center gap-2">
                <span>{currentDoctor.specialty} ({currentDoctor.id})</span>
                <span>•</span>
                <span className="flex items-center text-amber-300">
                  <Star className="w-3 h-3 fill-amber-300 mr-0.5" /> {currentDoctor.rating.toFixed(1)} ({currentDoctor.reviewCount}+ review)
                </span>
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => alert(`Memulai panggilan video HD terenkripsi dengan ${currentDoctor.name}...`)}
              className="p-2.5 bg-white/10 hover:bg-white/20 rounded-xl transition-colors flex items-center gap-1.5 text-xs font-bold"
              title="Mulai Video Call"
            >
              <Video className="w-4 h-4" />
              <span className="hidden sm:inline">Video Call</span>
            </button>
            <button
              onClick={onClose}
              className="p-2 rounded-full hover:bg-white/10 transition-colors"
            >
              <X className="w-6 h-6" />
            </button>
          </div>
        </div>

        {/* Security & Info Banner */}
        <div className="bg-teal-50 border-b border-teal-100 px-4 py-2 flex items-center justify-between text-xs text-teal-800">
          <div className="flex items-center gap-1.5">
            <Shield className="w-4 h-4 text-teal-600" />
            <span>Koneksi Medis RS Muhammad Ali Terenkripsi End-to-End</span>
          </div>
          <span className="font-bold flex items-center gap-1 text-slate-600">
            <Clock className="w-3.5 h-3.5" /> Sesi: 30 Menit
          </span>
        </div>

        {/* Chat History */}
        <div className="flex-1 p-4 overflow-y-auto space-y-3 bg-slate-50/60">
          {messages.map((m, idx) => (
            <div
              key={idx}
              className={`flex ${m.sender === 'patient' ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`max-w-[80%] rounded-2xl p-3.5 shadow-sm ${
                  m.sender === 'patient'
                    ? 'bg-blue-600 text-white rounded-br-none'
                    : 'bg-white text-slate-800 border border-slate-200/80 rounded-bl-none'
                } ${isElderMode ? 'text-base' : 'text-sm'}`}
              >
                <p className="leading-relaxed">{m.text}</p>
                <div
                  className={`text-[10px] mt-1 flex items-center gap-1 justify-end ${
                    m.sender === 'patient' ? 'text-blue-200' : 'text-slate-400'
                  }`}
                >
                  <span>{m.time}</span>
                  {m.sender === 'patient' && <CheckCircle2 className="w-3 h-3 text-sky-200" />}
                </div>
              </div>
            </div>
          ))}

          {isTyping && (
            <div className="flex justify-start">
              <div className="bg-white border border-slate-200 rounded-2xl rounded-bl-none p-3 shadow-sm flex items-center gap-1.5">
                <span className="text-xs text-slate-500 font-medium">{currentDoctor.name} sedang mengetik</span>
                <span className="w-1.5 h-1.5 bg-teal-500 rounded-full animate-bounce" />
                <span className="w-1.5 h-1.5 bg-teal-500 rounded-full animate-bounce [animation-delay:0.2s]" />
                <span className="w-1.5 h-1.5 bg-teal-500 rounded-full animate-bounce [animation-delay:0.4s]" />
              </div>
            </div>
          )}
        </div>

        {/* Quick Question Chips */}
        <div className="px-4 py-2 bg-white border-t border-slate-100 flex items-center gap-2 overflow-x-auto text-xs">
          <span className="text-slate-400 shrink-0 font-medium">Saran Pertanyaan:</span>
          {['Resep Obat?', 'Kapan harus ke IGD?', 'Pantangan Makanan?'].map((q, i) => (
            <button
              key={i}
              onClick={() => setInputVal(q)}
              className="bg-slate-100 hover:bg-teal-50 hover:text-teal-700 text-slate-600 px-2.5 py-1 rounded-full whitespace-nowrap transition-colors border border-slate-200"
            >
              {q}
            </button>
          ))}
        </div>

        {/* Chat Input */}
        <form onSubmit={handleSend} className="p-3 bg-white border-t border-slate-200 flex items-center gap-2">
          <input
            type="text"
            value={inputVal}
            onChange={(e) => setInputVal(e.target.value)}
            placeholder="Ketik pertanyaan medis di sini..."
            className="flex-1 p-3 rounded-2xl bg-slate-100 border border-slate-200 focus:outline-none focus:ring-2 focus:ring-teal-500 text-sm"
          />
          <button
            type="submit"
            className="p-3 bg-teal-600 hover:bg-teal-700 text-white rounded-2xl shadow transition-transform active:scale-95 flex items-center justify-center"
          >
            <Send className="w-5 h-5" />
          </button>
        </form>
      </div>
    </div>
  );
};
