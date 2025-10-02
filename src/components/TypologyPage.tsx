import { useParams } from "react-router-dom";
import Typology from "./Typology";
import TypologyList from "./TypologyList";
import { useEffect, useState } from "react";

const TypologyPage = () => {
    const { id } = useParams();
    const [typologyId, setTypologyId] = useState(1)
    const [typology, setTypology] = useState([]);

    useEffect(() => {

    },[typologyId])
    // fix string param lol
    return (
        <div className="flex">
            <div>
                {TypologyList()}
            </div>
            <div>
                <h1>typologylistnewtest</h1>
                <button onClick={() => {setTypologyId(2)}}>gg</button>
            </div>
            <div>
                <Typology id={String(typologyId)}/>
            </div>
        </div>
    )
}

export default TypologyPage