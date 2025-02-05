import { client } from "@/lib/appwrite";
import { Databases, ID, Query } from "appwrite";
import { NextResponse } from "next/server";

const database = new Databases(client);

async function createFlowers(data: {name: string, basePrice: number, colors: [string], stems: number, image_url: string}) {
    try {
        const response = await database.createDocument(
            process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID as string,
            process.env.NEXT_PUBLIC_APPWRITE_COLLECTION_FLOWER_ID as string,
            ID.unique(),
            {
                name: data.name,
                basePrice: data.basePrice,
                colors: data.colors,
                stems: data.stems,
                image_url: data.image_url
            }
        );
        return response;
    }
    catch (error) {
        console.error("Error creating flower", error);
        throw new Error("Failed to create flower");
    }
}

async function fetchFlowers() {
    try {
        const response = await database.listDocuments(
            process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID as string,
            process.env.NEXT_PUBLIC_APPWRITE_COLLECTION_FLOWER_ID as string,
            [Query.orderDesc("$createdAt")]
        );
        return response.documents;
    }
    catch (error) {
        console.error("Error fetching flowers", error);
        throw new Error("Failed to fetching flowers");
    }
}

export async function POST(req: Request) {
    try {
        const { name, basePrice, colors, stems, image_url } = await req.json();
        const data = { name, basePrice, colors, stems, image_url };
        const response = await createFlowers(data);

        return NextResponse.json(response);
    }
    catch (error) {
        return NextResponse.json({
            error: "Failed to create flower",
        }, { status: 500 });
    }
}

export async function GET() {
    try {
        const flowers = await fetchFlowers();
        return NextResponse.json(flowers);
    }
    catch (error) {
        return NextResponse.json({
            error: "Failed to fetch flowers",
        }, { status: 500 });
    }
}