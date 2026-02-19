import { VehicleType } from "@/lib/order-utils";

interface DeliveryPricing {
    express: number;
    reguler: number;
    surcharge: number;
}

export const JABODETABEK_CITIES = ['Kota Bekasi', 'Kota Depok'];

export const DELIVERY_PRICING: Record<string, Record<VehicleType, DeliveryPricing>> = {
    jabodetabek: {
        MOTOR: { express: 34900, reguler: 24900, surcharge: 19900 },
        MOBIL: { express: 69900, reguler: 59900, surcharge: 29900 },
        TRUK: { express: 69900, reguler: 59900, surcharge: 29900 },
    },
    default: {
        MOTOR: { express: 29900, reguler: 19900, surcharge: 19900 },
        MOBIL: { express: 59900, reguler: 49900, surcharge: 19900 },
        TRUK: { express: 59900, reguler: 49900, surcharge: 19900 },
    }
};

export const getDeliveryPricing = (city: string, vehicleType: string): DeliveryPricing => {
    const isJabodetabek = JABODETABEK_CITIES.includes(city);
    const regionKey = isJabodetabek ? 'jabodetabek' : 'default';

    const typeKey = (vehicleType.toUpperCase() as VehicleType);
    const validType = ['MOTOR', 'MOBIL', 'TRUK'].includes(typeKey) ? typeKey : 'MOTOR';

    return DELIVERY_PRICING[regionKey][validType];
};
