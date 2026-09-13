import React, { useState } from 'react';
import {
  X,
  QrCode,
  ShieldCheck,
  Download,
  Printer,
  User,
  Stethoscope,
  Heart,
  Sparkles,
  PlusCircle,
  RotateCw,
  Award,
  CheckCircle,
  Check
} from 'lucide-react';
import { DOCTORS_DATA } from '../data/doctors';
import { Doctor } from '../types';

interface PatientIdCardModalProps {
  isOpen: boolean;
  onClose: () => void;
  isElderMode: boolean;
  initialDoctor?: Doctor;
}

export const PatientIdCardModal: React.FC<PatientIdCardModalProps> = ({
  isOpen,
  onClose,
  isElderMode,
  initialDoctor,
}) => {
  const [activeTab, setActiveTab] = useState<'pasien' | 'dokter'>('dokter');
  const [doctorsList, setDoctorsList] = useState<Doctor[]>(DOCTORS_DATA);
  const [selectedDoctorId, setSelectedDoctorId] = useState<string>(
    initialDoctor?.id || DOCTORS_DATA[0].id
  );
  const [isCardFlipped, setIsCardFlipped] = useState(false);
  const [showAddDoctorForm, setShowAddDoctorForm] = useState(false);

  // New Doctor Form State
  const [newDocName, setNewDocName] = useState('');
  const [newDocSpecialty, setNewDocSpecialty] = useState('Spesialis Jantung');
  const [newDocSip, setNewDocSip] = useState('889/SIP/2024');
  const [newDocId, setNewDocId] = useState('DD-5566');

  // Patient Card state
  const [patientName, setPatientName] = useState('Budi Santoso');
  const [nik, setNik] = useState('3171051904720003');
  const [bloodType, setBloodType] = useState('O+');

  if (!isOpen) return null;

  const currentDoctor =
    doctorsList.find((d) => d.id === selectedDoctorId) || doctorsList[0];

  const handleAddNewDoctor = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newDocName.trim()) return;

    const newDoc: Doctor = {
      id: newDocId || `DOC-${Math.floor(1000 + Math.random() * 9000)}`,
      name: newDocName,
      specialty: newDocSpecialty,
      subSpecialty: 'Konsultan Klinis Terpadu',
      registrationNumber: newDocSip || '999/SIP/2026',
      rating: 5.0,
      reviewCount: 45,
      experienceYears: 8,
      hospitalBranch: 'Poli Spesialis Terpadu Lt. 2',
      imageUrl: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&w=400&q=80',
      availableDays: ['Senin', 'Rabu', 'Jumat'],
      bio: `Dokter profesional di RS Muhammad Ali dengan dedikasi tinggi pada pelayanan pasien ramah dan terpadu.`,
    };

    setDoctorsList((prev) => [newDoc, ...prev]);
    setSelectedDoctorId(newDoc.id);
    setShowAddDoctorForm(false);
    setNewDocName('');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/85 backdrop-blur-sm animate-in fade-in overflow-y-auto">
      <div className="relative w-full max-w-2xl bg-white rounded-3xl shadow-2xl overflow-hidden border border-slate-200 my-6 flex flex-col max-h-[92vh]">
        {/* Header */}
        <div className="bg-gradient-to-r from-teal-800 via-emerald-800 to-teal-900 p-4 sm:p-5 text-white flex items-center justify-between shadow-md">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-white/10 backdrop-blur-md flex items-center justify-center border border-white/20">
              <ShieldCheck className="w-6 h-6 text-white" />
            </div>
            <div>
              <h2 className="font-extrabold text-lg sm:text-xl">
                Digital Smart Medical ID Card
              </h2>
              <p className="text-xs text-teal-100/90">
                RS Muhammad Ali • Identitas Resmi Pasien & Dokter Terverifikasi
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-full hover:bg-white/10 text-white transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Tab switcher: ID Card Dokter & ID Card Pasien */}
        <div className="p-4 pb-0 bg-slate-50 border-b border-slate-200">
          <div className="flex bg-slate-200/80 p-1.5 rounded-2xl">
            <button
              onClick={() => {
                setActiveTab('dokter');
                setIsCardFlipped(false);
              }}
              className={`flex-1 py-2.5 rounded-xl font-bold text-xs sm:text-sm flex items-center justify-center gap-2 transition-all ${
                activeTab === 'dokter'
                  ? 'bg-teal-700 text-white shadow-md'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Stethoscope className="w-4 h-4" />
              <span>Koleksi ID Card Dokter ({doctorsList.length})</span>
            </button>
            <button
              onClick={() => {
                setActiveTab('pasien');
                setIsCardFlipped(false);
              }}
              className={`flex-1 py-2.5 rounded-xl font-bold text-xs sm:text-sm flex items-center justify-center gap-2 transition-all ${
                activeTab === 'pasien'
                  ? 'bg-blue-600 text-white shadow-md'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <User className="w-4 h-4" />
              <span>ID Card Pasien Digital</span>
            </button>
          </div>
        </div>

        {/* Main Content Area */}
        <div className="p-4 sm:p-5 overflow-y-auto space-y-4 flex-1">
          {activeTab === 'dokter' ? (
            <div className="space-y-4">
              {/* Doctor Selector Chips */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="font-extrabold text-xs text-slate-700">
                    Pilih Kartu Dokter untuk Dilihat:
                  </span>
                  <button
                    onClick={() => setShowAddDoctorForm(!showAddDoctorForm)}
                    className="text-xs font-bold text-teal-700 hover:text-teal-800 flex items-center gap-1 bg-teal-50 px-2.5 py-1 rounded-lg border border-teal-200"
                  >
                    <PlusCircle className="w-3.5 h-3.5" />
                    <span>{showAddDoctorForm ? 'Tutup Form' : 'Tambah ID Dokter Baru'}</span>
                  </button>
                </div>

                {/* Horizontal Doctors Carousel */}
                <div className="flex items-center gap-2 overflow-x-auto pb-1">
                  {doctorsList.map((doc) => {
                    const isSelected = selectedDoctorId === doc.id;
                    return (
                      <button
                        key={doc.id}
                        onClick={() => {
                          setSelectedDoctorId(doc.id);
                          setIsCardFlipped(false);
                        }}
                        className={`flex items-center gap-2 px-3 py-1.5 rounded-xl border text-xs font-bold whitespace-nowrap transition-all ${
                          isSelected
                            ? 'bg-teal-700 text-white border-teal-700 shadow-md scale-102 ring-2 ring-teal-500/30'
                            : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                        }`}
                      >
                        <img
                          src={doc.imageUrl}
                          alt={doc.name}
                          className="w-5 h-5 rounded-full object-cover border border-white"
                        />
                        <span>{doc.name.split(',')[0]}</span>
                        <span className={`text-[10px] px-1 rounded font-mono ${isSelected ? 'bg-teal-800 text-teal-100' : 'bg-slate-200 text-slate-600'}`}>
                          {doc.id}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Form to Add New Doctor ID Card */}
              {showAddDoctorForm && (
                <form
                  onSubmit={handleAddNewDoctor}
                  className="bg-teal-50/80 p-4 rounded-2xl border border-teal-300 animate-in fade-in space-y-3"
                >
                  <div className="flex items-center justify-between border-b border-teal-200 pb-2">
                    <h4 className="font-extrabold text-xs text-teal-900 flex items-center gap-1.5">
                      <Sparkles className="w-4 h-4 text-teal-600" />
                      <span>Input Data ID Card Dokter Baru</span>
                    </h4>
                    <span className="text-[10px] text-teal-700 font-semibold">Generasi Otomatis SATUSEHAT</span>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                    <div>
                      <label className="block text-slate-700 font-semibold mb-1">Nama Lengkap & Gelar</label>
                      <input
                        type="text"
                        placeholder="Contoh: dr. Hendra Wijaya, Sp.N"
                        value={newDocName}
                        onChange={(e) => setNewDocName(e.target.value)}
                        required
                        className="w-full p-2 rounded-xl bg-white border border-teal-300 font-bold text-slate-800"
                      />
                    </div>
                    <div>
                      <label className="block text-slate-700 font-semibold mb-1">Spesialisasi</label>
                      <input
                        type="text"
                        placeholder="Contoh: Spesialis Neurologi (Saraf)"
                        value={newDocSpecialty}
                        onChange={(e) => setNewDocSpecialty(e.target.value)}
                        required
                        className="w-full p-2 rounded-xl bg-white border border-teal-300 font-bold text-slate-800"
                      />
                    </div>
                    <div>
                      <label className="block text-slate-700 font-semibold mb-1">Nomor ID Card</label>
                      <input
                        type="text"
                        placeholder="Contoh: DN-8088"
                        value={newDocId}
                        onChange={(e) => setNewDocId(e.target.value)}
                        className="w-full p-2 rounded-xl bg-white border border-teal-300 font-mono font-bold text-slate-800"
                      />
                    </div>
                    <div>
                      <label className="block text-slate-700 font-semibold mb-1">Nomor SIP Resmi</label>
                      <input
                        type="text"
                        placeholder="Contoh: 889/SIP/2026"
                        value={newDocSip}
                        onChange={(e) => setNewDocSip(e.target.value)}
                        className="w-full p-2 rounded-xl bg-white border border-teal-300 font-mono font-bold text-slate-800"
                      />
                    </div>
                  </div>
                  <div className="flex justify-end gap-2 pt-1">
                    <button
                      type="button"
                      onClick={() => setShowAddDoctorForm(false)}
                      className="px-3 py-1.5 rounded-xl bg-slate-200 text-slate-700 text-xs font-bold"
                    >
                      Batal
                    </button>
                    <button
                      type="submit"
                      className="px-4 py-1.5 rounded-xl bg-teal-700 hover:bg-teal-800 text-white text-xs font-bold shadow"
                    >
                      Simpan & Terbitkan ID Card
                    </button>
                  </div>
                </form>
              )}

              {/* Card Flip Button & Badge */}
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-slate-500">
                  Pratinjau Kartu: {isCardFlipped ? 'Sisi Belakang (Biometrik & NFC)' : 'Sisi Depan (Identitas Resmi)'}
                </span>
                <button
                  onClick={() => setIsCardFlipped(!isCardFlipped)}
                  className="px-3 py-1 bg-slate-100 hover:bg-teal-50 hover:text-teal-700 text-slate-700 font-bold text-xs rounded-xl flex items-center gap-1.5 border border-slate-200 transition-colors"
                >
                  <RotateCw className="w-3.5 h-3.5" />
                  <span>Putar Kartu (Balik Sisi)</span>
                </button>
              </div>

              {/* The Actual Digital Doctor Card Component (Front / Back) */}
              <div className="relative w-full aspect-[1.58/1] max-w-md mx-auto rounded-3xl overflow-hidden shadow-2xl p-5 text-white bg-gradient-to-br from-teal-800 via-cyan-900 to-slate-900 border-2 border-teal-400/40 flex flex-col justify-between transition-all duration-500">
                {/* Lanyard Hole Cutout Notch */}
                <div className="absolute top-2 left-1/2 -translate-x-1/2 w-8 h-2 bg-slate-900/60 rounded-full border border-teal-300/40" />

                {!isCardFlipped ? (
                  /* FRONT OF DOCTOR ID CARD */
                  <>
                    <div className="flex items-center justify-between pt-1">
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-xl bg-white flex items-center justify-center shadow-md">
                          <Stethoscope className="w-5 h-5 text-teal-700" />
                        </div>
                        <div>
                          <div className="font-extrabold text-sm tracking-wide">RS MUHAMMAD ALI</div>
                          <div className="text-[9px] text-teal-200 tracking-wider uppercase font-semibold">
                            Kartu Tanda Dokter Spesialis
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-1.5 bg-amber-400 text-slate-900 font-extrabold text-[10px] px-2 py-0.5 rounded-full shadow">
                        <Award className="w-3 h-3" />
                        <span>SIP RESMI</span>
                      </div>
                    </div>

                    <div className="my-auto flex items-center gap-4 py-2">
                      <div className="w-20 h-20 rounded-2xl border-2 border-teal-300 overflow-hidden shadow-xl shrink-0">
                        <img
                          src={currentDoctor.imageUrl}
                          alt={currentDoctor.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="overflow-hidden">
                        <div className="text-base sm:text-lg font-black text-white leading-tight">
                          {currentDoctor.name}
                        </div>
                        <div className="text-xs text-teal-200 font-bold mt-0.5">
                          {currentDoctor.specialty}
                        </div>
                        <div className="text-[11px] text-teal-100/90 font-mono mt-0.5">
                          ID: <strong className="text-amber-300">{currentDoctor.id}</strong> | SIP: {currentDoctor.registrationNumber}
                        </div>
                        <div className="text-[10px] text-amber-300 font-bold mt-1">
                          ★★★★★ {currentDoctor.rating.toFixed(1)} ({currentDoctor.reviewCount} Pasien Terverifikasi)
                        </div>
                      </div>
                    </div>

                    <div className="flex items-end justify-between pt-2 border-t border-white/20">
                      <div>
                        <div className="text-[8px] text-teal-200 uppercase font-bold tracking-wider">
                          Unit Pelayanan Medis
                        </div>
                        <div className="font-mono text-xs font-bold text-teal-100">
                          {currentDoctor.hospitalBranch}
                        </div>
                      </div>
                      <div className="bg-white p-1 rounded-xl shadow-md">
                        <QrCode className="w-9 h-9 text-slate-900" />
                      </div>
                    </div>
                  </>
                ) : (
                  /* BACK OF DOCTOR ID CARD */
                  <>
                    <div className="flex items-center justify-between border-b border-white/20 pb-2">
                      <div className="text-[10px] font-bold text-teal-200 uppercase tracking-wider">
                        Kemenkes RI SATUSEHAT Biometrics
                      </div>
                      <span className="text-[10px] font-mono text-emerald-300 bg-emerald-950/60 px-2 py-0.5 rounded border border-emerald-500/30">
                        NFC RFID CHIP: ACTIVE
                      </span>
                    </div>

                    <div className="my-auto space-y-2 text-[11px] text-teal-100">
                      <p>
                        <strong>Syarat & Ketentuan:</strong> Kartu Tanda Pengenal ini adalah milik sah <strong>RS Muhammad Ali</strong>. Wajib dikenakan saat bertugas di seluruh area poliklinik dan ruang tindakan medis.
                      </p>
                      <div className="bg-white/10 p-2 rounded-xl text-[10px] space-y-0.5 border border-white/10">
                        <div>• Kontak Rumah Sakit: (021) 4851-7880</div>
                        <div>• Layanan Gawat Darurat: 021-119</div>
                        <div>• Lokasi: Jl. Sudirman No. 88, Jakarta Pusat</div>
                      </div>
                    </div>

                    {/* Barcode representation */}
                    <div className="flex items-center justify-between pt-2 border-t border-white/20">
                      <div className="space-y-0.5">
                        <div className="font-mono text-[9px] text-teal-300">
                          BARCODE: *RSMA-{currentDoctor.id}-2026*
                        </div>
                        <div className="h-4 w-48 bg-white/90 rounded-[2px] flex items-center justify-around px-1">
                          {Array.from({ length: 32 }).map((_, i) => (
                            <div
                              key={i}
                              className="h-full bg-slate-900"
                              style={{ width: `${(i % 3) + 1}px` }}
                            />
                          ))}
                        </div>
                      </div>
                      <div className="text-right">
                        <span className="text-[8px] text-teal-300 uppercase block">Otorisasi</span>
                        <span className="text-[10px] font-bold text-white">Direktur Medis RS</span>
                      </div>
                    </div>
                  </>
                )}
              </div>

              {/* Information Footnote */}
              <div className="p-3 bg-teal-50 rounded-2xl border border-teal-200 text-xs text-teal-900 flex items-start gap-2">
                <ShieldCheck className="w-5 h-5 text-teal-700 shrink-0 mt-0.5" />
                <p>
                  Seluruh ID Card dokter RS Muhammad Ali telah terkoneksi dengan Konsil Kedokteran Indonesia (KKI) dan platform SATUSEHAT Kementerian Kesehatan Republik Indonesia.
                </p>
              </div>
            </div>
          ) : (
            /* Patient ID Card Section */
            <div className="space-y-4">
              <div className="relative w-full aspect-[1.58/1] max-w-md mx-auto rounded-3xl overflow-hidden shadow-2xl p-5 text-white bg-gradient-to-br from-blue-700 via-sky-800 to-indigo-900 border-2 border-blue-400/30 flex flex-col justify-between">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-xl bg-white flex items-center justify-center shadow">
                      <Heart className="w-5 h-5 text-red-500 fill-red-500" />
                    </div>
                    <div>
                      <div className="font-extrabold text-sm tracking-wide">RS MUHAMMAD ALI</div>
                      <div className="text-[9px] text-blue-200 tracking-wider uppercase font-semibold">Smart Patient Card</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-1.5 bg-blue-500/30 border border-blue-300/30 px-2 py-0.5 rounded-full text-[10px] font-mono">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                    <span>NFC ACTIVE</span>
                  </div>
                </div>

                <div className="my-auto flex items-center gap-4 py-2">
                  <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-sky-400 to-blue-200 p-0.5 shadow-inner shrink-0">
                    <img
                      src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80"
                      alt="Pasien"
                      className="w-full h-full object-cover rounded-[14px]"
                    />
                  </div>
                  <div className="overflow-hidden">
                    <div className="text-base sm:text-lg font-extrabold tracking-wide text-white truncate">
                      {patientName}
                    </div>
                    <div className="text-xs text-blue-200 font-mono">NIK: {nik}</div>
                    <div className="text-xs text-sky-200 flex items-center gap-3 mt-1">
                      <span>Gol. Darah: <strong className="text-white">{bloodType}</strong></span>
                      <span>BPJS: <strong className="text-white">Aktif</strong></span>
                    </div>
                  </div>
                </div>

                <div className="flex items-end justify-between pt-2 border-t border-white/15">
                  <div>
                    <div className="text-[8px] text-blue-200 uppercase font-bold tracking-wider">No. Rekam Medis Digital</div>
                    <div className="font-mono text-xs font-black tracking-widest text-amber-300">MA-2026-99084</div>
                  </div>
                  <div className="flex items-center gap-1.5 bg-white p-1 rounded-xl shadow">
                    <QrCode className="w-8 h-8 text-slate-900" />
                  </div>
                </div>
              </div>

              {/* Patient Quick Input Editor */}
              <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200">
                <div className="font-bold text-xs text-slate-600 mb-2 flex items-center gap-1">
                  <Sparkles className="w-3.5 h-3.5 text-blue-600" />
                  <span>Ubah Data Kartu Pasien (Simulasi):</span>
                </div>
                <div className="grid grid-cols-2 gap-2 text-xs">
                  <div>
                    <label className="block text-slate-500 font-semibold mb-1">Nama Pasien</label>
                    <input
                      type="text"
                      value={patientName}
                      onChange={(e) => setPatientName(e.target.value)}
                      className="w-full p-2 rounded-xl bg-white border border-slate-200 font-bold text-slate-800"
                    />
                  </div>
                  <div>
                    <label className="block text-slate-500 font-semibold mb-1">Golongan Darah</label>
                    <select
                      value={bloodType}
                      onChange={(e) => setBloodType(e.target.value)}
                      className="w-full p-2 rounded-xl bg-white border border-slate-200 font-bold text-slate-800"
                    >
                      <option value="A+">A+</option>
                      <option value="B+">B+</option>
                      <option value="AB+">AB+</option>
                      <option value="O+">O+</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Action Buttons */}
          <div className="mt-4 flex items-center justify-between border-t border-slate-100 pt-4 flex-wrap gap-2">
            <div className="flex items-center gap-2">
              <button
                onClick={() => alert(`ID Card ${activeTab === 'dokter' ? currentDoctor.name : patientName} berhasil dikirim ke printer ID Card Lanyard.`)}
                className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs rounded-xl flex items-center gap-1.5 transition-colors"
              >
                <Printer className="w-4 h-4" />
                <span>Cetak ID Card</span>
              </button>
              <button
                onClick={() => alert(`ID Card ${activeTab === 'dokter' ? currentDoctor.name : patientName} berhasil diunduh sebagai file PDF resolusi tinggi.`)}
                className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs rounded-xl flex items-center gap-1.5 transition-colors"
              >
                <Download className="w-4 h-4" />
                <span>Unduh E-Card</span>
              </button>
            </div>
            <button
              onClick={onClose}
              className="px-5 py-2 bg-teal-700 hover:bg-teal-800 text-white font-bold text-xs sm:text-sm rounded-xl transition-colors shadow-md"
            >
              Tutup
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
