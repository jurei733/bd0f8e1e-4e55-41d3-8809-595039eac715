import { useState, useEffect, useMemo } from "react";
import React from "react";
import "./App.sass";

import Header from "./Header";
import Modal from "@mui/material/Modal";
const LazyEvents = React.lazy(() => import("./Events"));
import ShoppingCart from "./ShoppingCart";
import CircularProgress from "@mui/material/CircularProgress";
import debounce from "lodash.debounce";

function App() {
    const [events, setEvents] = useState([]);
    const [groupedEvents, setGroupedEvents] = useState([]);
    const [searchTerm, setSearchTerm] = useState([]);
    const [count, setCount] = useState(0);
    const [open, setOpen] = useState(false);
    const [shoppingCartItems, setShoppingCartItems] = useState([]);
    const [date, setDate] = useState("");

    useEffect(() => {
        const fetchData = async () => {
            const res = await fetch(
                "https://tlv-events-app.herokuapp.com/events/uk/london"
            );
            const data = await res.json();
            groupEvents(data);
        };
        fetchData();
    }, []);

    const handleSearchInput = (e) => {
        setSearchTerm(e.target.value);
    };

    const debouncedResults = useMemo(() => {
        return debounce(handleSearchInput, 300);
    }, []);

    useEffect(() => {
        return () => {
            debouncedResults.cancel();
        };
    });

    const groupEvents = (events) => {
        setEvents(events);
        const groups = events.reduce((groups, event) => {
            const date = event.date.split("T")[0];
            if (!groups[date]) {
                groups[date] = [];
            }
            groups[date].push(event);
            return groups;
        }, {});
        // Edit: to add it in the array format instead and sort by date
        const groupedEvents = Object.keys(groups)
            .map((date) => {
                return {
                    date,
                    events: groups[date],
                };
            })
            .sort((a, b) => new Date(b.date) - new Date(a.date));
        setGroupedEvents(groupedEvents);
    };

    const addShoppingCartItem = (e) => {
        const item = events.find(
            (event) => event._id === e.target.parentElement.id
        );
        setShoppingCartItems([...shoppingCartItems, item]);
        setCount(count + 1);
        const filteredEvents = events.filter((event) => event._id !== item._id);
        groupEvents(filteredEvents);
    };

    const removeShoppingCartItem = (e) => {
        const findElement = shoppingCartItems.find(
            (item) => item._id === e.target.parentElement.id
        );
        const filteredItems = shoppingCartItems.filter((item) => {
            return item._id !== e.target.parentElement.id;
        });
        setCount(count - 1);
        setShoppingCartItems(filteredItems);
        groupEvents([...events, findElement]);
    };

    if (events.length === 0) {
        return (
            <>
                <CircularProgress size="100px" className="spinner" />
            </>
        );
    }
    return (
        <div className="App">
            <Header
                handleSearchInput={handleSearchInput}
                handleOpen={() => setOpen(true)}
                count={count}
            />
            <main>
                <Modal open={open} onClose={() => setOpen(false)}>
                    <div>
                        <ShoppingCart
                            events={shoppingCartItems}
                            setDate={setDate}
                            handleClose={() => setOpen(false)}
                            removeShoppingCartItem={removeShoppingCartItem}
                        />
                    </div>
                </Modal>
                <div className="is-sticky">
                    <h3>{date ? new Date(date).toLocaleDateString() : null}</h3>
                </div>
                {groupedEvents.map((group, index) => (
                    <LazyEvents
                        addShoppingCartItem={addShoppingCartItem}
                        group={group}
                        setDate={setDate}
                        date={date}
                        searchTerm={searchTerm}
                        key={index}
                    />
                ))}
            </main>
        </div>
    );
}

export default App;
