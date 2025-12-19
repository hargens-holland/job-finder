import { Outlet, Link } from "react-router-dom";

export default function Layout() {
    return (
        <div className="min-h-screen">
            <nav className="p-4 border-b flex gap-4">
                <Link to="/">Home</Link>
                <Link to="/jobs">Jobs</Link>
                <Link to="/applied">Applied</Link>
                <Link to="/profile">Profile</Link>
            </nav>

            <main>
                <Outlet />
            </main>
        </div>
    );
}
