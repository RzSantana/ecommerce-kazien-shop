import { DropStatus } from "../../generated/prisma";

export interface CreateDropData {
    name: string;
    description: string;
    status?: DropStatus;
    releaseDate: string | Date;
    endDate?: string | Date;
    bannerImage: string;
    primaryColor: string;
    secondaryColor: string;
    accentColor: string;
}

export interface UpdateDropData {
    name?: string;
    description?: string;
    status?: DropStatus;
    releaseDate?: string | Date;
    endDate?: string | Date;
    bannerImage?: string;
    primaryColor?: string;
    secondaryColor?: string;
    accentColor?: string;
}

export interface AddProductToDropData {
    dropId: string;
    productId: string;
    dropPrice?: number;
    isLimited?: boolean;
}
