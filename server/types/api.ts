export interface DBUser {
  id: string;
  name: string;
  email: string;
  password: string;
  createdAt: string;
}

export interface DBProduct {
  id: string;
  name: string;
  price: number;
  description?: string;
  createdAt: string;
}

export interface Database {
  users: DBUser[];
  products: DBProduct[];
}

export interface RegisterRequest {
  name: string;
  email: string;
  password: string;
}

export interface LoginRequest {
  email: string;
  password: string;
}
