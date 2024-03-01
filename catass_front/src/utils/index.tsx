import { FilterProps } from "@/types";
import html2canvas from "html2canvas";

export async function fetchTags(){
    const url = `http://localhost:4000/cat-image/tags`;
    const response = await fetch(url);
    const result = await response.json();
    return result;
}

export async function fetchCat({tag, text}: FilterProps){
    const url = new URL(`http://localhost:4000/cat-image`);
    if(tag?.length > 0){
        url.searchParams.append('tag', tag);
    }
    if(text?.length > 0){
        url.searchParams.append('text', text);
    }

    const response = await fetch(url);
    if (response.headers.get('Content-Type')?.includes('image')) {
        const buffer = await response.arrayBuffer();
        const blob = new Blob([buffer]);
        const objectUrl = URL.createObjectURL(blob);
        return objectUrl;
      }else if(response.status === 404) {
        return '/404_cat.jpg';
      }
      else {
        const data = await response.json();
        return data?.value?.imageUrl;
      }
}

export async function autocompleteText(text: string) {
    const url = new URL(`http://localhost:4000/cat-image/autocomplete`);
    url.searchParams.append('text', text);
    const response = await fetch(url);

    const result = await response.json();

    return result;
    
}


export function sortDataAscending(data: string[]): string[] {
    const sortedData = [...data].sort((a, b) => a.localeCompare(b));
    return sortedData;
}

export const handleDownload = async (elementSelector: string) => {
    const element = document.querySelector(elementSelector) as HTMLButtonElement; 

    if (element instanceof HTMLElement) {
      const canvas = await html2canvas(element);
      const link = document.createElement('a');
      link.href = canvas.toDataURL('image/jpeg');
      link.download = `cataas${Date.now()}_image.jpg`;
      link.click();
    } else {
      console.error(`Elemento ${elementSelector} não encontrado.`);
    }
  };
