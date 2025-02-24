import React, { useState, useEffect, useRef } from 'react';
import CreateGlossary from './create_glossary'
import RotatingTopics from './topics';


const GlossaryGPT = () => {
    return (
        <div className="ImproveHere">
            <div className="createArticleContainer mt-36">
                <div className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-800 mb-16 text-center">
                    Jumpstart Glossary Creation with GlossaryGPT
                </div>
                <div className="hidden sm:block mt-0 flex justify-center items-center">
                    <RotatingTopics />
                </div>
                <CreateGlossary />

            </div>
        </div>
    );
};


export default GlossaryGPT;