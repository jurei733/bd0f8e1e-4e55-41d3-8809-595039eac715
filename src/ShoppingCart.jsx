import Stack from "@mui/material/Stack";
import LocationOnOutlinedIcon from "@mui/icons-material/LocationOnOutlined";
import RemoveCircleOutlineIcon from "@mui/icons-material/RemoveCircleOutline";
import Divider from "@mui/material/Divider";
import ClearIcon from "@mui/icons-material/Clear";
import Box from "@mui/material/Box";
const ShoppingCart = ({ events, removeShoppingCartItem, handleClose }) => {
    return (
        <div>
            <Box className="box">
                <ClearIcon onClick={handleClose} className="clear-icon" />

                <Stack spacing={2}>
                    {events.map((event) => (
                        <div>
                            <div
                                class="shopping-cart-item"
                                key={event._id}
                                id={event._id}
                            >
                                <img src={event.flyerFront} />
                                {event.title}
                                <div className="event-card-info">
                                    <a
                                        href={event.venue.direction}
                                        target="_blank"
                                        rel="noopener"
                                    >
                                        <LocationOnOutlinedIcon color="primary" />{" "}
                                        {event.venue.name}
                                    </a>
                                    <span>
                                        | Starts:
                                        {new Date(
                                            event.startTime
                                        ).toLocaleString()}
                                    </span>
                                    <span>
                                        | Ends:{" "}
                                        {new Date(
                                            event.endTime
                                        ).toLocaleString()}
                                    </span>
                                </div>
                                <RemoveCircleOutlineIcon
                                    onClick={removeShoppingCartItem}
                                    color="primary"
                                />
                            </div>
                            <Divider />
                        </div>
                    ))}
                </Stack>
            </Box>
        </div>
    );
};

export default ShoppingCart;
