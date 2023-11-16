import { useState, useEffect } from "react";
import classNames from "classnames/bind"
import $ from 'jquery';
import scss from './Navigator.module.scss';

const Navigator = ({ sections, current, onNavigate }) => {

    const cx = classNames.bind(scss);
    const [navigator, setNavigator] = useState([]);

    useEffect(() => {
        if (sections) {
            const test = sections.map(({ ref }, index) => {
                return <div key={index} className={cx('navigator-item', ref.current === current && 'active')} data-target={$(ref.current).data('section-id')}>
                    <div className={cx('navigator-item-dot')}></div>
                </div>;
            });

            setNavigator(test);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [current, sections]);

    useEffect(() => {
        if (typeof onNavigate !== 'function') {
            return;
        }

        $(`.${cx('navigator-item')}`).on('click', function () {
            onNavigate($(`[data-section-id=${$(this).data('target')}]`));
        });

        return () => {
            $(`.${cx('navigator-item')}`).off('click');
        }
    });

    return (
        <div className={cx('navigator')}>
            {navigator}
        </div>
    )
}

export default Navigator