import axios from "axios";
import { useEffect, useState } from "react";

function App() {
    const [count, setCount] = useState(0);
    const [data, setData] = useState([]);
    const token = localStorage.getItem("token");
    const url =  import.meta.env.VITE_API_URL;
    function logHello() {
        console.log("hello");
    }
    useEffect(() => {
        console.log("state updated");
    }, [count]);

    useEffect(() => {
        axios({
            // Endpoint to send files
            url: url + "/products",
            method: "get",
            headers: {
                Accept: "Application/json",
            },
        })
            .then((response) => {
                setData(response.data);
            })
            .catch((error) => {
                console.error("Error fetching data:", error);
            });
    }, []);

    return (
        <>
            <div
                onClick={() => setCount(count + 1)}
                className=" py-6 px-10 text-sm text-red-600"
            >
                helllo {data.map((item)=>{return <div>{item.name} {item.price}</div>})}
            </div>
        </>
    );
}

export default App;
