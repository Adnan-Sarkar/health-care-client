export type TDoctor = {
  id: string;
  email: string;
  name: string;
  profilePhoto: string;
  contactNumber: string;
  address: string;
  registrationNumber: string;
  experience: number;
  gender: "MALE" | "FEMALE";
  apointmentFee: number;
  qualification: string;
  currentWorkingPlace: string;
  designation: string;
  isDeleted: false;
  createdAt: string;
  updatedAt: string;
  averageRating: number;
  review: [];
  doctorSpecialties: [];
};

export type TMeta = {
  page: number;
  limit: number;
  total: number;
};
