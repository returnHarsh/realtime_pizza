import { Flex, Select, Td, Tr , Text } from '@chakra-ui/react'
import axios from 'axios'
import React, { useEffect, useRef, useState } from 'react'
import moment from 'moment';
import { Link } from 'react-router-dom';

function AdminOrderItem({ order }) {

    const [user, setUser] = useState({});
    const selectRef = useRef();

    useEffect(() => {

        (async () => {
            const userId = order.userId;
            const res = await axios({
                method: "post",
                url: "/api/get/user",
                data: { userId },
            })
            const data = res.data;
            setUser(data.user);
        })()


        const setSelect = async()=>{
            selectRef.current.value = order.status;
        }
        setSelect();


    }, [])

    const selectChangeHandler = async()=>{
        const value = selectRef.current.value;
        const orderId = order._id;
        const res = await axios({
            method : "post",
            url : "/api/update/status",
            data : {orderId , value}
        })
        const data = res.data;
    }


    return (
        <Tr>
        <Td cursor={"pointer"} color={"green.500"} fontWeight={600}> <Link to={`/past/orders/${order._id}`}>{order._id}</Link> </Td>
        <Td>{user.name}</Td>
        <Td>{user.address}</Td>
        <Td>{user.phone}</Td>
        <Td> <Select onChange={selectChangeHandler} ref={selectRef}> 
            <option value="placed">placed</option>
            <option value="confirmed">confirmed</option>
            <option value="prepared">prepared</option>
            <option value="delivered">delivered</option>
            <option value="completed">completed</option>
             </Select>  </Td>
             <Td> 
                <Flex flexDirection={"column"}>
                    <Text color={"gray.500"} fontWeight={500}>{ moment(order.createdAt).format('DD/MM/YYYY' )} </Text>
                    <Text fontWeight={600}>{ moment(order.createdAt).format('hh:mm:ss' )} </Text>
                </Flex>

             </Td>
        </Tr>
    )
}

export default AdminOrderItem
