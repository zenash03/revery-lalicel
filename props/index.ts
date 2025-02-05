export interface ColorProps {
    $id: string;
    name: string;
    hexColor: string;
}

export interface FlowerProps {
    $id: string;
    name: string;
    basePrice: number;
    colors: [ColorProps];
    stems: number;
    image_url: [string];
}

// ...existing code...
