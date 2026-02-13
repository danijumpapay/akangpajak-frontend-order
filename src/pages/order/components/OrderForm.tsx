import { useForm } from 'react-hook-form';
import servicesConfig from '@/data/services-config.json';
import { useOrderStore } from '@/store/useOrderStore';
import { Button } from "@/components/ui/button";

interface FormField {
  id: string;
  label: string;
  type: string;
  placeholder?: string;
  required: boolean;
  options?: string[];
}

interface OrderFormData {
  [key: string]: string;
}

export const OrderForm = () => {
  const selectedService = useOrderStore((s) => s.selectedService);
  
  const config = servicesConfig.services.find(s => s.id === selectedService?.id);
  
  const allFields: FormField[] = [
    ...(servicesConfig.defaultFields as FormField[]),
    ...(config?.extraFields as FormField[] || [])
  ];

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<OrderFormData>();

  const onSubmit = (data: OrderFormData) => {
    console.log(data);
  };

  return (
    <div className="bg-white p-6 md:p-8 rounded-3xl md:rounded-[40px] border border-gray-100 shadow-sm">
      <h2 className="text-xl font-bold text-gray-900 mb-6">Lengkapi Data Pemesanan</h2>
      
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {allFields.map((field) => (
            <div key={field.id} className={`flex flex-col gap-1.5 ${field.type === 'select' ? 'md:col-span-2' : ''}`}>
              <label className="text-sm font-bold text-gray-700 ml-1">
                {field.label} {field.required && <span className="text-red-500">*</span>}
              </label>

              {field.type === 'select' ? (
                <select
                  {...register(field.id, { required: field.required })}
                  className="w-full p-3.5 rounded-2xl border border-gray-200 bg-gray-50 focus:bg-white focus:border-akang-pajak-blue outline-none transition-all text-sm"
                >
                  <option value="">Pilih salah satu...</option>
                  {field.options?.map((opt: string) => (
                    <option key={opt} value={opt}>{opt}</option>
                  ))}
                </select>
              ) : (
                <input
                  type={field.type}
                  placeholder={field.placeholder}
                  {...register(field.id, { 
                    required: field.required,
                    pattern: field.type === 'email' ? /^\S+@\S+$/i : undefined 
                  })}
                  className="w-full p-3.5 rounded-2xl border border-gray-200 bg-gray-50 focus:bg-white focus:border-akang-pajak-blue outline-none transition-all text-sm"
                />
              )}

              {errors[field.id] && (
                <span className="text-xs text-red-500 font-medium ml-1">
                  Bagian ini wajib diisi
                </span>
              )}
            </div>
          ))}
        </div>

        <div className="pt-4">
          <Button 
            type="submit" 
            className="w-full py-6 bg-akang-pajak-blue hover:bg-opacity-90 text-white rounded-2xl font-bold text-lg shadow-lg shadow-blue-100 transition-all active:scale-[0.98]"
          >
            Lanjutkan ke Pembayaran
          </Button>
          <p className="text-center text-[10px] text-gray-400 mt-4">
            Dengan menekan tombol di atas, Anda menyetujui Syarat & Ketentuan Akang Pajak.
          </p>
        </div>
      </form>
    </div>
  );
};