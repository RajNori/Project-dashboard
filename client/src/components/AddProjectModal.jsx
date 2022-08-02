import { useState } from 'react';
import { FaList } from 'react-icons/fa';
import { useMutation, useQuery } from '@apollo/client';
import { ADD_PROJECT } from '../mutations/projectMutations';
import { GET_PROJECTS } from '../queries/projectQueries';
import { GET_CLIENTS } from '../queries/clientQueries';
import Spinner from './Spinner';

export default function AddProjectModal() {
  const [name, setName] = useState('');
  const [description,setDescription] = useState('');
  const [clientId, setClientId] = useState('');
  //enum so provide a default
  const [status, setStatus] = useState('start');

  const [addProject] = useMutation(ADD_PROJECT,{
    variables: {name, description, clientId,status},
    update(cache,{data:{addProject}}){
      const {projects}=cache.readQuery({query:GET_PROJECTS});
      cache.writeQuery({
        query:GET_PROJECTS,
        data: {projects: projects.concat([addProject])},
      });
    }
  })

//Get clients
const {loading, error, data} = useQuery(GET_CLIENTS)
  const onSubmit = (e) => {
    e.preventDefault();

    if(name==='' || description ===''||status ===''){
      return alert('fields cannot be empty')
    }
addProject(name,description, clientId, status);

    setName('');
    setDescription('');
    setStatus('start');
    setClientId('')
  };
if(loading) return <Spinner/>;
if(error) return 'Error!'
  return (
    <>
      {!loading && !error && (
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
            // tabindex='-1'
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
                        <option value='content'>
                          Information architechture
                        </option>
                        <option value='code'>coding</option>
                        <option value='qa'>QA: Testing phase</option>
                        <option value='launch'>Deploy</option>
                      </select>
                    </div>
                    <div className="mb-3">
                      <label className='form-label'>Client</label>
                      <select  id="clientId" className='form-select' 
                      value={clientId}
                      onChange={(e)=>setClientId(e.target.value)}
                      >
                        <option value="">select client</option>
                        {data.clients.map((client)=>(
                          <option key={client.id} value={client.id}>
                           {client.name}
                          </option>
                        ))}
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
      )}
    </>
  );
}
