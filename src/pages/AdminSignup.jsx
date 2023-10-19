import React, { useState } from "react";
import FormAdmin from "../component/ui/FromAdmin";
import { Button } from "@mui/material";

function AdminSignup() {
  const [formState, setFormState] = useState("login");

  return (
    <div style={{ marginTop: "40px", textAlign: "center" }}>
      <FormAdmin state={formState} />
      <Button
        sx={{
          textDecoration: "underline",
        }}
        onClick={() => {
          setFormState((state) =>
            state === "login" ? "signup" : "login"
          );
        }}
      >
        {formState === "login"
          ? "Go to signup"
          : "Go to login if already signed up"}
      </Button>
    </div>
  );
}

export default AdminSignup;
