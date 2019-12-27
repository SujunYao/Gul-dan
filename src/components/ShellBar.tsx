import React, { MouseEvent, SFC } from 'react';

type props = {
    onClick?(event: MouseEvent<HTMLElement>): void
}

export const ShellBar: SFC<props> = ({ onClick: handleClick, children }) => (
    <div className='HI' onClick={handleClick}>{children}</div>
);
