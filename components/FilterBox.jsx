import FormatListBulletedIcon from "@mui/icons-material/FormatListBulleted";
import { useEffect } from "react";
import { useRecoilState } from "recoil";
import { productState, brandState, categoryState } from "../atoms/products";
import { searchState } from "../atoms/rankSearch";
import { selectedBrandState, selectedCategoryState, selectedPriceState, selectedProductState } from "../atoms/selectedProducts";
import Filters from "./Filters";

function FilterBox() {
  const [products, setProducts] = useRecoilState(productState);
  const [brands, setBrands] = useRecoilState(brandState);
  const [categories, setCategories] = useRecoilState(categoryState);
  const [selectedBrand, setSelectedBrand] = useRecoilState(selectedBrandState);
  const [selectedCategory, setSelectedCategory] = useRecoilState(selectedCategoryState);
  const [selectedPrice, setSelectedPrice] = useRecoilState(selectedPriceState);
  const [selectedProduct, setSelectedProduct] = useRecoilState(selectedProductState);
  const [search, setSearch] = useRecoilState(searchState)
  
  const prices = ["<$100","$100-$200","$200-$600","$600-$1000",">$1000"]

  const set = ()=>{
    if (
      products.length > 0 &&
      (selectedCategory.size !== 0 || selectedBrand.size !== 0 || selectedPrice.size !== 0)
      ) {
        setSearch("")
        const filteredProducts = products.filter(product => {
            if(selectedBrand.size!==0) {
                if (!selectedBrand.has(product.brand)) return false
            }        
            if(selectedCategory.size!==0) {
                if (!selectedCategory.has(product.category)) return false
            }        
            if(selectedPrice.size!==0) {
                if (selectedPrice.has("<$100")){
                  return product.price <= 100
                }
                if (selectedPrice.has("$100-$200")){
                  return product.price >= 100 && product.price <= 200
                }
                if (selectedPrice.has("$200-$600")){
                  return product.price >= 200 && product.price <= 600
                }
                if (selectedPrice.has("$600-$1000")){
                  return product.price >= 600 && product.price <= 1000
                }
                if (selectedPrice.has(">$1000")){
                  return product.price >= 1000
                }
            }  
            return true      
        })
        setSelectedProduct(filteredProducts)
      }
      if(products.length > 0 && selectedCategory.size === 0 && selectedBrand.size === 0 && selectedPrice.size === 0 && search==="") {
        setSelectedProduct(products)
      }
  }

  const searchChange = ()=>{
   if(products.length>0 && search!==""){
      setSelectedBrand(new Set())
      setSelectedCategory(new Set())
      setSelectedPrice(new Set())
      
      const filteredProducts = products.filter(product=>{
        return (String(product?.title).toLowerCase().indexOf(search.toLowerCase())===0)
      })
      setSelectedProduct(filteredProducts)
    }
    if(products.length>0 && search==="" && selectedCategory.size===0 && selectedBrand.size===0 && selectedPrice.size===0) {
      setSelectedProduct(products)
    }
  }

  useEffect(()=>{
    searchChange();
  },[search])

  useEffect(()=>{
    set()
  },[products,selectedBrand,selectedCategory,selectedPrice])

  const addBrand = async (brand) => {
    if(selectedBrand.has(brand)){
      setSelectedBrand(prevSelectedBrand=>{
        const newBrand = new Set()
        prevSelectedBrand.forEach((oldBrand)=>{
          if(oldBrand!==brand) newBrand.add(oldBrand)
        })

        return newBrand
      });
    }
    else{
      setSelectedBrand(prevSelectedBrand=>{
        const newBrand = new Set()
        prevSelectedBrand.forEach((oldBrand)=>{
          newBrand.add(oldBrand)
        })
        newBrand.add(brand)

        return newBrand
      });
    }
  }

  const addCategory = (category) => {
    if(selectedCategory.has(category)){
      setSelectedCategory(prevSelectedCategory=>{
        const newCategory = new Set()
        prevSelectedCategory.forEach((oldCategory)=>{
          if(oldCategory!==category) newCategory.add(oldCategory)
        })
        return newCategory
      });
    }
    else{
      setSelectedCategory(prevSelectedCategory=>{
        const newCategory = new Set()
        prevSelectedCategory.forEach((oldCategory)=>{
          newCategory.add(oldCategory)
        })
        newCategory.add(category)

        return newCategory
    });
    }
  }

  const addPrice = (price) => {
    if(selectedPrice.has(price)){
      setSelectedPrice(prevSelectedPrice=>{
        const newPrice = new Set()
        prevSelectedPrice.forEach((oldPrice)=>{
          if(oldPrice!==price) newPrice.add(oldPrice)
        })
        return newPrice
      });
    }
    else{
      setSelectedPrice(prevSelectedPrice=>{
        const newPrice = new Set()
        prevSelectedPrice.forEach((oldPrice)=>{
          newPrice.add(oldPrice)
        })

        newPrice.add(price)
        return newPrice
      });      
    }
  }


  useEffect(() => {
    const fetchProducts = async () => {
      const res = await (await fetch("./data.json")).json();
      setProducts(res?.products);
    };
    fetchProducts();
  }, [setProducts]);

  useEffect(() => {
    if (products.length > 0) {
      setBrands([...new Set(products.map((item) => item.brand))]);
    }
  }, [products, setBrands]);

  useEffect(() => {
    if (products.length > 0) {
      setCategories([...new Set(products.map((item) => item.category))]);
    }
  }, [products, setCategories]);

  return (
    <>
      <div className="flex flex-grow items-center justify-between font-semibold py-3 px-5 text-xl border-gray-300 border-b-2">
        <p>Filter</p>
        <FormatListBulletedIcon />
      </div>
      {brands.length !== 0 && (
        <Filters filterName="Brand" filters={brands} addItem={addBrand} selectedFilters={selectedBrand} />
      )}
      {categories.length !== 0 && (
        <Filters filterName="Category" filters={categories} addItem={addCategory} selectedFilters={selectedCategory} />
      )}
      {prices.length !== 0 && (
        <Filters filterName="Price" filters={prices} addItem={addPrice} selectedFilters={selectedPrice} />
      )}
    </>
  );
}

export default FilterBox;
