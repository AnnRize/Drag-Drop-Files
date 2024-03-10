import { DragEventHandler, MouseEventHandler, useState } from "react";
import "./App.css";

function App() {
  const [drag, setDrag] = useState(false);
  const [files, setFiles] = useState<File[]>([]);

  const onDragOver: DragEventHandler = (e) => {
    e.preventDefault();
    setDrag(true);
  };

  const onDragLeave: DragEventHandler = (e) => {
    e.preventDefault();
    setDrag(false);
  };

  const onDrop: DragEventHandler = (e) => {
    e.preventDefault();

    setFiles([...files, ...e.dataTransfer.files]);

    if (files) {
      const formData = new FormData();
      files.forEach((file, i) => formData.append(`file_${i}`, file));
    }

    setDrag(false);
  };

  const clearFiles: MouseEventHandler = () => {
    setFiles([]);
  };

  return (
    <>
      <div className={`drag-area ${drag && "dragged"}`}>
        {drag ? (
          <div
            className="drag-text"
            onDragLeave={onDragLeave}
            onDragOver={onDragOver}
            onDrop={onDrop}
          >
            Опустите файл
          </div>
        ) : (
          <div
            className="drag-text "
            onDragLeave={onDragLeave}
            onDragOver={onDragOver}
          >
            Перетащите файл сюда
          </div>
        )}
      </div>
      {files.length > 0 && <button onClick={clearFiles}>Очистить</button>}

      <div className="files">
        {files &&
          files.map((file, i) => (
            <div className="file" key={i}>
              <div>{file.name}</div>
              <div>{file.type}</div>
              <div>{file.size}</div>
            </div>
          ))}
      </div>
    </>
  );
}

export default App;
