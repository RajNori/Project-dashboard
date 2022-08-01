import { BsFillTrashFill } from 'react-icons/bs';

export default function ClientRow(client) {
  return (
    <tr>
      <td>{client.name}</td>
      <td>{client.email}</td>
      <td>{client.phonw}</td>
      <td>
        <button className='btn btn-danger btn-sm'>
          <BsFillTrashFill />
        </button>
      </td>
    </tr>
  );
}