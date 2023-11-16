import { Children, cloneElement, createRef, useEffect, useRef, useState } from "react";
import $ from 'jquery';
import Navigator from "./Navigator";

const Sections = ({ children, duration = 500 }) => {
    const [sections, setSections] = useState();
    const isRunning = useRef(false);
    const i = useRef(null);
    const [current, setCurrent] = useState(null);

    const handleIntersecting = (el) => {
        i.current = el;
    }

    useEffect(() => {
        setSections(Children.map(children, (child) => cloneElement(child, { ...child.props, ref: createRef(), onIntersecting: handleIntersecting })));
    }, [children]);

    const handleScroll = (el) => {
        const $el = $(el);

        if ($el.length <= 0 || isRunning.current) {
            return;
        }

        isRunning.current = true;
        setCurrent($el[0]);

        $('html, body').animate({
            scrollTop: $el.position().top
        }, duration, () => {
            isRunning.current = false;
        });
    };

    useEffect(() => {
        const currentSection = current ?? $('[data-section-full-page]').map((_, section) => ({
            section,
            distance: Math.abs(section.getBoundingClientRect().top)
        })).sort((a, b) => a.distance - b.distance)[0]?.section;

        if (!currentSection) {
            return;
        }

        setCurrent(currentSection);

        function handleWheel(e) {
            const $transitionSection = $(currentSection)[e.deltaY < 0 ? 'prev' : 'next']('[data-section-full-page]');
            if ($transitionSection.length <= 0) {
                return;
            }

            if (Math.abs($transitionSection[0].getBoundingClientRect().top) - window.innerHeight > 0) {
                return;
            }

            handleScroll($transitionSection);
        }

        window.addEventListener('wheel', handleWheel);

        return () => {
            window.removeEventListener('wheel', handleWheel);
        };

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [current, sections]);

    return (
        <>
            {sections}
            <Navigator sections={sections} current={current} onNavigate={handleScroll} />
        </>
    );
}

export default Sections;
