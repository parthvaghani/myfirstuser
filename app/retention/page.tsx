"use client"

import { Card } from "@/components/ui/card";
import Slider from "../components/slider/page";
import { useMemo, useState } from "react";
import { array } from "@/app/components/array/array"
import { title } from "process";
import Link from "next/link";
import Modal from "@/components/Modal";

interface Example {
    title: string;
    duration: string;
    tag: string;
}

export default function Content() {
    const [selectedExample, setSelectedExample] = useState<Example | null>(null);

    const filteredExamples = array.filter(example => example.tag === 'Retention');
    
    const openModal = (example: Example) => {
        setSelectedExample(example);
    };

    const closeModal = () => {
        setSelectedExample(null);
    };
    return (
        <>
            <title>Retention</title>
            <Slider>
                <div className="lg:col-span-5 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {
                        filteredExamples.map((item, index) => {

                            return (
                                // <Link href={`/content/${item.title}`} onClick={() => openModal(item)}>
                                <Card
                                    key={index}
                                    className="bg-gray-100 hover:bg-gray-200 transition-colors p-6 rounded-xl shadow-md cursor-pointer" onClick={() => openModal(item)}>
                                    <h3 className="font-bold text-lg mb-3 text-blue-600">{item.title}</h3>
                                    <div className="flex justify-between items-center">
                                        <span className="text-sm text-gray-600">{item.duration}</span>
                                        <span className="bg-blue-600 px-3 py-1 rounded-full text-xs font-semibold text-white">{item.tag}</span>
                                    </div>
                                </Card>
                            )
                        })
                    }
                </div>
                {selectedExample && (
                    <Modal title={selectedExample.title} onClose={closeModal}>
                        <p>Duration: {selectedExample.duration}</p>
                        <p>Tag: {selectedExample.tag}</p>
                        {/* Add more content for the modal here */}
                    </Modal>
                )}
            </Slider >
        </>
    )
}