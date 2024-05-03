import film from "./Film";
import { configureStore } from "@reduxjs/toolkit";

export default configureStore({
    reducer: {
        film : film,
    },
});