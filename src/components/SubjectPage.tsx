import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import axios from 'axios'
import config from '../config';

import TypologyTable from './TypologyTable';
import Button from './base/Button';
import ApiClient from './ApiClient';
import DeleteButton from './base/DeleteButton';

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

          setImageUrl(new URL(response.data.image_url, apiClient.baseUrl).href);
          alert("Image uploaded successfully!");
        } catch (error) {
          console.error("Error uploading image", error);
          alert("Error uploading image");
        }
      }
    };

    const [data, setData] = useState<TypologyData | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        axios
        .get(new URL(config.apiPrefix+"subject/"+id, apiClient.baseUrl).href)
        .then((response) => {
            setData(response.data);
            setImageUrl(new URL(response.data.image_url, apiClient.baseUrl).href);
            setLoading(false);
        })
        .catch((err) => {
            setError(err.message); 
            setLoading(false);
        });
    }, []) // empty array so it doesn't loop lol

    // Show loading message while fetching data
    if (loading) {
        return <div>Fetching...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
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

    document.title = data?.subject

    return (<div className="space-y-2">
      {imageUrl && (
      <div>
        <img src={imageUrl} alt="subject picture" className="max-w-xl"/>
      </div>
    )}
      <div className="display-flex">
        <h1 className="text-4xl py-2">{data?.subject}</h1>
        <input type="file" onChange={handleImageChange} />
        <Button onClick={handleImageUpload}>Upload Image</Button>
        <div className="py-2">
      </div>
      <DeleteButton onClick={handleClick}>Delete subject</DeleteButton>
      <TypologyTable data={data} />
      </div>
    </div>
    )
}

export default SubjectPage