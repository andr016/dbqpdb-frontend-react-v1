import axios from "axios";
import { useState } from "react";

import config from "../Config";
import ApiClient from "./ApiClient";
import Input from "./base/Input";
import Button from "./base/Button";

const NewTypology = () => {
    const [typology_name, setName] = useState('');

    const apiClient = new ApiClient()

    const addTypology = () => {
        console.log(typology_name);
        axios.post(new URL(config.apiPrefix+"typology/add/", apiClient.baseUrl).href, {typology_display_name: typology_name}).then(res => {
            console.log(res);
        })
        setName('');
    }

    return (
        <div>
            <h3>New Typology</h3>
            <Input value={typology_name} type="text" onChange={(e) => setName(e.target.value)}/>
            <Button onClick={addTypology}>Create</Button>
        </div>
    )
}

export default NewTypology