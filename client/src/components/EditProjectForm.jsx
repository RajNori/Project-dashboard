import React from "react"
import { useState } from "react"
import {useMutation} from '@apollo/client'
import {GET_PROJECT} from '../queries/projectQueries'
import { UPDATE_PROJECT } from "../mutations/projectMutations"

export default function EditProjectForm({project}) {
 const [name,setName] = useState(project.name)
 const [description, setDescription] = useState(project.description)
 const [status,setStatus] = useState('');

 const [updateProject] = useMutation(UPDATE_PROJECT, {
  variables: { id: project.id, name, description, status },
  refetchQueries: [{ query: GET_PROJECT, variables: { id: project.id }}]
 })

const onSubmit = (e)=>{
e.preventDefault();
if(!name || !description || !status){
 return alert('Enter all the details');
}
updateProject();
};

  return (
    <div className='mt-5'>
      <h3>update</h3>
      <form onSubmit ={onSubmit}>
        <div className='mb-3'>
          <label className='form-label'>Name</label>
          <input
            type='text'
            className='form-control'
            id='name'
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className='mb-3'>
          <label className='form-label'>Description</label>
          <textarea
            className='form-control'
            id='description'
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          ></textarea>
        </div>
        <div className='mb-3'>
          <label className='form-label'>Project Status</label>
          <select
            name=''
            className='form-select'
            value={status}
            onChange={(e) => setStatus(e.target.value)}
          >
            <option value='start'>Started</option>
            <option value='planning'>Project Planning</option>
            <option value='ux'>User Experience design</option>
            <option value='content'>Information architechture</option>
            <option value='code'>coding</option>
            <option value='qa'>QA: Testing phase</option>
            <option value='launch'>Deploy</option>
          </select>
        </div>
        <button type='submit' className="btn btn-primary">submit</button>
      </form>
    </div>
  );
}