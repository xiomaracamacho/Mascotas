import prisma from "@/libreria/prisma"
import { NextResponse } from "next/server"

export async function POST(request) {
    try {
        const data = await request.json();
        const categoria = await prisma.category.create({
            data: data
        });
        return new NextResponse(
            JSON.stringify({
                message: 'Categoría registrada correctamente',
                data: categoria
            }),
            {
                headers: { 'Content-Type': 'application/json' },
                status: 200
            }
        );
    } catch (error) {
        return new NextResponse(
            JSON.stringify({
                message: 'Error al registrar categoría',
                error: error.message
            }),
            { status: 500 }
        );
    }
}

export async function GET () {
    try {
        const categorias = await prisma.category.findMany()
        return NextResponse.json({datos: categorias}, {status: 200})
    } catch (error) {
        return new NextResponse(error.message, {status: 500})
    }
}