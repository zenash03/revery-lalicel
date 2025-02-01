// useFetchColors.ts
import { useState, useEffect } from 'react';

const useFetchColors = () => {
  const [colors, setColors] = useState<any[]>([]);
  const [isFetchingColor, setIsFetchingColor] = useState(true);

  const fetchColors = async () => {
    setIsFetchingColor(true);
    try {
      const response = await fetch('/api/colors');
      if (!response.ok) {
        throw new Error('Failed to fetch colors');
      }
      const data = await response.json();
      setColors(data);
    } catch (error) {
      console.error('Error fetching colors:', error);
    } finally {
      setIsFetchingColor(false);
    }
  };

  useEffect(() => {
    fetchColors();
  }, []);

  return { colors, isFetchingColor, refetch: fetchColors };
};

export default useFetchColors;