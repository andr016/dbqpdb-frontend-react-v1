import { useEffect, useState } from "react";
import config from "../Config";
import NewTypology from "./NewTypology";
import Link from "./base/Link";
import ApiClient from "./ApiClient";
import H1 from "./base/H1";

interface Typology {
    typology_id: number;
    typology_name: string;
    typology_display_name: string;
  }
  

const TypologyList = () => {
    const [typologies, setTypologies] = useState<Typology[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    const apiClient = new ApiClient

    useEffect(() => {
        const fetchTypologies = async () => {
            const response = await fetch(new URL(config.apiPrefix+"typology", apiClient.baseUrl).href);
            const data = await response.json();
            setTypologies(data);
            setIsLoading(false);
            console.log(data);
        }

        fetchTypologies();
    }, []);

    return <div>
        <H1>Typologies</H1>
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