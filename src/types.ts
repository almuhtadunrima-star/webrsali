export interface Doctor {
  id: string;
  name: string;
  specialty: string;
  subSpecialty?: string;
  registrationNumber: string;
  rating: number;
  reviewCount: number;
  experienceYears: number;
  hospitalBranch: string;
  imageUrl: string;
  availableDays: string[];
  bio: string;
}

export interface TimeSlot {
  id: string;
  time: string;
  period: 'Pagi' | 'Siang' | 'Sore';
  available: boolean;
  quotaLeft: number;
}

export interface DayOption {
  dayName: string;
  dateStr: string;
  status: 'available' | 'full' | 'limited';
  color: 'green' | 'red' | 'blue';
  slotsCount: number;
}

export interface BedAvailability {
  type: string;
  available: number;
  total: number;
  status: 'Tersedia' | 'Hampir Penuh' | 'Penuh';
  price: string;
}
