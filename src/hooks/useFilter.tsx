import { IUseFilter } from "@/interfaces/hooks/IUseFilter";
import useLocalStorage from "./useLocalStorage";
import { useCallback, useState } from "react";
import { IValueFilter } from "@/interfaces/components/context/IStorageContext";

export default function useFilter(): IUseFilter {
  const {
    addFilter: updateFilterFromStorage,
    categoryFilter,
    filter,
    updateCatergoryFilter,
		updateValueFilter: updateValueFilterFromStorage,
  } = useLocalStorage();
  const [ctgFilter, setCtgFilter] = useState<Map<string, string>>(new Map());
	const [valueFilter, setValueFilter] = useState<IValueFilter>({
			min: null,
			max: null,
		});

  //Funciones de filtro
  const addFilter = useCallback(
    (filter: string) => {
      updateFilterFromStorage(filter);
    },
    [updateFilterFromStorage]
  );

  const addCategoryFilter = useCallback((category: string) => {
		const newCategoryFilter = new Map(ctgFilter);
		newCategoryFilter.set(category, category);
		setCtgFilter(newCategoryFilter);
		updateCatergoryFilter(newCategoryFilter);
  }, [ctgFilter, updateCatergoryFilter]);

  const removeCategoryFilter = useCallback((category: string) => {
		const newCategoryFilter = new Map(ctgFilter);
		newCategoryFilter.delete(category);
		setCtgFilter(newCategoryFilter);
		updateCatergoryFilter(newCategoryFilter);
  }, [ctgFilter, updateCatergoryFilter]);

	const updateValueFilter = useCallback((min: number | null, max: number | null) => {
		setValueFilter({ min, max });
		const minNum = min ?? 0;
		const maxNum = max ?? Infinity;
		updateValueFilterFromStorage(minNum, maxNum);
	}, [updateValueFilterFromStorage]);

  return {
		updateValueFilter,
		valueFilter,
    addCategoryFilter,
    addFilter,
    categoryFilter,
    filter,
    removeCategoryFilter,
  };
  // Implementation would go here
}
