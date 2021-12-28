import React, { useCallback, useEffect, useState } from "react";
import { Box, makeStyles, Typography } from "@material-ui/core";
import Joke from "./Joke";
import axios from "axios";

const UseStyles = makeStyles((theme) => ({
    jokesList:{
        display:"flex",
        width:"80%",
        height:"80%",
    },
    jokesListSider:{
        backgroundColor:"#9575cd",
        display:"flex",
        flexDirection:"column",
        alignItems:"center",
        width:"40%",
        height:"90%",
        justifyContent:"center",
        textAlign:"center",
        boxShadow:"0 19px 30px rgba(0,0,0,0.3),0 15px 12px rgba(0,0,0,0.1)",
        borderRadius:"5%",
        alignSelf:"center",
        marginLeft:"15%",
    },
    jokesListTitle:{
        color:"#eff386",
        textAlign:"center",
        fontSize:"30px",
        fontWeight:"60px",
        margin:60,
        letterSpacing:0,
    },
    sidebarimage:{
        width:"70%",
        borderRadius:"40%",
        boxShadow:"0 19px 30px rgba(0,0,0,0.3),0 15px 12px rgba(0,0,0,0.3)",
    },
    jokelistjokes:{
        height:"90%",
        backgroundColor:"white",
        width:"90%",
        alignSelf:"center",
        boxShadow:"0 19px 30px rgba(0,0,0,0.3),0 15px 12px rgba(0,0,0,0.3)",
        borderTopRightRadius:7,
        borderBottomLeftRadius:7,
        overflow:"scroll",

    },


}))

export default function Jokeslist(){
    const classes = UseStyles()
    const [jokes,setJokes]=useState(null)

    async function getJokes(){
        let newJokes=[]
        for (var i=0;i<7;i++){
            let res = await axios.get("https://icanhazdadjoke.com/", {
                headers:{ Accept:"application/json" }
            })
            newJokes.push({id:i,text:res.data.joke,votes:0})
        }
        setJokes(newJokes)
    }

    useEffect(() => {
        getJokes()
    }, []);
    const handleVote= useCallback((id,offset) => {
            let filteredJokes=jokes.filter((joke) => joke.id!==id)
            let joke=jokes.find((joke)=> joke.id===id)
            joke.votes += offset
            filteredJokes.push(joke)
            filteredJokes.sort((a,b) => b.votes - a.votes)
            setJokes(filteredJokes)
        } ,[jokes]);
    if(jokes){
        return(
            <Box className={classes.jokesList}>
                <Box className={classes.jokesListSider}>
                    <Typography className={classes.jokesListTitle}>
                        Dad jokes
                    </Typography>
                    <img className={classes.sidebarimage} src="https://th.bing.com/th/id/OIP.-zs8OSSjt7bb0BSriXtmVgHaHa?pid=ImgDet&rs=1" />
                </Box>
                <Box className={classes.jokelistjokes}>
                    {jokes.map((joke) => {
                        return (
                            <Joke 
                            votes={joke.votes} 
                            text={joke.text} 
                            upvote={() => {
                                handleVote(joke.id,1);
                            }} 
                            downvote={() => {
                                handleVote(joke.id,-1);
                            }} 
                            key={joke.id}
                            />
                        )
                    })}
                </Box>
            </Box>
        )
    }
    else{
        return (
            <h1>Loading...</h1>
        )
    }
}