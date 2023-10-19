/* eslint-disable jsx-a11y/anchor-is-valid */
import * as React from "react";
import { styled, alpha } from "@mui/material/styles";
import InputBase from "@mui/material/InputBase";
import SearchIcon from "@mui/icons-material/Search";
import {
  Button,
  IconButton,

  InputLabel,
  MenuItem,
  Select,
} from "@mui/material";
import { MdFilterAlt } from "react-icons/md";
import TableCar from "../components/TableCar";
import { Link, useNavigate } from "react-router-dom";
import { BsFillCarFrontFill } from "react-icons/bs";
import { AiOutlinePlus } from "react-icons/ai";
import { useDispatch } from "react-redux";
import { filteredData } from "../redux/carsSlice";
import { Modal, Space } from "antd";
import { getAllByBrand, getAllByModal, getAllByModalAndByBrand, getAllCars } from "../service";
const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginLeft: 0,
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(1),
    width: "auto",
  },
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      width: "12ch",
      "&:focus": {
        width: "20ch",
      },
    },
  },
}));

const brand = ["Porshe","Lamborghini", "Lotus","Aston Martin","Togg",];
const modelBrand = [
  ["Gallardo","Gallardo Spyder","Murcielago Roadster","Gallardo SE","Reventon","Aventador LP700-4","Sesto Elemento","Hurcan"],

  ["Elete", "Elise", "Evija", "Evoro", "Exige"],

  ["Mx-5","Cx-5","Mazda 6"],

  ["DBX707", "DBX V8", "DB12", "DB12 Volante", "DBS Ultimate", "DBS 770 Ultimate Volante", "DBS Coupe", "DBS Volante", "V12 Coupe","V12 Roadster","F1 Edition","Valour","Valkyrie Coupe","Valkyrie AMR Pro", "Valkyrie Spider", "Valhala"],

  ["T10X SUV", "T10S Sedan"," T8CX Xcoupe", "T8X Suv", "10V MPV"]

];

