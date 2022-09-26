import { Select } from "@chakra-ui/react";
import { useState } from 'react'

type EventProps = {
    target: {
      value: any;
    };
  };

export const Filter = (event: EventProps) => {
    // const result = array?.filter(
    //     e => e.name.includes(s) || e.email.includes(s) || e.cpf.includes(s) || e.status.includes(s) || e.insert.includes(s)
    // )
    // return setSearch(result)

    function isBigEnough(element: any) { 
        return (element >= 5); 
     } 
               
     var filter = [event].filter(isBigEnough); 
     console.log("Valor: " + filter );

    return (
        <>
        <Select placeholder='Idade' bgColor="#181B23" border="none" w={"xg"}>
        <option value='option1' style={{ background: '#181B23' }}>19 - 25</option>
        <option value='option2' style={{ background: '#181B23' }}>26 - 30</option>
        <option value='option3' style={{ background: '#181B23' }}>31 - 35</option>
        <option value='option4' style={{ background: '#181B23' }}>36 - 40</option>
        <option value='option5' style={{ background: '#181B23' }}>+ 40</option>
        </Select>
        </>
    )
}