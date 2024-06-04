"use client";

import Link from 'next/link'
import { IoCloseSharp } from "react-icons/io5";
import axios from 'axios';
import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';

function page() {

 const [mascota, setMascota] = useState([])
 const {id} = useParams();

 const getMascota = async () => {
    try {
        const respuesta = await axios.get(`http://localhost:3000/api/mascotas/${id}`)
    setMascota(respuesta.data)
    } catch (error) {
        console.log(error.reponse.data);
    }
 }

 useEffect(() => {
    getMascota()
 }, [])

  return (
    <div className='bg-back-image bg-auto w-full h-screen flex  flex-col p-3 gap-3'>
    <div className='flex h-12 w-full justify-center items-center gap-4' >
    <h1 className='text-white text-center w-full'>Consultar mascota</h1>
     <button className='bg-white p-2 text-xl rounded-full w-8 h-8 flex  justify-center items-center'>
         <Link href="/"><IoCloseSharp /></Link>
     </button>
    </div>
    <div className='h-64 flex justify-center items-center'>
        <div className='bg-gray-300 rounded-full w-40 h-40 text-center'>{mascota.photo}</div>
        </div>
            <div className="flex flex-col items-center gap-3">
            <div className=' flex w-full'>
                <div className=' bg-[#ffffff56]  flex items-center justify-center p-2 w-[150px]'><h1 className='font-bold text-white'>Nombre:</h1></div>
                <input  className='p-3 bg-[#ffffff82] placeholder:text-[#333a60] w-full rounded-r-lg' type="text" value={mascota.name} />
            </div>
            <div className=' flex w-full'>
                <div className='  bg-[#ffffff56]  flex items-center justify-center p-2 w-[150px]'><h1 className='font-bold text-white'>Raza:</h1></div>
                <input className='p-3 w-full bg-[#ffffff82] placeholder:text-[#333a60] rounded-r-lg' type="text"  value={mascota.fk_race?.name}  />
            </div>
            <div className=' flex w-full'>
                <div className='  bg-[#ffffff56]  flex items-center justify-center p-2 w-[150px]'><h1 className='font-bold text-white'>Categoría:</h1></div>
                <input className='p-3 w-full bg-[#ffffff82] placeholder:text-[#333a60] rounded-r-lg' type="text" value={mascota.fk_category?.name} />
            </div>
            <div className=' flex w-full'>
                <div className='  bg-[#ffffff56]  flex items-center justify-center p-2 w-[150px]'><h1 className='font-bold text-white'>Género:</h1></div>
                <input className='p-3 w-full bg-[#ffffff82] placeholder:text-[#333a60] rounded-r-lg' type="text" value={mascota.fk_gender?.name} />
            </div>  
    </div>
 </div>
  )
}

export default page