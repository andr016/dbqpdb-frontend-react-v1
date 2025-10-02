import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import H1 from "./base/H1";
import config from "../Config";
import Button from "./base/Button";
import ApiClient from "./ApiClient";
import Input from "./base/Input";
import DeleteButton from "./base/DeleteButton";

interface Type {
    type_id: number;
    typology_id: number;
    type_name: string;
    type_display_name: string;
}

interface Typology {
    typology_id: number;
    typology_name: string;
    typology_display_name: string;
}

interface TypologyProps {
    typology: Typology | undefined;
}

// fix string | undefined
const Typology: React.FC<TypologyProps> = (
   typology 
)=>{
    const id = typology.typology?.typology_id
    if(typology.typology){

    const [types, setTypes] = useState<Type[]>();
    const [newTypes, setNewTypes] = useState<Type[]>();
    const [loading, setLoading] = useState(true);

    const apiClient = new ApiClient

    useEffect(() => {
        const fetchTypes = async () => {
            // will totally fix that later
            setLoading(true);
            const response = await fetch(new URL(config.apiPrefix+`typology/${id}`, apiClient.baseUrl).href);
            const data = await response.json();
            setTypes(data);
            setNewTypes(data);
            setLoading(false);
        }
        fetchTypes();
    }, [id]);

    const addNewType = () => {
        const newType: Type = {
            type_id: -1-newTypes?.length!,
            typology_id: id!,
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
            <H1>{typology.typology.typology_display_name}</H1>
            <DeleteButton onClick={deleteTypology}>Delete typology</DeleteButton>
            <p>Type count: {newTypes?.length}</p>
            <Button onClick={addNewType}>New type</Button>
            <Button onClick={resetToFetch}>Reset</Button>
            <Button onClick={postNewTypes}>Save</Button>
            <table>
                <thead>
                    <tr>
                        <td>
                            name
                        </td>
                        <td>
                            button
                        </td>
                    </tr>
                </thead>
                <tbody>
                {newTypes?.map(type => (
                    <tr key={type.type_id}>
                        <td><Input value={type.type_display_name} onChange={e => {
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
                        <td><Button onClick={e=> {
                            setNewTypes(newTypes?.filter((type2) => type2.type_id !== type.type_id));
                        }}>Delete type</Button></td>
                    </tr>))}
                </tbody>
            </table>
        </div>
    
    )
    }
}

export default Typology