"use client";
import { useRouter, useSearchParams } from 'next/navigation'; // Use this for App Directory
import { useEffect, useMemo, useState } from 'react';
import { array } from '@/app/components/array/array';
import Modal from '@/components/Modal';
import Slider from '../components/slider/page';
import { Card } from '@/components/ui/card';

interface Example {
    title: string;
    duration: string;
    tag: string;
    slug: string;
}

export default function Content() {
    const [selectedExample, setSelectedExample] = useState<Example | null>(null);
    const searchParams = useSearchParams();
    const router = useRouter();

    const slug = searchParams.get('slug') || '';

    const filteredExamples = useMemo(() => array.filter(example => example.tag === 'Content'), []);

    useEffect(() => {
        if (slug) {
            const example = filteredExamples.find(e => e.slug === slug);
            setSelectedExample(example || null);
        } else {
            setSelectedExample(null);
        }
    }, [slug, filteredExamples]);

    const openModal = (example: Example) => {
        router.push(`/content?slug=${encodeURIComponent(example.slug)}`);
    };

    const closeModal = () => {
        router.push('/content'); // Clear the query parameter
    };

    return (
        <>
            <title>Content</title>
            <Slider>
                <div className="lg:col-span-5 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {
                        filteredExamples.map((item) => (
                            <Card
                                key={item.slug} // Use slug as key for uniqueness
                                className="bg-gray-100 hover:bg-gray-200 transition-colors p-6 rounded-xl shadow-md cursor-pointer"
                                onClick={() => openModal(item)}
                            >
                                <h3 className="font-bold text-lg mb-3 text-blue-600">{item.title}</h3>
                                <div className="flex justify-between items-center">
                                    <span className="text-sm text-gray-600">{item.duration}</span>
                                    <span className="bg-blue-600 px-3 py-1 rounded-full text-xs font-semibold text-white">{item.tag}</span>
                                </div>
                            </Card>
                        ))
                    }
                </div>
                {selectedExample && (
                    <Modal title={selectedExample.title} onClose={closeModal}>
                        <p>Duration: {selectedExample.duration}</p>
                        <p>Tag: {selectedExample.tag}</p>
                        {/* Add more content for the modal here */}
                    </Modal>
                )}
            </Slider>
        </>
    );
}
