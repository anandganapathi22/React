import React, { useState, useEffect } from "react";
import axios from "axios";
import { Button, Input, Card, CardContent } from "./components/ui";

const EmployeePage = () => {
  const [employees, setEmployees] = useState([]);
  const [name, setName] = useState("");
  const [position, setPosition] = useState("");
  const [editingId, setEditingId] = useState(null);

  useEffect(() => {
    fetchEmployees();
  }, []);

  const fetchEmployees = async () => {
    const response = await axios.get("/api/employees");
    setEmployees(response.data);
  };

  const addEmployee = async () => {
    const response = await axios.post("/api/employees", { name, position });
    setEmployees([...employees, response.data]);
    setName("");
    setPosition("");
  };

  const updateEmployee = async (id) => {
    await axios.put(`/api/employees/${id}`, { name, position });
    fetchEmployees();
    setEditingId(null);
    setName("");
    setPosition("");
  };

  const deleteEmployee = async (id) => {
    await axios.delete(`/api/employees/${id}`);
    fetchEmployees();
  };

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold">Employee Management</h2>
      <div className="flex gap-2 my-4">
        <Input value={name} onChange={(e) => setName(e.target.value)} placeholder="Name" />
        <Input value={position} onChange={(e) => setPosition(e.target.value)} placeholder="Position" />
        <Button onClick={editingId ? () => updateEmployee(editingId) : addEmployee}>
          {editingId ? "Update" : "Add"}
        </Button>
      </div>
      <div className="grid gap-2">
        {employees.map((employee) => (
          <Card key={employee.id} className="p-2 flex justify-between items-center">
            <CardContent>
              <p>{employee.name} - {employee.position}</p>
            </CardContent>
            <div>
              <Button onClick={() => { setEditingId(employee.id); setName(employee.name); setPosition(employee.position); }}>
                Edit
              </Button>
              <Button onClick={() => deleteEmployee(employee.id)} className="ml-2 bg-red-500">
                Delete
              </Button>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default EmployeePage;