import { jsxs as _jsxs, jsx as _jsx } from "react/jsx-runtime";
import { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import config from '../Config';
import Button from './base/Button';
import Link from './base/Link';
import ApiClient from './ApiClient';
import { Dialog, DialogPanel, DialogTitle } from '@headlessui/react';
import Select from './base/Select';
const TypologyTable = ({ data }) => {
    const [typologyData, setTypologyData] = useState(null);
    const [typologyList, setTypologyList] = useState([]);
    const [typeList, setTypeList] = useState([]);
    const [typeListMap, setTypeListMap] = useState(new Map());
    const [error, setError] = useState(null); // State to store any error
    const [isOpen, setIsOpen] = useState(false);
    const { id } = useParams();
    const apiClient = new ApiClient();
    const fetchTypologyList = () => {
        axios
            .get(new URL(config.apiPrefix + "typology", apiClient.baseUrl).href)
            .then((response) => {
            setTypologyList(response.data);
        })
            .catch((err) => {
            setError(err.message); // Set error message if an error occurs
        });
    };
    const fetchTypeList = async () => {
        try {
            const response = await axios.get(new URL(config.apiPrefix + "types", apiClient.baseUrl).href);
            setTypeList(response.data);
            const typesMap = new Map(response.data.map(type => [type.type_id, type]));
            setTypeListMap(typesMap);
            console.log(typesMap);
        }
        catch (error) {
            console.error('Error fetching types:', error);
        }
    };
    const handleSubmit = async () => {
        try {
            await axios.post(new URL(config.apiPrefix + "submitsubject", apiClient.baseUrl).href, typologyData)
                .then(res => {
                console.log('Response:', res.data);
                setIsOpen(true);
                setTimeout(() => setIsOpen(false), 2000); // 5000ms = 5 seconds
            });
        }
        catch (error) {
            console.error('Error:', error);
        }
    };
    useEffect(() => {
        fetchTypologyList();
        fetchTypeList();
        setTypologyData(data);
    }, []);
    if (error) {
        return _jsxs("div", { children: ["Error: ", error] });
    }
    return (_jsxs("div", { className: "space-y-2", children: [_jsx("div", { className: "space-x-2" }), _jsx("table", { className: "w-96 table-fixed border-0  border-collapse", children: _jsx("tbody", { children: typologyList.length === 0 ? (_jsx("tr", { children: _jsx("td", { colSpan: 3, children: "No typologies available" }) })) : (typologyList.map((typology) => (_jsxs("tr", { children: [_jsx("td", { children: _jsx(Link, { href: "/typology/" + typology.typology_id, children: typology.typology_display_name }) }), _jsx("td", { children: _jsxs(Select, { value: typologyData?.types?.map((typeId) => {
                                        const type = typeList.find((type) => type.typology_id === typology.typology_id && type.type_id === typeId);
                                        return type ? type.type_id : ''; // Return the type_id if found, otherwise an empty string
                                    })
                                        .join(''), onChange: (e) => {
                                        if (e.target.value == "missing") {
                                            window.location.href = "/typology/" + typology.typology_id;
                                        }
                                        const newTypologyData = {
                                            ...typologyData, // Spread the existing typologyData
                                            types: Array.isArray(typologyData?.types) ? // Check if types is an array
                                                typologyData?.types
                                                    .filter((type) => type !== parseInt(typologyData?.types
                                                    .map((typeId) => {
                                                    const type = typeList.find((type) => type.typology_id === typology.typology_id && type.type_id === typeId);
                                                    return type ? type.type_id : ''; // Return the type_id if found, otherwise an empty string
                                                })
                                                    .join(''))) // Remove the old value
                                                    .concat(parseInt(e.target.value, 10)) // Add the new value
                                                : [parseInt(e.target.value, 10)], // If types is null or not an array, initialize it with the new value
                                        };
                                        setTypologyData(newTypologyData); // я хз оно работает
                                        console.log(e.target);
                                    }, children: [_jsx("option", { value: "", children: "Select a type" }), typeList
                                            .filter((type) => type.typology_id === typology.typology_id)
                                            .map((type) => (_jsx("option", { value: type.type_id, children: type.type_display_name }, type.type_id))), _jsx("option", { value: "missing", children: "Type missing" })] }) })] }, typology.typology_id)))) }) }), _jsx(Button, { onClick: () => setTypologyData(data), children: "Reset changes" }), _jsx(Button, { onClick: handleSubmit, children: "Save" }), _jsx(Dialog, { open: isOpen, onClose: () => setIsOpen(false), transition: true, className: "relative z-50", children: _jsx("div", { className: "fixed inset-0 flex w-screen mt-10 items-baseline justify-left p-4", children: _jsx(DialogPanel, { className: "max-w-lg space-y-4 rounded-lg text-gray-100 bg-green-800 p-4", children: _jsx(DialogTitle, { className: "font-bold", children: "Subject saved successfully" }) }) }) })] }));
};
export default TypologyTable;
