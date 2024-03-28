import {
  Avatar,
  Button,
  IconButton,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Box } from "@mui/system";
import { useState, useEffect } from "react";
import { Menu, Close } from "@mui/icons-material";
import PrimaryButton from "../common/button/PrimaryButton";
//import { default as logo } from "../../assets/logo.svg";
import { theme } from "../../theme";

const Navbar = () => {
  const { palette } = useTheme(theme);
  const navigate = useNavigate();

  const location = useLocation();
  const [url, setUrl] = useState(null);
  const [isMobileMenuToggled, setIsMobileMenuToggled] = useState(false);

  const isNotMobile = useMediaQuery("(min-width: 1200px)");

  useEffect(() => {
    setUrl(location.pathname);
  }, [location]);

  const isNotHome =
    location.pathname !== "/"&& !location.pathname.includes("home");
  return (
    <Box
      position="absolute"
      display="flex"
      width="100%"
      justifyContent="space-between"
      alignItems="center"
      sx={{
        p: "1rem 3%",
        background: isNotHome && "white",
        // borderBottom:"1px solid lightgray",
        boxShadow: isNotHome && `0 2px 4px 0 rgba(43,43,43,.1)`,
      }}
    >
      <span
        style={{
          fontSize: 30,
          fontWeight: "bold",
        }}
      >
        GAPP
      </span>
      {/* DESKTOP NAVBAR */}
      {isNotMobile && (
        <>
          <Box>
            {/* EMPTY FAKE LINKS */}
            <Link to="/" className={"link" + (url === "/" ? " active" : "")}>
              Home
            </Link>
            <Link
              to="/pageTree"
              className={"link" + (url === "/pageTree" ? " active" : "")}
            >
              Cây Gia Phả
            </Link>
            <Link
              to="/history"
              className={"link" + (url === "/history" ? " active" : "")}
            >
              Lịch Sử Gia Đình
            </Link>
            <Link
              to="/admin"
              className={"link" + (url === "/admin" ? " active" : "")}
            >
              supper Admin
            </Link>
            <Link
              to="/event"
              className={"link" + (url === "/event" ? " active" : "")}
            >
              Sự kiện
            </Link>
            <Link
              to="/request-event"
              className={"link" + (url === "/request-event" ? " active" : "")}
            >
              Request Sự kiện
            </Link>
            {/* <Link
              to="/#"
              className={"link" + (url === "/locations" ? " active" : "")}
            >
              Locations
            </Link> */}
            <Link
              to="/member-fund"
              className={"link" + (url === "/member-fund" ? " active" : "")}
            >
              Member-fund
            </Link>
            <Link
              to="/admin-fund"
              className={"link" + (url === "/admin-fund" ? " active" : "")}
            >
              admin-fund
            </Link>
            <Link
              to="/profile"
              className={"link" + (url === "/profile" ? " active" : "")}
            >
              profile
            </Link>
            {/* <Link
              to="/#"
              className={"link" + (url === "/support" ? " active" : "")}
            >
              Support
            </Link> */}
          </Box>
          <Box display="flex" gap="1.5rem">
            <Button
              variant="text"
              sx={{
                p: ".5rem 1.5rem",
                color: "white",
                backgroundColor: "transparent",
                "&:hover": { color: palette.primary.main },
              }}
              onClick={() => {
                navigate("/login");
              }}
            >
              Đăng nhập
            </Button>
            <Button
              variant="text"
              sx={{
                p: ".5rem 1.5rem",
                backgroundColor: palette.primary.main,
                color: "#ffffff",
                borderRadius: 2,
                boxShadow: ` 0px 7px 5px 0px ${palette.primary.light}}`,
                "&:hover": { color: palette.primary.main },
              }}
              onClick={() => {
                navigate("/register");
              }}
            >
              Đăng kí
            </Button>
          </Box>
        </>
      )}

      {!isNotMobile && (
        <>
          <IconButton
            onClick={() => {
              setIsMobileMenuToggled(!isMobileMenuToggled);
              console.log("te");
            }}
          >
            <Menu />
          </IconButton>
          {/* MOBILE NAVBAR BODY */}
          {isMobileMenuToggled && (
            <Box
              position="fixed"
              right="0"
              bottom="0"
              height="100%"
              zIndex="10"
              maxWidth="500px"
              minWidth="300px"
              sx={{
                backgroundColor: "#fff",
              }}
            >
              {/* CLOSE ICON */}
              <Box display="flex" justifyContent="flex-end" p="2rem">
                <IconButton
                  onClick={() => setIsMobileMenuToggled(!isMobileMenuToggled)}
                >
                  <Close />
                </IconButton>
              </Box>

              {/* MENU ITEMS */}
              <Box
                p="3rem"
                display="flex"
                flexDirection="column"
                justifyContent="center"
                alignItems="center"
              >
                <Link
                  to="/"
                  className={"link" + (url === "/" ? " active" : "")}
                >
                  Home
                </Link>
                <Link
                  to="/pageTree"
                  className={"link" + (url === "/pageTree" ? " active" : "")}
                >
                  Cây Gia Phả
                </Link>
                <Link
                  to="/history"
                  className={"link" + (url === "/history" ? " active" : "")}
                >
                  Lịch Sử Gia Đình
                </Link>
                <Link
                  to="/locations"
                  className={"link" + (url === "/locations" ? " active" : "")}
                >
                  Locations
                </Link>
                <Link
                  to="/support"
                  className={"link" + (url === "/support" ? " active" : "")}
                >
                  Support
                </Link>
                <Button
                  variant="text"
                  sx={{
                    p: ".5rem 1.5rem",
                    color: palette.text.secondary,
                    backgroundColor: "transparent",
                    "&:hover": { color: palette.primary.main },
                  }}
                >
                  Signin
                </Button>
                <PrimaryButton title="Register" />
              </Box>
            </Box>
          )}
        </>
      )}
    </Box>
  );
};

export default Navbar;