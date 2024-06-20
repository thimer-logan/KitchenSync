import Navbar from "@/components/navbar/Navbar";
import { Box } from "@mui/material";
import { NavLink } from "@/types/navigation";
import HomeIcon from "@mui/icons-material/Home";
import KitchenIcon from "@mui/icons-material/Kitchen";
import RestaurantMenuIcon from "@mui/icons-material/RestaurantMenu";
import MenuBookIcon from "@mui/icons-material/MenuBook";
import ShoppingBagIcon from "@mui/icons-material/ShoppingBag";

const drawerWidth = 240;
const navlinks: NavLink[] = [
  // { name: "Home", link: "/", Icon: HomeIcon },
  { name: "Storage", link: "/a/storage", Icon: KitchenIcon },
  { name: "Shopping List", link: "/a/shoppinglist", Icon: ShoppingBagIcon },
  { name: "Recipes", link: "/a/recipes", Icon: RestaurantMenuIcon },
  { name: "Meal Planner", link: "/a/mealplanner", Icon: MenuBookIcon },
];

export default function AuthenticatedLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <Navbar navlinks={navlinks} drawerWidth={drawerWidth} />
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 1,
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          mt: { xs: 8, sm: 0 },
          ml: { sm: `${drawerWidth}px` },
        }}
      >
        {children}
      </Box>
    </>
  );
}
