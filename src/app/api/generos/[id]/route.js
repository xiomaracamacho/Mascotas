import prisma from "@/libreria/prisma"
import { NextResponse } from "next/server"

export async function GET (request, {params}) {
    try {
        const id = parseInt(params.id)
        const result = await prisma.gender.findFirst({
            where : {id : id}
        })
        if (!result) {
            return new NextResponse("Género no Encontrado", {status: 404})
        }
        return NextResponse.json(result)
    } catch (error) {
        return new NextResponse(error.message, {status: 500})
    }
}


export async function DELETE(request, { params }) {
    try {
        const id = parseInt(params.id);
        const result = await prisma.gender.delete({
            where: { id: id }
        });
        return new NextResponse(
            JSON.stringify({
                message: `Género con ID ${id} eliminado correctamente`,
                result: result
            }),
            { status: 200, headers: { 'Content-Type': 'application/json' } }
        );
    } catch (error) {
        return new NextResponse(
            JSON.stringify({
                message: `Error al eliminar género con ID ${parseInt(params.id)}`,
                error: error.message
            }),
            { status: 500, headers: { 'Content-Type': 'application/json' } }
        );
    }
}


export async function PUT(request, { params }) {
    try {
        const id = parseInt(params.id);
        const data = await request.json();
        const result = await prisma.gender.update({
            where: { id: id },
            data: data
        });
        return new NextResponse(
            JSON.stringify({
                message: `Género con ID ${id} actualizado correctamente`,
                result: result
            }),
            { status: 200, headers: { 'Content-Type': 'application/json' } }
        );
    } catch (error) {
        return new NextResponse(
            JSON.stringify({
                message: `Error al actualizar género con ID ${parseInt(params.id)}`,
                error: error.message
            }),
            { status: 500, headers: { 'Content-Type': 'application/json' } }
        );
    }
}