import { useContext, useEffect } from "react";
import { AuthContext } from "../providers/AuthProvider";

const useTheme = () => {
  const { role, loading, roleLoading, user } = useContext(AuthContext);

  useEffect(() => {
    if (loading || (user && roleLoading)) return;

    const html = document.querySelector("html");

    if (!role) {
      html.setAttribute("data-theme", "light");
      return;
    }

    if (role === "Admin") {
      html.setAttribute("data-theme", "dark");
    } else if (role === "Volunteer") {
      html.setAttribute("data-theme", "emerald");
    } else {
      html.setAttribute("data-theme", "cupcake");
    }

  }, [role, loading, roleLoading, user]);
};

export default useTheme;