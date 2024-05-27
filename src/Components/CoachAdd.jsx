import React, { useState } from 'react';
import './CoachAdd.css';

const CoachAdd = () => {
  const [formData, setFormData] = useState({
    nameCoach: '',
    birthDay: '',
    nationality: '',
    role: '',
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
    // Trim whitespace from all form data fields before validation
    const trimmedFormData = {};
    for (const key in formData) {
      trimmedFormData[key] = formData[key].trim();
    }

    // Check if any field is empty after trimming
    if (Object.values(trimmedFormData).every(value => value !== '')) {
      setEntries([...entries, { ...trimmedFormData, id: Date.now() }]);
      setFormData({
        nameCoach: '',
        birthDay: '',
        nationality: '',
        role: '',
      });
      setError('');
      // Alert for successful addition
      alert("Huấn luyện viên đã được thêm thành công!");
    } else {
      alert("Vui lòng điền đầy đủ thông tin huấn luyện viên.");
    }
  };

  const handleEdit = (id) => {
    setIsEditing(id);
  };

  const handleSave = (id) => {
    setIsEditing(null);
    const updatedEntry = entries.find(entry => entry.id === id);
    console.log(updatedEntry);
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
    <div className="coach-add">
      <div className="form-group">
        <label>Tên Huấn luyện viên:</label>
        <input
          type="text"
          name="nameCoach"
          placeholder="Nhập tên huấn luyện viên"
          value={formData.nameCoach}
          onChange={handleChange}
        />
      </div>
      <div className="form-group">
        <label>Ngày sinh:</label>
        <input
          type="date"
          name="birthDay"
          value={formData.birthDay}
          onChange={handleChange}
        />
      </div>
      <div className="form-group">
        <label>Quốc tịch:</label>
        <input
          type="text"
          name="nationality"
          placeholder="Nhập quốc tịch"
          value={formData.nationality}
          onChange={handleChange}
        />
      </div>
      <div className="form-group">
        <label>Vai trò:</label>
        <select
          name="role"
          value={formData.role}
          onChange={handleChange}
        >
          <option value="huấn luyện viên trưởng">Huấn luyện viên trưởng</option>
          <option value="trợ lý huấn luyện viên">Trợ lý huấn luyện viên</option>
          <option value="huấn luyện viên thể lực">Huấn luyện viên thể lực</option>
          <option value="chuyên gia dinh dưỡng">Chuyên gia dinh dưỡng</option>
        </select>
      </div>
      {error && <div className="error-message">{error}</div>}
      <div className="buttons">
        <button onClick={handleConfirm}>Xác nhận</button>
      </div>
      
      {entries.length > 0 && (
        <table className="entries-table">
          <thead>
            <tr>
              <th>Tên Huấn luyện viên</th>
              <th>Ngày sinh</th>
              <th>Quốc tịch</th>
              <th>Vai trò</th>
              <th>Option</th>
            </tr>
          </thead>
          <tbody>
            {entries.map((entry) => (
              <tr key={entry.id}>
                <td>
                  {isEditing === entry.id ? (
                    <input
                      type="text"
                      name="nameCoach"
                      value={entry.nameCoach}
                      onChange={(e) => handleEntryChange(e, entry.id)}
                    />
                  ) : (
                    entry.nameCoach
                  )}
                </td>
                <td>
                  {isEditing === entry.id ? (
                    <input
                      type="date"
                      name="birthDay"
                      value={entry.birthDay}
                      onChange={(e) => handleEntryChange(e, entry.id)}
                    />
                  ) : (
                    entry.birthDay
                  )}
                </td>
                <td>
                  {isEditing === entry.id ? (
                    <input
                      type="text"
                      name="nationality"
                      value={entry.nationality}
                      onChange={(e) => handleEntryChange(e, entry.id)}
                    />
                  ) : (
                    entry.nationality
                  )}
                </td>
                <td>
                  {isEditing === entry.id ? (
                    <select
                      name="role"
                      value={entry.role}
                      onChange={(e) => handleEntryChange(e, entry.id)}
                    >
                      <option value="">Chọn vai trò</option>
                      <option value="huấn luyện viên trưởng">Huấn luyện viên trưởng</option>
                      <option value="trợ lý huấn luyện viên">Trợ lý huấn luyện viên</option>
                      <option value="huấn luyện viên thể lực">Huấn luyện viên thể lực</option>
                      <option value="chuyên gia dinh dưỡng">Chuyên gia dinh dưỡng</option>
                    </select>
                  ) : (
                    entry.role
                  )}
                </td>
                <td>
                  {isEditing === entry.id ? (
                    <>
                      <button className="save-button" onClick={() => handleSave(entry.id)}>Lưu</button>
                      <button className="cancel-button" onClick={() => setIsEditing(null)}>Hủy</button>
                    </>
                  ) : (
                    <>
                      <button className="edit-button" onClick={() => handleEdit(entry.id)}>Sửa</button>
                      <button className="delete-button" onClick={() => handleDelete(entry.id)}>Xóa</button>
                    </>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default CoachAdd;
