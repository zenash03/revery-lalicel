import { client } from "@/lib/appwrite";
import { Databases, ID, Query } from "appwrite";
import { NextResponse } from "next/server";

const database = new Databases(client);


async function fetchColor(id: string) {
    try {
        const response = await database.getDocument(
            process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID as string,
            process.env.NEXT_PUBLIC_APPWRITE_COLLECTION_COLOR_ID as string,
            id
        );
        return response;
    }
    catch (error) {
        console.error("Error fetching color", error);
        throw new Error("Failed to fetch color");
    }
}

async function deleteColor(id: string) {
    try {
        const response = await database.deleteDocument(
            process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID as string,
            process.env.NEXT_PUBLIC_APPWRITE_COLLECTION_COLOR_ID as string,
            id
        );
        return response;
    }
    catch (error) {
        console.error("Error deleting color", error);
        throw new Error("Failed to delete color");
    }
}

async function updateColor(id: string, data: { name: string; hexColor: string }) {
    try {
        const response = await database.updateDocument(
            process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID as string,
            process.env.NEXT_PUBLIC_APPWRITE_COLLECTION_COLOR_ID as string,
            id,
            data
        );
        return response;
    }
    catch (error) {
        console.error("Error updating color", error);
        throw new Error("Failed to update color");
    }
}

export async function GET(
    req: Request, 
    { params }: { params: Promise<{ id: string}> }
) {
    try {
        const { id } = await params;
        const color = await fetchColor(id);
        return NextResponse.json({color});
    }
    catch (error) {
        return NextResponse.json({
            error: "Failed to fetch color",
        }, { status: 500 });
    }
}

export async function DELETE(
    req: Request, 
    { params }: { params: Promise<{ id: string}> }
) {
    try {
        const { id } = await params;
        const response = await deleteColor(id);
        return NextResponse.json({message: "Color deleted"});
    }
    catch (error) {
        return NextResponse.json({
            error: "Failed to delete color",
        }, { status: 500 });
    }
}

export async function PUT(
    req: Request, 
    { params }: { params: Promise<{ id: string}> }
) {
    try {
        const { id } = await params;
        const { name, hexColor } = await req.json();
        const data = {name, hexColor};
        const response = await updateColor(id, data);
        return NextResponse.json({message: "Color updated"});
    }
    catch (error) {
        return NextResponse.json({
            error: "Failed to update color",
        }, { status: 500 });
    }
}
