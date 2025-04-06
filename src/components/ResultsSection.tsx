
import BikeCard from "./BikeCard";

const ResultsSection = () => {
  // Sample data for bikes (this will be replaced by actual API data)
  const bikes = [
    {
      id: "1",
      name: "MT-07",
      brand: "Yamaha",
      price: 35000000,
      image: "https://images.unsplash.com/photo-1558981852-426c6c22a060?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
      compatibility: 98,
      specs: {
        engine: "689cc",
        power: "73.4 CV",
        weight: "184 kg",
        seat_height: "805 mm",
        engine_type: "4 Tiempos",
        transmission: "Manual 6 velocidades",
        front_brake: "Discos ABS",
        rear_brake: "Disco ABS",
        front_suspension: "Telescópica",
        rear_suspension: "Monoamortiguador",
        tank_capacity: "14 L",
        total_height: "1,085 mm",
        bike_type: "Naked"
      }
    },
    {
      id: "2",
      name: "Z650",
      brand: "Kawasaki",
      price: 33500000,
      image: "https://images.unsplash.com/photo-1549027032-1977ba8a1b15?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
      compatibility: 94,
      specs: {
        engine: "649cc",
        power: "68 CV",
        weight: "187 kg",
        seat_height: "790 mm",
        engine_type: "4 Tiempos",
        transmission: "Manual 6 velocidades",
        front_brake: "Discos ABS",
        rear_brake: "Disco",
        front_suspension: "Telescópica",
        rear_suspension: "Monoamortiguador",
        tank_capacity: "15 L",
        total_height: "1,065 mm",
        bike_type: "Naked"
      }
    },
    {
      id: "3",
      name: "CB650R",
      brand: "Honda",
      price: 42500000,
      image: "https://images.unsplash.com/photo-1601989307097-7365eb41d031?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
      compatibility: 92,
      specs: {
        engine: "649cc",
        power: "95 CV",
        weight: "202 kg",
        seat_height: "810 mm",
        engine_type: "4 Tiempos",
        transmission: "Manual 6 velocidades",
        front_brake: "Discos ABS",
        rear_brake: "Disco ABS",
        front_suspension: "Invertida",
        rear_suspension: "Monoamortiguador",
        tank_capacity: "15.4 L",
        total_height: "1,075 mm",
        bike_type: "Naked"
      }
    }
  ];

  return (
    <section id="results" className="py-16 relative">
      <div className="absolute inset-0 -z-10">
        <div className="absolute bottom-0 left-0 w-full h-1/2 bg-gradient-to-t from-ubike-dark/50 to-transparent opacity-70"></div>
      </div>
      
      <div className="container mx-auto px-4">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            <span className="ubike-gradient">Recomendaciones</span> Para Ti
          </h2>
          <p className="text-muted-foreground">
            Basado en tu perfil, nuestra IA ha encontrado estas motocicletas que se ajustan perfectamente a tus necesidades y características.
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {bikes.map((bike) => (
            <BikeCard key={bike.id} bike={bike} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ResultsSection;
