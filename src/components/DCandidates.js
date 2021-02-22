import { Grid , Paper, withStyles} from '@material-ui/core';
import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions/dCandidate';
import DCandidateForm from './DCandidateForm';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from '@material-ui/icons/Delete';
import { useToasts} from 'react-toast-notifications'

const styles = theme => ({
    root:{
        "& .MuiTableCell-head" : {
            fontSize : "1.5rem"
        }
    },
    paper: {
        margin: theme.spacing(2),
        padding: theme.spacing(2)
    }
});
// able to access access: props.classes
// const [classes, ...props] = props
function DCandidates({classes, ...props}) {
    const [currentId, setCurrentId] = useState(0);
    const {addToast } = useToasts();
    useEffect(()=>{
        props.fetchAllDCandidates();
    },[])

    const onDelete = id => {
       
        if(window.confirm('Are you sure to delete this record?')){
            props.deleteDCandidate(id, ()=> addToast("Deleted successfully", {appearance: "info"}))
        }
    }

    return (
        <Paper className={classes.paper}>
           <Grid container>
               <Grid item xs={6}>
                    <DCandidateForm {...({currentId, setCurrentId})}/>

                </Grid>
               <Grid item xs={6}>
                   <TableContainer>
                       <Table>
                            <TableHead className={classes.root}>
                                <TableRow>
                                    <TableCell>Name</TableCell>
                                    <TableCell>Mobile</TableCell>
                                    <TableCell>Blood Group</TableCell>

                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {props.dCandidateList.map((record,index)=>
                                <TableRow key={index} hover>
                                    <TableCell>{record.fullName}</TableCell>
                                    <TableCell>{record.mobile}</TableCell>
                                    <TableCell> {record.bloodGroup}</TableCell>
                                    <TableCell>
                                        <ButtonGroup variant="text">
                                            <Button><EditIcon color="primary" onClick={()=>{setCurrentId(record.id)}}/></Button>
                                            <Button><DeleteIcon color="secondary" onClick={()=>onDelete(record.id)}/></Button>
                                        </ButtonGroup>
                                    </TableCell>
                                </TableRow>
                                )}
                            </TableBody>
                           
                       </Table>

                   </TableContainer>
                </Grid>
           </Grid>
        </Paper>
    )
}

const mapStateProps = state => {
    return {
        dCandidateList: state.dCandidate.list
    }
}

const mapActionToProps  = {
    fetchAllDCandidates : actions.fetchAll,
    deleteDCandidate: actions.Delete
}

// export default DCandidates
export default connect(mapStateProps, mapActionToProps)(withStyles(styles)(DCandidates));