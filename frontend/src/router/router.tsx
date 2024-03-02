import { Navigate, Route, Routes } from "react-router-dom";
import ItemView from "src/views/ItemView";
import RegisterView from "src/views/RegisterView";

const Router = () => {
    return (
        <Routes>
            {/* TODO: Change this */}
            <Route
                path="/"
                element={<Navigate to="/items" replace={true} />}
            ></Route>
            <Route index path="/items" element={<ItemView />} />
            <Route path="/register" element={<RegisterView />} />
        </Routes>
    );
};
export default Router;
