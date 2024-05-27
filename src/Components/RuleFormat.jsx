import React, { useState } from 'react';
import './RuleFormat.css';  // Import the CSS file

const RuleFormat = ({ onAgeLimitChange }) => {
  const [rules, setRules] = useState({
    maxAge: 22,
    maxForeignPlayers: 3,
    winPoints: 3,
    drawPoints: 1,
    losePoints: 0,
  });

  const [newValues, setNewValues] = useState({
    maxAge: '',
    maxForeignPlayers: '',
    winPoints: '',
    drawPoints: '',
    losePoints: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewValues({
      ...newValues,
      [name]: value,
    });
  };

  const handleConfirm = (rule) => {
    const newValue = newValues[rule] !== '' ? parseInt(newValues[rule], 10) : rules[rule];
    console.log(`Quy định mới cho ${rule}: ${newValue}`);
    setRules({
      ...rules,
      [rule]: newValue,
    });
    setNewValues({
      ...newValues,
      [rule]: '',
    });

    if (rule === 'maxAge') {
      onAgeLimitChange(newValue);
    }
  };

  return (
    <div className="container">
      <div className="rule-item">
        <label>Thay đổi tuổi tối đa của cầu thủ</label>
        <div className="rule-row">
          <span>Quy định hiện hành: {rules.maxAge}</span>
          <span className="arrow">→</span>
          <input
            type="text"
            placeholder="Nhập quy định mới"
            name="maxAge"
            value={newValues.maxAge}
            onChange={handleChange}
            className="p-2 flex-1 border border-gray-300 rounded"
          />
          <button onClick={() => handleConfirm('maxAge')} className="confirm-btn" style={{padding:'8px'}}>
            Xác nhận
          </button>
        </div>
      </div>
      <div className="rule-item">
        <label>Thay đổi số cầu thủ nước ngoài tối đa</label>
        <div className="rule-row">
          <span>Quy định hiện hành: {rules.maxForeignPlayers}</span>
          <span className="arrow">→</span>
          <input
            type="text"
            placeholder="Nhập quy định mới"
            name="maxForeignPlayers"
            value={newValues.maxForeignPlayers}
            onChange={handleChange}
            className="p-2 flex-1 border border-gray-300 rounded"
          />
          <button onClick={() => handleConfirm('maxForeignPlayers')} className="confirm-btn">
            Xác nhận
          </button>
        </div>
      </div>
      <div className="rule-item">
        <label>Thay đổi số điểm trận thắng</label>
        <div className="rule-row">
          <span>Quy định hiện hành: {rules.winPoints}</span>
          <span className="arrow">→</span>
          <input
            type="text"
            placeholder="Nhập quy định mới"
            name="winPoints"
            value={newValues.winPoints}
            onChange={handleChange}
            className="p-2 flex-1 border border-gray-300 rounded"
          />
          <button onClick={() => handleConfirm('winPoints')} className="confirm-btn">
            Xác nhận
          </button>
        </div>
      </div>
      <div className="rule-item">
        <label>Thay đổi số điểm trận hòa</label>
        <div className="rule-row">
          <span>Quy định hiện hành: {rules.drawPoints}</span>
          <span className="arrow">→</span>
          <input
            type="text"
            placeholder="Nhập quy định mới"
            name="drawPoints"
            value={newValues.drawPoints}
            onChange={handleChange}
            className="p-2 flex-1 border border-gray-300 rounded"
          />
          <button onClick={() => handleConfirm('drawPoints')} className="confirm-btn">
            Xác nhận
          </button>
        </div>
      </div>
      <div className="rule-item">
        <label>Thay đổi số điểm trận thua</label>
        <div className="rule-row">
          <span>Quy định hiện hành: {rules.losePoints}</span>
          <span className="arrow">→</span>
          <input
            type="text"
            placeholder="Nhập quy định mới"
            name="losePoints"
            value={newValues.losePoints}
            onChange={handleChange}
            className="p-2 flex-1 border border-gray-300 rounded"
          />
          <button onClick={() => handleConfirm('losePoints')} className="confirm-btn">
            Xác nhận
          </button>
        </div>
      </div>
    </div>
  );
};

export default RuleFormat;
