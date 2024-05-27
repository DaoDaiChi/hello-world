import React, { useState } from 'react';
import './PlayerAdd.css';

const PlayerAdd = ({ ageLimit }) => {
  const [formData, setFormData] = useState({
    clubName: '',
    seaSon: '',
    typePlayer: '',
    height: '',
    weight: '',
    position: '',
    nationality: '',
    kit: '',
    achievement: '',
    name: '',
    birthDay: '',
    status: ''
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

  const calculateAge = (birthDate) => {
    const today = new Date();
    const birthDateObj = new Date(birthDate);
    let age = today.getFullYear() - birthDateObj.getFullYear();
    const monthDiff = today.getMonth() - birthDateObj.getMonth();
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDateObj.getDate())) {
      age--;
    }
    return age;
  };

  const handleConfirm = () => {
    const age = calculateAge(formData.birthDay);
    if (age < ageLimit) {
      setError(`Độ tuổi giới hạn là ${ageLimit} tuổi.`);
      return;
    }
  
    // Trim whitespace from all form data fields before validation
    const trimmedFormData = {};
    for (const key in formData) {
      trimmedFormData[key] = formData[key].trim();
    }
  
    // Check if any field is empty after trimming
    if (Object.values(trimmedFormData).every(value => value !== '')) {
      setEntries([...entries, { ...trimmedFormData, id: Date.now() }]);
      setFormData({
        clubName: '',
        seaSon: '',
        typePlayer: '',
        height: '',
        weight: '',
        position: '',
        nationality: '',
        kit: '',
        achievement: '',
        name: '',
        birthDay: '',
        status: ''
      });
      setError('');
      // Alert for successful addition
      alert("Cầu thủ đã được thêm thành công!");
    } else {
      alert("Vui lòng điền đầy đủ thông tin cầu thủ.");
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
    <div className="player-add">
      <div className="form-group">
        <label>Tên câu lạc bộ:</label>
        <input
          type="text"
          name="clubName"
          placeholder="Nhập tên câu lạc bộ"
          value={formData.clubName}
          onChange={handleChange}
        />
      </div>
      <div className="form-group">
        <label>Mùa giải:</label>
        <select name="seaSon" value={formData.seaSon} onChange={handleChange}>
          <option value="">Chọn mùa giải</option>
          <option value="2022-2023">2022-2023</option>
          <option value="2023-2024">2023-2024</option>
          <option value="2024-2025">2024-2025</option>
        </select>
      </div>
      <div className="form-group">
        <label>Loại cầu thủ:</label>
        <input
          type="text"
          name="typePlayer"
          placeholder="Nhập loại cầu thủ"
          value={formData.typePlayer}
          onChange={handleChange}
        />
      </div>
      <div className="form-group">
        <label>Chiều cao (cm):</label>
        <input
          type="number"
          name="height"
          placeholder="Nhập chiều cao"
          value={formData.height}
          onChange={handleChange}
        />
      </div>
      <div className="form-group">
        <label>Cân nặng (kg):</label>
        <input
          type="number"
          name="weight"
          placeholder="Nhập cân nặng"
          value={formData.weight}
          onChange={handleChange}
        />
      </div>
      <div className="form-group">
        <label>Vị trí:</label>
        <input
          type="text"
          name="position"
          placeholder="Nhập vị trí"
          value={formData.position}
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
        <label>Số áo:</label>
        <input
          type="number"
          name="kit"
          placeholder="Nhập số áo"
          value={formData.kit}
          onChange={handleChange}
        />
      </div>
      <div className="form-group">
        <label>Thành tích:</label>
        <input
          type="text"
          name="achievement"
          placeholder="Nhập thành tích"
          value={formData.achievement}
          onChange={handleChange}
        />
      </div>
      <div className="form-group">
        <label>Tên cầu thủ:</label>
        <input
          type="text"
          name="name"
          placeholder="Nhập tên cầu thủ"
          value={formData.name}
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
        <label>Trạng thái:</label>
        <select name="status" value={formData.status} onChange={handleChange}>
          <option value="">Chọn trạng thái</option>
          <option value="Đang thi đấu">Đang thi đấu</option>
          <option value="Chấn thương">Chấn thương</option>
          <option value="Đã giải nghệ">Đã giải nghệ</option>
        </select>
      </div>
      {error && <div className="error-message">{error}</div>}
      <div className="buttons">
        <button onClick={handleConfirm}>Xác nhận</button>
      </div>

      <div className="entry-list">
        <h3>Danh sách cầu thủ:</h3>
        {entries.map((entry) => (
          <div key={entry.id} className="entry-item">
            {isEditing === entry.id ? (
              <div>
                <input
                  type="text"
                  name="name"
                  value={entry.name}
                  onChange={(e) => handleEntryChange(e, entry.id)}
                />
                <input
                  type="date"
                  name="birthDay"
                  value={entry.birthDay}
                  onChange={(e) => handleEntryChange(e, entry.id)}
                />
                {/* Thêm các trường nhập khác nếu cần */}
                <button onClick={() => handleSave(entry.id)}>Lưu</button>
              </div>
            ) : (
              <div>
                <span>Tên: {entry.name}</span>
                <span>Ngày sinh: {entry.birthDay}</span>
                {/* Hiển thị các thông tin khác nếu cần */}
                <button onClick={() => handleEdit(entry.id)}>Chỉnh sửa</button>
                <button onClick={() => handleDelete(entry.id)}>Xóa</button>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default PlayerAdd;
