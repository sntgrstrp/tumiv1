
export interface ApiResponse {
  status: string;
  data: BikeRecommendation[] | null;
  message: string;
}

export interface BikeRecommendation {
  similitud: number;
  Marca: string;
  Modelo: string;
  "Tipo de moto": string;
  Precio: number;
  "Cilindrada (CC)": number;
  Peso: number;
  "Potencia (HP)": number;
  "Alto total": number;
  "Capacidad del tanque": number;
  "Tipo de motor": string;
  "Tipo de transmisión": string;
  "Suspensión delantera": string;
  "Suspensión trasera": string;
  "Freno delantero": string;
  "Freno trasero": string;
  Descripción: string;
  Imagen: string;
  Enlace: string;
}

export interface FormattedBike {
  id: string;
  name: string;
  brand: string;
  price: number;
  image: string;
  compatibility: number;
  link: string;
  description: string;
  specs: {
    engine: string;
    power: string;
    weight: string;
    engine_type: string;
    transmission: string;
    front_brake: string;
    rear_brake: string;
    front_suspension: string;
    rear_suspension: string;
    tank_capacity: string;
    total_height: string;
    bike_type: string;
  };
}
