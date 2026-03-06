import React from "react";

function Profile() {
  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold text-gym-dark mb-4">
        Perfil
      </h1>

      <div className="bg-white shadow-md rounded-xl p-6 max-w-md">
        
        <p className="mb-2">
          <strong>Nome:</strong> Usuário
        </p>

        <p className="mb-2">
          <strong>Altura:</strong> 1.75m
        </p>

        <p className="mb-2">
          <strong>Peso:</strong> 75kg
        </p>

        <p className="mb-2">
          <strong>Objetivo:</strong> Ganho de massa
        </p>

      </div>
    </div>
  );
}

export default Profile;