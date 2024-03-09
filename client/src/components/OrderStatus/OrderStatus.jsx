import { Box, Flex , Spinner, Text , Image, SimpleGrid } from '@chakra-ui/react'
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
    <Flex padding={"15px"} width={"100vw"} justifyContent={"flex-start"} alignItems={"center"} flexDirection={{base : "column" , md : "row"}}>

        <Flex gap={"20px"} flexDirection={"column"}  mb={"auto"} mt={"40px"} borderRadius={"md"} padding={"10px"} flex={0.3} width={{base : "100%" , md : "30%"}} justifyContent={"center"}  alignItems={"center"}>

            <SimpleGrid gap={"10px"}  width={"100%"}  minChildWidth={"150px"} >
            {order.cart.map(e=>{
                return <Flex bg={"gray.100"} padding={"10px"} borderRadius={"md"} justifyContent={"center"} alignItems={"center"}>
                    <Image maxH={"100px"} src={e.image} />
                </Flex>
            })}
            </SimpleGrid>
        </Flex>

        <Flex  ml={"20px"} padding={"20px"} maxW={{base : "100%" , md : "60%"}} mr={{base : "20px" , md : "auto"}} mt={"40px"} gap={"55px"}  flexDirection={"column"} flex={0.7}>

            <Flex filter={data > 1 ? "grayScale(0%)" : "grayScale(100%)"}  gap={"20px"} alignItems={"center"}  justifyContent={"flex-start"} >
                <FaClipboardCheck  color="#32cd32" size={"40px"}/>
                <Box  bg={"#4cbb17"} height={"10px"} w={"10px"} borderRadius={"50%"} ></Box>
                <Text   color={data > 1 ? "#4cbb17" : "gray.500"} fontWeight = {"600"} fontSize = {"20px"}> Order Placed</Text>

                <Flex  alignItems={"center"} marginLeft={"auto"}>
                <Box display={data == 2 ? "flex" : "none"}> {moment(order.createdAt).format('hh:mm A')} </Box>
                </Flex>

                <Flex  ml={"auto"} borderRadius={"md"}  justifyContent={"flex-end"} padding={"10px"}  >
            <Text color={"green.500"} fontWeight={600} fontSize={"18px"}> {order._id}  </Text>
        </Flex> 

            </Flex>

            <Flex>
                <Box  my={"-50px"} ml={"63px"} borderRadius={"10px"} bg={data > 1 ? "#4cbb17" : "gray.400"} height={"100px"} width={"5px"} >  </Box>
            </Flex>

            
            <Flex  filter={data > 2 ? "grayScale(0%)" : "grayScale(100%)"}  gap={"20px"}  alignItems={"center"} justifyContent={"start"} >
                <IoCheckmarkDoneSharp   color='#32cd32' size={"40px"}/>
                <Box   bg={"#4cbb17"} height={"10px"} w={"10px"} borderRadius={"50%"} ></Box>
                <Text  color={data > 2 ? "#4cbb17" : "gray.500"} fontWeight = {"600"} fontSize = {"20px"}> Order Confirmation</Text>

                <Flex  alignItems={"center"} marginLeft={"auto"}>
                <Box display={data == 3 ? "flex" : "none"}> {moment(order.createdAt).format('hh:mm A')} </Box>
                </Flex>
               
            </Flex>

            <Flex>
                <Box my={"-50px"} ml={"63px"} borderRadius={"10px"} bg={data > 2 ? "#4cbb17" : "gray.300"} height={"100px"} width={"5px"} >  </Box>
            </Flex>


            <Flex filter={data > 3 ? "grayScale(0%)" : "grayScale(100%)"}  gap={"20px"} alignItems={"center"} justifyContent={"start"} >
                <FaPizzaSlice  color="#32cd32" size={"40px"}/>
                <Box   bg={"#4cbb17"} height={"10px"} w={"10px"} borderRadius={"50%"} ></Box>
                <Text  color={data > 3 ? "#4cbb17" : "gray.500"} fontWeight = {"600"} fontSize = {"20px"}> Order Preparation</Text>

                <Flex  alignItems={"center"} marginLeft={"auto"}>
                <Box display={data == 4 ? "flex" : "none"}> {moment(order.createdAt).format('hh:mm A')} </Box>
                </Flex>

            </Flex>

            <Flex>
                <Box my={"-50px"} ml={"63px"} borderRadius={"10px"} bg={data > 3 ? "#4cbb17" : "gray.300"} height={"100px"} width={"5px"} >  </Box>
            </Flex>


            <Flex  filter={data > 4 ? "grayScale(0%)" : "grayScale(100%)"}  gap={"20px"} alignItems={"center"} justifyContent={"start"} >
                <FaTruck  color="#32cd32" size={"40px"}/>
                <Box   bg={"#4cbb17"} height={"10px"} w={"10px"} borderRadius={"50%"} ></Box>
                <Text  color={data > 4 ? "#4cbb17" : "gray.500"} fontWeight = {"600"} fontSize = {"20px"}> Order out of Dilevery</Text>

                <Flex  alignItems={"center"} marginLeft={"auto"}>
                <Box display={data == 5 ? "flex" : "none"}> {moment(order.createdAt).format('hh:mm A')} </Box>
                </Flex>

            </Flex>

            <Flex>
                <Box my={"-50px"} ml={"63px"} borderRadius={"10px"} bg={data > 4 ? "#4cbb17" : "gray.300"} height={"100px"} width={"5px"} >  </Box>
            </Flex>


            <Flex filter={data > 5 ? "grayScale(0%)" : "grayScale(100%)"}   gap={"20px"} alignItems={"center"} justifyContent={"start"}>
                <PiSmileyWinkBold  color="#32cd32" size={"40px"}/>
                <Box   bg={"#4cbb17"} height={"10px"} w={"10px"} borderRadius={"50%"} ></Box>
                <Text  color={data > 5 ? "#4cbb17" : "gray.500"} fontWeight = {"600"} fontSize = {"20px"}> Completed</Text>

                <Flex  alignItems={"center"} marginLeft={"auto"}>
                <Box display={data == 6 ? "flex" : "none"}> {moment(order.createdAt).format('hh:mm A')} </Box>
                </Flex>

            </Flex>

        </Flex>

    </Flex>
  )
}

export default OrderStatus
