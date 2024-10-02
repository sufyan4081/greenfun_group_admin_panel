import { Box, CircularProgress, Grid } from "@mui/material";
import StatsBox from "./StatsBox";
import InsertPhotoIcon from "@mui/icons-material/InsertPhoto";
import AddAPhotoIcon from "@mui/icons-material/AddAPhoto";
import Header from "../../components/Header";
import { QueryKeys } from "../../utils/QueryKey";
import { fetchBlogs } from "../../api/Blog/blog_api";
import { useQuery } from "@tanstack/react-query";
import { fetchVlogs } from "../../api/Vlog/vlog_api";
import { useSelector } from "react-redux";

const Dashboard = () => {
  // Get user details from Redux state
  const user = useSelector((state) => state.user.user);

  // import blog
  const { data: blogData, isLoading: blogLoading } = useQuery({
    queryFn: fetchBlogs,
    queryKey: QueryKeys.blog,
  });

  // import vlog
  const { data: vlogData, isLoading: vlogLoading } = useQuery({
    queryFn: fetchVlogs,
    queryKey: QueryKeys.vlog,
  });

  if (blogLoading || vlogLoading) {
    return (
      <Grid align="center" sx={{ marginTop: "10px" }}>
        <CircularProgress sx={{ color: "#20209f" }} />
      </Grid>
    );
  }

  if (blogLoading) {
    return (
      <Grid align="center" sx={{ marginTop: "10px" }}>
        <CircularProgress sx={{ color: "#20209f" }} />
      </Grid>
    );
  }

  return (
    <Box data-aos="fade">
      {/* Header Components*/}
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          flexDirection: {
            lg: "row",
            md: "row",
            sm: "column",
            xs: "column",
          },
          width: "100%",
          mt: 12,
          padding: {
            lg: "0px 0px 0px 20px",
            md: "0px 0px 0px 20px",
            sm: "0px 20px 0px 20px",
            xs: "0px 20px 0px 20px",
          },
          boxSizing: "border-box",
        }}
      >
        <Box sx={{ width: "100%" }}>
          <Header
            title="DASHBOARD"
            subtitle={`Welcome ${user ? user.account.name : "Admin"}`}
          />
          <Box
            display="grid"
            gridTemplateColumns="repeat(12, 1fr)"
            gridAutoRows="140px"
            gap="20px"
            flexWrap="wrap"
          >
            <StatsBox
              total={blogData?.length}
              name="Total Blog"
              to="/add-blog"
              icon={
                <InsertPhotoIcon
                  style={{
                    fontSize: "45px",
                    color: "white",
                  }}
                />
              }
            />
            <StatsBox
              total={vlogData?.length}
              name="Total Vlog"
              to="/add-vlog"
              icon={
                <AddAPhotoIcon
                  style={{
                    color: "white",
                    fontSize: "45px",
                  }}
                />
              }
            />
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default Dashboard;
