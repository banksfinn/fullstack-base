import { Navigate, Route, Routes } from "react-router-dom";
import ItemView from "src/views/ItemView";
import LoginView from "src/views/LoginView";
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
            <Route path="/login" element={<LoginView />} />
        </Routes>
    );
};
export default Router;
