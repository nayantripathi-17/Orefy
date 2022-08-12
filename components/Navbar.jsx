import SearchIcon from "@mui/icons-material/Search";
import FormatListBulletedIcon from "@mui/icons-material/FormatListBulleted";
import NotificationsIcon from "@mui/icons-material/Notifications";
import { IconButton, TextField } from "@mui/material";
import { useRecoilState } from "recoil";
import { searchState } from "../atoms/rankSearch";

function Navbar() {
  const [search,setSearch] = useRecoilState(searchState)

  return (
    <nav className="bg-white flex flex-grow py-5 shadow-md justify-between">
      <div className="flex px-10 space-x-5 items-center">
        <img src="/w2n.svg" className="h-14" />
        <TextField
          placeholder="Search"
          className="px-4 border-2"
          margin="none"
          size="small"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          InputProps={{
            endAdornment: (
              <>
                <SearchIcon className="text-gray-400 hover:text-gray-600 cursor-pointer" />
              </>
            ),
          }}
        />
      </div>
      <div className="flex px-10 space-x-2 items-center">
        <FormatListBulletedIcon />
        <div className="text-bold tracking-wide font-semibold">Categories</div>
        <IconButton>
          <NotificationsIcon className="text-gray-500 cursor-pointer" />
        </IconButton>
      </div>
    </nav>
  );
}

export default Navbar;
