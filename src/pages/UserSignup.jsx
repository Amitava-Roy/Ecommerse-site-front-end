import React, { useState } from "react";
import Form from "../component/ui/Form";
import { Button } from "@mui/material";

function UserSignup() {
  const [formState, setFormState] = useState("login");

  return (
    <div style={{ marginTop: "40px", textAlign: "center" }}>
      <Form state={formState} setState={setFormState} />
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

export default UserSignup;
