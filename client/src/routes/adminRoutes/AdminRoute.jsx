import { Route, Routes } from "react-router-dom";
import AdminLogin from "../../pages/auth/AdminLogin";
import ProtectedRoute from "../../pages/auth/ProtectedRoute";
import Dashboard from "../../pages/admin/Dashboard";
import StudentDetails from "../../pages/admin/Dashboard/StudentDetails";
import NewAdmission from "../../pages/admin/Dashboard/NewAdmission";
import NotFound from "../../pages/admin/Error/NotFound";
import PromoteStudent from "../../pages/admin/PromoteStudent/PromoteStudent";

const AdminRoutes = () => {
    return (
        <>
            <Routes>
                <Route path="/login" element={<AdminLogin />} />
                <Route element={<ProtectedRoute />}>
                    <Route path="/dashboard" element={<Dashboard />}>
                        <Route path="" element={<StudentDetails />} />
                        <Route path="new-admission" element={<NewAdmission />} />
                        <Route path="promote-admission" element={<PromoteStudent />} />
                        <Route path="*" element={<NotFound />} />
                    </Route>
                </Route>
            </Routes>
        </>
    );
};

export default AdminRoutes;