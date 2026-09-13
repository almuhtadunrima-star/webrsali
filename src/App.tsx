/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { DeskSetup } from './components/DeskSetup';
import { EmergencyModal } from './components/EmergencyModal';
import { PatientIdCardModal } from './components/PatientIdCardModal';
import { OnlineConsultationModal } from './components/OnlineConsultationModal';
import { BookingConfirmModal } from './components/BookingConfirmModal';
import { Doctor } from './types';
import { DOCTORS_DATA } from './data/doctors';

export default function App() {
  // Global accessibility state: Mode Lansia / Teks Besar
  const [isElderMode, setIsElderMode] = useState<boolean>(false);

  // View mode: 'desk' (Showcase Meja Kerja), 'monitor' (Layar Monitor Full), 'laptop' (Layar Laptop Full)
  const [viewMode, setViewMode] = useState<'desk' | 'monitor' | 'laptop'>('desk');

  // Modals state
  const [isAmbulanceOpen, setIsAmbulanceOpen] = useState<boolean>(false);
  const [isIdCardOpen, setIsIdCardOpen] = useState<boolean>(false);
  const [isConsultationOpen, setIsConsultationOpen] = useState<boolean>(false);
  const [isBookingOpen, setIsBookingOpen] = useState<boolean>(false);

  // Active doctor state
  const [activeDoctor, setActiveDoctor] = useState<Doctor>(DOCTORS_DATA[0]);

  // Booking details state
  const [bookingDate, setBookingDate] = useState<string>('Senin, 11 Juni 2026');
  const [bookingTime, setBookingTime] = useState<string>('09:30 - 10:00');

  const handleOpenBooking = (date?: string, time?: string, doctor?: Doctor) => {
    if (date) setBookingDate(date);
    if (time) setBookingTime(time);
    if (doctor) setActiveDoctor(doctor);
    setIsBookingOpen(true);
  };

  const handleOpenIdCard = (doctor?: Doctor) => {
    if (doctor) setActiveDoctor(doctor);
    setIsIdCardOpen(true);
  };

  const handleOpenConsultation = (doctor?: Doctor) => {
    if (doctor) setActiveDoctor(doctor);
    setIsConsultationOpen(true);
  };

  return (
    <div className={`min-h-screen font-sans ${isElderMode ? 'text-lg' : 'text-base'}`}>
      {/* 3D Modern Desk Presentation */}
      <DeskSetup
        isElderMode={isElderMode}
        setIsElderMode={setIsElderMode}
        viewMode={viewMode}
        setViewMode={setViewMode}
        onOpenAmbulance={() => setIsAmbulanceOpen(true)}
        onOpenIdCard={handleOpenIdCard}
        onOpenConsultation={handleOpenConsultation}
        onOpenBooking={handleOpenBooking}
      />

      {/* Emergency 24H Ambulance Hotline Modal */}
      <EmergencyModal
        isOpen={isAmbulanceOpen}
        onClose={() => setIsAmbulanceOpen(false)}
        isElderMode={isElderMode}
      />

      {/* Digital Smart Medical ID Card (Pasien / Koleksi Dokter) Modal */}
      <PatientIdCardModal
        isOpen={isIdCardOpen}
        onClose={() => setIsIdCardOpen(false)}
        isElderMode={isElderMode}
        initialDoctor={activeDoctor}
      />

      {/* Live Online Telemedicine Consultation Room Modal */}
      <OnlineConsultationModal
        isOpen={isConsultationOpen}
        onClose={() => setIsConsultationOpen(false)}
        isElderMode={isElderMode}
        doctor={activeDoctor}
      />

      {/* Appointment Booking Confirmation Ticket Modal */}
      <BookingConfirmModal
        isOpen={isBookingOpen}
        onClose={() => setIsBookingOpen(false)}
        selectedDate={bookingDate}
        selectedTime={bookingTime}
        doctor={activeDoctor}
        isElderMode={isElderMode}
      />
    </div>
  );
}
