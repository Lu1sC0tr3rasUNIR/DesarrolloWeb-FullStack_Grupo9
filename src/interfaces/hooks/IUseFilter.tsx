import { IValueFilter } from "../components/context/IStorageContext";

export interface IUseFilter {
    categoryFilter: Map<string, string>;
    addCategoryFilter: (category: string) => void;
    removeCategoryFilter: (category: string) => void;
    addFilter: (filter: string) => void;
    filter: string;
    valueFilter: IValueFilter;
    updateValueFilter: (min: number | null, max: number | null) => void;
}