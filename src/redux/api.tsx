export type Category = {
    id: string;
    icon: string;
    categoryName: string;
    sortPriority: number;
}

export type Group = {
    id: string;
    name: string;
    sortPriority: number;
}

export type CategoryGroup = {
    categories: Category[];
    group: Group;
}

export type Company = {
    id: string;
    companyName: string;
    externalLogoUrl: string;
    sortPriority: number;
}

export type Provider = {
    id: string;
    category: Category;
    company: Company;
    sortPriority: number;
}

export enum API {
    Category = 'https://api-gateway.remind.me/provider/category',
    Provider = 'https://api-gateway.remind.me/provider/categoryProvider/category/:id',
    CategoryGroup = 'https://api-gateway.remind.me/provider/categoryGroup',
}
