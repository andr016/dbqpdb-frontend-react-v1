import React, { useEffect, useState } from 'react';
import axios from 'axios';

import NewSubject from './NewSubject';
import Link from './base/Link';
import ApiClient from './ApiClient';
import config from '../config';
import SubjectCard from './SubjectCard';

// Define a TypeScript type for the subject data
interface Subject {
  subject_id: number;
  subject_name: string;
  image_url: string;
}

const SubjectsTable: React.FC = () => {
  const [subjects, setSubjects] = useState<Subject[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

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
  }, []);

  const handleStatus = (data) => {
    console.log(data)
  }

  // Render the loading state, error, or the table
  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div>
      <h1 className="text-4xl py-2">Subjects</h1>
      <div className="py-5 w-1/2">
        <div className="flex flex-wrap">
            {subjects.map((subject) => (
              <tr key={subject.subject_id}>
                <td>
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
