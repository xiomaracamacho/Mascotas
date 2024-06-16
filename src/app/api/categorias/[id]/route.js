import prisma from "@/libreria/prisma"
import { NextResponse } from "next/server"

export async function GET (request, {params}) {
    try {
        const id = parseInt(params.id)
        const result = await prisma.category.findFirst({
            where : {id : id}
        })
        if (!result) {
            return new NextResponse("Categoría no Encontrada", {status: 404})
        }
        return NextResponse.json(result)
    } catch (error) {
        return new NextResponse(error.message, {status: 500})
    }
}

export async function DELETE(request, { params }) {
    try {
        const id = parseInt(params.id);
        const result = await prisma.category.delete({
            where: { id: id }
        });
        return new NextResponse(
            JSON.stringify({
                message: `Categoría con ID ${id} eliminada correctamente`,
                result: result
            }),
            { status: 200, headers: { 'Content-Type': 'application/json' } }
        );
    } catch (error) {
        return new NextResponse(
            JSON.stringify({
                message: `Error al eliminar categoría con ID ${parseInt(params.id)}`,
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
        const result = await prisma.category.update({
            where: { id: id },
            data: data
        });
        return new NextResponse(
            JSON.stringify({
                message: `Categoría con ID ${id} actualizada correctamente`,
                result: result
            }),
            { status: 200, headers: { 'Content-Type': 'application/json' } }
        );
    } catch (error) {
        return new NextResponse(
            JSON.stringify({
                message: `Error al actualizar categoría con ID ${parseInt(params.id)}`,
                error: error.message
            }),
            { status: 500, headers: { 'Content-Type': 'application/json' } }
        );
    }
}