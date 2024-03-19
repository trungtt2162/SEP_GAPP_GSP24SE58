import { useTheme } from "@emotion/react";
import { Box } from "@mui/material";
import Grid from "@mui/material/Grid";
import React, { useState } from "react";
import TabPenal from "../../../components/common/tabs/TabPenal";
import TabSidebar from "../../../components/common/tabs/TabSidebar";
import { theme } from "../../../theme";
const TabContainer = ({listSideBar}) => {
  const { palette } = useTheme(theme);
  const [value, setValue] = useState(1);
  return (
    <div>
      <Box
        width="100%"
       
        sx={{
          backgroundColor: palette.secondary.main,
          p: "2.5rem",
        }}
      ></Box>
      <div className="how-work">
        <Box
          sx={{
            display: "flex",
            alignItems: { md: "flex-end", xs: "center" },
            flexDirection: { xs: "column", md: "row" },
            justifyContent: { md: "space-between", xs: "center" },
            p: "15px 40px",
          }}
        >
          <Grid container spacing={1}>
            <Grid item xs={12} md={2}>
            <TabSidebar value={value} event={setValue} listSideBar={listSideBar} />
            </Grid>
            <Grid  item xs={12} md={10}>
               <div className="shadown" style={{
                height:"calc(100vh - 100px)",

                overflow:"auto",
                padding:10,
                paddingBottom:30
               }}>
               {listSideBar.map(i => (
                       <TabPenal value={value} index={i.key}>
                       <i.component />
                     </TabPenal>
                ))}
               </div>
            
            </Grid>
          </Grid>
        </Box>
      </div>
    </div>
  );
};

export default TabContainer;
