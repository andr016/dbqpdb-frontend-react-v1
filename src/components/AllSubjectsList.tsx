import React, { useEffect, useState } from 'react';
import axios from 'axios';

import ApiClient from './ApiClient';
import Config from '../Config';

// Base components
import Button from './base/Button';
import Input from './base/Input';
import H1 from './base/H1';
import Select from './base/Select';

// Non-basic components
import NewSubject from './NewSubject';
import SubjectCard from './SubjectCard';
import DeleteButton from './base/DeleteButton';

// Interfaces
import { Group } from '../interfaces/group.interface';
import { Subject } from '../interfaces/subject.interface';

// Hooks
import Cookies from 'universal-cookie';

const SubjectsTable: React.FC = () => {
  const apiClient = new ApiClient()
  const cookies = new Cookies();

  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const [subjects, setSubjects] = useState<Subject[]>([]);
  const [groups, setGroups] = useState<Group[]>([]);
  const [groupName, setGroupName] = useState<string>("");
  const [currentGroup, setCurrentGroup] = useState<number>(0);

  const fetchSubjects = (() =>{
      axios
        .get(new URL(currentGroup == 0 ? config.apiPrefix+"subject" : config.apiPrefix+"subject/group/"+currentGroup, apiClient.baseUrl).href, {headers:{
        'Authorization':'Bearer '+cookies.get('token')}}
      )
        .then((response) => {
          setSubjects(response.data); // Assuming the API returns an array of subjects
          setLoading(false);
        })
        .catch((error) => {
          setError('Failed to fetch subjects');
          setLoading(false);
        })
  })

  const fetchGroups = (() => {
    axios
      .get(new URL(Config.apiPrefix+"groups", apiClient.baseUrl).href, {headers:{
        'Authorization':'Bearer '+cookies.get('token')
      }})
      .then((response) =>{
        setGroups(response.data)}
      )
      .catch((error)=>console.log(error))
  })

  useEffect(() => {
    fetchSubjects();
    if (currentGroup) {
      fetchSubjects();
    }
    fetchGroups();
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

  const addGroup = (() => {
      const newGroup: Group = {
        group_name: groupName, // Only set the name
        // Other fields are omitted (will be `undefined` or use defaults)
      };
      axios
        .post(new URL(Config.apiPrefix+"groups/", apiClient.baseUrl).href, newGroup)
        .then((r) => {console.log(r); fetchGroups})
        .catch((err) => console.log(err))
  })

  const deleteGroup = (() => {
    // redo group to use interface instead (or at least a group state)
    if(currentGroup !== 0){
      if (window.confirm(`Delete this group?\n\nNote:\nThis only deletes groups, not subjects, these will have their groups set to None.\n\n${currentGroup}`)) {
        axios
          .delete(new URL(config.apiPrefix+"groups/"+currentGroup, apiClient.baseUrl).href)
          .then((r) => console.log(r))
          .catch((err) => console.log(err))
      }
    }
  })

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
        <DeleteButton onClick={deleteGroup}>Delete group</DeleteButton>
        <Input type="text" onChange={(e: { target: { value: any; }; }) => setGroupName(e.target.value)} value={undefined}/>
        <Button onClick={addGroup}>Add group</Button>

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
