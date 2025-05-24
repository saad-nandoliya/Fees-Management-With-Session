import React from "react";
import AdmissionForm from "./AdmissionForm";

const index = ({ sessionYear, classes }) => {
  return (
    <>
      <AdmissionForm sessionYear={sessionYear} classes={classes}/>
    </>
  );
};

export default index;
