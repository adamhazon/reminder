export type Category = {
    id: string;
    icon: string;
    categoryName: string;
}

export type Group = {
    id: string;
    name: string;
}

export type CategoryGroup = {
    categories: Category[];
    group: Group;
}

export type Company = {
    id: string;
    companyName: string;
    externalLogoUrl: string;
}

export type Provider = {
    id: string;
    category: Category;
    company: Company;
}

export enum API {
    Category = 'https://api-gateway.remind.me/provider/category',
    Provider = 'https://api-gateway.remind.me/provider/categoryProvider/category/:id',
    CategoryGroup = 'https://api-gateway.remind.me/provider/categoryGroup',
}
