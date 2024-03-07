import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

const ProtectedRoute = ({ children }) => {

    const [isAuthenticated, setIsAuthenticated] = useState(false)
    const userData = JSON.parse(localStorage.getItem('user') || 'null');
    

    const router = useRouter();
    userData?.user?.user?.email && setIsAuthenticated(true);

    useEffect(() => {
        if (!isAuthenticated) {
            router.push("/");
        }
    }, [isAuthenticated, router]);
    return isAuthenticated ? <>{children}</> : null;
};

export default ProtectedRoute;
