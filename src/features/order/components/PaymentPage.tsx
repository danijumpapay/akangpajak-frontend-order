import { useState } from 'react';
import { useOrderStore } from '../../../store/useOrderStore';
import { MapPin, X, Navigation } from 'lucide-react';

const AddressModal = ({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center px-4">
      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={onClose} />
      <div className="bg-white w-full max-w-lg rounded-[32px] overflow-hidden relative shadow-2xl animate-in fade-in zoom-in duration-200">
        <div className="p-6 border-b border-gray-50 flex items-center justify-between">
          <h3 className="font-bold text-gray-800 text-lg font-inter">Ubah Alamat Penjemputan</h3>
          <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full transition-colors text-gray-400">
            <X size={20} />
          </button>
        </div>
        <div className="p-6 space-y-6">
          <div className="space-y-2">
            <label className="text-xs font-bold text-gray-400 uppercase tracking-wider font-inter">Detail Alamat</label>
            <textarea 
              rows={3}
              className="w-full bg-gray-50 border border-gray-100 rounded-2xl p-4 text-sm focus:outline-none focus:ring-2 focus:ring-jumpapay-blue/20 focus:border-jumpapay-blue transition-all font-inter"
              placeholder="Masukkan alamat lengkap (Nama jalan, nomor rumah, dsb)"
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-xs font-bold text-gray-400 uppercase tracking-wider font-inter">Kota</label>
              <input type="text" className="w-full bg-gray-50 border border-gray-100 rounded-xl p-3 text-sm focus:outline-none focus:border-jumpapay-blue font-inter" placeholder="Jakarta Utara" />
            </div>
            <div className="space-y-2">
              <label className="text-xs font-bold text-gray-400 uppercase tracking-wider font-inter">Kode Pos</label>
              <input type="text" className="w-full bg-gray-50 border border-gray-100 rounded-xl p-3 text-sm focus:outline-none focus:border-jumpapay-blue font-inter" placeholder="14460" />
            </div>
          </div>
          <button className="w-full flex items-center justify-center gap-2 py-3 border-2 border-dashed border-gray-200 rounded-2xl text-gray-500 hover:border-jumpapay-blue hover:text-jumpapay-blue transition-all group font-inter text-sm font-bold">
            <Navigation size={18} />
            Pilih via Google Maps
          </button>
        </div>
        <div className="p-6 bg-gray-50/50 flex gap-3">
          <button onClick={onClose} className="flex-1 py-4 rounded-2xl font-bold text-gray-400 hover:bg-gray-100 transition-all font-inter text-sm">Batal</button>
          <button className="flex-1 bg-jumpapay-blue text-white py-4 rounded-2xl font-extrabold shadow-lg shadow-sky-100 hover:bg-sky-500 transition-all font-inter text-sm">Simpan Alamat</button>
        </div>
      </div>
    </div>
  );
};

