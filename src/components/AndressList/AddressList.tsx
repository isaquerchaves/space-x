import React from 'react';
import { Pencil, Trash } from 'lucide-react';
import "./AddressList.css";

interface Address {
  id: number;
  name: string;
  planet: string;
  address: string;
  number: string;
}

interface AddressListProps {
  addresses: Address[];
  onEdit: (address: Address) => void;
  onDelete: (id: number) => void;
}

const AddressList: React.FC<AddressListProps> = ({ addresses, onEdit, onDelete }) => {
  const handleDelete = (id: number) => {
    onDelete(id);
  };

  return (
    <div className="card-container">
      {addresses.map((address) => (
        <div key={address.id}>
          {address.planet === "Terra" ? (
            <div className="card">
              <div className="card-img-info">
                <img src="/terra.png" alt="terra" />
                <div>
                  <span>{address.planet}</span>
                  <div className="card-info">
                    <strong>Nome:</strong> {address.name}
                    <br />
                    <strong>Endereço:</strong> {address.address}
                    <br />
                    <strong>Número:</strong> {address.number}
                  </div>
                </div>
              </div>
              <div className='buttons'>
                <button className="edit" onClick={() => onEdit(address)}>
                  <Pencil />
                </button>
                <button className="delete" onClick={() => handleDelete(address.id)}>
                  <Trash />
                </button>
              </div>
            </div>
          ) : (
            <div className="card">
              <div className="card-img-info">
                <img src="/marte.png" alt="marte" />
                <div>
                  <span>{address.planet}</span>
                  <div className="card-info">
                    <strong>Nome:</strong> {address.name}
                    <br />
                    <strong>Número:</strong> {address.number}
                  </div>
                </div>
              </div>
              <div className='buttons'>
                <button className="edit" onClick={() => onEdit(address)}>
                  <Pencil />
                </button>
                <button className="delete" onClick={() => handleDelete(address.id)}>
                  <Trash />
                </button>
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default AddressList;
