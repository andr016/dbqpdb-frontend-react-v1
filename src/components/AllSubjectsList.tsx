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

// Interfaces
import { Group } from '../interfaces/group.interface';
import { Subject } from '../interfaces/subject.interface';

// Hooks
import { useGroups } from '../hooks/useGroups';

// Define a TypeScript type for the subject data


const SubjectsTable: React.FC = () => {
  const apiClient = new ApiClient()

  const [subjects, setSubjects] = useState<Subject[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [groups, setGroups] = useState<Group[]>([]);
  const [groupName, setGroupName] = useState<string>("");
  const [currentGroup, setCurrentGroup] = useState<number>(0);

  // Fetch subjects from the API

  const fetchSubjects = (() =>{
      axios
        .get(new URL(currentGroup == 0 ? config.apiPrefix+"subject" : config.apiPrefix+"subject/group/"+currentGroup, apiClient.baseUrl).href)
        .then((response) => {
          setSubjects(response.data); // Assuming the API returns an array of subjects
          setLoading(false);
        })
        .catch((error) => {
          setError('Failed to fetch subjects');
          setLoading(false);
        })
  })

  useEffect(() => {
    fetchSubjects();
    if (currentGroup) {
      fetchSubjects();
    }
    
    axios
      .get(new URL(config.apiPrefix+"group", apiClient.baseUrl).href)
      .then((response) =>{
        setGroups(response.data)}
      )
      .catch((error)=>console.log(error))
  }, [currentGroup]);

  const handleStatus = (data: { status: any; }) => {
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

  const handleCurrentGroupChange = (event: { target: { value: any; }; }) => {
    const value = event.target.value
    setCurrentGroup(value)
  }

  return (
    <div>
      <H1>Subjects</H1>
      <div className="py-5 w-3/4">
        <Select value={currentGroup} onChange={handleCurrentGroupChange}>
          <option value='0'>All</option>
          {groups.map((group) => (
            <option value={group.group_id}>{group.group_name}</option>
          ))}
        </Select>
        <Input type="text" onChange={(e: { target: { value: any; }; }) => setGroupName(e.target.value)} value={undefined}/>
        <Button onClick={undefined}>Add group</Button>

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
