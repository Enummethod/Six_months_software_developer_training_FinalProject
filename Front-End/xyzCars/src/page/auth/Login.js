import React, { useEffect } from "react";
import { useFormik } from "formik";
import { InputLabel } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { EyeInvisibleOutlined, EyeTwoTone } from "@ant-design/icons";
import { Button, Input, Space } from "antd";
import { validationsLogin } from "../../components/validation/Validation";
import { loginAuth } from "../../service";

function Login() {
  
  const [passwordVisible, setPasswordVisible] = React.useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      userName: "",
      password: "",
    },
    validationSchema:validationsLogin,

    onSubmit: async (values, bag) => {
      await dispatch(loginAuth({userName:values.userName,password:values.password}))
      formik.values.userName=""
      formik.values.password=""
      setTimeout(() => navigate(0), 5000);

    },
  });

  return (
    <main style={{
     
     
      marginTop:"50px",

      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center"}}>
       <div
      style={{
        background:"white",
        width:"700px",
        height:"500px",
    
      }}
    >
      <section style={{display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center"}}>
        <h1> XYZ-Cars</h1><br></br>
        <h1
          style={{ fontSize: "15px"}}
        >
          Please log in to continue...
        </h1>
        {
        localStorage.getItem("currentUserId")?<h6 style={{color:"green"}}>Login successful. You will be redirected after 5 seconds....</h6>:""
      }
      </section>
     

      <section style={{ width: "650px" }}>

        <form
          style={{
            
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              flexDirection: "column",
            }}
          >
            <InputLabel>
              <strong>Username</strong>
            </InputLabel>
            <Space
              style={{ width: "500px", marginTop: "5px", marginBottom: "5px" }}
              direction="vertical"
            >
              <Input
                placeholder="Placeholder"
                name="userName"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.userName}
              
              />
                  {formik.errors.userName && (
              <div
                style={{ color: "red", fontSize: "12px", textAlign: "center" }}
              >
                {formik.errors.userName}
              </div>
            )}
            </Space>

            <InputLabel>
              <strong>Password</strong>
            </InputLabel>
            <Space
              style={{ width: "500px", marginTop: "5px", marginBottom: "5px" }}
              direction="vertical"
            >
              <Input.Password
                placeholder="Placeholder"
                name="password"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.password}
                iconRender={(visible) =>
                  visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
                }
              />
                  {formik.errors.password && (
              <div
                style={{ color: "red", fontSize: "12px", textAlign: "center" }}
              >
                {formik.errors.password}
              </div>
            )}
            </Space>
          </div>

          <div style={{ marginTop: "10px", width: "500px" }}>
            <Button
              onClick={formik.handleSubmit}
              variant="contained"
              style={{
                background: "linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)",
                color: "white",
                width:"100%"
              }}
            >
              Log In
            </Button>
          </div>
          <div style={{marginTop:"50px"}}>
              No account yet?<Link style={{textDecoration:"none"}} to={"/register"}>Sign Up</Link>
            </div>
        </form>
      </section>
    </div>

    </main>
   
  );
}

export default Login;
