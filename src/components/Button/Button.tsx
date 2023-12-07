import React, { CSSProperties, ReactNode } from 'react';
import './Button.css';

interface ButtonProps {
  onClick?: (event: React.MouseEvent<HTMLElement>) => void;
  outline?: boolean;
  primary?: boolean;
  text?: boolean;
  text_e?: boolean;
  active?: boolean;
  scale?: boolean;
  disable?: boolean;
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
  className?: string;
  children?: ReactNode;
  style?: CSSProperties;
}

const Button = ({
  onClick,
  outline = false,
  primary = false,
  text = false,
  text_e = false,
  scale = false,
  active = false,
  disable = false,
  leftIcon,
  rightIcon,
  className,
  children,
  style,
  ...passProps
}: ButtonProps) => {
  let Comp: React.ElementType = 'button';
  const props = {
    onClick,
    ...passProps,
  };

  const propsWithIndexSignature: { [key: string]: any } = props;

  if (disable) {
    Object.keys(propsWithIndexSignature).forEach((key) => {
      if (key.startsWith('on') && typeof propsWithIndexSignature[key] === 'function') {
        delete propsWithIndexSignature[key];
      }
    });
  }

  // ...

  const classes = [
    'dbe-btn',
    outline && 'outline',
    primary && 'primary',
    text && 'text',
    text_e && 'text_e',
    scale && 'scale',
    disable && 'disable',
    active && 'active',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <Comp className={classes} {...props} style={style}>
      {leftIcon && <span className="icon">{leftIcon}</span>}
      <span className="title">{children}</span>
      {rightIcon && <span className="icon">{rightIcon}</span>}
    </Comp>
  );
};

export default Button;
