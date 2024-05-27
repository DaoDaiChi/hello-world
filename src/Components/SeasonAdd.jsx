import React, { useState } from "react";
import './SeasonAdd.css';

const SeasonAdd = () => {
    const [formData, setFormData] = useState({
        nameCoach: '',
        Year: '',
    });
    const [entries, setEntries] = useState([]);
    const [isEditing, setIsEditing] = useState(null);
    const [error, setError] = useState('');

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleConfirm = () => {
        const trimmedFormData = {};
        for (const key in formData) {
            trimmedFormData[key] = formData[key].trim();
        }
        if (Object.values(trimmedFormData).every(value => value !== '')) {
            setEntries([...entries, { ...trimmedFormData, id: Date.now() }]);
            setFormData({
                nameCoach: '',
                Year: '',
            });
            setError('');
            alert("Mùa giải đã được thêm thành công!");
        } else {
            setError("Vui lòng điền đầy đủ thông tin mùa giải.");
        }
    };

    const handleEdit = (id) => {
        setIsEditing(id);
    };

    const handleSave = (id) => {
        setIsEditing(null);
        // Assuming updatedEntry logic is handled elsewhere
    };

    const handleDelete = (id) => {
        setEntries(entries.filter(entry => entry.id !== id));
    };

    const handleEntryChange = (e, id) => {
        const { name, value } = e.target;
        const updatedEntries = entries.map((entry) =>
            entry.id === id ? { ...entry, [name]: value } : entry
        );
        setEntries(updatedEntries);
    };

    return (
        <div className="season-add">
            <div className="title-form">
                <label>Thêm tên mùa giải</label>
                <input
                    type="text"
                    name="nameCoach"
                    placeholder="Nhập tên mùa giải"
                    value={formData.nameCoach}
                    onChange={handleChange}
                />
            </div>
            <div className="title-form">
                <label>Thêm năm</label>
                <input
                    type="text"
                    name="Year"
                    value={formData.Year}
                    onChange={handleChange}
                    placeholder="Nhập năm mùa giải"
                />
            </div>
            <div className="buttons">
                <button onClick={handleConfirm}>Xác nhận</button>
            </div>
            {error && <div className="error">{error}</div>}
            <table className="entries-table">
                <thead>
                    <tr>
                        <th>Tên mùa giải</th>
                        <th>Năm</th>
                        <th>Option</th>
                    </tr>
                </thead>
                <tbody>
                    {entries.map((entry) => (
                        <tr key={entry.id}>
                            <td>
                                <input
                                    type="text"
                                    name="nameCoach"
                                    value={entry.nameCoach}
                                    onChange={(e) => handleEntryChange(e, entry.id)}
                                    disabled={isEditing !== entry.id}
                                />
                            </td>
                            <td>
                                <input
                                    type="text"
                                    name="Year"
                                    value={entry.Year}
                                    onChange={(e) => handleEntryChange(e, entry.id)}
                                    disabled={isEditing !== entry.id}
                                />
                            </td>
                            <td>
                                {isEditing === entry.id ? (
                                    <>
                                        <button className="save-button" onClick={() => handleSave(entry.id)}>Lưu</button>
                                        <button className="cancel-button" onClick={() => setIsEditing(null)}>Hủy</button>
                                    </>
                                ) : (
                                    <button className="edit-button" onClick={() => handleEdit(entry.id)}>Sửa</button>
                                )}
                                <button className="delete-button" onClick={() => handleDelete(entry.id)}>Xóa</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default SeasonAdd;
