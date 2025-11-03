import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useEffect, useState } from 'react';
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
// Hooks
import Cookies from 'universal-cookie';
const SubjectsTable = () => {
    const apiClient = new ApiClient();
    // is this even used?
    const cookies = new Cookies();
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [subjects, setSubjects] = useState([]);
    const [groups, setGroups] = useState([]);
    const [groupName, setGroupName] = useState("");
    const [currentGroup, setCurrentGroup] = useState(0);
    // Fetch subjects from api/subject
    const fetchSubjects = async () => {
        try {
            const endpoint = currentGroup === 0
                ? `${Config.apiPrefix}subject`
                : `${Config.apiPrefix}subject/group/${currentGroup}`;
            const response = await apiClient.get(endpoint, {
                Authorization: `Bearer ${cookies.get('token')}`,
            });
            setSubjects(response.data);
        }
        catch (err) {
            setError('Failed to fetch subjects:\n\n' + (err.message || err));
        }
        finally {
            setLoading(false);
        }
    };
    // Fetch groups from api/groups
    const fetchGroups = async () => {
        try {
            const response = await apiClient.get(`${Config.apiPrefix}groups`, {
                Authorization: `Bearer ${cookies.get('token')}`,
            });
            setGroups(response.data);
        }
        catch (err) {
            console.error('Failed to fetch groups:', err);
        }
    };
    useEffect(() => {
        fetchSubjects();
        fetchGroups();
    }, [currentGroup]);
    const handleStatus = (data) => {
        console.log(data.status);
    };
    // Render the loading state, error, or the table
    if (loading) {
        return _jsxs("div", { children: [_jsx(H1, { children: "Subjects" }), "Fetching..."] });
    }
    if (error) {
        return _jsx("div", { children: error });
    }
    document.title = "All subjects";
    const addGroup = async () => {
        // Check for empty string
        if (!groupName.trim())
            return;
        try {
            const newGroup = { group_name: groupName };
            await apiClient.post(`${Config.apiPrefix}groups/`, newGroup, {
                Authorization: `Bearer ${cookies.get('token')}`,
            });
            setGroupName('');
            fetchGroups(); // Refresh list
        }
        catch (err) {
            console.error('Failed to add group:', err);
        }
    };
    // Delete group
    const deleteGroup = async () => {
        if (currentGroup === 0) {
            console.log("Attempted to delete group 0");
            return;
        }
        // NOTE: Leave it as const
        const confirmDelete = window.confirm(`Delete this group?\n\nNote:\nThis only deletes the group, not subjects. Subjects will have their group set to None.\n\nGroup ID: ${currentGroup}`);
        if (!confirmDelete)
            return;
        try {
            await apiClient.delete(`${Config.apiPrefix}groups/${currentGroup}`, {
                Authorization: `Bearer ${cookies.get('token')}`,
            });
            setCurrentGroup(0); // Reset to "All"
            fetchGroups();
            fetchSubjects(); // Refetch subjects since group changed
        }
        catch (err) {
            console.error('Failed to delete group:', err);
        }
    };
    const handleCurrentGroupChange = (event) => {
        const value = event.target.value;
        setCurrentGroup(value);
    };
    return (_jsxs("div", { children: [_jsx(H1, { children: "Subjects" }), _jsxs("div", { className: "py-5 w-3/4", children: [_jsxs(Select, { value: currentGroup, onChange: handleCurrentGroupChange, children: [_jsx("option", { value: 0, children: "All" }), groups.map((group) => (_jsx("option", { value: group.group_id, children: group.group_name })))] }), _jsx(DeleteButton, { onClick: deleteGroup, label: "Delete group" }), _jsx(Input, { type: "text", onChange: (e) => setGroupName(e.target.value), value: undefined }), _jsx(Button, { onClick: addGroup, children: "Add group" }), _jsx("div", { className: "mt-4 flex flex-wrap", children: subjects.map((subject) => (_jsx("tr", { children: _jsx("td", { className: "pr-2", children: _jsx(SubjectCard, { src: new URL(subject.image_url, apiClient.baseUrl).href, subject_id: subject.subject_id, subject_name: subject.subject_name }) }) }, subject.subject_id))) })] }), _jsx(NewSubject, { status: handleStatus })] }));
};
export default SubjectsTable;
