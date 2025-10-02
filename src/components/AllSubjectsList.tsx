import React, { useEffect, useState } from 'react';
import axios from 'axios';

import ApiClient from '../ApiClient.ts';
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
  // is this even used?
  const cookies = new Cookies();

  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const [subjects, setSubjects] = useState<Subject[]>([]);
  const [groups, setGroups] = useState<Group[]>([]);
  const [groupName, setGroupName] = useState<string>("");
  const [currentGroup, setCurrentGroup] = useState<number>(0);

  // Fetch subjects from api/subject
  const fetchSubjects = async () => {
    try {
      const endpoint =
        currentGroup === 0
          ? `${Config.apiPrefix}subject`
          : `${Config.apiPrefix}subject/group/${currentGroup}`;

      const response = await apiClient.get<Subject[]>(endpoint, {
        Authorization: `Bearer ${cookies.get('token')}`,
      });

      setSubjects(response.data);
    } catch (err: any) {
      setError('Failed to fetch subjects:\n\n' + (err.message || err));
    } finally {
      setLoading(false);
    }
  };

  // Fetch groups from api/groups
  const fetchGroups = async () => {
    try {
      const response = await apiClient.get<Group[]>(`${Config.apiPrefix}groups`, {
        Authorization: `Bearer ${cookies.get('token')}`,
      });
      setGroups(response.data);
    } catch (err: any) {
      console.error('Failed to fetch groups:', err);
    }
  };

  useEffect(() => {
    fetchSubjects();
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

  const addGroup = async () => {
    // Check for empty string
    if (!groupName.trim()) return;

    try {
      const newGroup: Partial<Group> = { group_name: groupName };
      await apiClient.post(`${Config.apiPrefix}groups/`, newGroup, {
        Authorization: `Bearer ${cookies.get('token')}`,
      });
      setGroupName('');
      fetchGroups(); // Refresh list
    } catch (err: any) {
      console.error('Failed to add group:', err);
    }
  };

  // Delete group
  const deleteGroup = async () => {
    if (currentGroup === 0) {
      console.log("Attempted to delete group 0")
      return;
    }
    // NOTE: Leave it as const
    const confirmDelete = window.confirm(
      `Delete this group?\n\nNote:\nThis only deletes the group, not subjects. Subjects will have their group set to None.\n\nGroup ID: ${currentGroup}`
    );

    if (!confirmDelete) return;

    try {
      await apiClient.delete(`${Config.apiPrefix}groups/${currentGroup}`, {
        Authorization: `Bearer ${cookies.get('token')}`,
      });
      setCurrentGroup(0); // Reset to "All"
      fetchGroups();
      fetchSubjects(); // Refetch subjects since group changed
    } catch (err: any) {
      console.error('Failed to delete group:', err);
    }
  };

  const handleCurrentGroupChange = (event: { target: { value: any; }; }) => {
    const value = event.target.value
    setCurrentGroup(value)
  }

  return (
    <div>
      <H1>Subjects</H1>
      <div className="py-5 w-3/4">
        <Select value={currentGroup} onChange={handleCurrentGroupChange}>
          <option value={0}>All</option>
          {groups.map((group) => (
            <option value={group.group_id}>{group.group_name}</option>
          ))}
        </Select>
        <DeleteButton onClick={deleteGroup} label="Delete group"/>
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
