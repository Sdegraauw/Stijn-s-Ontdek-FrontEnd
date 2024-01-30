import { useEffect } from "react";
import { api } from "../App";
import { useState } from "react";

export default function Preview() {
    const [data, setData] = useState([])
    const metingen = (
        <table className="table table-responsive table-striped table-hover">
            <thead>
                <tr>
                    <td>Station ID</td>
                    <td>Meting tijd</td>
                    <td>Lengtegraad</td>
                    <td>Breedtegraad</td>
                    <td>Temperatuur</td>
                </tr>
            </thead>
            <tbody>
                { data.map((meting) => 
                    <tr>
                        <td>{ meting.id }</td>
                        <td>{ meting.timestamp }</td>
                        <td>{ meting.longitude }</td>
                        <td>{ meting.latitude }</td>
                        <td>{ meting.temperature }</td>
                    </tr>
                )}
            </tbody>
        </table>
    );

    useEffect(() => {
        try {
        api.get("/measurement/current")
            .then((response) => setData(response.data));
        } catch (error) {
            console.error(error);
        }
    }, [])


    return (
        <div>
            { metingen }
        </div>
    );
}