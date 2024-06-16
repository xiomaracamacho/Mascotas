import prisma from "@/libreria/prisma"
import { NextResponse } from "next/server"

export async function GET (request, {params}) {
    try {
        const id = parseInt(params.id)
        const user = await prisma.user.findFirst({
            where: {id : id}
        })
    
    if (!user) {
        return new NextResponse("Usuario no Encontrado", {status:404})
    } 
    return NextResponse.json(user)
    } catch (error) {
        return new NextResponse(error.message, {status:500})  
    }
}

export async function DELETE(request, { params }) {
    try {
        const id = parseInt(params.id);
        const result = await prisma.user.delete({
            where: { id: id }
        });

        if (result) {
            return new NextResponse(
                JSON.stringify({
                    message: `Usuario con ID ${id} eliminado correctamente`
                }),
                { status: 200, headers: { 'Content-Type': 'application/json' } }
            );
        } else {
            return new NextResponse(
                JSON.stringify({
                    message: `No se encontró ningún usuario con ID ${id}`
                }),
                { status: 404, headers: { 'Content-Type': 'application/json' } }
            );
        }
    } catch (error) {
        return new NextResponse(
            JSON.stringify({
                message: 'Error al eliminar el usuario',
                error: error.message
            }),
            { status: 500, headers: { 'Content-Type': 'application/json' } }
        );
    }
}

export async function PUT (request, {params}) {
    try {
        const id = parseInt(params.id)
        const data = await request.json()
        const result = await prisma.user.update({
            where: {id : id},
            data: data
        })
        if (!result) {
            return new NextResponse("Usuario no Actualizado", {status: 404})
        }
        return NextResponse.json({message: result}, {status: 200})
    } catch (error) {
        return new NextResponse(error.message, {status:500})  
    }
}