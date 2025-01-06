import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import config from "../config";

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

    useEffect(() => {
        const fetchTypes = async () => {
            // will totally fix that later
            const response = await fetch(`http://localhost:8000/api/typology/${id}`);
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
        const response = axios.post(config.apiUrl+`submit/typology/${id}`, newTypes);
        console.log(response)
    }

    const deleteTypology = () => {
        if (window.confirm("Delete this typology? NAME")) {
            axios.post(config.apiUrl+"delete/typology/"+id)
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
            <button onClick={deleteTypology}>Delete typology</button>
            <p>Type count: {newTypes?.length}</p>
            <button onClick={addNewType}>New type</button>
            <button onClick={resetToFetch}>Reset</button>
            <button onClick={postNewTypes}>Save</button>
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