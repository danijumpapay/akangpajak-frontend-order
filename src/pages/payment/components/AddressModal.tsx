import { useState } from 'react';
import { X } from 'lucide-react';

interface AddressData {
  alamatLengkap: string;
  kota: string;
  namaPemberi: string;
  noPonsel: string;
  keterangan: string;
}

interface AddressModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialData: AddressData;
  onSave: (newData: AddressData) => void;
}

export const AddressModal = ({ isOpen, onClose, initialData, onSave }: AddressModalProps) => {
  const [formData, setFormData] = useState<AddressData>(initialData);
  const [errors, setErrors] = useState<Partial<Record<keyof AddressData, string>>>({});

  const handleChange = (field: keyof AddressData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: "" }));
    }
  };

  const validate = () => {
    const newErrors: Partial<Record<keyof AddressData, string>> = {};
    if (!formData.alamatLengkap.trim()) newErrors.alamatLengkap = "Alamat lengkap wajib diisi";
    if (!formData.kota.trim()) newErrors.kota = "Kota wajib diisi";
    if (!formData.namaPemberi.trim()) newErrors.namaPemberi = "Nama pemberi wajib diisi";
    if (!formData.noPonsel.trim()) newErrors.noPonsel = "Nomor ponsel wajib diisi";
    if (!formData.keterangan.trim()) newErrors.keterangan = "Keterangan tambahan wajib diisi";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSave = () => {
    if (validate()) {
      onSave(formData);
      onClose();
    }
  };

  const handleClose = () => {
    setFormData(initialData);
    setErrors({});
    onClose();
  };

  if (!isOpen) return null;

  const labelStyles = "text-xs font-bold text-gray-400 uppercase tracking-wider font-inter ml-1";
  const inputStyles = (field: keyof AddressData) => `w-full bg-gray-50 border ${errors[field] ? 'border-red-500' : 'border-gray-100'} rounded-xl p-3 text-sm focus:outline-none focus:border-[#27AAE1] font-inter transition-all placeholder:text-gray-300 mt-2`;
  const errorStyles = "text-[10px] text-red-500 font-medium mt-1 ml-1";

  return (
    <div className="fixed inset-0 z-100 flex items-center justify-center px-4">
      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={handleClose} />
      <div className="bg-white w-full max-w-lg rounded-[32px] md:rounded-[40px] overflow-hidden relative shadow-2xl animate-in fade-in zoom-in duration-200">
        <div className="p-6 border-b border-gray-50 flex items-center justify-between">
          <h3 className="font-bold text-gray-800 text-lg font-inter">Detail Pengambilan Dokumen</h3>
          <button onClick={handleClose} className="p-2 hover:bg-gray-100 rounded-full transition-colors text-gray-400">
            <X size={20} />
          </button>
        </div>
        
        <div className="p-6 space-y-4 text-left max-h-[65vh] overflow-y-auto">
          <div className="space-y-1">
            <label className={labelStyles}>Alamat Lengkap</label>
            <textarea 
              rows={3}
              value={formData.alamatLengkap}
              onChange={(e) => handleChange('alamatLengkap', e.target.value)}
              className={`${inputStyles('alamatLengkap')} resize-none`}
              placeholder="Ex : Perumahan Mahkota Mas Blok O4 RT 002/RW 009 Kec Cikokol"
            />
            {errors.alamatLengkap && <p className={errorStyles}>{errors.alamatLengkap}</p>}
          </div>

          <div className="space-y-1">
            <label className={labelStyles}>Kota</label>
            <input 
              type="text"
              value={formData.kota}
              onChange={(e) => handleChange('kota', e.target.value)}
              className={inputStyles('kota')}
              placeholder="Ex : Jakarta Timur"
            />
            {errors.kota && <p className={errorStyles}>{errors.kota}</p>}
          </div>

          <div className="space-y-1">
            <label className={labelStyles}>Nama Pemberi</label>
            <input 
              type="text"
              value={formData.namaPemberi}
              onChange={(e) => handleChange('namaPemberi', e.target.value)}
              className={inputStyles('namaPemberi')}
              placeholder="Ex : Achmad Ali Qasim"
            />
            {errors.namaPemberi && <p className={errorStyles}>{errors.namaPemberi}</p>}
          </div>

          <div className="space-y-1">
            <label className={labelStyles}>No Ponsel</label>
            <input 
              type="tel"
              value={formData.noPonsel}
              onChange={(e) => handleChange('noPonsel', e.target.value)}
              className={inputStyles('noPonsel')}
              placeholder="Ex : 085691137432"
            />
            {errors.noPonsel && <p className={errorStyles}>{errors.noPonsel}</p>}
          </div>

          <div className="space-y-1">
            <label className={labelStyles}>Keterangan Tambahan</label>
            <textarea 
              rows={2}
              value={formData.keterangan}
              onChange={(e) => handleChange('keterangan', e.target.value)}
              className={`${inputStyles('keterangan')} resize-none`}
              placeholder="Ex : Rumah Hook, warna hijau, pagar hitam"
            />
            {errors.keterangan && <p className={errorStyles}>{errors.keterangan}</p>}
          </div>
        </div>

        <div className="p-6 bg-gray-50/50 flex gap-3">
          <button 
            type="button"
            onClick={handleClose} 
            className="flex-1 py-4 rounded-2xl font-bold text-gray-400 hover:bg-gray-100 transition-all text-sm font-inter"
          >
            Batal
          </button>
          <button 
            type="button"
            onClick={handleSave}
            className="flex-1 bg-[#27AAE1] text-white py-4 rounded-2xl font-extrabold shadow-lg shadow-sky-100 hover:bg-sky-500 transition-all text-sm font-inter"
          >
            Simpan Detail
          </button>
        </div>
      </div>
    </div>
  );
};