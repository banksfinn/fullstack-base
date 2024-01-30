import { Navigate, Route, Routes } from "react-router-dom";
import SandboxView from "src/views/SandboxView";

const Router = () => {
  return (
    <Routes>
      {/* TODO: Change this */}
      <Route
        path="/"
        element={<Navigate to="/sandbox" replace={true} />}
      ></Route>
      <Route index path="/sandbox" element={<SandboxView />} />
    </Routes>
  );
};
export default Router;
