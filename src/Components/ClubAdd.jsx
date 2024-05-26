import React, { useState } from 'react';
import './ClubAdd.css';

const ClubAdd = () => {
  const [formData, setFormData] = useState({
    nameClub: '',
    nameCoach: '',
    shorthand: '',
    nameStadium: '',
    season: '',
  });

  const [entries, setEntries] = useState([]);
  const [isEditing, setIsEditing] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleConfirm = () => {
    if (formData.nameClub && formData.nameCoach && formData.shorthand && formData.nameStadium && formData.season) {
      setEntries([...entries, { ...formData, id: Date.now() }]);
      console.log({
        ...formData,
        achievement: '',
        updateBy: '',
        ownerBy: '',
        updateAt: '',
      });
      setFormData({
        nameClub: '',
        nameCoach: '',
        shorthand: '',
        nameStadium: '',
        season: '',
      });
    } else {
      alert("Please fill in all fields");
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
    <div className="club-add">
      <div className="form-group">
        <label>Tên đội:</label>
        <input
          type="text"
          name="nameClub"
          placeholder="Nhập tên đội"
          value={formData.nameClub}
          onChange={handleChange}
        />
      </div>
      <div className="form-group">
        <label>Huấn luyện viên:</label>
        <input
          type="text"
          name="nameCoach"
          placeholder="Nhập tên huấn luyện viên"
          value={formData.nameCoach}
          onChange={handleChange}
        />
      </div>
      <div className="form-group">
        <label>Tên viết tắt đội bóng:</label>
        <input
          type="text"
          name="shorthand"
          placeholder="Nhập tên viết tắt đội bóng"
          value={formData.shorthand}
          onChange={handleChange}
        />
      </div>
      <div className="form-group">
        <label>Sân nhà:</label>
        <input
          type="text"
          name="nameStadium"
          placeholder="Nhập sân nhà"
          value={formData.nameStadium}
          onChange={handleChange}
        />
      </div>
      <div className="form-group">
        <label>Chọn mùa giải:</label>
        <select name="season" value={formData.season} onChange={handleChange}>
          <option value="">Chọn mùa giải</option>
          <option value="2022-2023">2022-2023</option>
          <option value="2023-2024">2023-2024</option>
          <option value="2024-2025">2024-2025</option>
        </select>
      </div>
      <div className="buttons">
        <button onClick={handleConfirm}>Xác nhận</button>
      </div>
      
      {entries.length > 0 && (
        <table className="entries-table">
          <thead>
            <tr>
              <th>Tên đội</th>
              <th>Huấn luyện viên</th>
              <th>Tên viết tắt</th>
              <th>Sân nhà</th>
              <th>Mùa giải</th>
              <th>Option</th>
            </tr>
          </thead>
          <tbody>
            {entries.map((entry, index) => (
              <tr key={entry.id}>
                <td>
                  {isEditing === entry.id ? (
                    <input
                      type="text"
                      name="nameClub"
                      value={entry.nameClub}
                      onChange={(e) => handleEntryChange(e, entry.id)}
                    />
                  ) : (
                    entry.nameClub
                  )}
                </td>
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
                      type="text"
                      name="shorthand"
                      value={entry.shorthand}
                      onChange={(e) => handleEntryChange(e, entry.id)}
                    />
                  ) : (
                    entry.shorthand
                  )}
                </td>
                <td>
                  {isEditing === entry.id ? (
                    <input
                      type="text"
                      name="nameStadium"
                      value={entry.nameStadium}
                      onChange={(e) => handleEntryChange(e, entry.id)}
                    />
                  ) : (
                    entry.nameStadium
                  )}
                </td>
                <td>
                  {isEditing === entry.id ? (
                    <select
                      name="season"
                      value={entry.season}
                      onChange={(e) => handleEntryChange(e, entry.id)}
                    >
                      <option value="">Chọn mùa giải</option>
                      <option value="2022-2023">2022-2023</option>
                      <option value="2023-2024">2023-2024</option>
                      <option value="2024-2025">2024-2025</option>
                    </select>
                  ) : (
                    entry.season
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

export default ClubAdd;
