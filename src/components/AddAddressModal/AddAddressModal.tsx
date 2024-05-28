import React, { useState } from 'react';
import Modal from 'react-modal';
import './AddAddressModal.css';
import { Address } from '../../pages/Home/Home';

interface AddAddressModalProps {
  isOpen: boolean;
  onRequestClose: () => void;
  onSave: (address: Address) => void;
}

Modal.setAppElement('#root');

const AddAddressModal: React.FC<AddAddressModalProps> = ({ isOpen, onRequestClose, onSave }) => {
  const [name, setName] = useState('');
  const [planet, setPlanet] = useState('Terra');
  const [address, setAddress] = useState('');
  const [number, setNumber] = useState('');

  const resetFields = () => {
    setName('');
    setPlanet('Terra');
    setAddress('');
    setNumber('');
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave({ id: Math.random()*1000000, name, planet, address, number });
    resetFields();
    onRequestClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={() => {
        resetFields();
        onRequestClose();
      }}
      className="modal"
      overlayClassName="overlay"
    >
      <h2>Adicionar Endereço</h2>
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
        <button type="button" onClick={() => {
          resetFields();
          onRequestClose();
        }}>Cancelar</button>
      </form>
    </Modal>
  );
};

export default AddAddressModal;