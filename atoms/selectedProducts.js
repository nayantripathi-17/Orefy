import { atom } from "recoil";

const selectedProductState = atom({
  key: "selectedProducts",
  default: [],
});

const selectedBrandState = atom({
  key: "selectedBrands",
  default: new Set(),
});

const selectedCategoryState = atom({
  key: "selectedCategories",
  default: new Set(),
});

const selectedPriceState = atom({
  key: "selectedPrice",
  default: new Set(),
});

export {
  selectedProductState,
  selectedBrandState,
  selectedCategoryState,
  selectedPriceState,
};
