import { Box, makeStyles, Typography } from "@material-ui/core"
import ArrowUpwardIcon from "@material-ui/icons/ArrowUpward"
import ArrowDownwardIcon from "@material-ui/icons/ArrowDownward"
import React, { useCallback } from "react"
const UseStyles=makeStyles((theme)=>({
    joke:{
        display:"flex",
        borderBottom:"2px solid #eeeeee",
        alignItems:"center",
        justifyContent:"center",
        fontWeight:400,
        padding:"3rem",

    },
    jokeButtons:{
        display:"flex",
        marginRight:"1rem",
        justifyContent:"center",
        width:"40px",
        alignItems:"center",
        height:"5px",

    },
    arrowIcon:{
        fontSize:"2em",
        cursor:"pointer",
        margin:10,
    },
    votesLabel:{
        fontSize:20,
    },
    jokeText:{
        width:"50%",
        fontSize:"0.9rem",
        textAlign:"center",
        alignItems:"center",
        alignContent:"center",
        marginLeft:"50px",
        marginRight:"50px",
    },
    jokeEmoji:{
        fontSize:"1.5rem",
        marginleft:"3rem",
        borderRadius:"50%",
        boxShadow:"0 19px 30px rgba(0,0,0,0.3),0 15px 12px rgba(0,0,0,0.1)",


    }
}))

export default function Joke(props){
    const { votes, text , upvote , downvote } = props;
    const classes = UseStyles();
    const getEmoji=useCallback((votes) => {
        if(votes>=9){
            return "em em-rolling_on_the_floor_laughing";
        } else if (votes>=6){
            return "em em-laughing";
        } else if (votes>=3){
            return "em em-slightly_smiling_face";
        } else if (votes>=0){
            return "em em-neutral_face";
        } else {
            return "em em-angry";
        }
    } ,[])
    return (
        <Box className={classes.joke}>
            <Box className={classes.jokeButtons}>
                <ArrowUpwardIcon className={classes.arrowIcon} 
                onClick={() => 
                    {
                        upvote();
                    }}
                />
                <Typography className={classes.votesLabel}>{votes}</Typography>
                <ArrowDownwardIcon className={classes.arrowIcon} 
                onClick={() => 
                    {
                        downvote();
                    }}
                />
            </Box>
            <Box className={classes.jokeText}>{text}</Box>
            <Box className={classes.jokeEmoji}>
                <i className={getEmoji(votes)}/>
            </Box>
        </Box>
    )
}