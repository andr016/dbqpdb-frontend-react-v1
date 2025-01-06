import { useEffect, useState } from "react";
import config from "../config";
import NewTypology from "./NewTypology";
import Link from "./base/Link";

interface Typology {
    typology_id: number;
    typology_name: string;
    typology_display_name: string;
  }
  

const TypologyList = () => {
    const [typologies, setTypologies] = useState<Typology[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchTypologies = async () => {
            const response = await fetch(config.apiUrl+'typology');
            const data = await response.json();
            setTypologies(data);
            setIsLoading(false);
            console.log(data);
        }

        fetchTypologies();
    }, []);

    return <div>
        <h1 className="text-4xl py-2">Typologies</h1>
        <table>
            <tbody>
                {isLoading ? <tr><td colSpan={3}>Loading...</td></tr> :
                    typologies.map(typology =>
                        <tr key={typology.typology_id}>
                            <td><Link href={"/typology/" + typology.typology_id}>{typology.typology_display_name.length == 0 ? "noname!" : typology.typology_display_name}</Link></td>
                        </tr>
                        )
                }
            </tbody>
        </table>
        <NewTypology />
        </div>
}

export default TypologyList