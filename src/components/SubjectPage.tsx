import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import axios from 'axios'
import config from '../config';

import TypologyTable from './TypologyTable';
import Button from './base/Button';
import ApiClient from './ApiClient';
import DeleteButton from './base/DeleteButton';
import { Select } from '@headlessui/react';
import Input from './base/Input';
import Parameter from './base/Parameter';
import { Subject } from '../interfaces/subject.interface';
import { Group } from '../interfaces/group.interface';

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
    
    const [subject, setSubject] = useState<Subject>();

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
    const [groups, setGroups] = useState<Group[]>([]);
    const [groupName, setGroupName] = useState<string>("");

    useEffect(() => {
        axios
        .get(new URL(config.apiPrefix+"subject/"+id, apiClient.baseUrl).href)
        .then((response) => {
            setData(response.data);
            setGroupName(response.data.subject.group_id)
            setLoading(false);
            const newSubject: Subject = response.data.subject
            setSubject(newSubject);
        })
        .catch((err) => {
            setError(err.message); 
            setLoading(false);
        });

        axios
          .get(new URL(config.apiPrefix+"groups", apiClient.baseUrl).href)
          .then((response) =>{
            setGroups(response.data)}
          )
          .catch((error)=>console.log(error))

    }, []) // empty array so it doesn't loop lol

    // Show loading message while fetching data
    if (loading) {
        return <div>Fetching...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    async function handleClick() {
        if (window.confirm(`Delete this subject?\n\n${subject?.subject_name}`)) {
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

    async function saveSubject() {
        axios.put(new URL(config.apiPrefix+"subject/"+id, apiClient.baseUrl).href, subject)
          .then(response => {console.log(response)})
          .catch(error => {console.log(error)})
    }

    document.title = subject?.subject_name

    return (<div className="space-y-2">
      {subject?.image_url && (
      <div>
        <img src={new URL(subject.image_url, apiClient.baseUrl).href} alt="subject picture" className="max-w-xl"/>
      </div>
    )}
      <div className="display-flex">
        <h1 className="text-4xl py-2">{subject?.subject_name}</h1>
        <input type="file" onChange={handleImageChange} />
        <Button onClick={handleImageUpload}>Upload Image</Button>
        <div className="py-2">
        <Parameter name="Name" onChange={(e: { target: { value: any; }; }) => {
          setSubject({
            ...subject,  // Keep all existing fields
            subject_name: e.target.value,  // Update only group_id
          });
        }} type="text" parameterType="text" value={subject?.subject_name}></Parameter>
        <Parameter name="Group" onChange={(e: { target: { value: any; }; }) => {
          setSubject({
            ...subject,  // Keep all existing fields
            group_id: parseInt(e.target.value, 10),  // Update only group_id
          });
        }} type="text" parameterType="select" value={subject?.group_id}>
          <option value="0">None</option>
          {groups.map((group) => (
            <option value={group.group_id}>{group.group_name}</option>
          ))}
        </Parameter>
        <Button onClick={saveSubject}>Save subject</Button>
      </div>
      <DeleteButton onClick={handleClick}>Delete subject</DeleteButton>
      <TypologyTable data={data} />
      </div>
    </div>
    )
}

export default SubjectPage