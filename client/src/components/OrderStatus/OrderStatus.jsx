import { Box, Flex , Spinner, Text } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import { FaClipboardCheck } from "react-icons/fa";
import { IoCheckmarkDoneSharp } from "react-icons/io5";
import { FaPizzaSlice } from "react-icons/fa";
import { FaTruck } from "react-icons/fa";
import { PiSmileyWinkBold } from "react-icons/pi";
import { useParams } from 'react-router-dom';
import axios from 'axios';
import useShowtoast from '../../hooks/UseShowToast';
import moment from 'moment';


function OrderStatus() {

    const {orderId} = useParams();
    const showToast = useShowtoast();
    const [order , setOrder] = useState({});
    const[data , setData] = useState(1)
    const[isLoading , setIsLoading] = useState(true);

useEffect(()=>{

    (async()=>{
        const res = await axios({
            method : "post",
            url : `/api/order/get/${orderId}`,
        })
        const data = res.data;
        if(data.error){
            showToast("error" , data.error , "error");
        }

        setOrder(data.order);
        const status = data.order.status;

        if(status.toLowerCase() == "placed"){
            setData(2);
        }
        else if(status.toLowerCase() == "confirmed"){
            setData(3);
        }
        else if(status.toLowerCase() == "prepared"){
            setData(4);
        }else if(status.toLowerCase() == "delivered"){
            setData(5);
        }
        else if(status.toLowerCase() == "completed"){
            setData(6);
        }
        setIsLoading(false);

    })()
   
} , [])

if(isLoading){
    return <Flex justifyContent={"center"}>
        <Spinner size={"lg"}/>
    </Flex>
}



  return (
    <Flex  width={"100vw"} justifyContent={"flex-start"} alignItems={"center"}>
        {console.log(data)}
        <Flex mt={"40px"} gap={"55px"} ml={{base : "20px" , md : "20%"}}  flexDirection={"column"} width={"50%"}>

            <Flex filter={data > 1 ? "grayScale(100%)" : "grayScale(0%)"}  gap={"20px"} alignItems={"center"}  justifyContent={"flex-start"} >
                <FaClipboardCheck  color='darkorange' size={"40px"}/>
                <Box  bg={"orange.400"} height={"10px"} w={"10px"} borderRadius={"50%"} ></Box>
                <Text   color={data > 1 ? "gray.500" : "orange"} fontWeight = {"600"} fontSize = {"18px"}> Order Placed</Text>

                <Flex  alignItems={"center"} marginLeft={"auto"}>
                <Box display={data == 1 ? "flex" : "none"}> {moment(order.createdAt).format('hh:mm A')} </Box>
                </Flex>

            </Flex>

            <Flex>
                <Box  my={"-50px"} ml={"63px"} borderRadius={"10px"} bg={data > 1 ? "gray.300" : "gray.700"} height={"100px"} width={"5px"} >  </Box>
            </Flex>

            
            <Flex  filter={data > 2 ? "grayScale(100%)" : "grayScale(0%)"}  gap={"20px"}  alignItems={"center"} justifyContent={"start"} >
                <IoCheckmarkDoneSharp   color='darkorange' size={"40px"}/>
                <Box   bg={"orange.400"} height={"10px"} w={"10px"} borderRadius={"50%"} ></Box>
                <Text  color={data > 2 ? "gray.500" : "orange"} fontWeight = {"600"} fontSize = {"18px"}> Order Confirmation</Text>

                <Flex  alignItems={"center"} marginLeft={"auto"}>
                <Box display={data == 2 ? "flex" : "none"}> {moment(order.createdAt).format('hh:mm A')} </Box>
                </Flex>
               
            </Flex>

            <Flex>
                <Box my={"-50px"} ml={"63px"} borderRadius={"10px"} bg={data > 2 ? "gray.300" : "gray.700"} height={"100px"} width={"5px"} >  </Box>
            </Flex>


            <Flex filter={data > 3 ? "grayScale(100%)" : "grayScale(0%)"}  gap={"20px"} alignItems={"center"} justifyContent={"start"} >
                <FaPizzaSlice  color="darkorange" size={"40px"}/>
                <Box   bg={"orange.400"} height={"10px"} w={"10px"} borderRadius={"50%"} ></Box>
                <Text  color={data > 3 ? "gray.500" : "orange"} fontWeight = {"600"} fontSize = {"18px"}> Order Preparation</Text>

                <Flex  alignItems={"center"} marginLeft={"auto"}>
                <Box display={data == 3 ? "flex" : "none"}> {moment(order.createdAt).format('hh:mm A')} </Box>
                </Flex>

            </Flex>

            <Flex>
                <Box my={"-50px"} ml={"63px"} borderRadius={"10px"} bg={data > 3 ? "gray.300" : "gray.700"} height={"100px"} width={"5px"} >  </Box>
            </Flex>


            <Flex  filter={data > 4 ? "grayScale(100%)" : "grayScale(0%)"}  gap={"20px"} alignItems={"center"} justifyContent={"start"} >
                <FaTruck  color="darkorange" size={"40px"}/>
                <Box   bg={"orange.400"} height={"10px"} w={"10px"} borderRadius={"50%"} ></Box>
                <Text  color={data > 4 ? "gray.500" : "orange"} fontWeight = {"600"} fontSize = {"18px"}> Order out of Dilevery</Text>

                <Flex  alignItems={"center"} marginLeft={"auto"}>
                <Box display={data == 4 ? "flex" : "none"}> {moment(order.createdAt).format('hh:mm A')} </Box>
                </Flex>

            </Flex>

            <Flex>
                <Box my={"-50px"} ml={"63px"} borderRadius={"10px"} bg={data > 4 ? "gray.300" : "gray.700"} height={"100px"} width={"5px"} >  </Box>
            </Flex>


            <Flex filter={data > 5 ? "grayScale(100%)" : "grayScale(0%)"}   gap={"20px"} alignItems={"center"} justifyContent={"start"}>
                <PiSmileyWinkBold  color="darkorange" size={"40px"}/>
                <Box   bg={"orange.400"} height={"10px"} w={"10px"} borderRadius={"50%"} ></Box>
                <Text  color={data > 5 ? "gray.500" : "orange"} fontWeight = {"600"} fontSize = {"18px"}> Completed</Text>

                <Flex  alignItems={"center"} marginLeft={"auto"}>
                <Box display={data == 5 ? "flex" : "none"}> {moment(order.createdAt).format('hh:mm A')} </Box>
                </Flex>

            </Flex>

        </Flex>

        <Flex  padding={"10px"} alignSelf={"flex-start"} >
            <Text color={"green.500"} fontWeight={500}> {order._id}  </Text>
        </Flex>

    </Flex>
  )
}

export default OrderStatus
