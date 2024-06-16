import prisma from "@/libreria/prisma"
import { NextResponse } from "next/server"

export async function GET (request, {params}) {
    try {
        const id = parseInt(params.id)
        const result = await prisma.race.findFirst({
            where : {id : id}
        })
        if (!result) {
            return new NextResponse("Raza no encontrada", {status: 404})
        }
        return NextResponse.json(result)
    } catch (error) {
        return new NextResponse(error.message, {status: 500})
    }
}

export async function DELETE(request, { params }) {
    try {
        const id = parseInt(params.id);
        const result = await prisma.raza.delete({
            where: { id: id }
        });
        return new NextResponse(
            JSON.stringify({
                message: 'Raza eliminada correctamente',
                deletedRaza: result
            }),
            { status: 200, headers: { 'Content-Type': 'application/json' } }
        );
    } catch (error) {
        return new NextResponse(
            JSON.stringify({
                message: 'Error al eliminar la raza',
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
        const result = await prisma.raza.update({
            where: { id: id },
            data: data
        });
        return new NextResponse(
            JSON.stringify({
                message: 'Raza actualizada correctamente',
                updatedRaza: result
            }),
            { status: 200, headers: { 'Content-Type': 'application/json' } }
        );
    } catch (error) {
        return new NextResponse(
            JSON.stringify({
                message: 'Error al actualizar la raza',
                error: error.message
            }),
            { status: 500, headers: { 'Content-Type': 'application/json' } }
        );
    }
}