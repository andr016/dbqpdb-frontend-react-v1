import axios from "axios";
import { useState } from "react";

import config from "../config";

const NewTypology = () => {
    const [typology_name, setName] = useState('');

    const addTypology = () => {
        console.log(typology_name);
        axios.post(config.apiUrl+"typology/add/", {typology_display_name: typology_name}).then(res => {
            console.log(res);
        })
        setName('');
    }

    return (
        <div>
            <h3>New Typology</h3>
            <input value={typology_name} type="text" onChange={(e) => setName(e.target.value)}/>
            <button onClick={addTypology}>Create</button>
        </div>
    )
}

export default NewTypology