import React from 'react';
import { Outlet, NavLink } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../../store/slices/authSlice';

export default function Layout() {
    const dispatch = useDispatch();
    const user = useSelector((state) => state.auth.user);

    const baseClasses =
        'block px-4 py-2 rounded transition duration-200 text-sm font-medium';
    const inactiveClasses = 'text-gray-700 hover:bg-blue-100';
    const activeClasses = 'bg-blue-600 text-white';

    return (
        <div className="flex min-h-screen bg-gray-100">
            {/* Sidebar */}
            <aside className="w-64 bg-white border-r shadow-sm hidden md:block">
                <div className="p-4 bg-blue-600 text-white text-lg font-semibold text-center">
                    Debt Dashboard
                </div>
                <nav className="p-4 flex flex-col space-y-2">
                    <NavLink
                        to="/app"
                        end
                        className={({ isActive }) =>
                            `${baseClasses} ${isActive ? activeClasses : inactiveClasses}`
                        }
                    >
                        Dashboard
                    </NavLink>

                    {user?.role === 'admin' && (
                        <NavLink
                            to="/app/agents"
                            className={({ isActive }) =>
                                `${baseClasses} ${isActive ? activeClasses : inactiveClasses}`
                            }
                        >
                            Agent Management
                        </NavLink>
                    )}

                    <NavLink
                        to="/app/cases"
                        className={({ isActive }) =>
                            `${baseClasses} ${isActive ? activeClasses : inactiveClasses}`
                        }
                    >
                        Case Management
                    </NavLink>

                    <NavLink
                        to="/app/logs"
                        className={({ isActive }) =>
                            `${baseClasses} ${isActive ? activeClasses : inactiveClasses}`
                        }
                    >
                        Activity Log
                    </NavLink>

                    <button
                        onClick={() => dispatch(logout())}
                        className="bg-red-500 text-white rounded p-2 mt-4 hover:bg-red-600 transition"
                    >
                        Logout
                    </button>
                </nav>
            </aside>

            {/* Main Content */}
            <main className="flex-1 p-6 overflow-auto">
                <Outlet />
            </main>
        </div>
    );
}
