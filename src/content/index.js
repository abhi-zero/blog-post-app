

// content/navLinks.js
export const getNavLinks = (user) => {
    if (user) {
        // logged in
        return [
            { name: "Home", path: "/" },
            { name: "Explore", path: "/explore" },
            { name: "Write", path: "/write" },
            { name: "Profile", path: "/profile" },
        ];
    } else {
        // guest
        return [
            { name: "Explore", path: "/explore" },
            { name: "Login", path: "/auth" },
        ];
    }
};
