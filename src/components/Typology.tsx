import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import config from "../config";
import Button from "./base/Button";
import ApiClient from "./ApiClient";

interface Type {
    type_id: number;
    typology_id: number;
    type_name: string;
    type_display_name: string;
}

const Typology = () => {
    const { id } = useParams();
    console.log(id);

    const [types, setTypes] = useState<Type[]>();
    const [newTypes, setNewTypes] = useState<Type[]>();
    const [loading, setLoading] = useState(true);

    const apiClient = new ApiClient

    useEffect(() => {
        const fetchTypes = async () => {
            // will totally fix that later
            const response = await fetch(new URL(config.apiPrefix+`typology/${id}`, apiClient.baseUrl).href);
            const data = await response.json();
            setTypes(data);
            setNewTypes(data);
            setLoading(false);
        }
        fetchTypes();
    }, []);

    const addNewType = () => {
        const newType: Type = {
            type_id: -1-newTypes?.length!,
            typology_id: parseInt(id!),
            type_name: '',
            type_display_name: '',
        }
        setNewTypes([...newTypes!, newType]);
    }

    const resetToFetch = () => {
        setNewTypes(types);
    }

    const postNewTypes = () => {
        const response = axios.post(new URL(config.apiPrefix+`submit/typology/${id}`, apiClient.baseUrl).href, newTypes);
        console.log(response)
    }

    const deleteTypology = () => {
        if (window.confirm("Delete this typology? NAME")) {
            axios.post(new URL(config.apiPrefix+`delete/typology/${id}`, apiClient.baseUrl).href)
            .then(response => {
                console.log(response)
                window.location.href = "/typology/"
            })
            .catch(error => {
                console.log(error)
            })
        }
    }

    if(loading) return <div>loading...</div>

    return (
        <div>
            <h1>Typology</h1>
            <Button onClick={deleteTypology}>Delete typology</Button>
            <p>Type count: {newTypes?.length}</p>
            <Button onClick={addNewType}>New type</Button>
            <Button onClick={resetToFetch}>Reset</Button>
            <Button onClick={postNewTypes}>Save</Button>
            <table>
                <thead>
                    <tr>
                    </tr>
                </thead>
                <tbody>
                {newTypes?.map(type => (
                    <tr key={type.type_id}>
                        <td><input value={type.type_display_name} onChange={e => {
                            const updatedTypes = newTypes?.map((type2) => {
                            if (type2.type_id === type.type_id) {
                                return {
                                ...type2,
                                type_display_name: e.target.value,
                                };
                            }
                            return type2;
                            });
                        
                            // Update the state with the new array of types
                            setNewTypes(updatedTypes);
                        }}/></td>
                        <td><button onClick={e=> {
                            setNewTypes(newTypes?.filter((type2) => type2.type_id !== type.type_id));
                        }}>Delete type</button></td>
                    </tr>))}
                </tbody>
            </table>
        </div>
    )
}

export default Typology