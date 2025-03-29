"use client";
import { useSession } from 'next-auth/react';
import React from 'react';
import { FaUser, FaUsers, FaBox, FaEdit, FaFileInvoice, FaEnvelope, FaChartBar } from 'react-icons/fa';
import { FaBuildingUser } from 'react-icons/fa6';
import { IoMenu } from 'react-icons/io5';

export default function ProfilePage() {
    const { data: session } = useSession();

    if (!session) {
        return <div>Lütfen giriş yapınız</div>;
    }

    return (
    <div className="bg-primary-gray min-h-screen pb-20">

      <div className="flex justify-around items-center p-4">
        <div className="flex flex-col items-center gap-x-2">
          <div className='flex items-center gap-x-2'>
          <FaUser className="text-primary-orange text-xl" />
          <span className="text-base text-primary-orange">Profile</span>
          </div>
          <div className='h-[1.7px] bg-primary-orange w-full rounded-3xl mt-1'>
          </div>
        </div>

        <div className="flex flex-col items-center gap-x-2">
          <div className='flex items-center gap-x-2'>
          <FaUsers className="text-gray-600 text-xl" />
          <span className="text-base text-gray-600">Users</span>
          </div>
          <div className='h-[1.7px] bg-gray-600 w-full rounded-3xl mt-1'>
          </div>
        </div>

        <div className="flex flex-col items-center gap-x-2">
          <div className='flex items-center gap-x-2'>
          <FaBox className="text-gray-600 text-xl" />
          <span className="text-base text-gray-600">Products</span>
          </div>
          <div className='h-[1.7px] bg-gray-600 w-full rounded-3xl mt-1'>
          </div>
        </div>

        <div className="flex flex-col items-center gap-x-2">
          <div className='flex items-center gap-x-2'>
          <FaBuildingUser className="text-gray-600 text-xl" />
          <span className="text-base text-gray-600">Seller</span>
          </div>
          <div className='h-[1.7px] bg-gray-600 w-full rounded-3xl mt-1'>
          </div>
        </div>

      </div>

      <div className="px-4 py-6">
        <div className="bg-white rounded-lg p-4 mb-4 shadow-sm">
          <div className="flex justify-between items-center mb-2">
            <h2 className="font-semibold">Company details</h2>
            <FaEdit className="text-gray-400" />
          </div>
          <div className="space-y-2 text-sm">
            <p><span className="text-gray-500">Operator ID:</span> 273423234</p>
            <p><span className="text-gray-500">Company Number:</span> 4535356556456</p>
            <p><span className="text-gray-500">Legal Name:</span> Kamil Koç co.ltd</p>
            <p><span className="text-gray-500">TAT Number:</span> 23/456536</p>
            <p><span className="text-gray-500">VAT Number:</span> 34636363636363</p>
            <p><span className="text-gray-500">Address:</span> atatürk bulvarı, 1234 sokak ayden apartmanı no:23 gayrettepe istanbul</p>
          </div>
        </div>

        <div className="bg-white rounded-lg p-4 mb-4 shadow-sm">
          <div className="flex justify-between items-center mb-2">
            <h2 className="font-semibold">Bank Details</h2>
            <FaEdit className="text-gray-400" />
          </div>
          <div className="space-y-2 text-sm">
            <p><span className="text-gray-500">Account Type:</span> Bireysel/şahıs hesabı</p>
            <p><span className="text-gray-500">Bank Name:</span> Kasikorn Bankası</p>
            <p><span className="text-gray-500">Account Name:</span> Hakan Kızılkaya</p>
            <p><span className="text-gray-500">Account Number:</span> 365636356 </p>
          </div>
        </div>

        <div className="bg-white rounded-lg p-4 mb-4 shadow-sm">
          <div className="flex justify-between items-center mb-2">
            <h2 className="font-semibold">Contact details</h2>
            <FaEdit className="text-gray-400" />
          </div>
          <div className="space-y-2 text-sm">
            <p><span className="text-gray-500">Company Owner Name:</span> Hakan Kizilkaya</p>
            <p><span className="text-gray-500">Phone number:</span> +4567897755</p>
            <p><span className="text-gray-500">Office phone number:</span> +658578578558</p>
          </div>
        </div>

        <div className="bg-white rounded-lg p-4 mb-4 shadow-sm">
          <div className="flex justify-between items-center mb-2">
            <h2 className="font-semibold">Settings</h2>
            <FaEdit className="text-gray-400" />
          </div>
          <div className="space-y-2 text-sm">
            <p><span className="text-gray-500">Change password:</span>^^^^^^^^^^^^</p>
            <p><span className="text-gray-500">Change mail:</span> Hakankizi^^^^^^^@gmail.com</p>
          </div>
        </div>

        <button className="w-full bg-orange-500 text-white py-3 rounded-lg">
          Log out
        </button>
      </div>

      <div className="fixed bottom-0 left-0 right-0 bg-white border-t flex justify-around items-center py-2">
        <div className="flex flex-col items-center">
          <IoMenu className="text-gray-400 text-xl" />
          <span className="text-xs mt-1">Bookings</span>
        </div>
        <div className="flex flex-col items-center">
          <FaFileInvoice className="text-gray-400 text-xl" />
          <span className="text-xs mt-1">Invoice</span>
        </div>
        <div className="flex flex-col items-center">
          <FaEnvelope className="text-gray-400 text-xl" />
          <span className="text-xs mt-1">Messages</span>
        </div>
        <div className="flex flex-col items-center">
          <FaChartBar className="text-gray-400 text-xl" />
          <span className="text-xs mt-1">Report</span>
        </div>
        <div className="flex flex-col items-center">
          <FaUser className="text-orange-500 text-xl" />
          <span className="text-xs mt-1">Profile</span>
        </div>
      </div>
    </div>
  );
}