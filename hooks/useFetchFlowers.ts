import React, { useEffect, useState } from 'react';
import { FlowerProps } from '../props';

export function useFetchFlowers() {
    const [flowers, setFlowers] = useState<FlowerProps[]>([]);
    const [isFetchingFlower, setIsFetchingFlower] = useState(true);

    const fetchFlowers = async () => {
        setIsFetchingFlower(true);
        try {
            const response = await fetch('/api/flowers');
            if (!response.ok) {
                throw new Error('Failed to fetch flowers');
            }
            const flowers = await response.json();
            setFlowers(flowers);
        } catch (err) {
            console.error('Error fetching flowers:', err);
        } finally {
            setIsFetchingFlower(false);
        }
    };

    useEffect(() => {
        fetchFlowers();
    }, []);

    return { flowers, isFetchingFlower, refetch: fetchFlowers };
}

export function useFetchFlower(id: string) {
    const [flowers, setFlowers] = useState<FlowerProps[]>([]);
    const [isFetchingFlower, setIsFetchingFlower] = useState(true);

    const fetchFlowers = async () => {
        setIsFetchingFlower(true);
        try {
            const response = await fetch(`/api/flowers/${id}`);
            if (!response.ok) {
                throw new Error('Failed to fetch flowers');
            }
            const flowers = await response.json();
            setFlowers(flowers);
        } catch (err) {
            console.error('Error fetching flowers:', err);
        } finally {
            setIsFetchingFlower(false);
        }
    };

    useEffect(() => {
        fetchFlowers();
    }, []);

    return { flowers, isFetchingFlower, refetch: fetchFlowers };
}
