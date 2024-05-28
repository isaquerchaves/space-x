import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';
import './EditAddressModal.css';

interface Address {
  id: number;
  name: string;
  planet: string;
  address: string;
  number: string;
}

interface EditAddressModalProps {
  isOpen: boolean;
  onRequestClose: () => void;
  addressToEdit: Address | null;
  onSave: (address: Address) => void;
}

Modal.setAppElement('#root');

const EditAddressModal: React.FC<EditAddressModalProps> = ({ isOpen, onRequestClose, addressToEdit, onSave }) => {
  const [name, setName] = useState('');
  const [planet, setPlanet] = useState('Terra');
  const [address, setAddress] = useState('');
  const [number, setNumber] = useState('');

  useEffect(() => {
    if (addressToEdit) {
      setName(addressToEdit.name);
      setPlanet(addressToEdit.planet);
      setAddress(addressToEdit.address);
      setNumber(addressToEdit.number);
    }
  }, [addressToEdit]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (addressToEdit) {
      onSave({ ...addressToEdit, name, planet, address, number });
    }
    onRequestClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      className="modal"
      overlayClassName="overlay"
    >
      <h2>Editar Endereço</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Nome:
          <input type="text" value={name} onChange={(e) => setName(e.target.value)} required />
        </label>
        <label>
          Planeta:
          <div className="radio-group">
            <label>
              <input
                type="radio"
                value="Terra"
                checked={planet === 'Terra'}
                onChange={(e) => setPlanet(e.target.value)}
              />
              Terra
            </label>
            <label>
              <input
                type="radio"
                value="Marte"
                checked={planet === 'Marte'}
                onChange={(e) => setPlanet(e.target.value)}
              />
              Marte
            </label>
          </div>
        </label>
        {planet === 'Terra' && (
          <label>
            Endereço:
            <input type="text" value={address} onChange={(e) => setAddress(e.target.value)} required />
          </label>
        )}
        <label>
          Número:
          <input type="text" value={number} onChange={(e) => setNumber(e.target.value)} required />
        </label>
        <button type="submit">Salvar</button>
        <button type="button" onClick={onRequestClose}>Cancelar</button>
      </form>
    </Modal>
  );
};

export default EditAddressModal;