import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import { Grid } from '@mui/material';
import axios from 'axios';

function App() {

    const node1 = import.meta.env.VITE_NODE1_URL;
    const node2 = import.meta.env.VITE_NODE2_URL;
    const node3 = import.meta.env.VITE_NODE3_URL;

    const connect = (host) => {
        axios.post(`${host}/api/data`, {
            message: "test connect"
        }).then(result => {
            console.log(result.data);
        }).catch(err => {
            console.log('err: ' + err.message);
        })
    }

    const attack = (host) => {
        axios.post(`${host}/api/data/attack`, {
            message: "test attack"
        }).then(result => {
            console.log(result.data);
        }).catch(err => {
            console.log('err: ' + err.message);
        })
    }

    return (
        <Grid
            container
            justifyContent="space-around"
            alignItems="center"
            style={{ height: '20vh', width: '100vw' }}
        >
            <Button 
                variant="outlined"
                color="success"
                onClick={() => connect(node1)}
            >connect1</Button>
            <Button 
                variant="outlined"
                color="success"
                onClick={() => connect(node2)}
            >connect2</Button>
            <Button
                variant="outlined"
                color="success"
                onClick={() => connect(node3)}
            >connect3</Button>
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
                >attack node1</Button>
                <Button 
                    variant="contained"
                    color="error"
                    onClick={() => attack(node2)}
                >attack node2</Button>
                <Button
                    variant="contained"
                    color="error"
                    onClick={() => attack(node3)}
                >attack node3</Button>
            </Grid>
        </Grid>
    )
}

export default App
