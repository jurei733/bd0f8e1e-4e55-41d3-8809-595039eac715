import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import LocationOnOutlinedIcon from "@mui/icons-material/LocationOnOutlined";
import AddCircleOutlineOutlinedIcon from "@mui/icons-material/AddCircleOutlineOutlined";
import NoImage from "./assets/no-image.jpg";
import { useInView } from "react-intersection-observer";

const Events = ({ group, addShoppingCartItem, setDate, searchTerm }) => {
    const { ref, inView } = useInView({
        threshold: 0,
    });
    return (
        <Grid container spacing={0.5} className="grid" ref={ref}>
            {group.events
                .filter((event) => {
                    return event.title
                        .toString()
                        .toLowerCase()
                        .includes(searchTerm.toString().toLowerCase());
                })
                .map((event, index) => (
                    <Grid item xs={2} sm={4} md={4} key={index}>
                        <Card
                            variant="outlined"
                            className="event-card-container"
                            key={event._id}
                        >
                            <CardContent>
                                {inView ? setDate(event.date) : null}
                                <h5 className="event-card-title">
                                    {event.title}
                                </h5>
                                {event.flyerFront ? (
                                    <img
                                        className="event-card-image"
                                        src={event.flyerFront}
                                    ></img>
                                ) : (
                                    <img
                                        className="event-card-image"
                                        alt="No image provided"
                                        src={NoImage}
                                    ></img>
                                )}

                                <div className="event-card-info">
                                    <a
                                        href={event.venue.direction}
                                        target="_blank"
                                        rel="noopener"
                                    >
                                        <LocationOnOutlinedIcon color="primary" />{" "}
                                        {event.venue.name}
                                    </a>
                                    {event.startTime && (
                                        <span>
                                            | Starts:
                                            {new Date(
                                                event.startTime
                                            ).toLocaleString()}
                                        </span>
                                    )}
                                    {event.endTime && (
                                        <span>
                                            | Ends:{" "}
                                            {new Date(
                                                event.endTime
                                            ).toLocaleString()}
                                        </span>
                                    )}
                                </div>
                            </CardContent>
                            <CardActions
                                className="card-actions"
                                id={event._id}
                            >
                                <AddCircleOutlineOutlinedIcon
                                    id={event._id}
                                    color="primary"
                                    className="add-to-cart-icon"
                                    onClick={addShoppingCartItem}
                                />
                            </CardActions>
                        </Card>
                    </Grid>
                ))}
        </Grid>
    );
};

export default Events;
