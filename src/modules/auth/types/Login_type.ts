export interface LoginResponse {
  message: string;
  data: User
  token: string;
  success: boolean;
};

export interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  avatar: string | any;
  address: string | null;
  roles: string[];
  createdBy: string;
  createdAt: string; // ISO timestamp
  updatedAt: string; // ISO timestamp
}

