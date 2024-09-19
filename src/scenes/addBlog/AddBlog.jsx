import React from "react";
import BreadCrumbs from "../../components/BreadCrumbs";
import { Box } from "@mui/material";
import AddBlogTable from "./AddBlogTable";
import AddBlogForm from "./AddBlogForm";

const AddBlog = () => {
  // Use React Query to fetch subject data
  // const {
  //   data: blogData,
  //   error: blogError,
  //   isLoading: blogIsLoading,
  //   isError: blogIsError,
  // } = useQuery(QueryKeys.blog, fetchBlogs);

  // if (blogIsLoading) {
  //   return (
  //     <Grid align="center" sx={{ marginTop: "10px" }}>
  //       <CircularProgress sx={{ color: "#20209f" }} />
  //     </Grid>
  //   );
  // }
  // if (blogIsError) {
  //   return <p>Error: {subjectError.message}</p>;
  // }

  return (
    <>
      <BreadCrumbs pageName="Add Blog" />
      <Box sx={{ margin: "100px 20px 0px 20px" }} data-aos="zoom-in">
        {/* import form */}
        <AddBlogForm />

        {/* import both table and subject filter  */}
        <Box sx={{ marginTop: "70px" }}>
          <AddBlogTable
          // blogData={blogData?.data}
          // allData={blogData.data.length}
          />
        </Box>
      </Box>
    </>
  );
};

export default AddBlog;
