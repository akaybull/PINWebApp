import {
  Box,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Drawer,
  Divider,
  useTheme,
  IconButton,
  useMediaQuery,
  Tooltip,
  Collapse,
} from "@mui/material";
import {
  Dashboard as DashboardIcon,
  Logout as LogoutIcon,
  Menu as MenuIcon,
  ChevronLeft as ChevronLeftIcon,
  ChevronRight as ChevronRightIcon,
  ExpandLess,
  ExpandMore,
  ProductionQuantityLimits,
  Category,
  Label,
} from "@mui/icons-material";
import { useNavigate, useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logout } from "../redux/features/authSlice";
import ThemeToggle from "./ThemeToggle";
import React, { useEffect, useState } from "react";
import Cookies from "js-cookie";

const drawerWidth = 240;

const Sidebar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();
  const theme = useTheme();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(() => {
    return Cookies.get("isCollapsed") === "true";
  });
  const [openSubmenu, setOpenSubmenu] = useState();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };
  const handleCollapseToggle = () => {
    const newCollapsedState = !isCollapsed;
    Cookies.set("isCollapsed", newCollapsedState, { expires: 30 });
    setIsCollapsed(newCollapsedState);
  };
  const handleLogout = () => {
    dispatch(logout());
    navigate("/login");
  };

  const menuItems = [
    {
      text: "Yönetim Paneli",
      icon: <DashboardIcon />,
      path: "/dashboard",
      mainPath: "/dashboard",
    },
    {
      text: "Katalog",
      icon: <Category />,
      path: "/catalog",
      mainPath: "/catalog",

      submenu: [
        {
          text: "Ürünler",
          icon: <ProductionQuantityLimits />,
          path: "/products",
          mainPath: "/catalog",
        },
        {
          text: "Kategori",
          icon: <Category />,
          path: "/categories",
          mainPath: "/catalog",
        },
        {
          text: "Ürün Etiketleri",
          icon: <Label />,
          path: "/product-tags",
          mainPath: "/catalog",
        },
      ],
    },
  ];

  useEffect(() => {
    let found = false;
    menuItems.forEach((item) => {
      if (item.path === location.pathname) {
        setOpenSubmenu(item.path);
        found = true;
      }
      if (item.submenu) {
        item.submenu.forEach((sub) => {
          if (sub.path === location.pathname) {
            setOpenSubmenu(item.path);
            found = true;
          }
        });
      }
    });

    if (!found) {
      setOpenSubmenu(null);
    }
  }, [location.pathname]);

  const drawerContent = (
    <Box
      sx={{
        overflow: "auto",
        display: "flex",
        flexDirection: "column",
        height: "100%",
        "& .MuiListItemIcon-root, & .MuiListItemText-root": {
          transition: theme.transitions.create(["width", "opacity", "margin"], {
            easing: theme.transitions.easing.sharp,
            duration: "1s",
          }),
        },
      }}
    >
      <Box
        sx={{
          p: 2,
          alignItems: "center",
          display: "flex",
          justifyContent: isCollapsed ? "center" : "space-between",
        }}
      >
        {!isCollapsed && (
          <img
            src={
              "https://testteknik.saatbayi.com/assets/saatteknik-logo-DIJS7vep.png"
            }
            alt="Saat Teknik Logo"
            style={{
              maxWidth: "100%",
              height: "auto",
            }}
          />
        )}
        <IconButton onClick={handleCollapseToggle}>
          {isCollapsed ? <ChevronRightIcon /> : <ChevronLeftIcon />}
        </IconButton>
      </Box>

      <Divider />

      <List>
        {menuItems.map((item) => {
          return (
            <div key={item.text}>
              <ListItem
                key={item.text}
                onClick={() =>
                  item.submenu
                    ? setOpenSubmenu((prev) =>
                        prev !== item.path ? item.path : null
                      )
                    : navigate(item.path)
                }
                sx={() => ({
                  width: "auto",
                  marginX: "8px",
                  borderRadius: "8px",
                  justifyContent: isCollapsed ? "center" : "flex-start",
                  bgcolor:
                    location.pathname === item.path
                      ? "action.selected"
                      : "transparent",
                  "&:hover": {
                    cursor: "pointer",
                    bgcolor: "action.hover",
                  },
                  transition: "background-color 0.2s",
                })}
              >
                <ListItemIcon
                  sx={{
                    minWidth: isCollapsed ? "auto" : 40,
                  }}
                >
                  {item.icon}
                </ListItemIcon>
                {!isCollapsed && <ListItemText primary={item.text} />}
                {item.submenu && (
                  <Box
                    component="span"
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      transition: "transform 0.3s ease-in-out",
                      transform:
                        openSubmenu === item.path
                          ? "rotate(180deg)"
                          : "rotate(0deg)",
                    }}
                  >
                    <ExpandMore />
                  </Box>
                )}
              </ListItem>
              {item.submenu && (
                <Collapse
                  in={openSubmenu == item.path}
                  timeout="auto"
                  unmountOnExit
                >
                  <List component="div" disablePadding>
                    {item.submenu.map((subItem) => (
                      <ListItem
                        key={subItem.text}
                        onClick={() => navigate(subItem.path)}
                        sx={() => ({
                          width: "auto",
                          marginLeft: "24px",
                          marginRight: "8px",
                          borderRadius: "8px",
                          justifyContent: isCollapsed ? "center" : "flex-start",
                          bgcolor:
                            location.pathname === subItem.path
                              ? "action.selected"
                              : "transparent",
                          "&:hover": {
                            cursor: "pointer",
                            bgcolor: "action.hover",
                          },
                          transition: "background-color 0.2s",
                        })}
                      >
                        <ListItemIcon
                          sx={{
                            color:
                              location.pathname === item.path
                                ? "common.white"
                                : "text.primary",
                            transition: "color 0.2s",
                            minWidth: isCollapsed ? "auto" : 40,
                          }}
                        >
                          {subItem.icon}
                        </ListItemIcon>
                        <ListItemText primary={subItem.text} />
                      </ListItem>
                    ))}
                  </List>
                </Collapse>
              )}
            </div>
          );
        })}
      </List>

      <Box sx={{ mt: "auto" }}>
        <Divider />
        <List>
          <ListItem sx={{ justifyContent: "center", mb: 0.05 }}>
            <ThemeToggle />
          </ListItem>

          <Tooltip title={isCollapsed ? "Çıkış Yap" : ""} placement="right">
            <ListItem
              onClick={handleLogout}
              sx={(theme) => ({
                mx: 1,
                borderRadius: 1,
                justifyContent: isCollapsed ? "center" : "flex-start",
                transition: "all 0.2s",
                width: "auto",
                "&:hover": {
                  cursor: "pointer",
                  bgcolor:
                    theme.palette.mode === "dark"
                      ? "error.dark"
                      : "error.light",
                  color: "common.white",
                  "& .MuiListItemIcon-root": {
                    color: "common.white",
                  },
                },
              })}
            >
              <ListItemIcon sx={{ minWidth: isCollapsed ? "auto" : 40 }}>
                <LogoutIcon />
              </ListItemIcon>
              {!isCollapsed && <ListItemText primary="Çıkış Yap" />}
            </ListItem>
          </Tooltip>
        </List>
      </Box>
    </Box>
  );

  return (
    <>
      {isMobile && (
        <Box
          sx={{
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            height: "64px",
            bgcolor: "background.paper",
            borderBottom: "1px solid",
            borderColor: "divider",
            display: "flex",
            alignItems: "center",
            px: 2,
            zIndex: (theme) => theme.zIndex.drawer + 1,
          }}
        >
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
          >
            <MenuIcon />
          </IconButton>
        </Box>
      )}

      {isMobile && <Box sx={{ height: "64px" }} />}

      <Drawer
        variant={isMobile ? "temporary" : "permanent"}
        open={isMobile ? mobileOpen : true}
        onClose={isMobile ? handleDrawerToggle : undefined}
        ModalProps={{
          keepMounted: true,
        }}
        sx={{
          width: isCollapsed ? 80 : drawerWidth,
          flexShrink: 0,
          transition: theme.transitions.create(["width"], {
            easing: theme.transitions.easing.sharp,
            duration: "0.3s",
          }),
          "& .MuiDrawer-paper": {
            width: isCollapsed ? 80 : drawerWidth,
            boxSizing: "border-box",
            bgcolor: "background.paper",
            borderRight: "1px solid",
            borderColor: "divider",
            paddingTop: isMobile && "64px",
            transition: theme.transitions.create(["width"], {
              easing: theme.transitions.easing.sharp,
              duration: "0.3s",
            }),
          },
        }}
      >
        {drawerContent}
      </Drawer>
    </>
  );
};

export default Sidebar;
