import React, { useState } from 'react';
import './App.css';
import Modal from 'react-modal'; // Import the modal library

const App = () => {
  // State variables
  const [text, setText] = useState('');
  const [search, setSearch] = useState('');
  const [replace, setReplace] = useState('');
  const [replacedText, setReplacedText] = useState('');
  const [darkMode, setDarkMode] = useState(false);
  const [isClearModalOpen, setIsClearModalOpen] = useState(false); // State for clear confirmation modal
  const [isErrorModalOpen, setIsErrorModalOpen] = useState(false); // State for error modal
  const [errorMessage, setErrorMessage] = useState(''); // State for the error message

  // Handle text input change
  const handleTextChange = (e) => {
    setText(e.target.value);
    setReplacedText(''); // Clear highlighted text when user types
  };

  // Replace strings case-insensitively
  const handleReplaceAll = () => {
    if (!search || !replace) {
      setErrorMessage('Please enter both search and replace values.');
      setIsErrorModalOpen(true); // Open error modal
      return;
    }

    // Check if the search text and replace text are the same
    if (search.toLowerCase() === replace.toLowerCase()) {
      setErrorMessage('Search text and replace text cannot be the same.');
      setIsErrorModalOpen(true); // Open error modal
      return;
    }

    // Check if the search string exists in the text
    if (!text.toLowerCase().includes(search.toLowerCase())) {
      setErrorMessage(`The text does not contain "${search}".`);
      setIsErrorModalOpen(true); // Open error modal
      return;
    }

    const regExp = new RegExp(search, 'gi'); // Create case-insensitive regex
    const updatedText = text.replace(regExp, replace);
    setText(updatedText);
    setReplacedText(updatedText); // Show replaced text directly
  };

  // Open confirmation modal for clear action
  const handleClearClick = () => {
    setIsClearModalOpen(true);
  };

  // Confirm clear action
  const confirmClear = () => {
    setText('');
    setReplacedText('');
    setSearch('');
    setReplace('');
    setIsClearModalOpen(false);
  };

  // Cancel clear action
  const cancelClear = () => {
    setIsClearModalOpen(false);
  };

  // Toggle Dark Mode
  const toggleDarkMode = () => {
    setDarkMode((prevMode) => !prevMode);
  };

  // Close error modal
  const closeErrorModal = () => {
    setIsErrorModalOpen(false);
  };

  return (
    <div className={`app-container ${darkMode ? 'dark-mode' : 'light-mode'}`}>
      <h1>Text Statistics App</h1>
      <div className="dark-mode-toggle">
        <label className="switch">
          <input type="checkbox" checked={darkMode} onChange={toggleDarkMode} />
          <span className="slider round"></span>
        </label>
        <span>{darkMode ? 'Dark Mode' : 'Light Mode'}</span>
      </div>

      <textarea
        className="text-area"
        placeholder="Type your text here..."
        value={text}
        onChange={handleTextChange}
        rows="10"
      ></textarea>

      <div className="string-replacement">
        <h3>String Replacement</h3>
        <input
          className="input-box"
          type="text"
          placeholder="Search"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <input
          className="input-box"
          type="text"
          placeholder="Replace"
          value={replace}
          onChange={(e) => setReplace(e.target.value)}
        />
        <button className="button replace-btn" onClick={handleReplaceAll}>
          Replace All
        </button>
        <button className="button clear-btn" onClick={handleClearClick}>Clear</button>

        <div className="highlighted-text">
          <h4>Replaced Text:</h4>
          <p>{replacedText || text}</p>
        </div>
      </div>

      {/* Confirmation Modal for Clear Action */}
      <Modal isOpen={isClearModalOpen} onRequestClose={cancelClear} contentLabel="Clear Confirmation">
        <h3>Confirm Clear</h3>
        <p>Clear all fields?</p>
        <button onClick={confirmClear}>Yes</button>
        <button onClick={cancelClear}>No</button>
      </Modal>

      {/* Error Modal */}
      <Modal isOpen={isErrorModalOpen} onRequestClose={closeErrorModal} contentLabel="Error">
        <h3>Error</h3>
        <p>{errorMessage}</p>
        <button onClick={closeErrorModal}>Close</button>
      </Modal>
    </div>
  );
}

// Set the app element for accessibility
Modal.setAppElement('#root');

export default App;
