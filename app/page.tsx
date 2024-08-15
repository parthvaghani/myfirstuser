'use client';

import React, { useState, useMemo } from 'react';
import { Card } from '@/components/ui/card';
import Modal from '@/components/Modal'; // We'll create this component
import Link from 'next/link';
import Slider from './components/slider/page';

interface Example {
  title: string;
  duration: string;
  tag: string;
}

const MarketingDashboard = () => {
  const [selectedExample, setSelectedExample] = useState<Example | null>(null);
  const [selectedFilter, setSelectedFilter] = useState<string | null>(null);



  const examples = [
    { title: 'Same interview. 700x reach.', duration: '30 secs', tag: 'Social' },
    { title: 'Posting seltzer. Making money.', duration: '2 mins', tag: 'Creative' },
    { title: 'The saleswoman closing 33% of cold pitches', duration: '2 min', tag: 'Sales' },
    { title: 'A full-time "pizza influencer"', duration: '2 mins', tag: 'Content' },
    // Add more examples here
  ];

  const filteredExamples = useMemo(() => {
    if (!selectedFilter) return examples;
    return examples.filter(example => example.tag === selectedFilter);
  }, [selectedFilter, examples]);

  const openModal = (example: Example) => {
    setSelectedExample(example);
  };

  const closeModal = () => {
    setSelectedExample(null);
  };

  return (
    <>
        <Slider>

          <div className="lg:col-span-5 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredExamples.map((example, index) => (
              <Card
                key={index}
                className="bg-gray-100 hover:bg-gray-200 transition-colors p-6 rounded-xl shadow-md cursor-pointer"
                onClick={() => openModal(example)}
              >
                <h3 className="font-bold text-lg mb-3 text-blue-600">{example.title}</h3>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">{example.duration}</span>
                  <span className="bg-blue-600 px-3 py-1 rounded-full text-xs font-semibold text-white">{example.tag}</span>
                </div>
              </Card>
            ))}
          </div>

        </Slider>

        {selectedExample && (
          <Modal title={selectedExample.title} onClose={closeModal}>
            <p>Duration: {selectedExample.duration}</p>
            <p>Tag: {selectedExample.tag}</p>
            {/* Add more content for the modal here */}
          </Modal>
        )}
    </>
  );
};

export default MarketingDashboard;