import axios from "axios";
import { useState } from "react";

import config from "../Config";
import Button from "./base/Button";
import Input from "./base/Input"
import ApiClient from "./ApiClient";
import FrutigerButton from "./base/FrutigerButton";



const NewSubject = ({ status }) => { // status is meant for updating subject list after adding new subject
    const [subject_name, setName] = useState('');

    const apiClient = new ApiClient()

    const addSubject = () => {
        console.log(subject_name);
        axios.post(new URL(config.apiPrefix+"subject/add/", apiClient.baseUrl).href, {subject_name: subject_name}).then(res => {
            console.log(res);

            status
        })
        setName('');
    }

    return (
        <div>
            <h3 className="text-gray-400 mb-1">Create new subject</h3>
            <Input type="text" onChange={(e) => setName(e.target.value)}/>
            <FrutigerButton onClick={addSubject}>Add</FrutigerButton>
        </div>
    )
}

export default NewSubject