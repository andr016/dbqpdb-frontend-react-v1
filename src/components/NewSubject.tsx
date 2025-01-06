import axios from "axios";
import { useState } from "react";

import config from "../config";
import Button from "./base/Button";



const NewSubject = ({ status }) => { // status is meant for updating subject list after adding new subject
    const [subject_name, setName] = useState('');

    const addSubject = () => {
        console.log(subject_name);
        axios.post(config.apiUrl+"subject/add/", {subject_name: subject_name}).then(res => {
            console.log(res);
            status
        })
        setName('');
    }

    return (
        <div>
            <h3>New Subject</h3>
            <input value={subject_name} type="text" onChange={(e) => setName(e.target.value)}/>
            <Button onClick={addSubject}>Add</Button>
        </div>
    )
}

export default NewSubject