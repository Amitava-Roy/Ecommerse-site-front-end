import React, { useEffect, useState } from "react";
import Product from "../component/Product";
import { useQuery } from "@tanstack/react-query";
import { shopData } from "../api-services/shop";
import { Grid, Paper, Stack } from "@mui/material";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Spinner from "./Spinner";
function Home() {
  const [filter, setFilter] = useState("");
  const [sort, setSort] = useState("");
  const {
    data = [],
    isError,
    isLoading,
  } = useQuery({
    queryKey: ["shop"],
    queryFn: shopData,
  });
  // useEffect(() => {
  //   const res = fetch("http://localhost:8080/shop")
  //     .then((res) => res.json())
  //     .then((data) => {
  //       setData(data);
  //     })
  //     .catch((err) => console.log(err));
  // }, []);

  const handleChangeSort = (event) => {
    setSort(event.target.value);
  };
  const handleChangeFilter = (event) => {
    setFilter(event.target.value);
  };
  let filterData = data;
  let factor;
  // sort by name from Z-A
  if (sort === "ZtoA")
    filterData = data.sort((a, b) => {
      const nameA = a.name.trim().toUpperCase(); // ignore upper and lowercase
      const nameB = b.name.trim().toUpperCase(); // ignore upper and lowercase
      if (nameA < nameB) {
        return +1;
      }
      if (nameA > nameB) {
        return -1;
      }
      if (nameA === nameB) {
        // names must be equal
        return 0;
      }
    });
  // srot by name
  if (sort === "AtoZ")
    filterData = data.sort((a, b) => {
      const nameA = a.name.trim().toUpperCase(); // ignore upper and lowercase
      const nameB = b.name.trim().toUpperCase(); // ignore upper and lowercase
      if (nameA < nameB) {
        return -1;
      }
      if (nameA > nameB) {
        return 1;
      }

      // names must be equal
      return 0;
    });

  if (sort == "HTL") factor = -1;
  if (sort == "LTH") factor = 1;
  filterData = data.sort(
    (a, b) => (Number(a.price) - Number(b.price)) * factor
  );
  let filterSortData;
  if (filter === "none" || filter === "") {
    filterSortData = filterData;
  } else {
    filterSortData = filterData.filter(
      (prod) => prod.category === filter
    );
  }

  return (
    <>
      {isLoading && <Spinner />}
      <main
        style={{ marginTop: "2rem", marginLeft: "auto" }}
      >
        <Grid container sx={{ margin: "auto" }} spacing={2}>
          <Grid item>
            <Stack
              spacing={{ xs: 1, sm: 1, md: 2 }}
              direction="row"
              useFlexGap
              flexWrap="wrap"
            >
              <Box sx={{ minWidth: 120 }}>
                <FormControl fullWidth>
                  <InputLabel id="demo-simple-select-label">
                    SortBy
                  </InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={sort}
                    label="Age"
                    onChange={handleChangeSort}
                  >
                    <MenuItem value={"LTH"}>
                      Price Low to High
                    </MenuItem>
                    <MenuItem value={"HTL"}>
                      Price High to Low
                    </MenuItem>
                    <MenuItem value={"AtoZ"}>
                      Sort By Name (A-Z)
                    </MenuItem>
                    <MenuItem value={"ZtoA"}>
                      Sort By Name (Z-A)
                    </MenuItem>
                  </Select>
                </FormControl>
              </Box>

              <Box sx={{ minWidth: 120 }}>
                <FormControl fullWidth>
                  <InputLabel id="demo-simple-select-label">
                    Filter
                  </InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={filter}
                    onChange={handleChangeFilter}
                    label="Age"
                  >
                    <MenuItem value={"none"}>
                      Cancel filter
                    </MenuItem>
                    <MenuItem value={"clothing"}>
                      Clothing
                    </MenuItem>
                    <MenuItem value={"electronics"}>
                      Electronics
                    </MenuItem>
                    <MenuItem value={"footware"}>
                      Footware
                    </MenuItem>
                    <MenuItem value={"furniture"}>
                      Furniture
                    </MenuItem>
                  </Select>
                </FormControl>
              </Box>
            </Stack>
          </Grid>
          <Grid item sx={{ alignSelf: "center" }}>
            <Product products={filterSortData} />
          </Grid>
        </Grid>
      </main>
    </>
  );
}

export default Home;
