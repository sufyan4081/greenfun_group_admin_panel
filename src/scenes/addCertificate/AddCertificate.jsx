import React from "react";
import BreadCrumbs from "../../components/BreadCrumbs";
import { Box } from "@mui/material";
import AddCertificateTable from "./AddCertificateTable";
import AddCertificateForm from "./AddCertificateForm";

const AddCertificate = () => {
  // Use React Query to fetch certificate data
  // const {
  //   data: certificateData,
  //   error: certificateError,
  //   isLoading: certificateIsLoading,
  //   isError: certificateIsError,
  // } = useQuery(QueryKeys.certificate, fetchCertificates);

  // if (certificateIsLoading) {
  //   return (
  //     <Grid align="center" sx={{ marginTop: "10px" }}>
  //       <CircularProgress sx={{ color: "#20209f" }} />
  //     </Grid>
  //   );
  // }
  // if (certificateIsError) {
  //   return <p>Error: {subjectError.message}</p>;
  // }

  return (
    <>
      <BreadCrumbs pageName="Add Certificate" />
      <Box sx={{ margin: "100px 20px 0px 20px" }} data-aos="zoom-in">
        {/* import form */}
        <AddCertificateForm />

        {/* import both table and subject filter  */}
        <Box sx={{ marginTop: "70px" }}>
          <AddCertificateTable
          // certificateData={certificateData?.data}
          // allData={certificateData.data.length}
          />
        </Box>
      </Box>
    </>
  );
};

export default AddCertificate;
