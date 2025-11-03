import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import axios from 'axios';
import config from '../Config';
import TypologyTable from './TypologyTable';
import Button from './base/Button';
import ApiClient from './ApiClient';
import DeleteButton from './base/DeleteButton';
import Parameter from './base/Parameter';
function SubjectPage() {
    const { id } = useParams();
    const [imageFile, setImageFile] = useState(null);
    const [subject, setSubject] = useState();
    const apiClient = new ApiClient();
    const handleImageChange = (event) => {
        if (event.target.files) {
            setImageFile(event.target.files[0]);
        }
    };
    const handleImageUpload = async () => {
        if (imageFile) {
            const formData = new FormData();
            formData.append("image", imageFile);
            try {
                const response = await axios.post(`${new URL(config.apiPrefix + "upload/subject/" + id, apiClient.baseUrl).href}`, formData, {
                    headers: {
                        "Content-Type": "multipart/form-data",
                    },
                });
                setImageUrl(new URL(response.data.image_url, apiClient.baseUrl).href);
                alert("Image uploaded successfully!");
            }
            catch (error) {
                console.error("Error uploading image", error);
                alert("Error uploading image");
            }
        }
    };
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [groups, setGroups] = useState([]);
    const [groupName, setGroupName] = useState("");
    useEffect(() => {
        axios
            .get(new URL(config.apiPrefix + "subject/" + id, apiClient.baseUrl).href)
            .then((response) => {
            setData(response.data);
            setGroupName(response.data.subject.group_id);
            setLoading(false);
            const newSubject = response.data.subject;
            setSubject(newSubject);
        })
            .catch((err) => {
            setError(err.message);
            setLoading(false);
        });
        axios
            .get(new URL(config.apiPrefix + "groups", apiClient.baseUrl).href)
            .then((response) => {
            setGroups(response.data);
        })
            .catch((error) => console.log(error));
    }, []); // empty array so it doesn't loop lol
    // Show loading message while fetching data
    if (loading) {
        return _jsx("div", { children: "Fetching..." });
    }
    if (error) {
        return _jsxs("div", { children: ["Error: ", error] });
    }
    async function handleClick() {
        if (window.confirm(`Delete this subject?\n\n${subject?.subject_name}`)) {
            axios.post(new URL(config.apiPrefix + "delete/subject/" + id, apiClient.baseUrl).href)
                .then(response => {
                console.log(response);
                window.location.href = "/subject/";
            })
                .catch(error => {
                console.log(error);
            });
        }
    }
    async function saveSubject() {
        axios.put(new URL(config.apiPrefix + "subject/" + id, apiClient.baseUrl).href, subject)
            .then(response => { console.log(response); })
            .catch(error => { console.log(error); });
    }
    document.title = subject?.subject_name;
    return (_jsxs("div", { className: "space-y-2", children: [subject?.image_url && (_jsx("div", { children: _jsx("img", { src: new URL(subject.image_url, apiClient.baseUrl).href, alt: "subject picture", className: "max-w-xl" }) })), _jsxs("div", { className: "display-flex", children: [_jsx("h1", { className: "text-4xl py-2", children: subject?.subject_name }), _jsx("input", { type: "file", onChange: handleImageChange }), _jsx(Button, { onClick: handleImageUpload, children: "Upload Image" }), _jsxs("div", { className: "py-2", children: [_jsx(Parameter, { name: "Name", onChange: (e) => {
                                    setSubject({
                                        ...subject, // Keep all existing fields
                                        subject_name: e.target.value, // Update only group_id
                                    });
                                }, type: "text", parameterType: "text", value: subject?.subject_name }), _jsxs(Parameter, { name: "Group", onChange: (e) => {
                                    setSubject({
                                        ...subject, // Keep all existing fields
                                        group_id: parseInt(e.target.value, 10), // Update only group_id
                                    });
                                }, type: "text", parameterType: "select", value: subject?.group_id, children: [_jsx("option", { value: "0", children: "None" }), groups.map((group) => (_jsx("option", { value: group.group_id, children: group.group_name })))] }), _jsx(Button, { onClick: saveSubject, children: "Save subject" })] }), _jsx(DeleteButton, { onClick: handleClick, children: "Delete subject" }), _jsx(TypologyTable, { data: data })] })] }));
}
export default SubjectPage;
