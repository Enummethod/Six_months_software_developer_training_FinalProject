import { useFormik } from "formik";
import { Button, Input, InputLabel, MenuItem, Select } from "@mui/material";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { validationsAddNewCar } from "../components/validation/Validation";
import { addOneCar } from "../service";

const brand = ["Porshe","Lamborghini", "Lotus","Mazda","Aston Martin","Togg",];
const modelBrand = [
  ["718","911","Taycan","Panamera","Mecan","Cayenne"],
  ["Gallardo","Gallardo Spyder","Murcielago Roadster","Gallardo SE","Reventon","Aventador LP700-4","Sesto Elemento","Hurcan"],

  ["Elete", "Elise", "Evija", "Evoro", "Exige"],

  ["Mx-5","Cx-5","Mazda 6"],

  ["DBX707", "DBX V8", "DB12", "DB12 Volante", "DBS Ultimate", "DBS 770 Ultimate Volante", "DBS Coupe", "DBS Volante", "V12 Coupe","V12 Roadster","F1 Edition","Valour","Valkyrie Coupe","Valkyrie AMR Pro", "Valkyrie Spider", "Valhala"],

  ["T10X SUV", "T10S Sedan"," T8CX Xcoupe", "T8X Suv", "10V MPV"]

];

function AddCar() {


  const dispatch = useDispatch();
  const navigate = useNavigate();
 
 

  const formik = useFormik({
    initialValues: {
      carName: "",
      plaka: "",
      brand: "",
      model: "",
      year: "",
    },
    validationSchema: validationsAddNewCar,
    onSubmit: async (values, bag) => {
      dispatch(addOneCar({
        carName:values.carName,
        modal:values.model,
        year:values.year,
        brand:values.brand,
        plate:values.plaka,
        userId:localStorage.getItem("currentUserId")
      }))
      navigate("/")
    },
  });

  return (
    <div
      style={{
      
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <section>
        <h3
          style={{ fontSize: "40px", marginRight: "850px", marginTop: "15px" }}
        >
          Add New Car
        </h3>
      </section>

      <section style={{ width: "650px" }}>
        <form
          style={{
            marginTop: "15px",
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
              <strong>Car Name</strong>
            </InputLabel>
            <Input
              placeholder="Placeholder"
              style={{ width: "500px", marginTop: "5px", marginBottom: "5px" }}
              name="carName"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.carName}
            />
            {formik.errors.carName && (
              <div
                style={{ color: "red", fontSize: "12px", textAlign: "center" }}
              >
                {formik.errors.carName}
              </div>
            )}
          </div>

          <div
            style={{
              display: "flex",
              justifyContent: "center",
              flexDirection: "column",
            }}
          >
            <InputLabel>
              <strong>Plate</strong>
            </InputLabel>
            <Input
              placeholder="Placeholder  "
              style={{ width: "500px", marginTop: "5px", marginBottom: "5px" }}
              name="plaka"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.plaka}
            />
            {formik.errors.plaka && (
              <div
                style={{ color: "red", fontSize: "12px", textAlign: "center" }}
              >
                {formik.errors.plaka}
              </div>
            )}
          </div>

          <div
            style={{
              display: "flex",
              justifyContent: "center",
              flexDirection: "column",
            }}
          >
            <InputLabel>
              <strong>Brand</strong>
            </InputLabel>
            <Select
              
              style={{ width: "500px", marginTop: "5px", marginBottom: "5px" }}
              name="brand"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.brand}
            >
              <MenuItem value="">
                <em>None</em>
              </MenuItem>
              {brand.map((brand, key) => {
                return <MenuItem  value={brand}>{brand}</MenuItem>;
              })}
            </Select>
            {formik.errors.brand && (
              <div
                style={{ color: "red", fontSize: "12px", textAlign: "center" }}
              >
                {formik.errors.brand}
              </div>
            )}
          </div>

          <div
            style={{
              display: "flex",
              justifyContent: "center",
              flexDirection: "column",
            }}
          >
            <InputLabel>
              <strong>Model</strong>
            </InputLabel>
            <Select
              placeholder="Placeholder"
              style={{ width: "500px", marginTop: "5px", marginBottom: "5px" }}
              name="model"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.model}
            >
              <MenuItem value="">
                <em>None</em>
              </MenuItem>
              {

                formik.values.brand ? 
                modelBrand[brand.findIndex((brand)=>brand===formik.values.brand)].map((model)=>{
                  return(
                    <MenuItem value={model}>{model}</MenuItem>
                  )
                }) : ""
              }
           
            

             
            </Select>
            {formik.errors.model && (
              <div
                style={{ color: "red", fontSize: "12px", textAlign: "center" }}
              >
                {formik.errors.model}
              </div>
            )}
          </div>

          <div
            style={{
              display: "flex",
              justifyContent: "center",
              flexDirection: "column",
            }}
          >
            <InputLabel>
              <strong>Year</strong>
            </InputLabel>
            <Input
              placeholder="Entered Text"
              style={{ width: "500px", marginTop: "5px", marginBottom: "5px" }}
              name="year"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.year}
            />
            {formik.errors.year && (
              <div
                style={{ color: "red", fontSize: "12px", textAlign: "center" }}
              >
                {formik.errors.year}
              </div>
            )}
          </div>

          <div style={{ marginTop: "10px", textAlign: "end", width: "500px" }}>
        
           
            <Button
              onClick={()=>navigate("/")}
              variant="text"
              style={{
               
                marginRight:"15px"
                
              }}
            >
              Cancel
            </Button>
         
            <Button
              onClick={formik.handleSubmit}
              variant="contained"
              style={{
                background: "linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)",
                color: "white",
              }}
            >
              Save
            </Button>
    
          </div>
        </form>
      </section>
    </div>
  );
}

export default AddCar;
