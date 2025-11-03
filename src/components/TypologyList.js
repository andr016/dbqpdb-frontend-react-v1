import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useEffect, useState } from "react";
import config from "../Config";
import NewTypology from "./NewTypology";
import ApiClient from "./ApiClient";
import H1 from "./base/H1";
import Typology from "./Typology";
import Button from "./base/Button";
import { useParams } from "react-router-dom";
const TypologyList = () => {
    const { id } = useParams();
    const [typologies, setTypologies] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [typology, setTypology] = useState();
    const apiClient = new ApiClient;
    useEffect(() => {
        const fetchTypologies = async () => {
            const response = await fetch(new URL(config.apiPrefix + "typology", apiClient.baseUrl).href);
            const data = await response.json();
            setTypologies(data);
            setIsLoading(false);
            if (id) {
                console.log(id);
                const found = data.find(t => t.typology_id === Number(id));
                setTypology(found || undefined);
                console.log(found);
            }
        };
        fetchTypologies();
    }, []);
    return _jsx("div", { children: _jsxs("div", { className: "flex", children: [_jsxs("div", { children: [_jsx(H1, { children: "Typologies" }), _jsx("table", { children: _jsx("tbody", { children: isLoading ? _jsx("tr", { children: _jsx("td", { colSpan: 3, children: "Loading..." }) }) :
                                    typologies.map(typology => _jsx("tr", { children: _jsx("td", { children: _jsx(Button, { onClick: () => setTypology(typology), children: typology.typology_display_name.length == 0 ? "noname!" : typology.typology_display_name }) }) }, typology.typology_id)) }) }), _jsx(NewTypology, {})] }), _jsx("div", { children: _jsx(Typology, { typology: typology }) })] }) });
};
export default TypologyList;
