import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import axios from 'axios'
import config from '../config';

import TypologyTable from './TypologyTable';
import Button from './base/Button';
import ApiClient from './ApiClient';

interface Post {
    subject_id: number;
    name: string;
    mbti: string;
  }

interface Type {
    typology_id: number;
    type_id: number;
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
    image_url: string;
}
  

function SubjectPage() {
    const { id } = useParams();
    
    const [imageFile, setImageFile] = useState<File | null>(null);
    const [imageUrl, setImageUrl] = useState<string>("");
    
    const apiClient = new ApiClient()

    const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files) {
          setImageFile(event.target.files[0]);
        }
      };

      // Handle image upload
  const handleImageUpload = async () => {
    if (imageFile) {
      const formData = new FormData();
      formData.append("image", imageFile);

      try {
        const response = await axios.post(`${new URL(config.apiPrefix+"upload/subject/"+id, apiClient.baseUrl).href}`, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });

        // After upload, set the image URL to state
        setImageUrl(new URL(response.data.image_url, apiClient.baseUrl).href);
        alert("Image uploaded successfully!");
      } catch (error) {
        console.error("Error uploading image", error);
        alert("Error uploading image");
      }
    }
  };

    const [data, setData] = useState<TypologyData | null>(null);
    const [loading, setLoading] = useState(true); // State to track loading state
    const [error, setError] = useState(null); // State to store any error

    // // Show loading message while fetching
    // if (loading) {
    //     return <div>Loading...</div>;
    // }

    // // Show error message if something went wrong
    // if (error) {
    //     return <div>Error fetching data: {error}</div>;
    // }
    let url_subject_id: number = 2
    useEffect(() => {
        axios
        .get(new URL(config.apiPrefix+"subject/"+id, apiClient.baseUrl).href)
        .then((response) => {
            setData(response.data);
            setImageUrl(new URL(response.data.image_url, apiClient.baseUrl).href);
            setLoading(false);
            //data.map((item) => alert(item.subject_id))
        })
        .catch((err) => {
            setError(err.message); // Set error message if an error occurs
            setLoading(false); // Set loading to false
        });
    }, []) // empty array so it doesn't loop lol

      // Show loading message while fetching data
    if (loading) {
        return <div>Loading...</div>;
    }

    // Show error message if there is an error fetching data
    if (error) {
        return <div>Error: {error}</div>;
    }

    async function getSubject(id: number) {
        //var response = await
       

        //return (response.map())
    }

    async function handleClick() {
        if (window.confirm(`Delete this subject?\n\n${data?.subject}`)) {
        axios.post(new URL(config.apiPrefix+"delete/subject/"+id, apiClient.baseUrl).href)
            .then(response => {
                console.log(response)
                window.location.href = "/subject/"
            })
            .catch(error => {
                console.log(error)
            })
        }
    }

    return (<div className="space-y-2">
      {imageUrl && (
      <div>
        <img src={imageUrl} alt="subject picture" className="max-w-xs"/>
      </div>
    )}
      <div className="display-flex">
        <h1 className="text-4xl py-2">{data?.subject}</h1>
        <h2 className="italic">Subject ID: {id}</h2>
        <input type="file" onChange={handleImageChange} />
        <Button onClick={handleImageUpload}>Upload Image</Button>
        <div className="py-2">
      </div>
      <TypologyTable data={data} />
      </div>
      <Button onClick={handleClick}>Delete subject</Button>
    </div>
    )
}

export default SubjectPage