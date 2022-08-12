import { atom } from "recoil";

const productState = atom({
    key: "products",
    default: []
})

const brandState = atom({
    key: "brands",
    default: []
})

const categoryState = atom({
    key: "categories",
    default: []
})

export { productState, brandState, categoryState }