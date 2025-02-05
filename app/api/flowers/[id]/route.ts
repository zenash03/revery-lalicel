import { client } from "@/lib/appwrite";
import { Databases, ID, Query } from "appwrite";
import { NextResponse } from "next/server";

const database = new Databases(client);

async function fetchFlower(id: string) {
    try {
        const response = await database.getDocument(
            process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID as string,
            process.env.NEXT_PUBLIC_APPWRITE_COLLECTION_FLOWER_ID as string,
            id
        );
        return response;
    }
    catch (error) {
        console.error("Error fetching flower", error);
        throw new Error("Failed to fetch flower");
    }
}

async function deleteFlower(id: string) {
    try {
        const response = await database.deleteDocument(
            process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID as string,
            process.env.NEXT_PUBLIC_APPWRITE_COLLECTION_FLOWER_ID as string,
            id
        );
        return response;
    }
    catch (error) {
        console.error("Error deleting flower", error);
        throw new Error("Failed to delete flower");
    }
}

async function updateFlower(id: string, data: { name: string; basePrice: number; colors: [string]; size: string; image_url: string }) {
    try {
        const response = await database.updateDocument(
            process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID as string,
            process.env.NEXT_PUBLIC_APPWRITE_COLLECTION_FLOWER_ID as string,
            id,
            data
        );
        return response;
    }
    catch (error) {
        console.error("Error updating flower", error);
        throw new Error("Failed to update flower");
    }
}

export async function GET(
    req: Request, 
    { params }: { params: Promise<{ id: string}>}
) {
    try {
        const { id } = await params;
        const flower = await fetchFlower(id);

        return NextResponse.json([flower]);
    } catch (error) {
        return NextResponse.json({
            error: "Failed to fetch flower",
        }, { status: 500 });
    }
}

export async function DELETE(
    req: Request, 
    { params }: { params: Promise<{ id: string}>}
) {
    try {
        const { id } = await params;
        const response = await deleteFlower(id);

        return NextResponse.json({message: "Flower deleted"});
    } catch (error) {
        return NextResponse.json({
            error: "Failed to delete flower",
        }, { status: 500 });
    }
}

export async function PUT(
    req: Request, 
    { params }: { params: Promise<{ id: string}>}
) {
    try {
        const { id } = await params;
        const { name, basePrice, colors, size, image_url } = await req.json();
        const data = { name, basePrice, colors, size, image_url };
        const response = await updateFlower(id, data);

        return NextResponse.json({message: "Flower updated"});
    } catch (error) {
        return NextResponse.json({
            error: "Failed to update flower",
        }, { status: 500 });
    }
}