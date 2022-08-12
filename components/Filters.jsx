import { Checkbox } from "@mui/material";

function Filters({ filterName, filters, addItem, selectedFilters }) {
  return (
    <div className="py-3 px-5 border-gray-300 border-b-2">
      <p className="font-semibold text-gray-500 text-lg">{filterName}</p>
      {filters.map((item) => (
        <div key={item} className="flex items-center">
          <Checkbox
            size="small"
            disableRipple
            checked={selectedFilters.has(item)}
            onClick={() => {
              addItem(item);
            }}
          />
          <p>{`${String(item[0]).toUpperCase()}${String(item).slice(1)}`}</p>
        </div>
      ))}
    </div>
  );
}

export default Filters;
