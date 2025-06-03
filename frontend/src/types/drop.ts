export interface IDrop {
  id: string;
  name: string;
  description: string;
  status: 'active' | 'coming-soon' | 'ended';
  releaseDate: Date;
  endDate?: Date;
  bannerImage: string;
  themeColors: {
    primary: string;
    secondary: string;
    accent: string;
  };
  products: IDropProduct[];
}

export interface IDropProduct {
  id: string;
  name: string;
  price: number;
  cover: string;
  category: string;
  isLimited?: boolean;
  stock?: number;
}
