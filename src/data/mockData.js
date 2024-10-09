import AddCircleIcon from "@mui/icons-material/AddCircle";

export const addBlogCol = [
  { name: "Title" },
  { name: "Description" },
  { name: "Blogger Name" },
  { name: "Date" },
  { name: "Images" },
];
export const addVlogCol = [
  { name: "Logger Name" },
  { name: "Date" },
  { name: "Videos" },
  { name: "Video Link" },
];

export const addCertificateCol = [
  { name: "Title" },
  { name: "Date" },
  { name: "Code" },
  { name: "Images" },
];

export const profileList = [
  { label: "Profile", link: "/profile" },
  { label: "Logout", link: "/" },
];

export const sideBarList = [
  {
    label: "Add Blog",
    icon: <AddCircleIcon />,
    link: "add-blog",
  },
  // 2nd list
  {
    label: "Add Vlog",
    icon: <AddCircleIcon />,
    link: "add-vlog",
  },
];