export const PaymentPage = () => {
  const { selectedService, resetOrder } = useOrderStore();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedMethod, setSelectedMethod] = useState('QRIS');

  const instantPayments = [
    { id: 'QRIS', name: 'QRIS', logo: '/payments/qris.svg' },
    { id: 'DANA', name: 'DANA', logo: '/payments/dana.svg' },
    { id: 'Gopay', name: 'Gopay', logo: '/payments/gopay.svg' },
    { id: 'OVO', name: 'OVO', logo: '/payments/ovo.svg' },
  ];

  const bankTransfers = [
    { id: 'BCA', name: 'BCA', logo: '/payments/bca.svg' },
    { id: 'BNI', name: 'BNI', logo: '/payments/bni.svg' },
    { id: 'Permata', name: 'Permata Bank', logo: '/payments/permata.svg' },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 py-4 md:py-8 space-y-6">
      <div className="flex items-center gap-2 text-xs font-medium mb-6">
        <button onClick={resetOrder} className="text-gray-400 hover:text-jumpapay-blue cursor-pointer transition-colors font-inter">Order</button>
        <span className="text-gray-300">{'>'}</span>
        <span className="text-gray-800 font-inter">Detail Order</span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white border border-gray-100 rounded-[32px] p-6 md:p-8 shadow-sm">
            <h3 className="font-bold text-gray-800 mb-6 text-base font-inter">Tipe Penjemputan Dokumen</h3>
            <label className="flex items-center justify-between p-5 border border-jumpapay-blue bg-blue-50/30 rounded-[24px] cursor-pointer">
              <div className="flex items-center gap-4">
                <div className="w-6 h-6 rounded-full border-2 border-jumpapay-blue flex items-center justify-center shrink-0">
                  <div className="w-3 h-3 bg-jumpapay-blue rounded-full"></div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="text-jumpapay-blue shrink-0">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 256 256">
                      <path d="M216,120a41,41,0,0,0-6.6.55l-5.82-15.14A55.64,55.64,0,0,1,216,104a8,8,0,0,0,0-16H196.88L183.47,53.13A8,8,0,0,0,176,48H144a8,8,0,0,0,0,16h26.51l9.23,24H152c-18.5,0-33.5,4.31-43.37,12.46a16,16,0,0,1-16.76,2.07C81.29,97.72,31.13,77.33,26.71,75.6L21,73.36A17.74,17.74,0,0,0,16,72a8,8,0,0,0-2.87,15.46h0c.46.18,47.19,18.3,72.13,29.63a32.15,32.15,0,0,0,33.56-4.29c4.86-4,14.57-8.8,33.19-8.8h18.82a71.74,71.74,0,0,0-24.17,36.59A15.86,15.86,0,0,1,131.32,152H79.2a40,40,0,1,0,0,16h52.12a31.91,31.91,0,0,0,30.74-23.1,56,56,0,0,1,26.59-33.72l5.82,15.13A40,40,0,1,0,216,120ZM40,168H62.62a24,24,0,1,1,0-16H40a8,8,0,0,0,0,16Zm176,16a24,24,0,0,1-15.58-42.23l8.11,21.1a8,8,0,1,0,14.94-5.74L215.35,136l.65,0a24,24,0,0,1,0,48Z"></path>
                    </svg>
                  </div>
                  <div>
                    <p className="text-[16px] text-gray-800 font-bold leading-tight font-inter">Dokumen Dijemput</p>
                    <p className="text-[16px] font-bold text-gray-800 mt-1 font-inter">Rp50.000</p>
                  </div>
                </div>
              </div>
            </label>
            <div className="mt-8 border-t border-gray-50 pt-6">
              <div className="flex items-center gap-2 mb-4">
                <MapPin size={20} className="text-[#FF4D4D] fill-[#FF4D4D]" />
                <h4 className="font-bold text-sm text-gray-800 font-inter">Lokasi Pengambilan Dokumen</h4>
              </div>
              <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
                <p className="text-[14px] text-gray-500 max-w-xl leading-relaxed font-medium font-inter">
                  Bukit Golf Mediterania, Cluster Royal Mansion, Blok Royal No. 5, PIK FIT, Pantai Indah Kapuk, Jakarta Utara
                </p>
                <button 
                  onClick={() => setIsModalOpen(true)}
                  className="px-5 py-2 border border-gray-200 rounded-full text-[12px] font-bold text-gray-600 hover:bg-gray-50 transition-all shrink-0 font-inter"
                >
                  Ubah Alamat
                </button>
              </div>
            </div>
          </div>

          <div className="bg-white border border-gray-100 rounded-[32px] p-6 md:p-8 shadow-sm space-y-8">
            <h3 className="font-bold text-gray-800 text-base font-inter">Metode Pembayaran</h3>
            
            {/* Section: Instant Payment */}
            <div className="space-y-4">
              <h4 className="text-sm font-bold font-inter text-gray-800">Instant Payment</h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {instantPayments.map((method) => (
                  <div 
                    key={method.id} 
                    onClick={() => setSelectedMethod(method.id)}
                    className={`p-4 border rounded-2xl flex items-center justify-between cursor-pointer transition-all ${
                      selectedMethod === method.id 
                      ? 'border-jumpapay-blue bg-blue-50/30' 
                      : 'border-gray-100 hover:border-gray-200'
                    }`}
                  >
                    <div className="flex items-center gap-4">
                      <div className={`w-5 h-5 rounded-full border flex items-center justify-center ${
                        selectedMethod === method.id ? 'border-jumpapay-blue' : 'border-gray-300'
                      }`}>
                        {selectedMethod === method.id && <div className="w-2.5 h-2.5 bg-jumpapay-blue rounded-full"></div>}
                      </div>
                      <img src={method.logo} alt={method.name} className="h-5 w-auto object-contain" />
                    </div>
                    <span className="text-sm font-bold text-gray-700 font-inter">{method.name}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Section: Transfer Bank */}
            <div className="space-y-4">
              <h4 className="text-sm font-bold font-inter text-gray-800">Transfer Bank</h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {bankTransfers.map((method) => (
                  <div 
                    key={method.id} 
                    onClick={() => setSelectedMethod(method.id)}
                    className={`p-4 border rounded-2xl flex items-center justify-between cursor-pointer transition-all ${
                      selectedMethod === method.id 
                      ? 'border-jumpapay-blue bg-blue-50/30' 
                      : 'border-gray-100 hover:border-gray-200'
                    }`}
                  >
                    <div className="flex items-center gap-4">
                      <div className={`w-5 h-5 rounded-full border flex items-center justify-center ${
                        selectedMethod === method.id ? 'border-jumpapay-blue' : 'border-gray-300'
                      }`}>
                        {selectedMethod === method.id && <div className="w-2.5 h-2.5 bg-jumpapay-blue rounded-full"></div>}
                      </div>
                      <img src={method.logo} alt={method.name} className="h-6 w-auto object-contain" />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-white border border-gray-100 rounded-[32px] p-8 shadow-sm sticky top-8">
            <div className="flex justify-between items-center mb-6">
              <h3 className="font-bold text-gray-800 text-base font-inter">Detail Order</h3>
              <button className="flex items-center gap-1 bg-jumpapay-blue text-white px-3 py-1.5 rounded-lg text-[10px] font-extrabold font-inter uppercase">TAMBAH JASA</button>
            </div>
            <div className="flex items-center gap-4 mb-8">
              <img src={selectedService?.image || '/services/mutasi.png'} className="w-16 h-16 rounded-2xl object-cover" alt="Service" />
              <div className="flex-1">
                <p className="font-bold text-[13px] text-gray-800 leading-tight mb-1 font-inter">{selectedService?.title || 'Mutasi STNK (Cabut Berkas)'}</p>
                <p className="text-[13px] font-bold text-gray-900 font-inter">Rp2.651.000</p>
              </div>
              <button className="text-[10px] font-bold text-gray-500 border border-gray-100 px-2 py-1 rounded-md font-inter">Detail Harga</button>
            </div>
            <div className="space-y-4 pt-6 border-t border-gray-50">
              <div className="flex justify-between text-sm">
                <span className="text-gray-400 font-medium font-inter">Subtotal</span>
                <span className="text-gray-800 font-bold font-inter">2.651.000</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-400 font-medium font-inter">Biaya Penjemputan</span>
                <div className="flex gap-2">
                  <span className="text-gray-300 line-through font-bold font-inter">50.000</span>
                  <span className="text-jumpapay-blue font-bold font-inter">Gratis</span>
                </div>
              </div>
              <div className="pt-6 border-t border-dashed border-gray-200 flex justify-between items-center">
                <span className="font-bold text-gray-800 font-inter text-lg">Total</span>
                <span className="text-2xl font-black text-gray-900 underline decoration-gray-100 underline-offset-8 font-inter">2.651.000</span>
              </div>
            </div>
            <button className="w-full bg-jumpapay-blue text-white py-4.5 rounded-[20px] font-extrabold text-base mt-8 shadow-lg shadow-sky-100 hover:bg-sky-500 transition-all active:scale-[0.98] font-inter">Bayar Sekarang</button>
          </div>
        </div>
      </div>
      <AddressModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </div>
  );
};