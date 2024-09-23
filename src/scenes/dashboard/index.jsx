import { Box } from "@mui/material";
import StatsBox from "./StatsBox";
import InsertPhotoIcon from "@mui/icons-material/InsertPhoto";
import AddAPhotoIcon from "@mui/icons-material/AddAPhoto";
import CardMembershipIcon from "@mui/icons-material/CardMembership";
import Header from "../../components/Header";

const Dashboard = ({ token }) => {
  // import course
  // const {
  //   data: examData,
  //   isLoading: examLoading,
  //   isError: examError,
  // } = useMediaQuery({
  //   queryKey: QueryKeys.course,
  //   queryFn: fetchExam,
  // });

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
            subtitle={token && `Welcome ${token.user.email}`}
          />
          <Box
            display="grid"
            gridTemplateColumns="repeat(12, 1fr)"
            gridAutoRows="140px"
            gap="20px"
            flexWrap="wrap"
          >
            <StatsBox
              total={0}
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
              total={0}
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
            <StatsBox
              total={0}
              name="Total Certificate"
              to="/add-certificate"
              icon={
                <CardMembershipIcon
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
