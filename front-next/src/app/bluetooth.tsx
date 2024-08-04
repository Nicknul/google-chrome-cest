'use client';

import { useState } from 'react';

const BluetoothComponent = () => {
  const [device, setDevice] = useState<BluetoothDevice | null>(null);

  const connectBluetooth = async () => {
    try {
      const device = await navigator.bluetooth.requestDevice({
        acceptAllDevices: true,
        optionalServices: ['battery_service'],
      });
      setDevice(device);
    } catch (error) {
      console.error('Bluetooth connection failed', error);
      alert('Bluetooth connection failed. Please check your permissions and try again.');
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-blue-100">
      <button onClick={connectBluetooth} className="bg-blue-500 text-white p-4 rounded-lg text-xl">
        Connect to Bluetooth
      </button>
      {device && <p className="mt-4 text-lg">Connected to: {device.name}</p>}
    </div>
  );
};

export default BluetoothComponent;
