
import { Check, Minus, Settings } from "lucide-react";
import { Button } from "@/components/ui/button";

const ComparisonSection = () => {
  // Sample comparison data
  const bikes = [
    {
      name: "MT-07",
      brand: "Yamaha",
      price: 7299,
      image: "https://images.unsplash.com/photo-1558981852-426c6c22a060?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
      compatibility: 98,
      engine: "689cc",
      power: "73.4 CV",
      torque: "67 Nm",
      weight: "184 kg",
      seat_height: "805 mm",
      fuel: "14 L",
      abs: true,
      traction_control: false,
      riding_modes: false
    },
    {
      name: "Z650",
      brand: "Kawasaki",
      price: 7199,
      image: "https://images.unsplash.com/photo-1549027032-1977ba8a1b15?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
      compatibility: 94,
      engine: "649cc",
      power: "68 CV",
      torque: "64 Nm",
      weight: "187 kg",
      seat_height: "790 mm",
      fuel: "15 L",
      abs: true,
      traction_control: false,
      riding_modes: false
    },
    {
      name: "CB650R",
      brand: "Honda",
      price: 8700,
      image: "https://images.unsplash.com/photo-1601989307097-7365eb41d031?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
      compatibility: 92,
      engine: "649cc",
      power: "95 CV",
      torque: "64 Nm",
      weight: "202 kg",
      seat_height: "810 mm",
      fuel: "15.4 L",
      abs: true,
      traction_control: true,
      riding_modes: true
    }
  ];

  return (
    <section id="comparison" className="py-20">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            <span className="ubike-gradient">Compara</span> Tus Opciones
          </h2>
          <p className="text-muted-foreground">
            Analiza las características y especificaciones de tus motos recomendadas lado a lado para tomar la mejor decisión.
          </p>
        </div>
        
        <div className="overflow-x-auto glass-card rounded-xl">
          <table className="w-full min-w-[750px]">
            <thead>
              <tr className="border-b border-white/10">
                <th className="p-4 text-left font-medium text-muted-foreground">Características</th>
                {bikes.map((bike, index) => (
                  <th key={index} className="p-4 text-center">
                    <div className="flex flex-col items-center">
                      <div className="relative w-16 h-16 mb-3 mx-auto">
                        <div className="w-full h-full rounded-full overflow-hidden">
                          <img 
                            src={bike.image} 
                            alt={bike.name}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div className="absolute -bottom-2 -right-2 bg-ubike text-white text-xs font-medium rounded-full w-8 h-8 flex items-center justify-center">
                          {bike.compatibility}%
                        </div>
                      </div>
                      <div className="font-bold text-white">{bike.name}</div>
                      <div className="text-sm text-muted-foreground">{bike.brand}</div>
                    </div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              <tr className="border-b border-white/10">
                <td className="p-4 font-medium text-muted-foreground">Precio</td>
                {bikes.map((bike, index) => (
                  <td key={index} className="p-4 text-center font-bold">
                    {bike.price.toLocaleString('es-ES')} €
                  </td>
                ))}
              </tr>
              <tr className="border-b border-white/10">
                <td className="p-4 font-medium text-muted-foreground">Motor</td>
                {bikes.map((bike, index) => (
                  <td key={index} className="p-4 text-center">{bike.engine}</td>
                ))}
              </tr>
              <tr className="border-b border-white/10">
                <td className="p-4 font-medium text-muted-foreground">Potencia</td>
                {bikes.map((bike, index) => (
                  <td key={index} className="p-4 text-center">{bike.power}</td>
                ))}
              </tr>
              <tr className="border-b border-white/10">
                <td className="p-4 font-medium text-muted-foreground">Par Motor</td>
                {bikes.map((bike, index) => (
                  <td key={index} className="p-4 text-center">{bike.torque}</td>
                ))}
              </tr>
              <tr className="border-b border-white/10">
                <td className="p-4 font-medium text-muted-foreground">Peso</td>
                {bikes.map((bike, index) => (
                  <td key={index} className="p-4 text-center">{bike.weight}</td>
                ))}
              </tr>
              <tr className="border-b border-white/10">
                <td className="p-4 font-medium text-muted-foreground">Altura Asiento</td>
                {bikes.map((bike, index) => (
                  <td key={index} className="p-4 text-center">{bike.seat_height}</td>
                ))}
              </tr>
              <tr className="border-b border-white/10">
                <td className="p-4 font-medium text-muted-foreground">Depósito</td>
                {bikes.map((bike, index) => (
                  <td key={index} className="p-4 text-center">{bike.fuel}</td>
                ))}
              </tr>
              <tr className="border-b border-white/10">
                <td className="p-4 font-medium text-muted-foreground">ABS</td>
                {bikes.map((bike, index) => (
                  <td key={index} className="p-4 text-center">
                    {bike.abs ? <Check className="h-5 w-5 text-green-500 mx-auto" /> : <Minus className="h-5 w-5 text-red-500 mx-auto" />}
                  </td>
                ))}
              </tr>
              <tr className="border-b border-white/10">
                <td className="p-4 font-medium text-muted-foreground">Control de Tracción</td>
                {bikes.map((bike, index) => (
                  <td key={index} className="p-4 text-center">
                    {bike.traction_control ? <Check className="h-5 w-5 text-green-500 mx-auto" /> : <Minus className="h-5 w-5 text-red-500 mx-auto" />}
                  </td>
                ))}
              </tr>
              <tr>
                <td className="p-4 font-medium text-muted-foreground">Modos de Conducción</td>
                {bikes.map((bike, index) => (
                  <td key={index} className="p-4 text-center">
                    {bike.riding_modes ? <Check className="h-5 w-5 text-green-500 mx-auto" /> : <Minus className="h-5 w-5 text-red-500 mx-auto" />}
                  </td>
                ))}
              </tr>
              <tr>
                <td className="p-4"></td>
                {bikes.map((bike, index) => (
                  <td key={index} className="p-4 text-center">
                    <Button className="bg-ubike hover:bg-ubike/90 w-full">
                      Ver Detalles
                    </Button>
                  </td>
                ))}
              </tr>
            </tbody>
          </table>
        </div>
        
        <div className="mt-8 text-center">
          <Button variant="outline" className="gap-2">
            <Settings className="h-4 w-4" /> Personalizar Comparación
          </Button>
        </div>
      </div>
    </section>
  );
};

export default ComparisonSection;
