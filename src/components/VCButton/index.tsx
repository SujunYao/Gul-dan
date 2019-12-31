import React, { MouseEvent, SFC } from 'react';
import VCButtonHelper from '../../helpers/VCButtoHelper';
import './VCButton.scss';

const { BTNTYPE, TYPE_CLASSES, SIZE } = VCButtonHelper;

type props = {
    onClick?(event: MouseEvent<HTMLElement>): void,
    icon?: string,
    text?: string,
    className?: string,
    size?: string,
    disabled?: boolean,
    type?: string
}

const VCButton: SFC<props> = ({ onClick: handleClick, icon, text, size = SIZE.NORMAL, type = BTNTYPE.LINE, disabled = false, className }) => {

    /** According to the values of type, size, classname, Calc the classes **/
    const calcClasses = (type: string, size: string, className?: string): string => {
        let finalClasses: string = 'VCButton';
        if (type) {
            switch (type) {
                case BTNTYPE.FILLED:
                    finalClasses += ` ${TYPE_CLASSES.FILLED}`;
                    break;
                case BTNTYPE.PRIMARY_1:
                    finalClasses += ` ${TYPE_CLASSES.PRIMARY_1}`;
                    break;
                case BTNTYPE.PRIMARY_2:
                    finalClasses += ` ${TYPE_CLASSES.PRIMARY_2}`;
                    break;
                case BTNTYPE.PRIMARY_3:
                    finalClasses += ` ${TYPE_CLASSES.PRIMARY_3}`;
                    break;
                case BTNTYPE.CIRCLE_1:
                    finalClasses += ` ${TYPE_CLASSES.CIRCLE_1}`;
                    break;
                case BTNTYPE.CIRCLE_2:
                    finalClasses += ` ${TYPE_CLASSES.CIRCLE_2}`;
                    break;
                case BTNTYPE.LINE:
                default:
                    finalClasses += ` ${TYPE_CLASSES.LINE}`;
                    break;
            }
        }
        if (size) {
            switch (size) {
                case SIZE.SMALL:
                    finalClasses += ` ${SIZE.SMALL}`;
                    break;

                case SIZE.LARGE:
                    finalClasses += ` ${SIZE.LARGE}`;
                    break;
                case SIZE.NORMAL:
                default:
                    finalClasses += ` ${SIZE.NORMAL}`;
                    break;
            }
        }
        if (!text) {
            finalClasses += ' onlyIcon';
        }
        if (className) {
            finalClasses += ` ${className}`;
        }
        return finalClasses;
    };

    return (
        <button className={calcClasses(type, size, className)} type='button' onClick={handleClick} disabled={disabled}>
            {icon ? <i className={`VC_btn_icon iconfont icon-${icon}`} /> : ''}
            {text ? <span className='VC_btn_text'>{text}</span> : ''}
        </button>
    )
};

export default VCButton;
