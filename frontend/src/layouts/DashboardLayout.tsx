import React from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import { logout } from '../app/slices/authSlice';
import { toggleSidebar } from '../app/slices/uiSlice';
import { Button } from '../components/ui/button';
import {
    LayoutDashboard,
    PlusCircle,
    FileText,
    History,
    Settings,
    LogOut,
    Menu
} from 'lucide-react';
import { cn } from '../utils/cn';

const DashboardLayout: React.FC = () => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const { isSidebarOpen } = useAppSelector((state) => state.ui);
    const { user } = useAppSelector((state) => state.auth);

    const handleLogout = () => {
        dispatch(logout());
        navigate('/login');
    };

    const navItems = [
        { label: 'Dashboard', icon: LayoutDashboard, path: '/dashboard' },
        { label: 'Create Prompt', icon: PlusCircle, path: '/prompt/create' },
        { label: 'Templates', icon: FileText, path: '/templates' },
        { label: 'History', icon: History, path: '/history' },
        { label: 'Settings', icon: Settings, path: '/settings' },
    ];

    return (
        <div className="flex h-screen bg-background overflow-hidden">
            {/* Sidebar */}
            <motion.aside
                initial={false}
                animate={{ width: isSidebarOpen ? 250 : 80 }}
                className="bg-card border-r border-border flex flex-col z-20"
            >
                <div className="h-16 flex items-center justify-center border-b border-border">
                    <span className={cn("font-bold text-xl", !isSidebarOpen && "hidden")}>
                        PromptGen
                    </span>
                    {!isSidebarOpen && <span className="font-bold text-xl">PG</span>}
                </div>

                <nav className="flex-1 p-4 space-y-2">
                    {navItems.map((item) => (
                        <Button
                            key={item.path}
                            variant="ghost"
                            className={cn(
                                "w-full justify-start",
                                !isSidebarOpen && "justify-center px-2"
                            )}
                            onClick={() => navigate(item.path)}
                        >
                            <item.icon className="h-5 w-5 mr-2" />
                            {isSidebarOpen && <span>{item.label}</span>}
                        </Button>
                    ))}
                </nav>

                <div className="p-4 border-t border-border">
                    <div className={cn("flex items-center mb-4", !isSidebarOpen && "justify-center")}>
                        <div className="h-8 w-8 rounded-full bg-primary/20 flex items-center justify-center text-primary font-bold">
                            {user?.name?.[0] || 'U'}
                        </div>
                        {isSidebarOpen && (
                            <div className="ml-3 overflow-hidden">
                                <p className="text-sm font-medium truncate">{user?.name}</p>
                                <p className="text-xs text-muted-foreground truncate">{user?.email}</p>
                            </div>
                        )}
                    </div>
                    <Button
                        variant="outline"
                        className={cn("w-full", !isSidebarOpen && "px-2")}
                        onClick={handleLogout}
                    >
                        <LogOut className="h-4 w-4 mr-2" />
                        {isSidebarOpen && "Logout"}
                    </Button>
                </div>
            </motion.aside>

            {/* Main Content */}
            <div className="flex-1 flex flex-col overflow-hidden">
                <header className="h-16 border-b border-border bg-card flex items-center px-6 justify-between">
                    <Button variant="ghost" size="icon" onClick={() => dispatch(toggleSidebar())}>
                        <Menu className="h-5 w-5" />
                    </Button>
                    <h1 className="text-lg font-semibold">Dashboard</h1>
                </header>

                <main className="flex-1 overflow-auto p-6">
                    <Outlet />
                </main>
            </div>
        </div>
    );
};

export default DashboardLayout;
