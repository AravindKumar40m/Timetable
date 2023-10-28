import React, { useEffect, useState } from 'react'
import Axios from 'axios';

const Selectoption = () => {

    const [deg,setDeg] = useState([])
    const [sem,setSem] = useState([])
    const [bat,setBat] = useState([])

    const [firstsem,setFirstsem] = useState([])
    const [secondsem,setSecondsem] = useState([])

    const API_DEG = 'http://localhost:3500/deg_prog';
    const API_SEM = 'http://localhost:3500/semester';
    const API_BAT = 'http://localhost:3500/batch';

    useEffect(()=>{

        Axios.get(API_DEG).then(res => setDeg(res.data))

        Axios.get(API_SEM).then(res => setSem(res.data))

        Axios.get(API_BAT).then(res => setBat(res.data))

    },[])

    const handlesubmit = (e)=>{
        
        const data = sem.filter((d)=>(
            d.deg_name === e
        ))
        setFirstsem(data)
    }

    const handlesemester = (e)=>{

        const data = firstsem.filter((d)=>(
            d.sem === e
        ))
        console.log(data)
        setSecondsem(data)
    }

    const handlebatch = (e) =>{
        const id = e.slice(3,4)
        console.log(id)
        const num = e.slice(9,10)
        console.log(num)
        
        const data = secondsem.filter((d)=>(
            console.log(d.sum_num)
           (d.sum_num === num) && (d.sem_id === id)
        ))
        console.log(data)
    }

  return (
    <div>

        <select name="deg" onChange={e => handlesubmit(e.target.value)}>
            <option value="default">degree programme</option>
            {
                deg.map((d)=>(
                    <option key={d.id}>{d.deg_name}</option>
                ))
            }
        </select>

        <label>
            Pick a semester:
            <select name="semester" onChange={e => handlesemester(e.target.value)}>
                <option value="default">choose odd or even</option>
                <option value="odd">odd</option>
                <option value="even">even</option>
            </select>
        </label>

        <select name="semnum" onChange={e => handlebatch(e.target.value)}>
            <option value="default">semester</option>
            {
                secondsem.map((d)=>(
                    <option key={d.sem_id}>id:{d.sem_id} sem:{d.sem_num}</option>
                ))
            }
        </select>

        <select name="batch">
            <option value="default">batch</option>
            {
                bat.map((d)=>(
                    <option key={d.bat_id}>{d.name}</option>
                ))
            }
        </select>

    </div>
  )
}

export default Selectoption