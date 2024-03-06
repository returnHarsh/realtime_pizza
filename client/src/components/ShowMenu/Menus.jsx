import { Flex, Heading, SimpleGrid, Spinner } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import axios from "axios"
import Items from './Items';

function Menus() {

  const [menuItems , setMenuItems] = useState([]);
  const [isLoading , setIsLoading] = useState(false);

  useEffect(()=>{

    const getAllMenuItems = async()=>{

      setIsLoading(true);

      const res = await axios({
        method : "get",
        url : "/api/get/menu",
      })
      const data = res.data;
      if(data.error){
        console.log(data.error);
        return;
      }

      setMenuItems(data.menus);

      setIsLoading(false);
      
    }
    getAllMenuItems();

  },[])

  if(isLoading){
    return <Flex justifyContent={"center"}>
      <Spinner size={"xl"} />
    </Flex>
  }

  return (
    <Flex   justifyContent={"center"} width={"100vw"}  >

   {isLoading == false && menuItems.length > 0 && <>
      
    <Flex  alignItems={"center"} gap={"10px"} flexDirection={"column"} width={"95%"}>
      <Heading width={"100%"} textAlign={"center"}> Menu </Heading>

{/* displaying all the menu items */}
       <SimpleGrid   width={{base : "auto" , md : "100%"}}   gap={"20px"} columns={4}  minChildWidth={"300px"}>
       {menuItems.map((item)=>{
          return <Items item = {item} setMenuItems={setMenuItems} menuItems={menuItems} />
        })}
       </SimpleGrid>
    </Flex>

   </>}

  </Flex>
  
  )
}

export default Menus
