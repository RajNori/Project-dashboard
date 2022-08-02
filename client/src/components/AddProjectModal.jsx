import { useState } from 'react';
import { FaList } from 'react-icons/fa';
import { useMutation, useQuery } from '@apollo/client';
import { GET_PROJECTS } from '../queries/projectQueries';

export default function AddProjectModal() {
  const [name, setName] = useState('');
  const [description,setDescription] = useState('');
  const [cliendId, setClientId] = useState('');
  //enum so provide a default
  const [status, setStatus] = useState('start');


  const onSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <>
      <button
        type='button'
        className='btn btn-primary'
        data-bs-toggle='modal'
        data-bs-target='#addProjectModal'
      >
        <div className='d-flex align-items-center'>
          <FaList className='icon' />
          <div>New Project</div>
        </div>
      </button>

      <div
        className='modal fade'
        id='addProjectModal'
        tabindex='-1'
        aria-labelledby='addProjectModalLabel'
        aria-hidden='true'
      >
        <div className='modal-dialog'>
          <div className='modal-content'>
            <div className='modal-header'>
              <h5 className='modal-title' id='addProjectModalLabel'>
                Add Project
              </h5>
              <button
                type='button'
                className='btn-close'
                data-bs-dismiss='modal'
                aria-label='Close'
              ></button>
            </div>
            <div className='modal-body'>
              <form onSubmit={onSubmit}>
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
                <button
                  type='submit'
                  data-bs-dismiss='modal'
                  className='btn btn-primary'
                >
                  Submit
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
