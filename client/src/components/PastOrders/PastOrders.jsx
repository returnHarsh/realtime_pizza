import { Flex, Heading, Spinner , Text} from '@chakra-ui/react'
import React, { useContext, useEffect, useState } from 'react'
import { UserContext } from '../../context/UserContext'
import useShowToast from "../../hooks/UseShowToast";
import axios from "axios";
import moment from "moment";
import { Link } from 'react-router-dom';

function PastOrders() {

    const {user} = useContext(UserContext);
    const [orders , setOrders] = useState([]);
    const [isLoading , setIsLoading] = useState(false);
    const showToast = useShowToast();
    
    useEffect(()=>{

      const userId = user._id;

      (async()=>{
        setIsLoading(true);
        const res = await axios({
          method : "post",
          url : "/api/order/get",
          data : {userId},
        })

        const data = res.data;
        if(data.error){
          console.log(data.error);
          showToast("error" , data.error , "error");
          return;
        }

        setOrders(data.orders);
        showToast("success" , data.success , "success");
        setIsLoading(false);
      })()

    },[])

    if(isLoading){
      return <Flex justifyContent={"center"} alignItems={"center"}>
        <Spinner size={"lg"} />
      </Flex>
    }

  return (
   <Flex mt={"20px"} gap={"10px"} flexDirection={"column"} justifyContent={"center"} alignItems={"center"} width={"100%"}>

    {orders.length > 0 && 
    <>
    <Heading> Past Orders </Heading>

<Flex  padding={"10px"} gap={"10px"} flexDirection={"column"} width={{base : "100%" , lg : "55%"}}>
  {orders.map((order)=>{
    return <>
    <Flex  justifyContent={"space-around"} >

      <Flex  width={"100%"} justifyContent={"flex-start"}>
      <Link to={`/past/orders/${order._id}`}> <Text  transition={"0.25s ease-in-out"} _hover={{textDecoration : "underline"}} cursor={"pointer"} fontSize={{base : "10px" , lg : "18px"}} fontWeight={600} color={"green.500"}> {order._id} </Text> </Link>
      </Flex>

      <Flex justifyContent={"center"} width={"100%"}>
        <Link to={`/order/status/${order._id}`}> <Text  fontSize={{base : "10px" , lg : "18px"}} fontWeight={600} color={"gray.700"}> Track Order </Text> </Link>
      </Flex>

      <Flex  width={"100%"} justifyContent={"flex-end"}>
      <Text cursor={"pointer"} fontSize={"18px"} fontSize={{base : "10px" , lg : "18px"}} fontWeight={600} color={"gray.700"}> { moment(order.createdAt).format('DD/MM/YYYY') } </Text>
      </Flex>
     
    </Flex>
    </>
  })}
</Flex>

    </>
    }

    {orders.length == 0 && <>
    <Flex>
      <Heading> No past orders found </Heading>
    </Flex>
    </>}

   </Flex>
  )
}

export default PastOrders
