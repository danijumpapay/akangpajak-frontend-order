import { useState } from 'react';
import { useOrderStore } from '../../../store/useOrderStore';
import { ChevronRight } from 'lucide-react';

export const TrackingPage = () => {
  const { setView, resetOrder } = useOrderStore();
  const [orderNumber, setOrderNumber] = useState('');
  const [status, setStatus] = useState<'idle' | 'found' | 'not-found'>('idle');

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!orderNumber) return;

    if (orderNumber === '12345') {
      setStatus('found');
    } else {
      setStatus('not-found');
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-4 md:py-8 space-y-6">
      <div className="flex items-center gap-2 text-xs font-medium mb-2 font-inter">
        <button onClick={() => resetOrder()} className="text-gray-400 hover:text-jumpapay-blue cursor-pointer">Order</button>
        <ChevronRight size={12} className="text-gray-300" />
        <span className="text-gray-800">Cek Order</span>
      </div>

      <div className="space-y-2">
        <h1 className="text-2xl md:text-3xl font-bold text-gray-900 font-inter">Cek Order</h1>
        <p className="text-sm text-gray-500 font-inter leading-relaxed">
          Kamu dapat melihat progress orderan kamu dengan mencari nomor order milikmu di sini
        </p>
      </div>

      <div className="bg-white border border-gray-100 rounded-3xl p-6 md:p-8 shadow-sm space-y-4">
        <form onSubmit={handleSearch} className="space-y-4">
          <div className="space-y-2">
            <label className="text-sm font-bold text-gray-800 font-inter">Nomor Order</label>
            <input 
              type="text" 
              value={orderNumber}
              onChange={(e) => setOrderNumber(e.target.value)}
              placeholder="Masukkan nomor order (contoh: 12345)"
              className="w-full bg-gray-50 border border-gray-100 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-jumpapay-blue/20 focus:border-jumpapay-blue transition-all font-inter"
            />
          </div>
          <button 
            type="submit"
            className="w-full bg-jumpapay-blue text-white py-3.5 rounded-2xl font-bold text-sm shadow-lg shadow-sky-100 hover:bg-sky-500 transition-all active:scale-[0.98] font-inter"
          >
            Cari Order
          </button>
        </form>
      </div>

      {status === 'not-found' && (
        <div className="flex flex-col items-center justify-center py-12 space-y-4 animate-in fade-in zoom-in duration-300 text-center">
          <img 
            src="/tracking/order-not-found.svg" 
            alt="Order Tidak Ditemukan" 
            className="w-64 h-64 md:w-80 md:h-80 object-contain"
          />
          <div className="space-y-2">
            <h3 className="text-lg font-bold text-gray-900 font-inter">Nomor Order Tidak Ditemukan</h3>
            <p className="text-sm text-gray-500 font-inter max-w-xs mx-auto leading-relaxed">
              Silakan periksa kembali nomor order yang Anda masukkan.
            </p>
          </div>
        </div>
      )}

      {status === 'found' && (
        <div className="animate-in fade-in slide-in-from-top-4 duration-500 space-y-6">
          <div className="bg-white border border-gray-100 rounded-3xl p-6 md:p-8 shadow-sm">
            <h3 className="font-bold text-gray-800 mb-6 font-inter border-b border-gray-50 pb-4">Order Detail</h3>
            
            <div className="grid grid-cols-2 lg:grid-cols-5 gap-6">
              <div className="space-y-1 font-inter">
                <p className="text-xs text-gray-400 font-medium">Nomor Order</p>
                <p className="text-sm font-bold text-gray-900">12345</p>
              </div>
              <div className="space-y-1 font-inter">
                <p className="text-xs text-gray-400 font-medium">Tanggal Order</p>
                <p className="text-sm font-bold text-gray-900">11/01/2025</p>
              </div>
              <div className="space-y-1 font-inter">
                <p className="text-xs text-gray-400 font-medium">Nama</p>
                <p className="text-sm font-bold text-gray-900">Rayhan Alfaruq</p>
              </div>
              <div className="space-y-1 font-inter">
                <p className="text-xs text-gray-400 font-medium">Layanan</p>
                <p className="text-sm font-bold text-gray-900">Perpanjangan Pajak 1 Tahun</p>
              </div>
              <div className="space-y-1 font-inter">
                <p className="text-xs text-gray-400 font-medium">Total Harga</p>
                <p className="text-sm font-bold text-gray-900">Rp240.000</p>
              </div>
            </div>

            <div className="mt-8 bg-gray-50 rounded-2xl p-6 space-y-4">
              <p className="text-sm font-bold text-gray-800 font-inter">
                JumpaPay akan membantu pengurusan dokumenmu, harap menyertakan data berikut:
              </p>
              <ul className="text-xs text-gray-600 space-y-2 list-disc ml-4 font-inter">
                <li>KTP Asli Pemilik Kendaraan Baru</li>
                <li>STNK Asli Kendaraan</li>
              </ul>
              <div className="pt-2">
                <p className="text-sm text-gray-800 font-inter">
                  Dokumen milikmu akan diambil pada: <span className="text-green-600 font-bold">24 Desember 2025 | 09.00 - 12.00</span>
                </p>
                <p className="text-xs text-gray-500 mt-2 font-inter leading-relaxed">
                  Ingin mengubah jadwal pengambilan dokumen? {' '}
                  <a 
                    href="https://wa.me/628119509889?text=Halo%20JumpaPay,%20saya%20ingin%20mengubah%20jadwal%20pengambilan%20dokumen%20untuk%20nomor%20order%2012345" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-jumpapay-blue font-bold hover:underline"
                  >
                    Hubungi CS JumpaPay di Whatsapp dengan klik di sini.
                  </a>
                </p>
              </div>
            </div>

            <div className="mt-8 space-y-8">
              <h4 className="text-sm font-bold text-gray-800 font-inter">Status Pengurusan Surat:</h4>
              <div className="relative space-y-8 before:absolute before:inset-0 before:ml-3 before:h-full before:w-0.5 before:-translate-x-px before:bg-gray-100">
                <div className="relative flex items-center gap-4 group">
                  <div className="absolute left-0 w-6 h-6 rounded-full bg-jumpapay-blue border-4 border-blue-50 z-10"></div>
                  <div className="ml-10">
                    <p className="text-sm font-bold text-gray-800 font-inter">Verifikasi Dokumen</p>
                  </div>
                </div>
                <div className="relative flex items-center gap-4 group">
                  <div className="absolute left-0 w-6 h-6 rounded-full bg-jumpapay-blue border-4 border-blue-50 z-10"></div>
                  <div className="ml-10">
                    <p className="text-sm font-bold text-gray-800 font-inter">Pengambilan Dokumen</p>
                  </div>
                </div>
                <div className="relative flex items-center gap-4 group">
                  <div className="absolute left-0 w-6 h-6 rounded-full bg-white border-2 border-gray-200 z-10"></div>
                  <div className="ml-10">
                    <p className="text-sm font-medium text-gray-400 font-inter">Pengurusan Dokumen</p>
                  </div>
                </div>
                <div className="relative flex items-center gap-4 group">
                  <div className="absolute left-0 w-6 h-6 rounded-full bg-white border-2 border-gray-200 z-10"></div>
                  <div className="ml-10">
                    <p className="text-sm font-medium text-gray-400 font-inter">Pengembalian Dokumen</p>
                  </div>
                </div>
              </div>
            </div>

            <button 
              onClick={() => setView('refund')}
              className="w-full mt-10 py-3 border border-jumpapay-blue text-jumpapay-blue rounded-full font-bold text-sm hover:bg-blue-50 transition-all font-inter"
            >
              Ajukan Refund
            </button>
          </div>
        </div>
      )}
    </div>
  );
};