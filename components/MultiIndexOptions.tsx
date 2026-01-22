"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import OptionsDisplay from "./OptionsDisplay";
import type { OptionsChainData } from "@/lib/marketData";

interface MultiIndexOptionsProps {
    optionsData: OptionsChainData[];
}

export default function MultiIndexOptions({ optionsData }: MultiIndexOptionsProps) {
    const [activeIndex, setActiveIndex] = useState(0);
    const activeData = optionsData[activeIndex];

    return (
        <div className="space-y-6">
            {/* Tab Navigation */}
            <div className="flex gap-4 overflow-x-auto pb-2">
                {optionsData.map((data, index) => {
                    const isActive = index === activeIndex;

                    return (
                        <motion.button
                            key={index}
                            onClick={() => setActiveIndex(index)}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1 }}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className={`
                                relative px-8 py-4 rounded-xl font-semibold whitespace-nowrap text-lg
                                transition-all duration-300
                                ${isActive
                                    ? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow-lg shadow-blue-500/50 border-2 border-blue-400'
                                    : 'bg-white/5 text-white/80 hover:bg-white/10 border-2 border-white/10'
                                }
                            `}
                        >
                            {data.underlying}

                            {/* Active indicator */}
                            {isActive && (
                                <motion.div
                                    layoutId="activeIndexTab"
                                    className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-400 to-purple-400"
                                    transition={{ type: "spring", stiffness: 500, damping: 30 }}
                                />
                            )}
                        </motion.button>
                    );
                })}
            </div>

            {/* Options Display */}
            <motion.div
                key={activeIndex}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
            >
                <OptionsDisplay data={activeData} />
            </motion.div>
        </div>
    );
}
