import { Card, CardMedia, MenuItem, Rating, Select } from "@mui/material";
import { useRecoilState } from "recoil";
import { rankState, searchState } from "../atoms/rankSearch";
import { selectedProductState } from "../atoms/selectedProducts";

function ProductPage() {
  const [selectedProduct, setSelectedProduct] = useRecoilState(selectedProductState);
  const [rank, setRank] = useRecoilState(rankState);

  return (
    selectedProduct.length !== 0 && (
      <>
        <div className="flex flex-grow justify-end pb-5">
          <Select className="w-1/5 bg-white" size="small" value={rank} onChange={(e)=>setRank(e.target.value)}>
            <MenuItem className="text-gray-500" value="sort">Sort By</MenuItem>
            <MenuItem value="plth">Price Low To High</MenuItem>
            <MenuItem value="phtl">Price High To Low</MenuItem>
          </Select>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {selectedProduct.map((product) => (
            <div key={product.id}>
              <Card className="max-w-sm rounded overflow-hidden shadow-lg">
                <CardMedia
                  className="w-full aspect-video"
                  component="img"
                  image={product.thumbnail}
                  alt={product.title}
                />
                <div className="px-6 pt-4 pb-2">
                  <div className="font-bold text-lg">{product.title}</div>
                  <p className="text-gray-500 text-sm">
                    {`${String(product.category[0]).toUpperCase()}${String(
                      product.category
                    ).slice(1)}`}
                  </p>
                </div>
                <div className="px-5 pb-4 flex items-center flex-grow">
                  <Rating
                    name=""
                    value={product.rating}
                    readOnly
                    precision={0.1}
                  />
                  <p className="text-gray-500 text-sm pl-2 font-bold">{`(245)`}</p>
                </div>
                <div className="px-5 pb-4 flex items-baseline">
                  <p className="text-xl font-bold pr-3">{`$${(Number(product.price) - Number(product.price).toFixed(1) * (Number(product.discountPercentage).toFixed(0) / 100)).toFixed(1)}`}</p>
                  {product.discountPercentage !== 0 && (
                    <>
                      <p className="text-sm text-gray-500 font-semibold line-through decoration-2 pr-2">{`$${Number(
                        product.price
                      ).toFixed(1)}`}</p>
                      <p className="text-sm text-green-500 font-semibold">{`${Number(
                        product.discountPercentage
                      ).toFixed(0)}% off`}</p>
                    </>
                  )}
                </div>
              </Card>
            </div>
          ))}
        </div>
      </>
    )
  );
}

export default ProductPage;
