
import React from 'react';
import QRCode from 'qrcode.react';

function QRCodeGenerator({ book }) {
  const bookUrl = `${window.location.origin}/books/${book.id}`;
  
  return (
    <div className="qrcode-container">
      <h3>QR Code for {book.name}</h3>
      <div className="qrcode">
        <QRCode 
          value={bookUrl} 
          size={200}
          level="H"
          includeMargin={true}
          renderAs="svg"
        />
      </div>
      <p>Scan this code to view book details</p>
      <button 
        className="btn btn-primary"
        onClick={() => {
          const canvas = document.querySelector('.qrcode canvas');
          const image = canvas.toDataURL('image/png');
          const link = document.createElement('a');
          link.href = image;
          link.download = `${book.name}-qrcode.png`;
          link.click();
        }}
      >
        Download
      </button>
    </div>
  );
}

export default QRCodeGenerator;