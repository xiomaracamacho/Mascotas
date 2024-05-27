"use client";

import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import camera from "../img/photo-lg-0.svg"
import btnSave from "../img/btn-save.svg"
import arrows from "../img/arrows.svg"
import btnClose from "../img/btn-close.svg"
import Image from 'next/image'
import axios from 'axios';

function page() {

  const [razas, setRazas] = useState([])
  const [category, setCategory] = useState([])
  const [genders, setGenders] = useState([])
  const [file, setFile] = useState(null)
  const [pet, setPet] = useState([])

  const getRazas = async () => {
    try {
      const razas = await axios.get("http://localhost:3000/api/razas");
      const respuesta = razas.data.datos;
      setRazas(respuesta)
    } catch (error) {
      console.log(error);
    }
  }
  const getCategory = async () => {
    try {
      const razas = await axios.get("http://localhost:3000/api/categorias");
      const respuesta = razas.data.datos;
      setCategory(respuesta)
    } catch (error) {
      console.log(error);
    }
  }
  const getGenders = async () => {
    try {
      const razas = await axios.get("http://localhost:3000/api/generos");
      const respuesta = razas.data.datos;
      setGenders(respuesta)
    } catch (error) {
      console.log(error);
    }
  }

  const postMascota = async (event) => {
    event.preventDefault();
    try {
      const formData = new FormData();
      formData.append('name', mascota.name)
      formData.append('race_id', mascota.race)
      formData.append('category_id', mascota.category)
      formData.append('gender_id', mascota.gender)
      formData.append('photo', file)

      const pet = await axios.post("http://localhost:3000/api/mascotas", formData, {
        headers: { 'Content-Type': 'multipart/form-data'}
      })
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    getRazas();
    getCategory();
    getGenders();
  }, [])


  return (
    <div className='bg-back-image bg-auto bg-no-repeat w-full h-screen flex  flex-col p-3 gap-3'>
    <div className='flex h-12 w-full justify-center items-center gap-4' >
    <h1 className='text-white text-center w-full'>Administrar mascotas</h1>
       <Link href="/">
          <Image
          src={btnClose}
          />
         </Link>
    </div>
    <div className='h-64 flex justify-center items-center'>
         <div className='rounded-full w-32 h-32 bg-green-100 flex justify-center items-center'>
         {
            file && file ? (
            <Image
            className='rounded-full w-full'
            src={URL.createObjectURL(file)}
            width={100}
            height={100}
            />
          ): 
            <Image
            src={camera}
            />
          }
         </div>
         
        </div>
    <div className="">
        <form className='flex flex-col items-center gap-3'>
            <input className='p-3 w-full bg-[#ffffffa5] outline-none placeholder:text-[#252f7c] rounded-[30px]' type="text"placeholder='Nombre' />
            <select className='p-3 w-full bg-[#ffffffa5] outline-none   rounded-[30px]' name="">
              <option value="">Seleccione Raza...</option>
              {
                razas.map(raza => (
                  <option key={raza.id} value="">
                    {raza.name}
                  </option>
                ))
              }
            </select>
            <select className='p-3 w-full bg-[#ffffffa5] outline-none  rounded-[30px]' name="">
              <option value="">Seleccione Categoría...</option>
              {
                category.map(category => (
                  <option key={category.id} value="">
                    {category.name}
                  </option>
                ))
              }
            </select>
            <input
            onChange={(e) => {
              setFile(e.target.files[0])
            }}
            className='p-3 w-full bg-[#ffffffa5] outline-none placeholder:text-[#252f7c] rounded-[30px]' type="file" placeholder='Subir Foto' />
            <select className='p-3 w-full bg-[#ffffffa5] outline-none  rounded-[30px]' name="">
              <option value="">Seleccione Género...</option>
              {
                genders.map(gender => (
                  <option key={gender.id} value="">
                    {gender.name}
                  </option>
                ))
              }
            </select>
         </form>
    </div>
    <div>
     <Link href="/pets">
        <Image src={btnSave} />
     </Link>
    </div>
 </div>
  )
}

export default page