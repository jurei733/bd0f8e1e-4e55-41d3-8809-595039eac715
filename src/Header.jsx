import SearchIcon from "@mui/icons-material/Search";
import FilterAltOutlinedIcon from "@mui/icons-material/FilterAltOutlined";
import Input from "@mui/material/Input";
import InputAdornment from "@mui/material/InputAdornment";
import FormControl from "@mui/material/FormControl";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import Badge from "@mui/material/Badge";

const Header = ({ handleSearchInput, handleOpen, count }) => {
    return (
        <header>
            <div>
                <FormControl>
                    <Input
                        placeholder="Search"
                        onChange={handleSearchInput}
                        id="search-input"
                        startAdornment={
                            <InputAdornment position="start">
                                <SearchIcon />
                            </InputAdornment>
                        }
                    />
                </FormControl>
                <FilterAltOutlinedIcon />
            </div>
            <div className="shoppingCartItem">
                <Badge badgeContent={count} color="error">
                    <ShoppingCartOutlinedIcon
                        onClick={handleOpen}
                    ></ShoppingCartOutlinedIcon>
                </Badge>
            </div>
        </header>
    );
};
export default Header;
