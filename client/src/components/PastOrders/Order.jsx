import { Flex, Spinner, Image ,Text, SimpleGrid } from '@chakra-ui/react';
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

function Order() {

    const {orderId} = useParams();
    const [order , setOrder] = useState({})
    const [orderItems , setOrderItems] = useState([]);
    const [isLoading , setIsLoading] = useState(false);

    useEffect(()=>{
        (async()=>{
            setIsLoading(true);
            const res = await axios({
                method : "post",
                url : `/api/order/get/${orderId}`,
            })
            const data = res.data;
            setOrder(data.order);
            setOrderItems(data.order.cart);
            setIsLoading(false);

        })()
    },[])

    if(isLoading){
        return <Flex justifyContent={"center"} alignItems={"center"}>
            <Spinner size={"lg"} />
        </Flex>
    }

  return (

    <Flex  width={"100vw"}>
        <SimpleGrid columns={4} minChildWidth={"300px"} margin={"10px"} padding={"10px"} gap={"20px"} width={"100%"} >

            {orderItems.map((e)=>{
                return <>
               <Flex padding={"15px"} borderRadius={"8px"} bg={"gray.100"} flexDirection={"column"}>
              <Flex flex={1} justifyContent={"center"}>
              <Image src={e.image} maxH={"200px"} alt='item-image' />
              </Flex>

              <Flex flexDirection={"column"} alignItems={"center"}>
              <Text color={"gray.600"} fontWeight={600}> {e.itemName} </Text>
                    <Text fontWeight={600}> ₹{e.itemPrice} </Text>
              </Flex>
                   
               </Flex>
                </>
            })}

        </SimpleGrid>
    </Flex>
   
  )
}

export default Order
