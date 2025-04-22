
import { BikeRecommendation, FormattedBike } from "./BikeRecommendationTypes";

export const formatBikeData = (bike: BikeRecommendation, index: number): FormattedBike => {
  const placeholderImage = "https://images.unsplash.com/photo-1558981852-426c6c22a060?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80";
  
  return {
    id: `${index}-${bike.Modelo}`,
    name: bike.Modelo || "Modelo no disponible",
    brand: bike.Marca || "Marca no disponible",
    price: bike.Precio || 0,
    image: bike.Imagen || placeholderImage,
    compatibility: Math.round(bike.similitud || 0),
    link: bike.Enlace || "#",
    description: bike.Descripción || "Descripción no disponible",
    specs: {
      engine: `${bike["Cilindrada (CC)"] || "N/A"}cc`,
      power: `${bike["Potencia (HP)"] || "N/A"} CV`,
      weight: `${bike.Peso || "N/A"} kg`,
      engine_type: bike["Tipo de motor"] || "No especificado",
      transmission: bike["Tipo de transmisión"] || "No especificado",
      front_brake: bike["Freno delantero"] || "No especificado",
      rear_brake: bike["Freno trasero"] || "No especificado",
      front_suspension: bike["Suspensión delantera"] || "No especificado",
      rear_suspension: bike["Suspensión trasera"] || "No especificado",
      tank_capacity: `${bike["Capacidad del tanque"] || "N/A"} L`,
      total_height: `${bike["Alto total"] || "N/A"} mm`,
      bike_type: bike["Tipo de moto"] || "No especificado"
    }
  };
};
