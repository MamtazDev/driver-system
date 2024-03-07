/* eslint-disable react-hooks/exhaustive-deps */

import { useRouter } from "next/navigation";

import React, { useEffect, useState } from "react";

const ProtectedRoute = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const router = useRouter();

    useEffect(() => {
        const userData = JSON.parse(localStorage.getItem("user") || null);
        if (userData && userData.user && userData.user.email) {
            setIsAuthenticated(true);
        } else {
            router.push("/");
        }
    }, [router]);

    return isAuthenticated ? <>{children}</> : null;
};

export default ProtectedRoute;