import { Button, Typography } from "@mui/material";
import React from "react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Icon } from 'react-materialize'; 
import Notification from "./Edit";
import { useFormik } from "formik";
import * as Yup from "yup";
import {
    TextField,
    Switch,
    Dialog,
    DialogTitle,
    DialogContent,
    FormControlLabel,
    DialogContentText,
    Alert,
    AlertTitle,
    DialogActions,
} from "@mui/material";
import { setDefaultEventParameters } from "firebase/analytics";

export default function Dashboard() {

    const [open, setOpen] = useState(false);
    const handleClose = () => {
        setOpen(false);
    };
    const baseURL = `https://63620b4bfabb6460d803c87c.mockapi.io/ex20/players`;
    const formik = useFormik({
        initialValues: {
            name: "",
            nation: "",
            club: "",
            cost: 0,
            clip: "",
            info: "",
            img: "",
            famous: false,
        },

        onSubmit: (values) => {
            setOpen(true)
        }
    });

    ////////////////////////////////////////////////////////////////////////////////////////////
    const [APIData, setAPIData] = useState([]);
    const[name, setName] = useState("");
    const[nation, setNation] = useState("");
    const[club, setClub] = useState("");
    const[cost, setCost] = useState("");
    const[info, setInfo] = useState("");
    const[clip, setClip] = useState("");
    const[img, setImg] = useState("");
    const[famous, setFamous] = useState(false);
    const [userId,setUserId]=useState(null)
    // const baseUrl=`https://635a851b38725a1746c8a79a.mockapi.io/Players`
    const baseUrl = `https://63620b4bfabb6460d803c87c.mockapi.io/ex20/players`
    const [buttonPopup, setButtonPopup] = useState(false);

    // function getUsers(){
    //    fetch(baseUrl)
    //    .then(response => {
       
    //    if (response.ok) {return response;}
    //    else {var error = new Error('Error ' + response.status + ': ' + response.statusText);  error.response = response;
    //    throw error;}
    //    },
    //     error => {var errmess = new Error(error.message);  throw errmess;
    //    })
    //   .then(response => response.json())
    //   .then(data => setAPIData(data))
    //   .catch(error => console.log(error.message));
    // }
    function getUsers(){
        fetch(baseUrl).then((result) =>{
            result.json().then((resp)=>{
                setAPIData(resp)
                setName(resp[0].name)
                setNation(resp[0].nation)
                setClub(resp[0].club)
                setCost(resp[0].cost)
                setInfo(resp[0].info)
                setClip(resp[0].clip)
                setImg(resp[0].img)
                setFamous(resp[0].famous)
                setUserId(resp[0].id)
            })
        })
    }
    useEffect(()=>{
      getUsers();
    },[])

    function deleteUser(id){
        fetch(`https://6362100f66f75177ea2566ca.mockapi.io/Players/Players/${id}`,{
            method:'DELETE'
        }).then((result)=>{
            result.json().then((resp)=>{
                console.warn(resp)
                getUsers()
            })
        })
    }
    
    function selectUser(id){
        console.warn("function called", APIData[id-1])
        let item= APIData[id-1]
        setName(item.name)
        setNation(item.nation)
        setClub(item.club)
        setCost(item.cost)
        setInfo(item.info)
        setClip(item.clip)
        setImg(item.img)
        setFamous(item.famous)
        setUserId(item.id)
    }
    function updateUser(){
        let item={name, nation, club, cost, info, clip, img, famous}
        console.warn("item", item)
        fetch(`https://6362100f66f75177ea2566ca.mockapi.io/Players/Players/${userId}`,{
            method:'PUT',
            headers:{
                'Accept': 'application/json',
                'Content-type': 'application/json'
            },
            body:JSON.stringify(item)
        }).then((result)=>{
            result.json().then((resp)=>{
                console.warn(resp)
                getUsers()
            })
        })
    }

    function buttonpop(){
        setButtonPopup(true)
    }
    function buttonclose(){
        setButtonPopup(false)
    }

    
    return(
        <div className="Dashboard_main">
            <div className="add_post">
            <div className="addc">
            <h1>Dashboard DataBase</h1>
            </div>
            <Typography className="Dashboard_add">
                <Link to='/add' style={{textDecoration:"none"}} className="Dashboard_adda">
                <Icon>add_circle_outline</Icon> Add data
                </Link>
            </Typography>
            
            </div>
            <div className="head_tab">
                <table>
                    <thead>
                        <tr>
                        <th>Id</th>
                        <th>Name</th>
                        <th>Cost</th>
                        <th>Club</th>
                        <th>Img</th>
                        <th>Clip</th>
                        <th>Famous</th>
                        <th>Nation</th>
                        <th>Info</th>
                        <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                    {APIData.map((data)=>(
                        <tr>
                            <td>{data.id}</td>
                            <td>{data.name}</td>
                            <td>{data.cost}</td>
                            <td>{data.club}</td>
                            <td><img src={data.img} /></td>
                            <td>{data.clip}</td>
                            <td>{String(data.famous)}</td>
                            <td>{data.nation}</td>
                            <td>{data.info}</td>  
                            <td>
                            <button onClick={
                                function buttona(){
                                    selectUser(data.id);
                                    buttonpop();
                                }
                            }
                            style={{marginBottom:'10px'}}
                            >
                                <Icon left >edit</Icon>
                            </button>

                            <button onClick={() =>deleteUser(data.id)}>
                                <Icon left >remove</Icon>
                            </button>    
                            </td>  
                        </tr>
                    ))}
                    </tbody>
                </table>






{/*------------------------------------------------------------------------- PopUp Zone ---------------------------------------------------------------------*/}
            <Notification trigger={buttonPopup} setTrigger={setButtonPopup}>
            <div>
            <div className='Add_info'>
            <form onSubmit={formik.handleSubmit} className='Add_info'>
            <TextField
                autoFocus
                margin="dense"
                name="name"
                label="Name"
                type="text"
                fullWidth
                variant="standard"
                value={name}
                onChange={(e) => {setName(e.target.value)}}
            />
            
            <TextField
                autoFocus
                margin="dense"
                name="club"
                label="Club"
                type="text"
                fullWidth
                variant="standard"
                value={club}
                onChange={(e) => {setClub(e.target.value)}}
            />
            
            <TextField
                autoFocus
                margin="dense"
                name="nation"
                label="Nation"
                type="text"
                fullWidth
                variant="standard"
                value={nation}
                onChange={(e) => {setNation(e.target.value)}}
            />
            
            <TextField
                margin="dense"
                name="img"
                label="URL of image"
                type="text"
                fullWidth
                variant="standard"
                value={img}
                onChange={(e) => {setImg(e.target.value)}}
            />
            
            <TextField
                margin="dense"
                name="cost"
                label="Market value"
                type="number"
                fullWidth
                variant="standard"
                value={cost}
                onChange={(e) => {setCost(e.target.value)}}
            />
            
            <TextField
                margin="dense"
                name="clip"
                label="Intro video"
                type="text"
                fullWidth
                variant="standard"
                value={clip}
                onChange={(e) => {setClip(e.target.value)}}
            />
            
            <TextField
                multiline
                rows={2}
                margin="dense"
                name="info"
                label="Information"
                type="text"
                fullWidth
                variant="standard"
                value={info}
                onChange={(e) => {setInfo(e.target.value)}}
            />
            
            <FormControlLabel
                control={<Switch />}
                label="Famous"
                name="famous"
                value={famous}
                onChange={(e) => {setFamous(e.target.value)}}
            />
            <br />
            <Button variant="contained" size="medium"  className='Add_button' type="submit"
            onClick={updateUser}
            >
                <p className='Add_buttonc'>Edit</p>
            </Button>

            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">
                    {"Congraturation"}
                </DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        <Alert severity="success">
                            <AlertTitle>Edit successful!</AlertTitle>
                        </Alert>
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button autoFocus onClick={
                            function buttonb(){
                                handleClose();
                                buttonclose();
                            }
                        }>
                        Close
                    </Button>
                </DialogActions>
            </Dialog>
            </form>
        </div>
        </div> 
                </Notification>
            </div>
        </div>
    )
}