import * as React from "react";
import ConnectedGraph from "./ConnectedGraph"
import {CircularProgress, Grid, Typography, Box, TextField, Button, Dialog, DialogContent,IconButton,Tooltip } from "@material-ui/core";
import {useEffect, useState} from "react";
import RestAPI from "../../../../../Services/api";
import Help from "./Help"
import FilterListIcon from "@material-ui/icons/FilterList";
import MoreFilters from "./MoreFilters"
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import arrow from "./arrow.gif";

export default function Connect (props) {
    const [data, setData] = useState(props.data)
    console.log(data.selectedNames, "const")
    console.log(data, "useState")
    const [dataCollected, setDataCollected]=useState(false)
    const [myInterests, setMyInterests]=useState([])
    const [noa, setNoa] = useState(data.noa ? data.noa: 3)
    const [papers, setPapers] = useState(true)
    const [fetching, setFetch] = useState(true)
    const [button, setButton] = useState(true)
    const [changed, setChange] = useState(false)
    const [help, setHelp] = useState(false)
    const [selectedNames, setSelectedNames] = useState([data.selectedNames])
    let currentUser = JSON.parse(localStorage.getItem("rimaUser"));
    console.log("test", fetching)

    //ChatGPT
    const submitNumber = async() => {
        if(!fetching){
        setFetch(true)
        console.log("submit")
        setDataCollected(false);
        setButton(false)
        RestAPI.getConnectData({data: currentUser.author_id, noa, selectedNames, papers})
          .then((res) => {
            const {data}=res
            setData(data.data)
            console.log(data, "useState2")
          })
          .catch((error) => {
            console.log("Error fetching data:", error);
          });
        
        }
      };
 
    useEffect(()=>{

        console.log(selectedNames, "selectedNames in Connect------------------------------");
        
        if(data.length===0){
            setData(props.data)
            setDataCollected(false)
            
        }
        else{
            RestAPI.longTermInterest(currentUser).then(res=>{
                const {data} =res
                let interests = []
                data.map((d)=>{
                    interests.push(d.keyword)
                })
                setMyInterests(interests)
            })
                     

            setDataCollected(true)
            setFetch(false)
        }


    },[data,props,selectedNames])

   
    const [open, setOpen] = useState(false)

    const handleMoreFilters = () => {
        setOpen(true);
    }
    const closeFilter = () => {
       if(button || changed){    //prevent new api calls althoug no filters are done
        submitNumber()
        setChange(false)}
        setOpen(false);
    } 

    const closeHelp = () => {
        setHelp(false);
    }

    const handleSelectedNamesChange = (names) => {
        console.log(names, "names")
        console.log(selectedNames.some(item => item === names))
        if((names.some(item => !selectedNames.includes(item)))){setChange(true)}
        else {setChange(false)}
        setSelectedNames([...names]);
        
    }
    console.log(selectedNames, "SlectedNames Connect")


    console.log(data, "const3")
    return (
        <>

            
            <Help/>
            <Grid container>
              <Grid item xs ={12} style={{padding:"8px"}}>
            
              
                                
                    {dataCollected? 
                    
                    <>
                    <Button onClick={setHelp} color="primary">Help</Button>
                    <Dialog open={help} onClose={closeHelp}>
                        <DialogContent>
                            <Help closeHelp={closeHelp} help={help}/>
                        </DialogContent>
                    </Dialog>
                    <Box display="flex" justifyContent="flex-end" alignItems="flex-end">
                            <TextField id="noa"
                                label="Number"
                                type="number"
                                variant="outlined"
                                size="small"
                                onChange={(e) => setNoa(parseInt(e.target.value, 10))}
                                defaultValue={noa ? noa : parseInt(3)}
                                color="primary"
                                style={{ width: "7.5%" }}
                                inputProps={{
                                    min: 0,
                                    max: 10,
                                    step: 1,
                                }} />
                            <Button onClick={submitNumber} id="submit" color="primary">Submit</Button>
                            <Button color="primary" onClick={handleMoreFilters}>
                                MORE
                                
                            </Button>
                            <div>
                                    {button ? (
                                        <Tooltip title="Test">
                                        <Button disabled>
                                            <img src={arrow} alt="gif" style={{ width: '40px', height: '25px', transform: 'rotate(90deg)'}}/>
                                            <Typography color="primary">Please Configure</Typography>
                                        </Button>
                                        </Tooltip>
                                    ) : (
                                        <></>
                                    )}
                                    </div>
                            <Dialog open={open} onClose={closeFilter} maxWidth="md" fullWidth>
                                <DialogContent>
                                    <MoreFilters onClose={closeFilter} data={data} onSelectedNamesChange={handleSelectedNamesChange} />
                                </DialogContent>
                            </Dialog>
                           </Box><ConnectedGraph data={data} myInterests={myInterests} />
                        </>
                        
                        :<Loading/>}
                </Grid>
            </Grid>
        </>
        )
};

export const Loading = () => {
    return (
        <>
            <Grid
                container
                direction="column"
                justifyContent="center"
                alignItems="center"
            >
                <Grid item>
                    <CircularProgress/>
                </Grid>
                <Grid item>
                    <Tooltip title="this can take some time"><Typography variant="overline"> Loading data  </Typography></Tooltip>
                </Grid>
            </Grid>
        </>
    )
}


