import { client } from "@/lib/appwrite";
import { Databases, ID, Query } from "appwrite";
import { NextResponse } from "next/server";

const database = new Databases(client);

// Create Colors
async function createColor(data: { name: string; hexColor: string }) {
    try {
        const response = await database.createDocument(
        process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID as string,
        process.env.NEXT_PUBLIC_APPWRITE_COLLECTION_COLOR_ID as string,
        ID.unique(),
        data
    );
    return response;

    } catch (error) {
        console.error("Error creating color", error);
        throw new Error("Failed to create color");
    }
}

async function fetchColor() {
    try {
      const response = await database.listDocuments(
        process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID as string,
        process.env.NEXT_PUBLIC_APPWRITE_COLLECTION_COLOR_ID as string,
        [Query.orderDesc("$createdAt")]
    );
  
    return response.documents;
    
    } catch (error) {
        console.error("Error fetching colors", error);
        throw new Error("Failed to fetching colors");
    }
}


export async function POST(req: Request) {
    try {
        const { name, hexColor } = await req.json();
        const data = {name, hexColor};
        const response = await createColor(data);

        return NextResponse.json(response);
        }
    catch (error) {
        return NextResponse.json({
            error: "Failed to create color",
        }, { status: 500 })
    }
}

export async function GET() {
    try {
        const colors = await fetchColor();
        return NextResponse.json(colors);
    } catch (error) {
        return NextResponse.json({
            error: "Failed to fetch colors",
        }, { status: 500 });
    }
}