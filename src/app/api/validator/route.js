import prisma from "@/libreria/prisma";
import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs"; 


export async function POST(request) {
  try {
    const user = await request.json();

    const result = await prisma.user.findFirst({
      where: {
        email: user.email,
      }
    });

    if (!result) {
      return NextResponse.json(
        {
          message: "Usuario no encontrado"
        },
        {
          status: 404
        }
      );
    }

  
    const isPasswordValid = await bcrypt.compare(user.password, result.password);
    
    if (!isPasswordValid) {
      return NextResponse.json(
        {
          message: "Contraseña incorrecta"
        },
        {
          status: 401
        }
      );
    }

    const token = jwt.sign({ usuario: result }, "secreto", { expiresIn: '1h' });

    console.log("token:", token);

    const respuesta = {
      user: result, 
      token: token
    };

    return new NextResponse(JSON.stringify(respuesta), {
      headers: { "Content-Type": "application/json" },
      status: 201
    });
  } catch (error) {
    return new NextResponse(error.message, { status: 500 });
  }
}
