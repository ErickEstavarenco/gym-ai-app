import React from "react";

function Stats() {
  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold text-gym-dark mb-4">
        Estatísticas
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        
        <div className="bg-white shadow-md rounded-xl p-4">
          <h2 className="font-semibold">Treinos realizados</h2>
          <p className="text-2xl text-gym-orange mt-2">12</p>
        </div>

        <div className="bg-white shadow-md rounded-xl p-4">
          <h2 className="font-semibold">Calorias queimadas</h2>
          <p className="text-2xl text-gym-orange mt-2">3.200</p>
        </div>

        <div className="bg-white shadow-md rounded-xl p-4">
          <h2 className="font-semibold">Dias consecutivos</h2>
          <p className="text-2xl text-gym-orange mt-2">5</p>
        </div>

      </div>
    </div>
  );
}

export default Stats;