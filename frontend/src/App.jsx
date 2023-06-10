import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import { Grid, Button, Stack, Dialog, DialogTitle, DialogContent, DialogActions } from '@mui/material';
import { Alert } from '@mui/lab';
import axios from 'axios';

const AlertModal = ({openDialog, closeDialog, state}) => {
    if(state === "success") {
        return (
            <div>
                <Dialog open={openDialog}>
                    <DialogTitle>Success</DialogTitle>
                    <DialogContent>
                        <Alert severity="success">Connect successfully</Alert>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={closeDialog} color="primary">
                            close
                        </Button>
                    </DialogActions>
                </Dialog>
            </div>
        )
    } else if(state === "attack") {
        return (
            <div>
                <Dialog open={openDialog}>
                    <DialogTitle>Warning</DialogTitle>
                    <DialogContent>
                        <Alert severity="warning">You launch an attack, notify the requests after will be prohibited</Alert>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={closeDialog} color="primary">
                            close
                        </Button>
                    </DialogActions>
                </Dialog>
            </div>
        )
    } else {
        return (
            <div>
                <Dialog open={openDialog}>
                    <DialogTitle>Forbidden</DialogTitle>
                    <DialogContent>
                        <Alert severity="error">You are prohibited to access because of your attack before</Alert>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={closeDialog} color="primary">
                            close
                        </Button>
                    </DialogActions>
                </Dialog>
            </div>
        )
    }
}

function App() {

    const [state, setState] = useState("");
    const [openDialog, setOpenDialog] = useState(false);

    const node1 = import.meta.env.VITE_NODE1_URL;
    const node2 = import.meta.env.VITE_NODE2_URL;
    const node3 = import.meta.env.VITE_NODE3_URL;

    const connect = (host) => {
        axios.post(`${host}/api/data`, {
            message: "test connect"
        }).then(result => {
            if(result.status === 201) {
                setState("success");
                setOpenDialog(true);
            }
        }).catch(err => {
            if(err.message == "Request failed with status code 403") {
                setState("error");
                setOpenDialog(true);
            }
            console.log('err: ' + err.message);
        })
    }

    const attack = (host) => {
        axios.post(`${host}/api/data/attack`, {
            message: "test attack"
        }).then(result => {
            if(result.status === 201) {
                setState("attack");
                setOpenDialog(true);
            }
        }).catch(err => {
            if(err.message == "Request failed with status code 403") {
                setState("error");
                setOpenDialog(true);
            }
            console.log('err: ' + err.message);
        })
    }

    return (
        <div>
            <Grid
                container
                justifyContent="space-around"
                alignItems="center"
                style={{ height: '20vh', width: '100vw' }}
            >
                <Button 
                    variant="contained"
                    color="success"
                    onClick={() => connect(node1)}
                >connect server1</Button>
                <Button 
                    variant="contained"
                    color="success"
                    onClick={() => connect(node2)}
                >connect server2</Button>
                <Button
                    variant="contained"
                    color="success"
                    onClick={() => connect(node3)}
                >connect server3</Button>
                <Grid
                    container
                    justifyContent="space-around"
                    alignItems="center"
                    style={{ height: '20vh', width: '100vw' }}
                >
                    <Button
                        variant="contained"
                        color="error"
                        onClick={() => attack(node1)}
                    >attack server1</Button>
                    <Button 
                        variant="contained"
                        color="error"
                        onClick={() => attack(node2)}
                    >attack server2</Button>
                    <Button
                        variant="contained"
                        color="error"
                        onClick={() => attack(node3)}
                    >attack server3</Button>
                </Grid>
            </Grid>
            <AlertModal
                openDialog={openDialog}
                closeDialog={() => setOpenDialog(0)}
                state={state}
            />
        </div>
    )
}

export default App
