import React, { useState } from 'react';
import { createEmployee } from '../../services/employeeService';
import { UserPlus } from 'lucide-react';
import toast from 'react-hot-toast';

export default function AddEmployee() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    employeeCode: '',
    password: ''
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await createEmployee(formData);
      toast.success('Employee added successfully');
      setFormData({ name: '', email: '', employeeCode: '', password: '' });
    } catch (error) {
      toast.error('Failed to add employee');
    }
  };

  return (
    <div className="card">
      <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
        <UserPlus /> Add New Employee
      </h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block font-bold mb-2">Name</label>
          <input
            type="text"
            className="input"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            required
          />
        </div>
        <div>
          <label className="block font-bold mb-2">Email</label>
          <input
            type="email"
            className="input"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            required
          />
        </div>
        <div>
          <label className="block font-bold mb-2">Employee Code</label>
          <input
            type="text"
            className="input"
            value={formData.employeeCode}
            onChange={(e) => setFormData({ ...formData, employeeCode: e.target.value })}
            required
          />
        </div>
        <div>
          <label className="block font-bold mb-2">Password</label>
          <input
            type="password"
            className="input"
            value={formData.password}
            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
            required
          />
        </div>
        <button type="submit" className="btn-primary w-full">
          Add Employee
        </button>
      </form>
    </div>
  );
}