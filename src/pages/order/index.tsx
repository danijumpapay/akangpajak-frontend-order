import { useForm, useWatch, FieldError } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useOrderStore } from '@/store/useOrderStore';
import { Breadcrumbs } from '@/components/shared/Breadcrumbs';
import { OrderServiceInfo } from './components/OrderServiceInfo';
import { OrderRequirements } from './components/OrderRequirements';
import servicesConfig from '@/data/services-config.json';
import { orderSchema, OrderFormData } from './types';

interface FormField {
  id: keyof OrderFormData;
  label: string;
  type: string;
  placeholder?: string;
  required: boolean;
  options?: string[];
}

export const OrderForm = () => {
  const { selectedService, orderData, setOrderData, nextStep } = useOrderStore();
  
  const config = servicesConfig.services.find(s => s.id === selectedService?.id);
  const allFields: FormField[] = [
    ...(servicesConfig.defaultFields as unknown as FormField[]),
    ...(config?.extraFields as unknown as FormField[] || [])
  ];

  const { register, handleSubmit, setValue, control, trigger, formState: { errors } } = useForm<OrderFormData>({
    resolver: zodResolver(orderSchema),
    defaultValues: {
      ...orderData,
      jenisMutasi: orderData.jenisMutasi || 'Lengkap',
    }
  });

  const watchValues = useWatch({ control });

  const onSubmit = (data: OrderFormData) => {
    setOrderData(data);
    nextStep();
  };

  const inputStyles = "w-full bg-gray-50 border border-gray-100 rounded-xl p-3.5 text-sm focus-visible:ring-0 focus:border-[#27AAE1] outline-none transition-all placeholder:text-gray-400 h-auto";

  return (
    <div className="py-4 md:py-8 space-y-6 md:space-y-8 font-inter text-left animate-in fade-in duration-500">
      <Breadcrumbs currentPage="Detail Order" />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 mt-7 items-start">
        <OrderServiceInfo 
          title={selectedService?.title}
          image={selectedService?.image}
          description={selectedService?.description}
        />

        <div className="lg:col-span-5 w-full">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5 md:space-y-6">
            
            {allFields.map((field) => {
              const error = errors[field.id] as FieldError | undefined;
              
              return (
                <div key={field.id} className="space-y-2">
                  <Label className="text-sm font-bold text-gray-800">{field.label}</Label>
                  
                  {field.id === 'whatsapp' ? (
                    <div className="flex gap-2">
                      <div className="bg-gray-100 border border-gray-200 px-4 py-3.5 rounded-xl text-gray-500 text-sm flex items-center font-bold">+62</div>
                      <Input 
                        {...register('whatsapp')} 
                        placeholder={field.placeholder} 
                        className={`${inputStyles} flex-1 ${error ? 'border-red-500' : ''}`} 
                      />
                    </div>
                  ) : field.type === 'select' ? (
                    <Select 
                      onValueChange={(val) => { 
                        setValue(field.id, val as OrderFormData[keyof OrderFormData]); 
                        trigger(field.id); 
                      }} 
                      defaultValue={orderData[field.id] as string}
                    >
                      <SelectTrigger className={`${inputStyles} ${error ? 'border-red-500' : ''}`}>
                        <SelectValue placeholder={field.placeholder || "Pilih..."} />
                      </SelectTrigger>
                      <SelectContent className="rounded-xl">
                        {field.options?.map((opt) => (
                          <SelectItem key={opt} value={opt}>{opt}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  ) : field.type === 'radio' ? (
                    <RadioGroup 
                      value={(watchValues[field.id] as string) || ''} 
                      onValueChange={(val) => { 
                        setValue(field.id, val as OrderFormData[keyof OrderFormData]); 
                        trigger(field.id); 
                      }} 
                      className="flex gap-2"
                    >
                      {field.options?.map((val) => (
                        <div key={val} className="flex-1">
                          <RadioGroupItem value={val} id={`${field.id}-${val}`} className="sr-only" />
                          <Label
                            htmlFor={`${field.id}-${val}`}
                            className={`block py-2.5 text-center rounded-xl border cursor-pointer text-xs font-bold transition-all
                              ${watchValues[field.id] === val ? 'bg-[#E0F4FF] border-[#27AAE1] text-[#27AAE1]' : 'bg-gray-100 border-gray-100 text-gray-400'}
                              ${error ? 'border-red-500' : ''}`}
                          >
                            {val}
                          </Label>
                        </div>
                      ))}
                    </RadioGroup>
                  ) : (
                    <Input 
                      {...register(field.id)} 
                      placeholder={field.placeholder} 
                      className={`${inputStyles} ${field.id === 'plateNumber' ? 'uppercase' : ''} ${error ? 'border-red-500' : ''}`} 
                    />
                  )}
                  
                  {error && (
                    <p className="text-red-500 text-[10px] font-bold mt-1">
                      {error.message}
                    </p>
                  )}
                </div>
              );
            })}

            <OrderRequirements />

            <Button 
              type="submit" 
              className="btn-akang-primary w-full text-white py-7 rounded-xl font-extrabold text-base transition-all shadow-sm"
            >
              Order Sekarang
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
};