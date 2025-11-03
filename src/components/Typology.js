import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import axios from "axios";
import { useEffect, useState } from "react";
import H1 from "./base/H1";
import config from "../Config";
import Button from "./base/Button";
import ApiClient from "./ApiClient";
import Input from "./base/Input";
import DeleteButton from "./base/DeleteButton";
// fix string | undefined
const Typology = (typology) => {
    const id = typology.typology?.typology_id;
    if (typology.typology) {
        const [types, setTypes] = useState();
        const [newTypes, setNewTypes] = useState();
        const [loading, setLoading] = useState(true);
        const apiClient = new ApiClient;
        useEffect(() => {
            const fetchTypes = async () => {
                // will totally fix that later
                setLoading(true);
                const response = await fetch(new URL(config.apiPrefix + `typology/${id}`, apiClient.baseUrl).href);
                const data = await response.json();
                setTypes(data);
                setNewTypes(data);
                setLoading(false);
            };
            fetchTypes();
        }, [id]);
        const addNewType = () => {
            const newType = {
                type_id: -1 - newTypes?.length,
                typology_id: id,
                type_name: '',
                type_display_name: '',
            };
            setNewTypes([...newTypes, newType]);
        };
        const resetToFetch = () => {
            setNewTypes(types);
        };
        const postNewTypes = () => {
            const response = axios.post(new URL(config.apiPrefix + `submit/typology/${id}`, apiClient.baseUrl).href, newTypes);
            console.log(response);
        };
        const deleteTypology = () => {
            if (window.confirm("Delete this typology? NAME")) {
                axios.post(new URL(config.apiPrefix + `delete/typology/${id}`, apiClient.baseUrl).href)
                    .then(response => {
                    console.log(response);
                    window.location.href = "/typology/";
                })
                    .catch(error => {
                    console.log(error);
                });
            }
        };
        if (loading)
            return _jsx("div", { children: "loading..." });
        return (_jsxs("div", { children: [_jsx(H1, { children: typology.typology.typology_display_name }), _jsx(DeleteButton, { onClick: deleteTypology, children: "Delete typology" }), _jsxs("p", { children: ["Type count: ", newTypes?.length] }), _jsx(Button, { onClick: addNewType, children: "New type" }), _jsx(Button, { onClick: resetToFetch, children: "Reset" }), _jsx(Button, { onClick: postNewTypes, children: "Save" }), _jsxs("table", { children: [_jsx("thead", { children: _jsxs("tr", { children: [_jsx("td", { children: "name" }), _jsx("td", { children: "button" })] }) }), _jsx("tbody", { children: newTypes?.map(type => (_jsxs("tr", { children: [_jsx("td", { children: _jsx(Input, { value: type.type_display_name, onChange: e => {
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
                                            } }) }), _jsx("td", { children: _jsx(Button, { onClick: e => {
                                                setNewTypes(newTypes?.filter((type2) => type2.type_id !== type.type_id));
                                            }, children: "Delete type" }) })] }, type.type_id))) })] })] }));
    }
};
export default Typology;
