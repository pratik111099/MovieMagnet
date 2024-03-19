/* eslint-disable react/prop-types */
import React, { useState } from "react";

import "./style.scss";

const SwitchTab = ({ tabs, onTabChange }) => {
    const [selectedtab, setSelectedtab] = useState(0);
    const [left, setLeft] = useState(0);

    const handleTabSwitch = (tab, index) => {
        setLeft(index * 100);
        setTimeout(() => {
            setSelectedtab(index);
        }, 400);
        onTabChange(tab);
    };

    return (
        <div className="switchTab">
            <div className="tabItems">
                {tabs?.map((tab, index) => (
                    <span
                        key={index}
                        className={`tabItem ${
                            selectedtab === index ? "active" : ""
                        }`}
                        onClick={() => handleTabSwitch(tab, index)}
                    >
                        {tab}
                    </span>
                ))}
                <div className="activeBg" style={{ left: left }} />
            </div>
        </div>
    );
};

export default SwitchTab;
