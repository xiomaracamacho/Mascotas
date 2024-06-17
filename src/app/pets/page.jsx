
"use client";

import { useEffect, useState } from 'react';
import Link from 'next/link';
import axios from 'axios';
import Image from 'next/image';
import Close from '../components/Cerrar';
import { proteger } from '../components/ProToken';
import Swal from 'sweetalert2';
import btnAdd from '../img/btn-add.svg';
import btnDelete from '../img/btn-delete.svg';
import btnEdit from '../img/btn-edit.svg';
import btnShow from '../img/btn-show.svg';
import btnBack from '../img/btn-back.svg';

function Page() {
  const [pets, setPets] = useState([]);

  const getPets = async () => {
    try {
      const response = await axios.get('http://localhost:3000/api/mascotas');
      const data = response.data.datos;
      setPets(data);
    } catch (error) {
      console.error('Error fetching pets:', error);
    }
  };

  const deletePet = async (id) => {
    try {
      const confirmed = await Swal.fire({
        title: '¿Estás seguro?',
        text: '¡No podrás revertir esto!',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#d33',
        cancelButtonColor: '#1e5799',
        confirmButtonText: 'Eliminar',
        cancelButtonText: 'Cancelar',
      });

      if (confirmed.isConfirmed) {
        await axios.delete(`http://localhost:3000/api/mascotas/${id}`);
        getPets();
        Swal.fire('Eliminado', 'La mascota ha sido eliminada correctamente.', 'success');
      }
    } catch (error) {
      console.error('Error deleting pet:', error);
    }
  };

  useEffect(() => {
    getPets();
  }, []);


  return (
    <div className="flex justify-center items-center">
      <div className="bg-back-image bg-cover bg-center md:w-1/4 w-full h-screen flex flex-col p-3 gap-3">
        <div className="flex h-12 w-full justify-center items-center gap-4">
          <Link href="/">
            <Image src={btnBack} alt="btn-back" />
          </Link>
          <h1 className="text-white text-center w-full">Administrar Mascotas</h1>
          <Close />
        </div>

        <div>
          <Link href="/registrar">
            <Image src={btnAdd} alt="btn-register" />
          </Link>
        </div>

   

        <div className="h-4/5 overflow-y-auto overflow-x-hidden">
          {pets.map((pet) => (
            <div key={pet.id} className="bg-[#ffffff81] rounded-[25px] p-3 flex mb-3">
              <div className="flex w-2/3 justify-center items-center gap-2">
                <div className="h-20 w-20 bg-white border-[#1f204db4] border-[2px] rounded-full flex justify-center items-center">
                  <img
                    src={`/img/${pet.photo}`}
                    alt={pet.name}
                    className="h-full w-full object-cover rounded-full"
                  />
                </div>
                <div className="flex flex-col w-1/3">
                  <h1 className="font-bold text-[#10103577]">{pet.name}</h1>
                  <h2 className="text-gray-700">{pet.race}</h2>
                </div>
              </div>
              <div className="flex w-1/3 justify-center items-center gap-2">
                <div className="cursor-pointer flex justify-center items-center">
                  <Link href={`/mostrar/${pet.id}`}>
                    <Image src={btnShow} alt="mostrar" />
                  </Link>
                </div>
                <div className="cursor-pointe flex justify-center items-center">
                  <Link href={`/update/${pet.id}`}>
                    <Image src={btnEdit} alt="editar" />
                  </Link>
                </div>
                <div
                  onClick={() => deletePet(pet.id)}
                  className="cursor-pointer flex justify-center items-center"
                >
                  <Image src={btnDelete} alt="eliminar" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default proteger(Page);
