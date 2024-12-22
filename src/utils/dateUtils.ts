import { format } from 'date-fns';

export const isLateLogin = (date: Date) => {
  const hours = date.getHours();
  const minutes = date.getMinutes();
  return hours > 9 || (hours === 9 && minutes > 30);
};

export const formatTime = (date: Date) => format(date, 'HH:mm');
export const formatDate = (date: Date) => format(date, 'dd MMM yyyy');

export const getCurrentPosition = (): Promise<{ latitude: number; longitude: number }> => {
  return new Promise((resolve, reject) => {
    if (!navigator.geolocation) {
      reject(new Error('Geolocation is not supported'));
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        resolve({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        });
      },
      (error) => {
        reject(error);
      }
    );
  });
};