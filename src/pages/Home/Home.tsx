import React, { useState } from 'react';
import AddressList from '../../components/AndressList/AddressList';
import AddAddressModal from '../../components/AddAddressModal/AddAddressModal';
import EditAddressModal from '../../components/EditAddressModal/EditAddressModal';
import './Home.css';
import { Plus } from 'lucide-react';

export interface Address {
  id: number;
  name: string;
  planet: string;
  address: string;
  number: string;
}

const initialAddresses: Address[] = [
  { id: Math.random()*1000000000, name: 'João', planet: 'Terra', address: 'Rua A', number: '123' },
  { id: Math.random()*1000000000, name: 'Marciano', planet: 'Marte', address: '', number: '456' }
];

const Home: React.FC = () => {
  const [addresses, setAddresses] = useState<Address[]>(initialAddresses);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [addressToEdit, setAddressToEdit] = useState<Address | null>(null);

  const handleAddAddress = (newAddress: Address) => {
    setAddresses([...addresses, { ...newAddress, id: addresses.length + 1 }]);
  };

  const handleEditAddress = (updatedAddress: Address) => {
    setAddresses(
      addresses.map((addr) => (addr.id === updatedAddress.id ? updatedAddress : addr))
    );
  };

  const handleDeleteAddress = (id: number) => {
    setAddresses(addresses.filter(address => address.id !== id));
  };

  const openEditModal = (address: Address) => {
    setAddressToEdit(address);
    setIsEditModalOpen(true);
  };

  return (
    <div className="container">
      <h3>Endereços</h3>
      
      <button className="button" onClick={() => setIsAddModalOpen(true)}>
        <Plus color='#4E4EF8' />
        <span>Adicionar novo endereço</span>
      </button>

      <AddressList addresses={addresses} onEdit={openEditModal} onDelete={handleDeleteAddress} />

      <AddAddressModal
        isOpen={isAddModalOpen}
        onRequestClose={() => setIsAddModalOpen(false)}
        onSave={handleAddAddress}
      />

      <EditAddressModal
        isOpen={isEditModalOpen}
        onRequestClose={() => setIsEditModalOpen(false)}
        addressToEdit={addressToEdit}
        onSave={handleEditAddress}
      />
    </div>
  );
};

export default Home;