import { useState } from 'react';
import { ChevronRight, Loader2 } from 'lucide-react';
import { useOrderStore } from '../../../store/useOrderStore';
import Swal from 'sweetalert2';

export const RefundPage = () => {
  const { setView } = useOrderStore();
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    nominalAktual: '',
    catatan: '',
    bank: '',
    rekening: ''
  });

  const [errors, setErrors] = useState({
    nominalAktual: '',
    bank: '',
    rekening: ''
  });

  const formatRupiah = (value: string) => {
    const numberString = value.replace(/[^,\d]/g, '').toString();
    const split = numberString.split(',');
    const sisa = split[0].length % 3;
    let rupiah = split[0].substr(0, sisa);
    const ribuan = split[0].substr(sisa).match(/\d{3}/gi);
    if (ribuan) {
      const separator = sisa ? '.' : '';
      rupiah += separator + ribuan.join('.');
    }
    return split[1] !== undefined ? rupiah + ',' + split[1] : rupiah;
  };

  const handleNominalChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatRupiah(e.target.value);
    setFormData({ ...formData, nominalAktual: formatted });
    if (formatted) setErrors({ ...errors, nominalAktual: '' });
  };

  const validate = () => {
    const newErrors = {
      nominalAktual: !formData.nominalAktual ? 'Nominal aktual wajib diisi' : '',
      bank: !formData.bank ? 'Pilih bank yang dituju' : '',
      rekening: !formData.rekening ? 'Nomor rekening wajib diisi' : ''
    };
    setErrors(newErrors);
    return !Object.values(newErrors).some(error => error !== '');
  };

  const handleSubmit = async () => {
    if (!validate()) return;

    const result = await Swal.fire({
      title: 'Konfirmasi Pengajuan',
      text: "Apakah data refund yang Anda masukkan sudah benar?",
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#00A3E0',
      cancelButtonColor: '#aaa',
      confirmButtonText: 'Ya, Ajukan',
      cancelButtonText: 'Batal'
    });

    if (result.isConfirmed) {
      setIsLoading(true);
      setTimeout(() => {
        setIsLoading(false);
        Swal.fire({
          title: 'Berhasil!',
          text: 'Pengajuan refund Anda akan diproses dalam 5 hari kerja.',
          icon: 'success',
          confirmButtonColor: '#00A3E0'
        }).then(() => {
          setView('tracking');
        });
      }, 2000);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-4 md:py-8 space-y-6">
      <div className="flex items-center gap-2 text-xs font-medium mb-2 font-inter">
        <button onClick={() => setView('order')} className="text-gray-400 hover:text-jumpapay-blue transition-colors">Order</button>
        <ChevronRight size={12} className="text-gray-300" />
        <button onClick={() => setView('tracking')} className="text-gray-400 hover:text-jumpapay-blue transition-colors">Cek Order</button>
        <ChevronRight size={12} className="text-gray-300" />
        <span className="text-gray-800">Pengajuan Refund</span>
      </div>

      <div className="bg-white border border-gray-100 rounded-4xl p-6 md:p-10 shadow-sm transition-all">
        <div className="border-b border-gray-100 pb-6 mb-5">
          <h3 className="text-2xl font-bold text-gray-800 font-inter">
            Pengajuan Refund
          </h3>
        </div>
        
        <div className="space-y-8 max-w-5xl">
          <div className="space-y-2">
            <label className="text-sm font-bold text-gray-800 font-inter ml-1">Nominal Awal</label>
            <input 
              type="text" 
              readOnly
              value="Rp1.200.000"
              className="w-full mt-2 bg-gray-50/80 border border-gray-100 rounded-2xl px-5 py-4 text-sm text-gray-400 font-inter outline-none cursor-not-allowed"
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-bold text-gray-800 font-inter ml-1">Nominal Aktual</label>
            <div className="relative">
              <span className="absolute left-5 top-1/2 -translate-y-1/2 text-sm font-bold text-gray-400 font-inter">Rp</span>
              <input 
                type="text" 
                placeholder="0"
                value={formData.nominalAktual}
                onChange={handleNominalChange}
                className={`w-full mt-2 bg-white border rounded-2xl pl-12 pr-5 py-4 text-sm focus:ring-4 focus:ring-jumpapay-blue/5 focus:border-jumpapay-blue transition-all font-inter outline-none ${errors.nominalAktual ? 'border-red-500' : 'border-gray-100'}`}
              />
            </div>
            {errors.nominalAktual && <p className="text-[11px] text-red-500 font-medium ml-1">{errors.nominalAktual}</p>}
          </div>

          <div className="space-y-2">
            <label className="text-sm font-bold text-gray-800 font-inter ml-1">Catatan Tambahan</label>
            <textarea 
              rows={4}
              placeholder="Ketik catatan tambahan untuk pengajuan refund di sini"
              value={formData.catatan}
              onChange={(e) => setFormData({...formData, catatan: e.target.value})}
              className="w-full mt-2 bg-white border border-gray-100 rounded-2xl px-5 py-4 text-sm focus:ring-4 focus:ring-jumpapay-blue/5 focus:border-jumpapay-blue transition-all font-inter outline-none resize-none leading-relaxed"
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-bold text-gray-800 font-inter ml-1">Pilih Bank</label>
            <div className="relative group">
              <select 
                value={formData.bank}
                onChange={(e) => {
                    setFormData({...formData, bank: e.target.value});
                    if (e.target.value) setErrors({...errors, bank: ''});
                }}
                className={`w-full mt-2 bg-white border rounded-2xl px-5 py-4 text-sm focus:border-jumpapay-blue transition-all font-inter appearance-none cursor-pointer outline-none ${errors.bank ? 'border-red-500' : 'border-gray-100'}`}
              >
                <option value="">Pilih bank yang dituju</option>
                <option value="bca">BCA</option>
                <option value="bni">BNI</option>
                <option value="permata">Permata Bank</option>
              </select>
              <div className="absolute inset-y-0 right-5 flex items-center pointer-events-none text-gray-400 group-hover:text-jumpapay-blue transition-colors">
                <ChevronRight size={18} className="rotate-90" />
              </div>
            </div>
            {errors.bank && <p className="text-[11px] text-red-500 font-medium ml-1">{errors.bank}</p>}
          </div>

          <div className="space-y-2">
            <label className="text-sm font-bold text-gray-800 font-inter ml-1">Nomor Rekening</label>
            <input 
              type="text" 
              placeholder="Ketik nomor rekening Anda di sini"
              value={formData.rekening}
              onChange={(e) => {
                  setFormData({...formData, rekening: e.target.value});
                  if (e.target.value) setErrors({...errors, rekening: ''});
              }}
              className={`w-full mt-2 bg-white border rounded-2xl px-5 py-4 text-sm focus:ring-4 focus:ring-jumpapay-blue/5 focus:border-jumpapay-blue transition-all font-inter outline-none ${errors.rekening ? 'border-red-500' : 'border-gray-100'}`}
            />
            {errors.rekening && <p className="text-[11px] text-red-500 font-medium ml-1">{errors.rekening}</p>}
          </div>

          <div className="pt-4">
            <button 
              type="button"
              disabled={isLoading}
              onClick={handleSubmit}
              className="w-full mt-2 py-4 border-2 border-jumpapay-blue text-jumpapay-blue rounded-full font-bold text-sm hover:bg-jumpapay-blue hover:text-white transition-all active:scale-[0.98] font-inter shadow-sm flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? (
                <>
                  <Loader2 className="animate-spin" size={20} />
                  Memproses...
                </>
              ) : (
                "Ajukan Pengembalian"
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};