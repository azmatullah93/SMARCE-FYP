// import React from 'react'
import QRCode from 'qrcode.react'
import { useRef } from 'react'

const QrCode = ({ value }) => {
  const qrRef = useRef()

  const handleDownload = () => {
    const canvas = qrRef.current.querySelector('canvas')
    const url = canvas.toDataURL('image/png')
    const a = document.createElement('a')
    a.href = url
    a.download = 'qrcode.png'
    a.click()
  }

  return (
    <>
      <div className='ml-515 mb-4' ref={qrRef}>
        <QRCode value={value} />
      </div>

      <button
        className='bg-pink-400 p-4 rounded-lg mb-4 ml-500  '
        type='button'
        onClick={handleDownload}
      >
        Download QRCode
      </button>
    </>
  )
}

export default QrCode
