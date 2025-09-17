"use client";

export default function Panel() {
  return (
    <div className="panels-container grid grid-cols-2 w-full h-full absolute top-0 left-0">
      <div className="panel left-panel flex flex-col items-center justify-around text-center p-8 pointer-events-auto text-white">
        <div className="content">
          <h3 className="text-2xl font-semibold">Primex Logistics</h3>
          <p>Accédez à votre compte et profitez de fonctionnalités sur mesure !</p>
        </div>
        <img src="/img/log.svg" alt="" className="image w-64" />
      </div>

      <div className="panel right-panel flex flex-col items-center justify-around text-center p-8 pointer-events-none text-white">
        <div className="content">
          <h3 className="text-2xl font-semibold">Primex Logistics</h3>
          <p>Entrez vos identifiants et accédez à votre espace personnel en toute sécurité.</p>
          <button id="sign-in-btn" className="btn border-2 border-white text-white rounded-full px-6 py-2 mt-2">S'authentifier</button>
        </div>
        <img src="/img/register.svg" alt="" className="image w-64" />
      </div>
    </div>
  );
}
