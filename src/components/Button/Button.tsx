import React, { ReactNode } from 'react';
import './Button.css';

interface ButtonProps {
  onClick?: (event: React.MouseEvent<HTMLElement>) => void;
  outline?: boolean;
  primary?: boolean;
  text?: boolean;
  scale?: boolean;
  disable?: boolean;
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
  className?: string;
  children?: ReactNode;
  style?: object;
}

const Button: React.FC<ButtonProps> = ({
  onClick,
  outline = false,
  primary = false,
  text = false,
  scale = false,
  disable = false,
  leftIcon,
  rightIcon,
  className,
  children,
  style,
  ...passProps
}) => {
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
    scale && 'scale',
    disable && 'disable',
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
