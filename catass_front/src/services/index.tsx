import { FilterProps } from "@/types";
const API_URL = process.env.NEXT_PUBLIC_BACKEND_URL;

export async function fetchTags() {
    console.log("Fetching tags...", API_URL);
    const url = `${API_URL}/cat-image/tags`;
    const response = await fetch(url);

    const result = await response.json();
    return result;
}

export async function fetchCat({ tag, text }: FilterProps): Promise<string> {
    const url = new URL(`${API_URL}/cat-image`);
    if (tag?.length > 0) {
        url.searchParams.append('tag', tag);
    }
    if (text?.length > 0) {
        url.searchParams.append('text', text);
    }

    const response = await fetch(url.toString());
    if (!response.ok) {
        throw new Error('Failed to fetch cat image');
    }

    if (response.headers.get('Content-Type')?.includes('image')) {
        const buffer = await response.arrayBuffer();
        const blob = new Blob([buffer]);
        return URL.createObjectURL(blob);
    } else {
        const data = await response.json();
        return data.value.imageUrl;
    }
}

export async function autocompleteText(text: string): Promise<string[]> {
    const url = new URL(`${API_URL}/cat-image/autocomplete`);
    url.searchParams.append('text', text);
    const response = await fetch(url.toString());
    if (!response.ok) {
        throw new Error('Failed to autocomplete text');
    }

    return response.json();
}