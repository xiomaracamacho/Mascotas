import prisma from "@/lib/prisma"
import { NextResponse } from "next/server"
import { writeFile } from "fs/promises"
import path from "path"

// export async function POST (request) {
//     try {
//         const data = await request.formData()
//         const image = data.get("photo")

//         const textImg = await image.arrayBuffer()
//         const buffer = Buffer.from(textImg)

//         const rutaImg = path.join(process.cwd(), 'public', image.name) 
//          await writeFile(rutaImg, buffer)

//         const pet = await prisma.mascota.create({
//             name: data.get("name"),
//             photo: image.name,
//             race_id: data.get("race_id"),
//             category_id: data.get("category_id"),
//             gender_id: data.get("gender_id"),
            
//         })

//         return  new NextResponse(JSON.stringify(pet), {
//             headers: {"Content-Type":"application/json"},
//             status: 200
//         })
//     } catch (error) {
//         return new NextResponse(error.message, {status:500})
//     }
// }
export async function POST (request) {
    try {
        const data = await request.json()

        const pet = await prisma.mascota.create(({
          data: data
      }))

        return  new NextResponse(JSON.stringify(pet), {
            headers: {"Content-Type":"application/json"},
            status: 200
        })
    } catch (error) {
        return new NextResponse(error.message, {status:500})
    }
}



export async function GET() {
    try {
      const pets = await prisma.mascota.findMany({
        include: {
          fk_race: true,
          fk_category: true,
          fk_gender: true,
        },
      });
  
      const formattedPets = pets.map(pet => ({
        id: pet.id,
        race: pet.fk_race.name,
        category: pet.fk_category.name,
        photo: pet.photo,
        gender: pet.fk_gender.name,
        name: pet.name,
      }));
  
      return NextResponse.json({ datos: formattedPets }, { status: 200 });
    } catch (error) {
      return new NextResponse(error.message, { status: 500 });
    }
  }