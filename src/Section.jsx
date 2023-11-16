import React from "react";
import { v4 } from 'uuid';

const Section = ({ children }, ref) => {
    return (
        <section className="section" ref={ref} data-section-id={v4()} data-section-full-page style={{minHeight: '100vh'}}>{children}</section>
    )
};

export default React.forwardRef(Section)
