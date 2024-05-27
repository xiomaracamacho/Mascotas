"use client";

import { useEffect, useState } from 'react'
import Link from 'next/link'
import axios from 'axios'
import { FaSearch, FaPencilAlt } from "react-icons/fa";
import { RiDeleteBin5Fill } from "react-icons/ri";
import btnAdd from "../img/btn-add.svg";
import btnClose from "../img/btn-close.svg";
import btnDelete from "../img/btn-delete.svg";
import btnEdit from "../img/btn-edit.svg";
import btnShow from "../img/btn-show.svg";

import Image from 'next/image';

function page() {

  const [mascotas, setMascotas] = useState([])

  const getMascotas = async () => {
    const respuesta = await axios.get("http://localhost:3000/api/mascotas")
    const data = respuesta.data.datos;
    setMascotas(data)
  }

  const deleteMascota = async (id) => {
    await axios.delete(`http://localhost:3000/api/mascotas/${id}`)
    getMascotas();
    return alert("mascota eliminada")
  }
  useEffect (() => {
    getMascotas()
  },[])


  return (
    <div className='bg-back-image bg-auto w-full h-screen flex  flex-col p-3 gap-3'>
       <div className='flex h-12 w-full justify-center items-center gap-4' >
       <h1 className='text-white text-center w-full'>Administrar mascotas</h1>
             <Link href="/">
            <Image
        src={btnClose}
        />
           </Link>
       </div>
       <div>
        <Link href="/registrar">
          <Image
          src={btnAdd}
          />
        </Link>
       </div>
       <div>
       </div>
       {
        mascotas.map(mascota => (
          <div className='bg-[#ffffff81] rounded-xl flex '>
          <div key={mascota.id} className='flex w-1/2 p-3 
          
          justify-center items-center gap-2'>
            <div className='h-20 w-20 bg-white rounded-full flex justify-center items-center'>{mascota.photo}</div>
            <div className="flex flex-col">
              <h1 className='font-bold text-blue-800'>{mascota.name}</h1> 
              <h2 className='text-gray-700'>{mascota.race}</h2>
              </div>
          </div>
          <div className='flex w-1/2 justify-center items-center gap-2'>
            <div className='cursor-pointer flex justify-center items-center'>
              <Link href="/mostrar">
              <Image 
              src={btnShow}
              />
              </Link>
            </div>
            <div className='cursor-pointe flex justify-center items-center '>
            <Image 
              src={btnEdit}
              />
            </div>
            <div
            onClick={() => deleteMascota(mascota.id)}
            className='cursor-pointerflex justify-center items-center'>
              <Image 
              src={btnDelete}
              />
            </div>
          </div>
       </div>
        ))
       
        }
    </div>
  )
}

export default page