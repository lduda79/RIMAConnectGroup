import React, {useState} from "react";
import { makeStyles } from "@material-ui/styles";
import {
  Typography,
  Checkbox,
  FormControlLabel,
  FormGroup,
  Divider,
  Dialog,
  DialogContent,
  DialogTitle,
  Box,
  Button,
} from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
    title: {
        fontSize: "24px",
        fontWeight: "bold",
        marginBottom: "16px",
        textTransform: "uppercase",
      },
    divider:{
        marginBottom: "30px",
        height: "2px",
        backgroundColor: "black",
    },
    checkBox:{
       marginLeft:"30px"
    }
  }));

export default function MoreFilters(props) {
 
  const {data}=props
  
  console.log(data, "DATAAAAAAAAAAAAAAA")
  console.log(data.citations.map(item => item.name))
  const names = data.citations.map(item => item.name).concat(data.references.map(item => item.name))
  const uniqNames = [...new Set(names)]
  console.log(names, uniqNames)

  const [selectedNames, setSelectedNames] = useState([]);


  const handleCheckboxChange = (event) => {

    //ChatGPT
    const { value, checked } = event.target;

    if (checked) {
      setSelectedNames((selectedNames) => [...selectedNames, value]);
    } else {
      setSelectedNames((selectedNames) =>
        selectedNames.filter((name) => name !== value)
      );
    }
    console.log(selectedNames, "Selected Names after Checkbox change-------------------------------")
  };


  const classes = useStyles();

 const handleApply = () => {
    console.log(selectedNames, "Selected Names after Apply ----------------------------------");
    props.onSelectedNamesChange(selectedNames);
    props.onClose();
  };

 const handleClose = () => {
    props.onClose();
  };

  return (
    <Dialog open={true} onClose={handleClose} maxWidth="md" fullWidth >
      <DialogTitle className={classes.title}>More Filters </DialogTitle>
      <DialogContent dividers>

      <Typography variant="h6"  className={classes.title}>Hide</Typography>
            <FormGroup className={classes.checkBox}>
              {uniqNames.map(name =>(<FormControlLabel key = {name} control={<Checkbox checked={selectedNames.includes(name)}  
              onChange={handleCheckboxChange} value={name}/>} label={name} />))} 
            </FormGroup>         
          
          <Divider className={classes.divider}/>

          <Typography variant="h6" className={classes.title}>Time Period</Typography>
          <FormGroup className={classes.checkBox}>
            <FormControlLabel control={<Checkbox />} label="This Year" />
            <FormControlLabel control={<Checkbox />} label="Last 5 Years" />
            <FormControlLabel control={<Checkbox />} label="Last 10 Years" />
          </FormGroup>
          <Divider className={classes.divider}/>

          <Typography variant="h6" className={classes.title}>Paper</Typography>
          <FormGroup className={classes.checkBox}>
            <FormControlLabel control={<Checkbox />} label="Content" />
            <FormControlLabel control={<Checkbox />} label="Content" />
            <FormControlLabel control={<Checkbox />} label="Content" />
          </FormGroup>
          <Divider className={classes.divider}/>

          <Typography variant="h6" className={classes.title}>Themes</Typography>
          <FormGroup className={classes.checkBox}>
            <FormControlLabel control={<Checkbox />} label="Content" />
            <FormControlLabel control={<Checkbox />} label="Content" />
            <FormControlLabel control={<Checkbox />} label="Content" />
          </FormGroup>
          

         

          <Box
            style={{
              display: "flex",
              justifyContent: "flex-end",
            }}
          >
            <Button
              onClick={handleApply}
              style={{
                backgroundColor: "blue",
                color: "white",
                marginRight: "2px"
              }}
            >
              Apply
            </Button>
            <Button
              onClick={handleClose}
              style={{ backgroundColor: "grey", color: "white" }}
            >
              Close
            </Button>
          </Box>
      </DialogContent>
    </Dialog>
  );
}