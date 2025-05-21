import React, { useEffect, useState } from 'react';
import axios from 'axios';

import NewSubject from './NewSubject';
import Button from './base/Button';
import Input from './base/Input';
import H1 from './base/H1';
import ApiClient from './ApiClient';
import config from '../config';
import SubjectCard from './SubjectCard';
import Select from './base/Select';

// Define a TypeScript type for the subject data
interface Subject {
  subject_id: number;
  subject_name: string;
  image_url: string;
}

interface Group {
  group_id: number;
  group_name: string;
}

const SubjectsTable: React.FC = () => {
  const [subjects, setSubjects] = useState<Subject[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [groups, setGroups] = useState<Group[]>([]);

  const apiClient = new ApiClient()
  // Fetch subjects from the API
  useEffect(() => {

    axios
      .get(new URL(config.apiPrefix+"subject", apiClient.baseUrl).href)
      .then((response) => {
        setSubjects(response.data); // Assuming the API returns an array of subjects
        setLoading(false);
      })
      .catch((error) => {
        setError('Failed to fetch subjects');
        setLoading(false);
      });

    axios
      .get(new URL(config.apiPrefix+"groups", apiClient.baseUrl).href)
      .then((response) =>{
        setGroups(response.data)}
      )
      .catch((error)=>console.log(error))
  }, []);

  const handleStatus = (data) => {
    console.log(data.status)
  }

  // Render the loading state, error, or the table
  if (loading) {
    return <div><H1>Subjects</H1>Fetching...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  document.title = "All subjects"

  const [groupName, setGroupName] = useState<string>("")
  

  return (
    <div>
      <H1>Subjects</H1>
      <div className="py-5 w-3/4">
        <Select>
          <option>No group</option>
        </Select>
        <Input type="text" onChange={(e) => setName(e.target.value)}/>
        <Button>Add group</Button>

        <div className="mt-4 flex flex-wrap">
            {subjects.map((subject) => (
              <tr key={subject.subject_id}>
                <td className="pr-2">
                  <SubjectCard src={new URL(subject.image_url, apiClient.baseUrl).href} subject_id={subject.subject_id} subject_name={subject.subject_name}/>
                </td>
              </tr>
            ))}
        </div>
      </div>
      <NewSubject status={handleStatus}/>
    </div>
  );
};

export default SubjectsTable;
