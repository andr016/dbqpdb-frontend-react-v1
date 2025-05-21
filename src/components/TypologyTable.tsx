import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import config from '../config';
import Button from './base/Button';
import Link from './base/Link';
import ApiClient from './ApiClient';

import { Description, Dialog, DialogPanel, DialogTitle } from '@headlessui/react'
import Select from './base/Select';

// Define TypeScript types for the expected props
interface Type {
  type_id: number;
  typology_id: number;
  type_name: string;
  type_display_name: string;
  type_description: string;
}

interface Typology {
  typology_id: number;
  typology_name: string;
  typology_display_name: string;
}

interface TypologyData {
  subject: string;
  subject_id: number;
  types: number[];
}

interface TypologyTableProps {
  data: TypologyData | null;
}

const TypologyTable: React.FC<TypologyTableProps> = ({ data }) => {
    const [typologyData, setTypologyData] = useState<TypologyData | null>(null);
    const [typologyList, setTypologyList] = useState<Typology[]>([])
    const [typeList, setTypeList] = useState<Type[]>([])
    const [typeListMap, setTypeListMap] = useState<Map<number, Type>>(new Map())
    const [error, setError] = useState(null); // State to store any error

    const [isOpen, setIsOpen] = useState(false)

    const { id } = useParams()

    const apiClient = new ApiClient()

    const fetchTypologyList = () => {
        axios
            .get(new URL(config.apiPrefix+"typology", apiClient.baseUrl).href)
            .then((response) => {
                setTypologyList(response.data);
            })
            .catch((err) => {
                setError(err.message); // Set error message if an error occurs
            });
    }

    const fetchTypeList = async () => {
        try {
          const response = await axios.get<Type[]>(new URL(config.apiPrefix+"types", apiClient.baseUrl).href);
          setTypeList(response.data)
          const typesMap = new Map(response.data.map(type => [type.type_id, type]));
          setTypeListMap(typesMap);
          console.log(typesMap)
        } catch (error) {
          console.error('Error fetching types:', error);
        }
      };
    
    const handleSubmit = async () => {
        try {
            await axios.post(new URL(config.apiPrefix+"submitsubject", apiClient.baseUrl).href, typologyData)
            .then( res => {
                    console.log('Response:', res.data);
                    setIsOpen(true);
                    setTimeout(() => setIsOpen(false), 2000); // 5000ms = 5 seconds
                }
            );
            
        } catch (error) {
            console.error('Error:', error);
        }
    };

    useEffect(() => {
        fetchTypologyList()
        fetchTypeList()
        setTypologyData(data)
    }, [])

    if (error) {
        return <div>Error: {error}</div>;
    }

    return (
        <div className="space-y-2">
            <div className="space-x-2">
            </div>
            <table className="w-96 table-fixed border-0  border-collapse">
                <tbody>
                {typologyList.length === 0 ? (
                    <tr>
                    <td colSpan={3}>No typologies available</td>
                    </tr>
                ) : (
                    typologyList.map((typology) => (
                    <tr key={typology.typology_id}>
                        <td>
                            <Link href={"/typology/"+typology.typology_id}>{typology.typology_display_name}</Link>
                        </td>
                        <td>
                            <Select
                                value={
                                    typologyData?.types?.map((typeId) => {
                                        const type = typeList.find(
                                            (type) => type.typology_id === typology.typology_id && type.type_id === typeId
                                        );
                                        return type ? type.type_id : ''; // Return the type_id if found, otherwise an empty string
                                        })
                                        .join('') 
                                }
                                onChange={(e) => { // спасите
                                    if(e.target.value == "missing"){
                                        window.location.href="/typology/"+typology.typology_id
                                    }
                                    const newTypologyData = {
                                        ...typologyData, // Spread the existing typologyData
                                        types: Array.isArray(typologyData?.types) ? // Check if types is an array
                                          typologyData?.types
                                            .filter((type) => type !== parseInt(typologyData?.types
                                              .map((typeId) => {
                                                const type = typeList.find(
                                                  (type) => type.typology_id === typology.typology_id && type.type_id === typeId
                                                );
                                                return type ? type.type_id : ''; // Return the type_id if found, otherwise an empty string
                                              })
                                              .join(''))) // Remove the old value
                                            .concat(parseInt(e.target.value, 10)) // Add the new value
                                          : [parseInt(e.target.value, 10)], // If types is null or not an array, initialize it with the new value
                                      };                                      
                                    setTypologyData(newTypologyData) // я хз оно работает
                                    console.log(e.target)
                                }}
                            >
                                    <option value="">Select a type</option>
                                    {typeList
                                    .filter((type) => type.typology_id === typology.typology_id)
                                    .map((type) => (
                                        <option key={type.type_id} value={type.type_id}>{type.type_display_name}</option>
                                    ))}
                                    <option value="missing">Type missing</option>
                            </Select>
                        </td>
                    </tr>
                    ))
                )}
                </tbody>
            </table>
            <Button onClick={(e) => setTypologyData(data)}>
                Reset changes
            </Button>
            <Button onClick={handleSubmit}>Save</Button>
            <Dialog open={isOpen} onClose={() => setIsOpen(false)} transition className="relative z-50">
                <div className="fixed inset-0 flex w-screen mt-10 items-baseline justify-left p-4">
                <DialogPanel className="max-w-lg space-y-4 rounded-lg text-gray-100 bg-green-800 p-4">
                    <DialogTitle className="font-bold">Subject saved successfully</DialogTitle>
                </DialogPanel>
                </div>
            </Dialog>
        </div>
    );
};

export default TypologyTable;
