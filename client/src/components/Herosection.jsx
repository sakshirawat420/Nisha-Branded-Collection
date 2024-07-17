import React, { useState, useEffect } from 'react';
import cardSlider1 from '../assets/5092428.jpg';
import cardSlider2 from '../assets/8131931.jpg';
import cardSlider3 from '../assets/8280652.jpg';
import cardSlider4 from '../assets/9382658.jpg';
import cardSlider5 from '../assets/9626247.jpg';

const Herosection = () => {
    const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
    const images = [
        cardSlider1,
        cardSlider2,
        cardSlider3,
        cardSlider4,
        cardSlider5,
    ];
    const intervalTime = 3000; // Change this value to set the interval time in milliseconds

    const nextSlide = () => {
        setCurrentSlideIndex(prevIndex => (prevIndex + 1) % images.length);
    };

    const prevSlide = () => {
        setCurrentSlideIndex(
            prevIndex => (prevIndex - 1 + images.length) % images.length
        );
    };

    const goToSlide = index => {
        setCurrentSlideIndex(index);
    };

    useEffect(() => {
        const intervalId = setInterval(() => {
            setCurrentSlideIndex(prevIndex => (prevIndex + 1) % images.length);
        }, intervalTime);

        return () => clearInterval(intervalId);
    }, []); // Empty dependency array ensures that this effect runs only once after initial render

    return (
        <div className="relative">
            <img
                className="h-[600px] w-full"
                src={images[currentSlideIndex]}
                alt={`Slide ${currentSlideIndex + 1}`}
            />
            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
                {images.map((image, index) => (
                    <button
                        key={index}
                        className={`w-4 h-4 rounded-full ${
                            index === currentSlideIndex
                                ? 'bg-red-300'
                                : 'bg-red-200'
                        }`}
                        onClick={() => goToSlide(index)}
                    />
                ))}
            </div>
        </div>
    );
};

export default Herosection;
