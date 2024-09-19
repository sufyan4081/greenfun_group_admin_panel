import React from "react";
import BreadCrumbs from "../../components/BreadCrumbs";
import { Box } from "@mui/material";
import AddVlogTable from "./AddVlogTable";
import AddVlogForm from "./AddVlogForm";

const AddVlog = () => {
  // Use React Query to fetch subject data
  // const {
  //   data: vlogData,
  //   error: vlogError,
  //   isLoading: vlogIsLoading,
  //   isError: vlogIsError,
  // } = useQuery(QueryKeys.vlog, fetchVlogs);

  // if (vlogIsLoading) {
  //   return (
  //     <Grid align="center" sx={{ marginTop: "10px" }}>
  //       <CircularProgress sx={{ color: "#20209f" }} />
  //     </Grid>
  //   );
  // }
  // if (vlogIsError) {
  //   return <p>Error: {subjectError.message}</p>;
  // }

  return (
    <>
      <BreadCrumbs pageName="Add Vlog" />
      <Box sx={{ margin: "100px 20px 0px 20px" }} data-aos="zoom-in">
        {/* import form */}
        <AddVlogForm />

        {/* import both table and subject filter  */}
        <Box sx={{ marginTop: "70px" }}>
          <AddVlogTable
          // vlogData={vlogData?.data}
          // allData={vlogData.data.length}
          />
        </Box>
      </Box>
    </>
  );
};

export default AddVlog;