export default function Home() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [search, setSearch] = React.useState("");
  const [brandFiltered, setBrandFiltered] = React.useState("");
  const [modalFiltered, setModalFiltered] = React.useState("");

  const [openEdit, setOpenEdit] = React.useState(false);
  const [confirmLoadingEdit, setConfirmLoadingEdit] = React.useState(false);


  const handleSubmit =async()=>{
    if(search!==" "){
      await dispatch(filteredData(search));

    }

  }

  
  const fetchData=()=>{
    if(brandFiltered!==""&&modalFiltered!==""){
      dispatch(getAllByModalAndByBrand({brand:brandFiltered,modal:modalFiltered}))
    }else if(brandFiltered!==""){
      dispatch(getAllByBrand(brandFiltered))

    }else if(modalFiltered!==""){
      dispatch(getAllByModal(modalFiltered))
    }
  

  }

  const showModalEdit = () => {
    setOpenEdit(true);
  };
  const handleOkEdit = () => {
    setConfirmLoadingEdit(true);
    setTimeout(() => {
      fetchData()
      setOpenEdit(false);
      setConfirmLoadingEdit(false);
    }, 2000);
  };
  const handleCancelEdit = () => {
    setOpenEdit(false);
  };
  const handleAll=async()=>{
    await dispatch(getAllCars())
    setBrandFiltered("")
    setModalFiltered("")

  }

  

  const logout = () => {
    localStorage.clear("token");
    localStorage.clear("currentUserId");
    localStorage.clear("currentUserName");
    navigate(0);
  };


  
  return (
    <div>
    <main>
      <section style={{ marginLeft: "40px", marginTop: "15px" }}>
        <section style={{ display: "flex", justifyContent: "space-between" }}>
        <h1>List of Cars</h1>
        <div style={{ marginLeft: "10px", marginTop: "30 px" }}> </div>
        <div style={{ display: "right" }}>
          {localStorage.getItem("token") ? (
            <Button onClick={() => logout()}>
              <a href="#" class="btn btn-info btn-lg">
              <span class="glyphicon glyphicon-log-out"></span> Log out </a>
            </Button>
            
          ) : (
            ""
          )} 
          </div>
          </section>

      </section>
          <section>
          <div style={{ background: "white", borderRadius: "15px" }}>
            <Search onSubmit={handleSubmit()}>
              <SearchIconWrapper>
                <SearchIcon />
              </SearchIconWrapper>
              <StyledInputBase
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search"
                inputProps={{ "aria-label": "search" }}
                value={search}
              />
            </Search>
          </div>
      </section>
      <hr></hr>
      <div
        style={{
          display: "flex",
          width: "1100px",
          justifyContent: "space-between",
        }}
      >
        <div>
        <section style={{marginLeft:"20px"}}>
           <IconButton onClick={showModalEdit}><MdFilterAlt/></IconButton>
           <Button onClick={handleAll}>All</Button>
         </section>
       
        {localStorage.getItem("token") ? (
          <div>
         
          <section
            style={{ marginLeft: "25px", marginRight: "25px", width: "100px" }}
          >
            <Link to={"/addNewCar"} style={{ textDecoration: "none" }}>
              <Button
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  width: "150px",
                  border: "1px solid",
                }}
              >
                <AiOutlinePlus style={{ width: "25px", height: "25px" }} /> Add New Car
              </Button>
            </Link>
          </section>
          </div>
        ) : (
          ""
        )}

        </div>
    

        {localStorage.getItem("token") ? (
          <section
            style={{ marginLeft: "25px", marginRight: "25px", width: "100px" }}
          >
            <Link to={"/mycar"} style={{ textDecoration: "none" }}>
              <Button
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  width: "150px",
                  border: "1px solid",
                  fontSize: "12px",
                }}
              >
                <BsFillCarFrontFill style={{ width: "25px", height: "25px" }} />
                My Cars
              </Button>
            </Link>
          </section>
        ) : (
          ""
        )}
      </div>

      <section
        style={{ marginTop: "10PX", marginLeft: "25px", marginRight: "25px" }}
      >
        <TableCar />
      </section>
     

    
    </main>
        <>
        <Modal
          title="Filter"
          open={openEdit}
          onOk={handleOkEdit}
          confirmLoading={confirmLoadingEdit}
          onCancel={handleCancelEdit}
        >
          <Space
            style={{
              width: "100%",
              marginTop: "5px",
              marginBottom: "5px",
            }}
            direction="vertical"
          >
            <section
              style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
             
                <div>
                  <InputLabel>
                    <strong>Brand</strong>
                  </InputLabel>
                  <Select
                    placeholder="placeholder"
                    style={{
                      width: "200px",
                    }}
                    name="brand"
                    onChange={(e) => setBrandFiltered(e.target.value)}
                    value={brandFiltered}
                  >
                    <MenuItem value="">
                      <em>None</em>
                    </MenuItem>
                    {brand.map((brand, key) => {
                      return <MenuItem value={brand}>{brand}</MenuItem>;
                    })}
                  </Select>
                </div>

                <div>
                  <InputLabel>
                    <strong>Model</strong>
                  </InputLabel>
                  <Select
                    placeholder="Placeholder"
                    style={{
                      width: "200px",
                    }}
                    name="model"
                    onChange={(e) => setModalFiltered(e.target.value)}
                    value={modalFiltered}
                  >
                    <MenuItem value="">
                      <em>None</em>
                    </MenuItem>

                    {brandFiltered
                      ? modelBrand[
                          brand.findIndex((brand) => brand === brandFiltered)
                        ].map((model,key) => {
                          return <MenuItem key={key} value={model}>{model}</MenuItem>;
                        })
                      : modelBrand.map((model) => {
                          return model.map((m,key) => {
                            return <MenuItem key={key} value={m}>{m}</MenuItem>;
                          });
                        })}
                  </Select>
                </div>
            
            </section>
          </Space>
        </Modal>
      </>
      </div>
  );
}
