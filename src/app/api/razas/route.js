import prisma from "@/libreria/prisma"
import { NextResponse } from "next/server"

export async function POST(request) {
    try {
        const data = await request.json();
        const newRaza = await prisma.raza.create({
            data: data
        });
        return new NextResponse(
            JSON.stringify({
                message: 'Raza registrada correctamente',
                newRaza: newRaza
            }),
            { status: 200, headers: { 'Content-Type': 'application/json' } }
        );
    } catch (error) {
        return new NextResponse(
            JSON.stringify({
                message: 'Error al registrar la raza',
                error: error.message
            }),
            { status: 500, headers: { 'Content-Type': 'application/json' } }
        );
    }
}
export async function GET () {
    try {
        const razas = await prisma.race.findMany()
        return NextResponse.json({datos: razas}, {status: 200})
    } catch (error) {
        return new NextResponse(error.message, {status: 500})
    }
}