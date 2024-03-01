import { MouseEventHandler } from "react";

export interface CustomButtonProps {
    title: string;
    containerStyles?: string;
    btnType?: 'button' | 'submit';
    handleClick?: MouseEventHandler<HTMLButtonElement>;
    textStyles?: string;
    rightIcon?: string;
}

export interface MediaCardProps {
    catImage: string;
    text?: string;
    loading: boolean;
}

export interface SelectValueProps{
    tagsArray: string[];
    onSelectChange: (value: string) => void;
}

export interface CustomFilterProps{
    tagsArrayResponse: string[];
}

export interface FilterProps{
    tag: string;
    text: string;
}