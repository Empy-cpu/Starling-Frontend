import React from 'react';
import { getCleaningServices, getExtras } from '@/services/booking-service/booking-service';
import { extrasOptionsAssets } from '@/constants/BookingConstants';
import BookingPageClient from './BookingPageClient';
import './style.css';

const BookingPage = async () => {
  const services = await getCleaningServices();
  const extrasData = await getExtras();

  const mergedExtras = extrasData.map((extra) => {
    const asset = extrasOptionsAssets.find((e) => e.id === extra.id);
    return {
      ...extra,
      name: asset?.name || extra.name || extra.description || 'Extra Service',
      description: asset?.description || extra.description || '',
      image: asset?.image || extra.image || '/Images/extras/placeholder.jpeg',
      price: typeof extra.price === 'number' ? extra.price : asset?.price || 0,
      maxQuantity: asset?.maxQuantity,
      selectionType: asset?.selectionType,
      serviceConstraints: asset?.serviceConstraints,
    };
  });

  return <BookingPageClient services={services} extras={mergedExtras} />;
};

export default BookingPage;

